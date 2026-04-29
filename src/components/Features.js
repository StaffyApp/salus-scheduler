import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useScrollReveal from "../hooks/useScrollReveal"
import "./Features.scss"

const features = [
  {
    number: "01",
    title: "Internal Scheduling First",
    description:
      "Facilities schedule their own staff first using a system that is CBA-compliant, credential-aware, and preference-based — built specifically for healthcare.",
    details: [
      "CBA-compliant scheduling",
      "Credential-aware assignments",
      "Preference-based shift allocation",
      "One platform — not stitched-together tools",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 10H21M7 4V2M17 4V2M7 14H10M7 17H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Automatic External Fill",
    description:
      "When a shift doesn't fill internally, it automatically cascades to Staffy's marketplace of 20,000+ vetted healthcare workers.",
    details: [
      "No phone calls",
      "No agency negotiations",
      "No separate workflow",
      "Automatic cascade to vetted workers",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 20C3 16.69 5.69 14 9 14C12.31 14 15 16.69 15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 8V14M15 11H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Real-Time Credential Verification",
    description:
      "Every worker on every shift is credential-verified before assignment. If a credential expires or a background check is pending, the system automatically blocks the worker and assigns the next compliant professional.",
    details: [
      "Automated license checks",
      "Background verification enforcement",
      "Auto-block non-compliant workers",
      "Compliance built into the scheduling engine",
    ],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L4 7V12C4 17.52 7.58 22.74 12 24C16.42 22.74 20 17.52 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const Features = () => {
  const headerRef = useScrollReveal()
  const gridRef = useScrollReveal({ threshold: 0.1 })
  const showcaseRef = useScrollReveal()

  return (
    <section className="features" id="features">
      <div className="container">
        <div className="features__header reveal" ref={headerRef}>
          <h2 className="section-title">How it works</h2>
          <p className="section-subtitle">
            A complete system that prioritizes your team, fills gaps automatically,
            and ensures every worker is qualified.
          </p>
        </div>

        <div className="features__grid reveal-stagger" ref={gridRef}>
          {features.map((feature, index) => (
            <div key={index} className="features__card reveal-child">
              <div className="features__card-top">
                <div className="features__card-icon">{feature.icon}</div>
                <span className="features__card-number">{feature.number}</span>
              </div>
              <h3 className="features__card-title">{feature.title}</h3>
              <p className="features__card-desc">{feature.description}</p>
              <ul className="features__card-list">
                {feature.details.map((detail, i) => (
                  <li key={i}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M3 7L6 10L11 4" stroke="#1a2b3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container container--wide">
        <div className="features__showcase reveal" ref={showcaseRef}>
          <p className="features__showcase-caption">
            Workers see every matching shift on their phone — in one tap
          </p>
          <div className="features__phone-trio">
            <div className="phone-frame">
              <StaticImage
                src="../images/mockups/b3.webp"
                alt="Worker profile menu — reliability score, lifetime shift count and navigation"
                loading="lazy"
              />
            </div>
            <div className="phone-frame">
              <StaticImage
                src="../images/mockups/b2.webp"
                alt="Shift detail modal — full shift context with Apply to this shift action"
                loading="lazy"
              />
            </div>
            <div className="phone-frame">
              <StaticImage
                src="../images/mockups/b1.webp"
                alt="Available Shifts feed on the worker mobile app — matching roles, distances and pay appear automatically"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features
