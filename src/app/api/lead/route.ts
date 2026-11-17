import { getCloudflareContext } from "@opennextjs/cloudflare";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { leadSchema, type Lead } from "@/lib/schemas";
import { looksLikeSpam } from "@/lib/spam";

// Stores enquiries in Cloudflare D1 and sends emails through the Cloudflare
// Email Service. Storing comes first: a failed email never loses an enquiry.
// The D1 database is shared with buneautomation.com; rows from this site have
// kind "rfq" and site "bunequote" in the payload.

interface LeadBindings {
  DB?: {
    prepare(sql: string): { bind(...values: unknown[]): { run(): Promise<unknown> } };
  };
  EMAIL?: {
    send(message: {
      to: string;
      from: { email: string; name: string };
      subject: string;
      html: string;
      replyTo?: string;
    }): Promise<unknown>;
  };
}

const bindings = () => getCloudflareContext().env as LeadBindings;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

async function store(lead: Lead) {
  const { DB } = bindings();
  if (!DB) throw new Error("D1 binding DB is missing");
  const { kind, lang, name, email, company, phone, size, volume, systems, message } = lead;
  const payload = { site: "bunequote", phone, size, volume, systems, message };
  await DB.prepare("INSERT INTO leads (kind, lang, name, email, company, payload) VALUES (?, ?, ?, ?, ?, ?)")
    .bind(kind, lang, name, email, company, JSON.stringify(payload))
    .run();
}

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
  const { EMAIL } = bindings();
  const from = process.env.MAIL_FROM;
  if (!EMAIL || !from) throw new Error("Email binding or MAIL_FROM is missing");
  await EMAIL.send({ to, from: { email: from, name: "Bune Quote" }, subject, html, replyTo });
}

function detailsHtml(lead: Lead) {
  const rows = Object.entries(lead)
    .filter(([k, v]) => k !== "consent" && v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escape(k)}</td><td style="padding:4px 0;white-space:pre-wrap">${escape(String(v))}</td></tr>`,
    )
    .join("");
  return `<table style="font-family:sans-serif;font-size:14px">${rows}</table>`;
}

// The confirmation does not repeat the submitted text, so the form cannot be
// used to send someone else's message to an arbitrary address.
const confirmation = {
  hu: ["Megkaptuk ajánlatkérését – Bune Quote", "Köszönjük! Megkaptuk az ajánlatkérését, és egy munkanapon belül jelentkezünk."],
  en: ["We received your request – Bune Quote", "Thank you! We received your request and will get back to you within one business day."],
} as const;

const describe = (err: unknown) =>
  JSON.stringify({
    name: err instanceof Error ? err.name : typeof err,
    code: (err as { code?: unknown } | null)?.code,
    message: (err instanceof Error ? err.message : String(err)).slice(0, 300),
  });

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  if (!rateLimit(`lead:${clientIp(request)}`, { max: 5, windowMs: 10 * 60_000 })) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  // Bots get a normal-looking success so they do not adapt; nothing is stored or sent.
  if (looksLikeSpam(body)) {
    console.info("[lead] dropped as spam");
    return Response.json({ ok: true });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "invalid", issues: parsed.error.issues }, { status: 400 });
  }
  const lead = parsed.data;

  if (!rateLimit(`lead-email:${lead.email.toLowerCase()}`, { max: 3, windowMs: 60 * 60_000 })) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  try {
    await store(lead);
  } catch (err) {
    console.error("[lead] store failed", describe(err));
    return Response.json({ error: "store_failed" }, { status: 502 });
  }

  const notify = process.env.LEAD_NOTIFY_EMAIL;
  const [subject, text] = confirmation[lead.lang];
  const results = await Promise.allSettled([
    notify
      ? sendEmail(notify, `New Bune Quote request: ${lead.company}`, detailsHtml(lead), lead.email)
      : Promise.reject(new Error("LEAD_NOTIFY_EMAIL is missing")),
    sendEmail(lead.email, subject, `<p style="font-family:sans-serif">${escape(text)}</p>`),
  ]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[lead] email failed", describe(r.reason));
  }

  // The request is safely stored, so the visitor sees success even if an email failed.
  return Response.json({ ok: true });
}
