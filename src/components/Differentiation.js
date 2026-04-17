import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import ongoingImg from "../images/mockups/Untitled6.png"
import "./Differentiation.scss"

const items = [
  {
    title: "Closed-loop workforce management",
    detail: "Schedule, fill, and verify in one system.",
  },
  {
    title: "Internal and external staffing in one workflow",
    detail: "No switching tools when shifts cascade externally.",
  },
  {
    title: "Real-time compliance enforcement",
    detail: "Expired credentials are blocked before assignment.",
  },
  {
    title: "Healthcare-specific design",
    detail: "Built around CBA rules, credentials, and unit coverage.",
  },
  {
    title: "Automated shift fulfillment",
    detail: "No phone calls, no agency negotiations.",
  },
]

const Differentiation = () => {
  const headerRef = useScrollReveal()
  const visualRef = useScrollReveal()
  const listRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section className="diff" id="difference">
      <div className="container">
        <div className="diff__header reveal" ref={headerRef}>
          <span className="section-label">Why Us</span>
          <h2 className="section-title">What makes this different</h2>
          <p className="section-subtitle">
            Other tools solve one half of the problem. Staffy Workforce Scheduling
            is the only platform that connects internal scheduling with external
            workforce fulfillment — with compliance built in.
          </p>
        </div>

        <div className="diff__body">
          <div className="diff__visual reveal" ref={visualRef}>
            <div className="mockup-frame">
              <div className="mockup-frame__bar" aria-hidden="true">
                <span className="mockup-frame__dot" />
                <span className="mockup-frame__dot" />
                <span className="mockup-frame__dot" />
              </div>
              <div className="mockup-frame__media">
                <img
                  src={ongoingImg}
                  alt="Ongoing Shifts detail — a Friday registered-nurse shift with the hired contractor's 88 reliability score, attendance status, late-arrival counts and contractor details"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <ul className="diff__list reveal-stagger" ref={listRef}>
            {items.map((item, i) => (
              <li key={i} className="diff__item reveal-child">
                <div className="diff__item-check" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 8L7 11L12 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="diff__item-text">
                  <strong>{item.title}</strong>
                  <small>{item.detail}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Differentiation
