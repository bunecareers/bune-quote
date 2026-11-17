import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { ContactForm } from "@/components/ContactForm";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import {
  Audience,
  Control,
  Example,
  Faq,
  Footer,
  Hero,
  How,
  Integrations,
  Pilot,
  Problem,
  Security,
} from "@/components/Sections";
import { Section, SectionHeading } from "@/components/ui";
import { company } from "@/lib/company";
import { structuredData } from "@/lib/seo";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contact;

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <Problem dict={dict} />
        <How dict={dict} />
        <Example dict={dict} />
        <Control dict={dict} />
        <Audience dict={dict} />
        <Integrations dict={dict} />
        <Pilot dict={dict} />
        <Security dict={dict} />
        <Faq dict={dict} />
        <Section id="contact" className="bg-surface-2/60">
          <div className="mx-auto max-w-3xl">
            <SectionHeading eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} center />
            <ContactForm dict={dict} lang={lang} />
            <p className="mt-6 text-center text-sm text-muted">
              {t.direct}{" "}
              <a href={`mailto:${company.email}`} className="font-medium text-accent hover:underline">
                {company.email}
              </a>
            </p>
          </div>
        </Section>
      </main>
      <Footer dict={dict} lang={lang} />
      <JsonLd data={structuredData(dict, lang)} />
    </>
  );
}
