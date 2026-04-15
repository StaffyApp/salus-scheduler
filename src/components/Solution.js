import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import "./Solution.scss"

const Solution = () => {
  const revealRef = useScrollReveal()

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
    </section>
  )
}

export default Solution
