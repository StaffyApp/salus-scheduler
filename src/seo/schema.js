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

const organizationNode = {
  "@type": "Organization",
  "@id": "https://salus.staffy.com/#organization",
  name: "Staffy",
  legalName: "Staffy Health Inc.",
  url: "https://salus.staffy.com/",
  logo: "https://salus.staffy.com/staffy-logo.png",
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

const websiteNode = {
  "@type": "WebSite",
  "@id": "https://salus.staffy.com/#website",
  url: "https://salus.staffy.com/",
  name: "Staffy",
  publisher: { "@id": "https://salus.staffy.com/#organization" },
  inLanguage: "en-CA",
}

const softwareNode = {
  "@type": "SoftwareApplication",
  "@id": "https://salus.staffy.com/#software",
  name: "Staffy Workforce Scheduling",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Healthcare Workforce Management",
  operatingSystem: "Web, iOS, Android",
  url: "https://salus.staffy.com/",
  description:
    "A closed-loop workforce management platform for healthcare. Schedule internal staff first, automatically fill gaps from a marketplace of 20,000+ vetted workers, and verify credentials in real time before every assignment.",
  brand: { "@id": "https://salus.staffy.com/#organization" },
  publisher: { "@id": "https://salus.staffy.com/#organization" },
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
    url: "https://salus.staffy.com/#pilot",
  },
}

export const homeSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    {
      "@type": "WebPage",
      "@id": "https://salus.staffy.com/#webpage",
      url: "https://salus.staffy.com/",
      name: "Healthcare Workforce Scheduling Platform | Staffy",
      description:
        "Closed-loop healthcare workforce scheduling. Fill every shift with credential-verified staff. Built for long-term care, hospitals, and homecare.",
      isPartOf: { "@id": "https://salus.staffy.com/#website" },
      about: { "@id": "https://salus.staffy.com/#software" },
      primaryImageOfPage:
        "https://salus.staffy.com/social/workforce-scheduling-og.png",
      inLanguage: "en-CA",
    },
    softwareNode,
  ],
}

export const faqSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    {
      "@type": "FAQPage",
      "@id": "https://salus.staffy.com/faq/#faq",
      url: "https://salus.staffy.com/faq/",
      isPartOf: { "@id": "https://salus.staffy.com/#website" },
      inLanguage: "en-CA",
      mainEntity: faqItems.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://salus.staffy.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "FAQ",
          item: "https://salus.staffy.com/faq/",
        },
      ],
    },
  ],
}

export const contactSchemaGraph = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    {
      "@type": "ContactPage",
      "@id": "https://salus.staffy.com/contact/#contactpage",
      url: "https://salus.staffy.com/contact/",
      name: "Contact | Staffy Workforce Scheduling",
      description:
        "Contact the Staffy Workforce Scheduling team. Email info@staffy.com or call +1 (647) 492-7823.",
      isPartOf: { "@id": "https://salus.staffy.com/#website" },
      inLanguage: "en-CA",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://salus.staffy.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: "https://salus.staffy.com/contact/",
        },
      ],
    },
  ],
}
