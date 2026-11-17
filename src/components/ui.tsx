import type { ReactNode } from "react";
import { logoPath } from "./logoPath";

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-20 sm:px-6 sm:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className="mb-3 text-sm font-medium tracking-wide text-accent uppercase">{eyebrow}</p>
      <h2 className="font-display text-3xl leading-tight font-medium tracking-tight text-balance sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg leading-relaxed text-muted">{subtitle}</p>}
    </div>
  );
}

export function LogoMark({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <path d={logoPath} fill="var(--accent)" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
      <LogoMark />
      <span>
        Bune <span className="text-accent">Quote</span>
      </span>
    </span>
  );
}

export const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-ink transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50";

export const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-medium text-ink transition hover:border-ink/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export const inputClass =
  "w-full rounded-xl border border-line bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none";

export const labelClass = "mb-1.5 block text-sm font-medium text-ink";

export function Check({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 shrink-0 ${className}`} aria-hidden="true">
      <path d="m4.5 10.5 3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Alert({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={`h-4 w-4 shrink-0 ${className}`} aria-hidden="true">
      <path d="M10 6.5v4.5M10 14h.01" strokeLinecap="round" />
      <circle cx="10" cy="10" r="7.5" />
    </svg>
  );
}
