import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Sections";
import { isLegalDoc, legal, legalDocIds } from "@/content/legal";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { company } from "@/lib/company";
import { ogLocale } from "@/lib/seo";

export function generateStaticParams() {
  return legalDocIds.map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[doc]">): Promise<Metadata> {
  const { lang, doc } = await params;
  if (!hasLocale(lang) || !isLegalDoc(doc)) return {};
  const page = legal[lang][doc];
  return {
    title: `${page.title} — Bune Quote`,
    description: page.description,
    alternates: {
      canonical: `/${lang}/${doc}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}/${doc}`])),
    },
    openGraph: { title: page.title, description: page.description, locale: ogLocale[lang], siteName: "Bune Quote" },
  };
}

export default async function LegalPage({ params }: PageProps<"/[lang]/[doc]">) {
  const { lang, doc } = await params;
  if (!hasLocale(lang) || !isLegalDoc(doc)) notFound();
  const dict = await getDictionary(lang);
  const page = legal[lang][doc];

  return (
    <>
      <Header dict={dict} lang={lang} path={`/${doc}`} />
      <main className="px-4 py-16 sm:px-6 sm:py-24">
        <article className="mx-auto max-w-3xl">
          <a href={`/${lang}`} className="text-sm text-muted transition hover:text-ink">
            ← {dict.legal.back}
          </a>
          <h1 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl">{page.title}</h1>
          <p className="mt-3 text-sm text-muted">
            {dict.legal.updated}: {company.updated[lang]}
          </p>

          {/* {company.draft && (
            <p role="note" className="mt-8 rounded-2xl border border-accent/30 bg-accent-soft/50 px-5 py-4 text-sm leading-relaxed">
              {dict.legal.draft}
            </p>
          )} */}

          <div className="mt-10 space-y-10">
            {page.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-xl font-semibold tracking-tight">{s.heading}</h2>
                {s.items && (
                  <ul className="mt-4 space-y-1.5 leading-relaxed text-muted">
                    {s.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {s.paragraphs?.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
