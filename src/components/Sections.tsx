import type { Locale } from "@/i18n/config";
import { FlowIllustration, IntegrationIcon, ProblemIcon, WarehouseIllustration } from "@/components/Illustrations";
import type { Dictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/company";
import { Alert, Check, Logo, Section, SectionHeading, buttonPrimary, buttonSecondary } from "./ui";

type Props = { dict: Dictionary };

export function Hero({ dict }: Props) {
  const t = dict.hero;
  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/10 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted">
            {t.eyebrow}
          </p>
          <h1 className="font-display text-4xl leading-[1.05] font-medium tracking-tight text-balance sm:text-5xl xl:text-6xl">
            {t.title} <span className="text-accent">{t.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{t.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={buttonPrimary}>
              {t.ctaPrimary}
            </a>
            <a href="#example" className={buttonSecondary}>
              {t.ctaSecondary}
            </a>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-2">
                <Check className="text-positive" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <HeroCard dict={dict} />
      </div>
      {/* Photo: CHUTTERSNAP on Unsplash (Unsplash License). Decorative, so empty alt. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- static file, no image optimiser on Workers */}
      <img
        src="/hero-warehouse.jpg"
        alt=""
        width={1600}
        height={1065}
        fetchPriority="high"
        className="relative mx-auto mt-14 aspect-[16/9] w-full max-w-6xl rounded-3xl object-cover object-[center_40%] shadow-[0_24px_60px_-30px_rgba(20,22,28,0.45)] sm:mt-20 sm:aspect-[21/8]"
      />
    </section>
  );
}

function HeroCard({ dict }: Props) {
  const c = dict.hero.card;
  return (
    <div className="rounded-3xl border border-line bg-surface p-5 shadow-[0_24px_60px_-30px_rgba(20,22,28,0.35)] sm:p-6">
      <div className="flex items-center justify-between text-xs text-muted">
        <span className="font-medium">{c.inbox}</span>
        <span className="rounded-full bg-accent-soft px-2 py-0.5 font-medium text-accent">{c.new}</span>
      </div>
      <div className="mt-4 rounded-2xl border border-line bg-surface-2/60 p-4">
        <p className="text-sm font-medium">{c.from}</p>
        <p className="mt-0.5 text-sm text-muted">{c.subject}</p>
      </div>
      <ol className="mt-5 space-y-3">
        {c.steps.map((s, i) => {
          const flagged = i === c.steps.length - 1;
          return (
            <li key={s} className="flex items-center gap-3 text-sm">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full ${
                  flagged ? "bg-accent-soft text-accent" : "bg-positive/10 text-positive"
                }`}
              >
                {flagged ? <Alert /> : <Check />}
              </span>
              {s}
            </li>
          );
        })}
      </ol>
      <div className="mt-5 flex items-center justify-between rounded-2xl bg-panel px-4 py-3 text-panel-ink">
        <span className="text-sm font-medium">{c.ready}</span>
        <span className="rounded-full bg-panel-accent px-2.5 py-1 text-xs font-medium text-panel">{c.waiting}</span>
      </div>
    </div>
  );
}

export function Problem({ dict }: Props) {
  const t = dict.problem;
  return (
    <Section id="problem" className="bg-surface-2/60">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item, i) => (
          <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
            <ProblemIcon index={i} className="mb-4" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function How({ dict }: Props) {
  const t = dict.how;
  return (
    <Section id="how">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="mb-14 rounded-3xl border border-line bg-surface-2/60 px-4 py-6 sm:px-10 sm:py-8">
        <FlowIllustration />
      </div>
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {t.steps.map((s, i) => (
          <li key={s.title} className="relative border-t border-line pt-6">
            <span className="absolute -top-px left-0 h-px w-12 bg-accent" aria-hidden="true" />
            <span className="font-display text-3xl font-medium text-accent">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Example({ dict }: Props) {
  const t = dict.example;
  const d = t.draft;
  return (
    <Section id="example" className="bg-surface-2/60">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_auto_1.15fr]">
        {/* Incoming email */}
        <div className="min-w-0 rounded-3xl border border-line bg-surface p-6">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">{t.email.label}</p>
          <p className="mt-4 text-sm font-medium">{t.email.from}</p>
          <p className="text-sm text-muted">{t.email.subject}</p>
          <p className="mt-4 font-mono text-[13px] leading-relaxed break-words whitespace-pre-line text-ink/85">{t.email.body}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-lg border border-line bg-surface-2/60 px-3 py-1.5 text-xs text-muted">
            <span className="rounded bg-negative/10 px-1.5 py-0.5 text-[10px] font-semibold text-negative">PDF</span>
            {t.email.attachment}
          </p>
        </div>

        <div className="flex items-center justify-center self-center text-accent" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-8 w-8 rotate-90 lg:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 12h15m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Draft quote */}
        <div className="min-w-0 rounded-3xl border border-accent/40 bg-surface p-6 shadow-[0_24px_60px_-34px_rgba(194,65,12,0.45)]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs font-medium tracking-wide text-muted uppercase">{d.label}</p>
            <span className="rounded-full bg-accent-soft px-2.5 py-1 text-xs font-medium text-accent">{d.status}</span>
          </div>
          <p className="mt-4 text-sm text-muted">{d.customer}</p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs text-muted">
                  {d.columns.map((col, i) => (
                    <th key={col} className={`pb-2 font-medium ${i >= 2 ? "text-right" : ""}`}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {d.rows.map((r) => (
                  <tr key={r.sku} className="border-b border-line/70 align-top">
                    <td className="py-2.5 pr-3">
                      {r.item}
                      <span className="mt-0.5 block text-xs text-muted">← {r.source}</span>
                    </td>
                    <td className="py-2.5 pr-3 font-mono text-xs text-muted">{r.sku}</td>
                    <td className="py-2.5 text-right whitespace-nowrap">
                      {"flag" in r && r.flag ? (
                        <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">{r.qty}</span>
                      ) : (
                        r.qty
                      )}
                    </td>
                    <td className="py-2.5 text-right whitespace-nowrap">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-xs font-medium tracking-wide text-muted uppercase">{d.checksTitle}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {d.checks.map((c) => (
              <li key={c.text} className="flex gap-2.5">
                {c.ok ? <Check className="mt-0.5 text-positive" /> : <Alert className="mt-0.5 text-accent" />}
                <span>{c.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-2" aria-hidden="true">
            <span className={`${buttonPrimary} pointer-events-none px-4! py-2!`}>{d.approve}</span>
            <span className={`${buttonSecondary} pointer-events-none px-4! py-2!`}>{d.edit}</span>
          </div>
        </div>
      </div>
      <p className="mt-6 text-sm text-muted">{t.note}</p>
    </Section>
  );
}

export function Control({ dict }: Props) {
  const t = dict.control;
  return (
    <Section id="control">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
        <div className="grid gap-4 sm:grid-cols-2">
          {t.items.map((item) => (
            <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Check />
              </span>
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Audience({ dict }: Props) {
  const t = dict.audience;
  return (
    <Section id="audience" className="bg-surface-2/60">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-line bg-surface p-7">
          <h3 className="font-semibold">{t.profileTitle}</h3>
          <ul className="mt-4 space-y-2.5">
            {t.profile.map((p) => (
              <li key={p} className="flex gap-2.5 text-muted">
                <Check className="mt-1 text-accent" />
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border border-line bg-surface p-7">
          <h3 className="font-semibold">{t.sectorsTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {t.sectors.map((s) => (
              <li key={s} className="rounded-full border border-line px-3.5 py-1.5 text-sm">
                {s}
              </li>
            ))}
          </ul>
          <WarehouseIllustration className="mt-8" />
        </div>
      </div>
    </Section>
  );
}

export function Integrations({ dict }: Props) {
  const t = dict.integrations;
  return (
    <Section id="integrations">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {t.items.map((item, i) => (
          <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
            <IntegrationIcon index={i} className="mb-4" />
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Pilot({ dict }: Props) {
  const t = dict.pilot;
  return (
    <section id="pilot" className="px-4 py-20 sm:px-6 sm:py-28">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-line bg-panel p-8 text-panel-ink sm:p-12">
        <p className="mb-3 text-sm font-medium tracking-wide text-panel-accent uppercase">{t.eyebrow}</p>
        <h2 className="max-w-2xl font-display text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-panel-ink/70">{t.subtitle}</p>
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-semibold">{t.includesTitle}</h3>
            <ul className="mt-4 space-y-3">
              {t.includes.map((p) => (
                <li key={p} className="flex gap-2.5 text-panel-ink/80">
                  <Check className="mt-1 text-panel-accent" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">{t.targetsTitle}</h3>
            <dl className="mt-4 grid grid-cols-2 gap-3">
              {t.targets.map((x) => (
                <div key={x.label} className="rounded-2xl border border-panel-ink/15 p-5">
                  <dt className="sr-only">{x.label}</dt>
                  <dd className="font-display text-4xl font-medium text-panel-accent">{x.value}</dd>
                  <dd className="mt-1 text-sm leading-snug text-panel-ink/70">{x.label}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-panel-ink/60">{t.note}</p>
          </div>
        </div>
        <a href="#contact" className="mt-10 inline-flex items-center justify-center rounded-full bg-panel-accent px-6 py-3 text-sm font-medium text-panel transition hover:opacity-90">
          {t.cta}
        </a>
      </div>
    </section>
  );
}

export function Security({ dict }: Props) {
  const t = dict.security;
  return (
    <Section id="security" className="pt-0! sm:pt-0!">
      <SectionHeading eyebrow={t.eyebrow} title={t.title} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {t.items.map((item) => (
          <div key={item.title} className="rounded-2xl border border-line bg-surface p-6">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function About({ dict }: Props) {
  const t = dict.about;
  return (
    <Section id="about" className="bg-surface-2/60">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.text} />
        <ul className="grid gap-5 sm:grid-cols-2">
          {t.people.map((p) => (
            <li key={p.id}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-surface-2">
                {/* eslint-disable-next-line @next/next/no-img-element -- static file, no image optimiser on Workers */}
                <img
                  src={`/team/${p.id}.webp`}
                  alt={t.photoAlt.replace("{name}", p.name)}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-muted">{p.role}</p>
                </div>
                <a
                  href={p.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.linkedin.replace("{name}", p.name)}
                  title={t.linkedin.replace("{name}", p.name)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-3.95v-11Z" />
                  </svg>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

export function Faq({ dict }: Props) {
  const t = dict.faq;
  return (
    <Section id="faq">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />
        <div className="divide-y divide-line border-y border-line">
          {t.items.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span className="text-xl text-muted transition group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  );
}

export function Footer({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const t = dict.footer;
  return (
    <footer className="border-t border-line px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Logo />
          <p className="mt-2 max-w-sm text-sm text-muted">{t.tagline}</p>
          <a href={company.parentUrl} className="mt-3 inline-block text-sm font-medium text-accent hover:underline">
            {t.partOf} →
          </a>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
          <a href={`/${lang}/privacy`} className="hover:text-ink">
            {t.privacy}
          </a>
          <a href={`/${lang}/terms`} className="hover:text-ink">
            {t.terms}
          </a>
          <a href={`/${lang}/imprint`} className="hover:text-ink">
            {t.imprint}
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-muted">
        © 2026 {company.legalName} · Bune Quote. {t.rights}
      </p>
    </footer>
  );
}
