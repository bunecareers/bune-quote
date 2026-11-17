"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { useSpamTrap } from "./SpamTrap";
import { buttonPrimary, inputClass, labelClass } from "./ui";

type Fields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  size: string;
  volume: string;
  systems: string;
  message: string;
  consent: boolean;
};

export function ContactForm({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.contact;
  const { trap, signals } = useSpamTrap();
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [f, setF] = useState<Fields>({
    name: "",
    email: "",
    company: "",
    phone: "",
    size: "m",
    volume: "unknown",
    systems: "",
    message: "",
    consent: false,
  });
  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => setF((p) => ({ ...p, [k]: v }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "rfq",
          lang,
          ...f,
          phone: f.phone || undefined,
          systems: f.systems || undefined,
          message: f.message || undefined,
          ...signals(),
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-3xl border border-line bg-surface p-10 text-center" role="status">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-xl text-accent">
          ✓
        </div>
        <p className="text-lg">{t.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="relative rounded-3xl border border-line bg-surface p-6 sm:p-8">
      {trap}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={`${t.name} *`}>
          <input required value={f.name} onChange={(e) => set("name", e.target.value)} className={inputClass} autoComplete="name" />
        </Field>
        <Field label={`${t.email} *`}>
          <input
            required
            type="email"
            value={f.email}
            onChange={(e) => set("email", e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </Field>
        <Field label={`${t.company} *`}>
          <input
            required
            value={f.company}
            onChange={(e) => set("company", e.target.value)}
            className={inputClass}
            autoComplete="organization"
          />
        </Field>
        <Field label={t.phone}>
          <input type="tel" value={f.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} autoComplete="tel" />
        </Field>
        <Field label={t.size}>
          <select value={f.size} onChange={(e) => set("size", e.target.value)} className={inputClass}>
            {Object.entries(t.sizes).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.volume}>
          <select value={f.volume} onChange={(e) => set("volume", e.target.value)} className={inputClass}>
            {Object.entries(t.volumes).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.systems} full>
          <input
            value={f.systems}
            placeholder={t.systemsPlaceholder}
            onChange={(e) => set("systems", e.target.value)}
            className={inputClass}
          />
        </Field>
        <Field label={t.message} full>
          <textarea
            rows={4}
            value={f.message}
            placeholder={t.messagePlaceholder}
            onChange={(e) => set("message", e.target.value)}
            className={inputClass}
          />
        </Field>
        <label className="flex gap-2.5 text-sm leading-relaxed text-muted sm:col-span-2">
          <input
            type="checkbox"
            required
            checked={f.consent}
            onChange={(e) => set("consent", e.target.checked)}
            className="mt-1 accent-[var(--accent)]"
          />
          <span>
            {t.consent}{" "}
            <a href={`/${lang}/privacy`} target="_blank" className="text-accent underline-offset-2 hover:underline">
              {dict.footer.privacy}
            </a>
          </span>
        </label>
      </div>
      <div className="mt-8 flex justify-end">
        <button type="submit" className={buttonPrimary} disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-4 text-sm text-negative" role="alert">
          {t.error}
        </p>
      )}
    </form>
  );
}

function Field({ label, children, full = false }: { label: string; children: ReactNode; full?: boolean }) {
  return (
    <label className={full ? "sm:col-span-2" : ""}>
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}
