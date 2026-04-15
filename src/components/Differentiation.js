import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import "./Differentiation.scss"

const items = [
  "Closed-loop workforce management",
  "Internal and external staffing in one workflow",
  "Real-time compliance enforcement",
  "Credential-aware scheduling",
  "Healthcare-specific design",
  "Automated shift fulfillment",
  "No agency coordination required",
]

const Differentiation = () => {
  const contentRef = useScrollReveal()
  const listRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section className="diff" id="difference">
      <div className="container">
        <div className="diff__inner">
          <div className="diff__content reveal" ref={contentRef}>
            <span className="section-label">Why Us</span>
            <h2 className="section-title">What makes this different</h2>
            <p className="diff__desc">
              Other tools solve one half of the problem. Staffy Workforce Scheduling
              is the only platform that connects internal scheduling with external
              workforce fulfillment — with compliance built in.
            </p>
          </div>
          <div className="diff__list reveal-stagger" ref={listRef}>
            {items.map((item, i) => (
              <div key={i} className="diff__item reveal-child">
                <div className="diff__item-check">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M4 8L7 11L12 5" stroke="#1a2b3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Differentiation
