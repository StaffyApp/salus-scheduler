// Canonical site origin for this product. The marketing site is hosted at the
// scheduling subdomain; salus.staffy.com is a SEPARATE product (Salus by Staffy,
// credential compliance) and must not be conflated here.
const SITE = "https://salusworkforcemanagement.staffy.com"

export const faqItems = [
  {
    q: "What is closed-loop workforce scheduling?",
    a: "Closed-loop workforce scheduling means internal scheduling and external staffing run inside one system. Facilities assign shifts to their own staff first. Any shift that does not fill cascades automatically to a vetted external workforce, with credentials verified before assignment. No separate tools, no phone calls, no blind handoff.",
  },
  {
    q: "How is this different from scheduling software like When I Work or Deputy?",
    a: "Generic scheduling tools manage your internal roster but stop at the wall when shifts cannot fill. Staffy Workforce Scheduling continues past that wall. Unfilled shifts cascade directly to a marketplace of 20,000+ pre-vetted healthcare workers, with credential checks built into the same workflow.",
  },
  {
    q: "How is this different from agency staffing marketplaces?",
    a: "Agency marketplaces supply external workers but have no view into your internal schedule. You end up scheduling in one tool and staffing in another. Staffy connects both so the same shift moves through one workflow.",
  },
  {
    q: "How does credential verification work?",
    a: "Every worker, internal or external, has license and background status tracked inside the platform. If a credential expires or a check is pending, the system blocks the worker and routes the shift to the next compliant professional automatically. Compliance is enforced before assignment, not after.",
  },
  {
    q: "Is it CBA-compliant?",
    a: "Yes. Scheduling rules around seniority, overtime, and shift allocation are baked into the assignment engine so the shift patterns you build respect the collective agreement in force at your facility.",
  },
  {
    q: "What types of facilities is this built for?",
    a: "Long-term care homes, retirement residences, hospitals, and homecare providers. Any healthcare operation that runs shift-based clinical and support roles and cannot afford an uncovered shift.",
  },
  {
    q: "How large is the external workforce pool?",
    a: "More than 20,000 vetted healthcare workers across Canada, each with verified credentials, reliability scoring, and shift history visible inside the Approved Talent directory.",
  },
  {
    q: "How do I get access?",
    a: "Staffy Workforce Scheduling is in beta. Request beta access from the site or book a demo with the sales team at info@staffy.com or +1 (647) 492-7823.",
  },
]

// Entity-led FAQ for the homepage (file 18). Each answer is self-contained so an
// AI engine can lift any one as a complete response. Includes the entity
// definition and the Staffy/Salus disambiguation that the AEO pass depends on.
export const homeFaqItems = [
  {
    q: "What is Staffy Workforce Scheduling?",
    a: "Staffy Workforce Scheduling is a closed-loop workforce management platform built for healthcare. Operators schedule their internal workers first, and any shifts that cannot be filled internally cascade automatically to Staffy's marketplace of more than 20,000 vetted workers. Every worker is credential-verified and every shift is compliant. It is made by Staffy, the Toronto-based healthcare and hospitality workforce marketplace founded in 2015, and is currently in beta.",
  },
  {
    q: "What does “closed-loop” mean?",
    a: "Closed-loop means internal scheduling and external marketplace staffing run on one platform. You schedule your own people first, in a way that is CBA-compliant, credential-aware, and based on worker preferences. When a shift cannot be filled by your internal team, it cascades automatically to Staffy's external marketplace instead of leaving you to phone an agency. Most tools do one side or the other. Staffy connects both.",
  },
  {
    q: "How is it different from a regular scheduling tool?",
    a: "A regular scheduling tool only manages the people you already employ. When you run short, you are on your own. Staffy Workforce Scheduling fills the gap automatically from a marketplace of more than 20,000 vetted workers, with credential verification enforced in the scheduling engine. It is the only platform that connects both internal scheduling and external marketplace staffing.",
  },
  {
    q: "Who is Staffy Workforce Scheduling for?",
    a: "It is built for long-term care homes, retirement homes, hospitals, and homecare organisations in Canada that manage internal staffing and also need a reliable way to cover unfilled shifts.",
  },
  {
    q: "Does it verify worker credentials?",
    a: "Yes. Credential verification is enforced inside the scheduling engine in real time. A worker cannot be scheduled or claim a cascaded shift unless their credentials are current and valid.",
  },
  {
    q: "Is Staffy Workforce Scheduling available now?",
    a: "It is in beta and accepting beta access requests through salusworkforcemanagement.staffy.com.",
  },
  {
    q: "How does it relate to Staffy and to Salus?",
    a: "Staffy Workforce Scheduling is made by Staffy and draws its overflow shifts from Staffy's marketplace of vetted workers. The credential verification it relies on is part of the same Staffy product family as Salus by Staffy, Staffy's dedicated credential compliance platform.",
  },
]

// Parent company. Canonical @id lives on staffy.com so this node resolves to the
// same entity referenced across the Staffy product family.
const parentOrganizationNode = {
  "@type": "Organization",
  "@id": "https://staffy.com/#organization",
  name: "Staffy",
  legalName: "Staffy Health Inc.",
  url: "https://staffy.com/",
  logo: "https://staffy.com/assets/staffy-logo.png",
  foundingDate: "2015",
  foundingLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Toronto",
      addressRegion: "ON",
      addressCountry: "CA",
    },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "485 Queen Street West, Suite 200",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5V 2A9",
    addressCountry: "CA",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: "+1-647-492-7823",
      email: "info@staffy.com",
      areaServed: "CA",
      availableLanguage: ["English", "French"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "info@staffy.com",
      areaServed: "CA",
    },
  ],
  sameAs: [
    "https://twitter.com/staffyapp",
    "https://www.facebook.com/StaffyApp",
    "https://www.linkedin.com/company/staffyapp",
    "https://apps.apple.com/us/app/staffy/id1133559351",
    "https://play.google.com/store/apps/details?id=ca.staffy.app",
  ],
}

// Product-level entity, explicitly bound to the parent company so AI engines
// attribute Staffy Workforce Scheduling to Staffy.
const organizationNode = {
  "@type": "Organization",
  "@id": `${SITE}/#organization`,
  name: "Staffy Workforce Scheduling",
  url: `${SITE}/`,
  description:
    "Staffy Workforce Scheduling is the closed-loop workforce management product of Staffy, a Canadian healthcare and hospitality workforce marketplace.",
  parentOrganization: { "@id": "https://staffy.com/#organization" },
  areaServed: { "@type": "Country", name: "Canada" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "485 Queen Street West, Suite 200",
    addressLocality: "Toronto",
    addressRegion: "ON",
    postalCode: "M5V 2A9",
    addressCountry: "CA",
  },
  sameAs: [
    "https://staffy.com",
    "https://www.linkedin.com/company/staffyapp",
  ],
}

const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE}/#website`,
  url: `${SITE}/`,
  name: "Staffy Workforce Scheduling",
  publisher: { "@id": `${SITE}/#organization` },
  inLanguage: "en-CA",
}

const softwareNode = {
  "@type": "SoftwareApplication",
  "@id": `${SITE}/#software`,
  name: "Staffy Workforce Scheduling",
  alternateName: ["Staffy Workforce Management", "Salus Workforce Management"],
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Workforce Management and Scheduling",
  operatingSystem: "Web, iOS, Android",
  url: `${SITE}/`,
  description:
    "A closed-loop workforce management platform for healthcare. Schedule internal staff first, automatically fill gaps from a marketplace of 20,000+ vetted workers, and verify credentials in real time before every assignment.",
  releaseNotes: "Currently in beta.",
  brand: { "@id": `${SITE}/#organization` },
  publisher: { "@id": "https://staffy.com/#organization" },
  audience: {
    "@type": "Audience",
    audienceType:
      "Healthcare facilities, long-term care homes, retirement residences, hospitals, homecare providers",
  },
  featureList: [
    "CBA-compliant internal scheduling",
    "Credential-aware shift assignment",
    "Preference-based shift allocation",
    "Automatic cascade to 20,000+ vetted external workers",
    "Real-time credential verification",
    "Automated license and background-check enforcement",
    "Approved talent directory with reliability scoring",
    "Worker mobile app for shift matching",
  ],
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "CAD",
    availability: "https://schema.org/PreOrder",
    description: "Join the beta program. Pricing available on request.",
    url: `${SITE}/#pilot`,
  },
}

// Homepage FAQPage — mirrors the visible homepage FAQ (homeFaqItems).
const homeFaqPageNode = {
  "@type": "FAQPage",
  "@id": `${SITE}/#faq`,
  isPartOf: { "@id": `${SITE}/#website` },
  inLanguage: "en-CA",
  mainEntity: homeFaqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

// /faq/ page FAQPage — mirrors the visible /faq/ list (faqItems).
const faqPageNode = {
  "@type": "FAQPage",
  "@id": `${SITE}/faq/#faq`,
  url: `${SITE}/faq/`,
  isPartOf: { "@id": `${SITE}/#website` },
  inLanguage: "en-CA",
  mainEntity: faqItems.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
}

export const homeSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    parentOrganizationNode,
    organizationNode,
    websiteNode,
    {
      "@type": "WebPage",
      "@id": `${SITE}/#webpage`,
      url: `${SITE}/`,
      name: "Healthcare Workforce Scheduling Platform | Staffy",
      description:
        "Closed-loop healthcare workforce scheduling. Fill every shift with credential-verified staff. Built for long-term care, hospitals, and homecare.",
      isPartOf: { "@id": `${SITE}/#website` },
      about: { "@id": `${SITE}/#software` },
      primaryImageOfPage: `${SITE}/social/workforce-scheduling-og.png`,
      inLanguage: "en-CA",
    },
    softwareNode,
    homeFaqPageNode,
  ],
}

export const faqSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    parentOrganizationNode,
    organizationNode,
    websiteNode,
    faqPageNode,
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQ",
          item: `${SITE}/faq/`,
        },
      ],
    },
  ],
}

export const contactSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    parentOrganizationNode,
    organizationNode,
    websiteNode,
    {
      "@type": "ContactPage",
      "@id": `${SITE}/contact/#contactpage`,
      url: `${SITE}/contact/`,
      name: "Contact | Staffy Workforce Scheduling",
      description:
        "Contact the Staffy Workforce Scheduling team. Email info@staffy.com or call +1 (647) 492-7823.",
      isPartOf: { "@id": `${SITE}/#website` },
      inLanguage: "en-CA",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: `${SITE}/contact/`,
        },
      ],
    },
  ],
}
