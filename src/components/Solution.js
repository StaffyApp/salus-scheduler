import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useScrollReveal from "../hooks/useScrollReveal"
import "./Solution.scss"

const Solution = () => {
  const revealRef = useScrollReveal()
  const visualRef = useScrollReveal()

  return (
    <section className="solution" id="solution">
      <div className="container">
        <div className="solution__inner reveal" ref={revealRef}>
          <div className="section-label">The Solution</div>
          <h2 className="section-title">
            One platform. One workflow. Fully connected staffing.
          </h2>
          <p className="section-subtitle">
            Staffy Workforce Scheduling is a closed-loop workforce management
            platform built specifically for healthcare facilities — including
            long-term care, retirement homes, hospitals, and homecare organizations.
          </p>
        </div>
      </div>
      <div className="container container--wide">
        <div className="solution__visual reveal" ref={visualRef}>
          <div className="mockup-frame">
            <div className="mockup-frame__bar" aria-hidden="true">
              <span className="mockup-frame__dot" />
              <span className="mockup-frame__dot" />
              <span className="mockup-frame__dot" />
            </div>
            <div className="mockup-frame__media">
              <StaticImage
                src="../images/mockups/Untitled10.webp"
                alt="Schedule and broadcast a shift — single-day, multi-day and recurring options, month calendars, start and end times, unpaid break, broadcast to team and shift notes"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Solution
