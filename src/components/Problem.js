import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import "./Problem.scss"

const Problem = () => {
  const revealRef = useScrollReveal()

  return (
    <section className="problem" id="problem">
      <div className="container">
        <div className="problem__inner reveal" ref={revealRef}>
          <div className="problem__header">
            <span className="section-label">The Problem</span>
            <h2 className="section-title">Healthcare scheduling is broken.</h2>
          </div>

          <p className="problem__intro">
            The market has two types of tools:
          </p>

          <div className="problem__cards">
            <div className="problem__card">
              <div className="problem__card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" stroke="#1a2b3d" strokeWidth="1.5" />
                  <path d="M3 10H21M7 4V2M17 4V2" stroke="#1a2b3d" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Scheduling systems</h3>
              <p>
                Manage internal staff but hit a wall when shifts can't fill.
              </p>
            </div>
            <div className="problem__card">
              <div className="problem__card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="9" cy="8" r="3" stroke="#1a2b3d" strokeWidth="1.5" />
                  <circle cx="17" cy="10" r="2.5" stroke="#1a2b3d" strokeWidth="1.5" />
                  <path d="M3 20C3 16.69 5.69 14 9 14C12.31 14 15 16.69 15 20" stroke="#1a2b3d" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Staffing marketplaces</h3>
              <p>
                Supply external workers but have zero visibility into a facility's internal operations.
              </p>
            </div>
          </div>

          <div className="problem__gap">
            <div className="problem__gap-line" />
            <p className="problem__gap-text">
              <strong>Nobody connects both sides.</strong> That's the gap we solve.
            </p>
            <div className="problem__gap-line" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problem
