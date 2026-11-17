import type { Locale } from "@/i18n/config";
import { company as c } from "@/lib/company";

// Draft legal texts, adapted from buneautomation.com for this site (no chat,
// no calculator, no ad tag, no usage counting). They must be reviewed by a
// lawyer before the site goes live.

export const legalDocIds = ["privacy", "terms", "imprint"] as const;
export type LegalDocId = (typeof legalDocIds)[number];

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDoc {
  title: string;
  description: string;
  sections: LegalSection[];
}

const naih =
  "Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH), 1055 Budapest, Falk Miksa utca 9–11., ugyfelszolgalat@naih.hu, www.naih.hu";

const ico = "Information Commissioner's Office (ICO), ico.org.uk";

const hu: Record<LegalDocId, LegalDoc> = {
  privacy: {
    title: "Adatvédelmi tájékoztató",
    description: `Hogyan kezeli a ${c.brand} a weboldalon megadott személyes adatokat.`,
    sections: [
      {
        heading: "1. Az adatkezelő",
        items: [
          `Név: ${c.legalName}`,
          `Székhely: ${c.seat}`,
          `Cégszám (Companies House): ${c.registryNumber}`,
          `Bejegyzés helye: ${c.registeredIn.hu}`,
          `Adatvédelmi kérdések: ${c.privacyEmail}`,
        ],
        paragraphs: [
          `Ez a tájékoztató a ${c.domain} weboldalon (a továbbiakban: weboldal) végzett adatkezelésekre vonatkozik, a brit adatvédelmi rendelet (UK GDPR) és a brit adatvédelmi törvény (Data Protection Act 2018) alapján. Az Európai Unióban tartózkodó érintettekre az (EU) 2016/679 rendelet is vonatkozhat. A tájékoztatóban a „GDPR” mindkét rendeletet jelöli, az adott érintettre alkalmazandó mértékben. A ${c.brand} a ${c.parentBrand} szolgáltatása.`,
        ],
      },
      {
        heading: "2. Ajánlatkérés",
        paragraphs: [
          "Kezelt adatok: név, munkahelyi e-mail-cím, telefonszám (nem kötelező), cégnév, cégméret, a használt üzleti rendszerek (például ERP, CRM), a havi ajánlatkérések becsült száma és az üzenet szövege.",
          "Cél: az ajánlatkérés megválaszolása, kapcsolatfelvétel, ajánlat készítése.",
          "Jogalap: az érintett kérésére a szerződés megkötését megelőzően tett lépések (GDPR 6. cikk (1) b) pont), illetve az űrlapon adott hozzájárulás (GDPR 6. cikk (1) a) pont).",
          "Megőrzési idő: ha nem jön létre szerződés, az utolsó kapcsolatfelvételtől számított 1 év; szerződés esetén a szerződésre vonatkozó jogszabályi megőrzési idő.",
        ],
      },
      {
        heading: "3. Technikai adatok és biztonság",
        paragraphs: [
          "A visszaélések (például tömeges, automatizált beküldések) kiszűréséhez az IP-címet a szerver memóriájában legfeljebb 1 óráig kezeljük. A tárhelyszolgáltató a működéshez szükséges naplókat (IP-cím, időpont, kért oldal) a saját feltételei szerint rövid ideig tárolja.",
          "A megfelelő nyelv megjelenítéséhez a tárhelyszolgáltató az IP-cím alapján megállapítja az Ön országát. Az országot csak erre használjuk, és nem tároljuk.",
          "Jogalap: jogos érdek a weboldal biztonságos működtetésében (GDPR 6. cikk (1) f) pont).",
        ],
      },
      {
        heading: "4. Sütik",
        paragraphs: ["A weboldal nem helyez el sütiket, és nem használ látogatókövető vagy hirdetési eszközöket."],
      },
      {
        heading: "5. Adatfeldolgozók",
        items: [
          `${c.host.name} – tárhelyszolgáltatás és e-mailek kézbesítése (USA), az ajánlatkérések tárolása (EU-s adattárolás)`,
        ],
        paragraphs: [
          "Az Egyesült Királyságon és az Európai Gazdasági Térségen kívülre történő adattovábbítás megfelelőségi döntés (például az EU–USA adatvédelmi keretrendszer és annak brit kiegészítése) vagy az erre elfogadott általános szerződési feltételek és a brit adattovábbítási megállapodás alapján történik.",
        ],
      },
      {
        heading: "6. Az Ön jogai",
        paragraphs: [
          "Ön kérheti a személyes adataihoz való hozzáférést, azok helyesbítését, törlését vagy kezelésének korlátozását, tiltakozhat az adatkezelés ellen, élhet az adathordozhatóság jogával, és a hozzájárulását bármikor visszavonhatja. Kérését a fenti e-mail-címre küldheti; legfeljebb egy hónapon belül válaszolunk.",
          `Panaszával az Egyesült Királyság felügyeleti hatóságához fordulhat: ${ico}. Ha az Európai Unióban tartózkodik, a lakóhelye vagy munkahelye szerinti felügyeleti hatósághoz is fordulhat; Magyarországon: ${naih}. Jogai megsértése esetén bírósághoz is fordulhat.`,
        ],
      },
    ],
  },

  terms: {
    title: "Általános felhasználási feltételek",
    description: `A ${c.domain} weboldal használatának feltételei.`,
    sections: [
      {
        heading: "1. Hatály",
        paragraphs: [
          `Ezek a feltételek a ${c.domain} weboldal használatára vonatkoznak. A weboldal üzemeltetője: ${c.legalName} (${c.seat}; a továbbiakban: Szolgáltató). A weboldal használatával Ön elfogadja ezeket a feltételeket.`,
        ],
      },
      {
        heading: "2. A weboldal tartalma",
        paragraphs: [
          "A weboldalon szereplő információk tájékoztató jellegűek. A bemutatott példák szemléltető jellegűek, és nem valós ügyféladatokon alapulnak. A pilot célértékei célkitűzések, nem garantált eredmények.",
          "A weboldalon szereplő tartalom nem minősül ajánlattételnek, csak ajánlatkérésre való felhívásnak.",
        ],
      },
      {
        heading: "3. Ajánlatkérés és szerződés",
        paragraphs: [
          "Az ajánlatkérő űrlap kitöltése nem jelent szerződéskötést és fizetési kötelezettséget. A Szolgáltató az ajánlatkérés alapján egyedi ajánlatot küld; szerződés csak a felek külön, írásban megkötött megállapodásával jön létre.",
          "A Szolgáltató szolgáltatásait vállalkozások és szervezetek részére nyújtja.",
        ],
      },
      {
        heading: "4. Felelősség",
        paragraphs: [
          "A Szolgáltató törekszik arra, hogy a weboldal tartalma pontos és naprakész legyen, de nem felel a tájékoztató jellegű tartalmak alapján hozott döntésekből eredő károkért, a jogszabály által megengedett mértékben.",
          "A Szolgáltató nem felel a weboldal elérhetetlenségéből vagy külső támadásból eredő károkért.",
        ],
      },
      {
        heading: "5. Szellemi tulajdon",
        paragraphs: [
          `A weboldal szövegei, grafikai elemei, valamint a ${c.brand} és ${c.parentBrand} név és logó a Szolgáltató szellemi tulajdonát képezik. Ezek a Szolgáltató előzetes írásbeli engedélye nélkül nem másolhatók és nem használhatók fel.`,
        ],
      },
      {
        heading: "6. Adatvédelem",
        paragraphs: ["A személyes adatok kezelését az Adatvédelmi tájékoztató írja le."],
      },
      {
        heading: "7. Irányadó jog és módosítás",
        paragraphs: [
          "Ezekre a feltételekre az Egyesült Királyság joga irányadó, ahogyan az Skóciában alkalmazandó. A Szolgáltató a feltételeket módosíthatja; a módosított feltételek a weboldalon való közzététellel lépnek hatályba.",
        ],
      },
    ],
  },

  imprint: {
    title: "Impresszum",
    description: `A ${c.domain} weboldal üzemeltetőjének adatai.`,
    sections: [
      {
        heading: "Szolgáltató",
        items: [
          `Név: ${c.legalName}`,
          `Székhely: ${c.seat}`,
          `Cégszám (Companies House): ${c.registryNumber}`,
          `Bejegyzés helye: ${c.registeredIn.hu}`,
          `Képviselő: ${c.representative}`,
          `E-mail: ${c.email}`,
          `Telefon: ${c.phone}`,
        ],
      },
      {
        heading: "Tárhelyszolgáltató",
        items: [`Név: ${c.host.name}`, `Cím: ${c.host.address}`],
      },
    ],
  },
};

const en: Record<LegalDocId, LegalDoc> = {
  privacy: {
    title: "Privacy policy",
    description: `How ${c.brand} handles the personal data you provide on this website.`,
    sections: [
      {
        heading: "1. Data controller",
        items: [
          `Name: ${c.legalName}`,
          `Registered office: ${c.seat}`,
          `Company number (Companies House): ${c.registryNumber}`,
          `Registered in: ${c.registeredIn.en}`,
          `Privacy questions: ${c.privacyEmail}`,
        ],
        paragraphs: [
          `This policy covers the processing of personal data on the ${c.domain} website (the website), under the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018. Regulation (EU) 2016/679 may also apply to individuals in the European Union. In this policy, "GDPR" means both regulations, as far as each applies to you. ${c.brand} is a service of ${c.parentBrand}.`,
        ],
      },
      {
        heading: "2. Offer requests",
        paragraphs: [
          "Data processed: name, work email, phone number (optional), company name, company size, the business systems you use (such as ERP or CRM), the estimated number of monthly quote requests and your message.",
          "Purpose: responding to your request, contacting you and preparing an offer.",
          "Legal basis: steps taken at your request before entering into a contract (GDPR Art. 6(1)(b)) and the consent given in the form (GDPR Art. 6(1)(a)).",
          "Retention: if no contract is concluded, 1 year from the last contact; if a contract is concluded, the statutory retention period for contracts.",
        ],
      },
      {
        heading: "3. Technical data and security",
        paragraphs: [
          "To prevent abuse (such as mass automated submissions), your IP address is kept in server memory for at most 1 hour. The hosting provider keeps the logs needed for operation (IP address, time, requested page) for a short period under its own terms.",
          "To show the right language, the hosting provider determines your country from your IP address. We use the country only for this and do not store it.",
          "Legal basis: legitimate interest in operating the website securely (GDPR Art. 6(1)(f)).",
        ],
      },
      {
        heading: "4. Cookies",
        paragraphs: ["The website sets no cookies and uses no visitor tracking or advertising tools."],
      },
      {
        heading: "5. Processors",
        items: [`${c.host.name}: hosting and email delivery (USA), storage of offer requests (EU data storage)`],
        paragraphs: [
          "Transfers outside the United Kingdom and the European Economic Area are based on an adequacy decision (such as the EU–US Data Privacy Framework and its UK Extension) or on the applicable standard contractual clauses and UK international data transfer agreement.",
        ],
      },
      {
        heading: "6. Your rights",
        paragraphs: [
          "You may request access to, rectification or erasure of your personal data or restriction of its processing, object to processing, exercise your right to data portability and withdraw your consent at any time. Send your request to the email address above; we reply within one month.",
          `You may lodge a complaint with the UK supervisory authority: ${ico}. If you are in the European Union, you may also complain to the data protection supervisory authority of the country where you live or work; the list of national authorities is available from the European Data Protection Board: edpb.europa.eu/about-edpb/our-members_en. You may also take legal action if your rights are infringed.`,
        ],
      },
    ],
  },

  terms: {
    title: "Terms of use",
    description: `Terms for using the ${c.domain} website.`,
    sections: [
      {
        heading: "1. Scope",
        paragraphs: [
          `These terms apply to the use of the ${c.domain} website, operated by ${c.legalName} (${c.seat}; the Provider). By using the website you accept these terms.`,
        ],
      },
      {
        heading: "2. Website content",
        paragraphs: [
          "Information on the website is for general information only. The examples shown are illustrations and are not based on real customer data. Pilot targets are objectives, not guaranteed results.",
          "Content on the website is not a binding offer but an invitation to request one.",
        ],
      },
      {
        heading: "3. Offer requests and contracts",
        paragraphs: [
          "Submitting the offer form does not create a contract or any payment obligation. The Provider sends an individual offer; a contract is only formed by a separate written agreement between the parties.",
          "The Provider offers its services to businesses and organisations.",
        ],
      },
      {
        heading: "4. Liability",
        paragraphs: [
          "The Provider aims to keep the website accurate and up to date, but to the extent permitted by law is not liable for damage resulting from decisions based on its informational content.",
          "The Provider is not liable for damage resulting from the website being unavailable or from external attacks.",
        ],
      },
      {
        heading: "5. Intellectual property",
        paragraphs: [
          `Texts, graphics and the ${c.brand} and ${c.parentBrand} names and logo are the intellectual property of the Provider and may not be copied or used without its prior written permission.`,
        ],
      },
      {
        heading: "6. Privacy",
        paragraphs: ["The processing of personal data is described in the Privacy policy."],
      },
      {
        heading: "7. Governing law and changes",
        paragraphs: [
          "These terms are governed by the law of the United Kingdom as it applies in Scotland. The Provider may change these terms; changes take effect when published on the website.",
        ],
      },
    ],
  },

  imprint: {
    title: "Imprint",
    description: `Details of the operator of the ${c.domain} website.`,
    sections: [
      {
        heading: "Provider",
        items: [
          `Name: ${c.legalName}`,
          `Registered office: ${c.seat}`,
          `Company number (Companies House): ${c.registryNumber}`,
          `Registered in: ${c.registeredIn.en}`,
          `Represented by: ${c.representative}`,
          `Email: ${c.email}`,
          `Phone: ${c.phone}`,
        ],
      },
      {
        heading: "Hosting provider",
        items: [`Name: ${c.host.name}`, `Address: ${c.host.address}`],
      },
    ],
  },
};

export const legal: Record<Locale, Record<LegalDocId, LegalDoc>> = { hu, en };

export const isLegalDoc = (value: string): value is LegalDocId =>
  (legalDocIds as readonly string[]).includes(value);
