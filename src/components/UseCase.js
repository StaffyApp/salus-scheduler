import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import "./UseCase.scss"

const UseCase = () => {
  const revealRef = useScrollReveal()

  return (
    <section className="use-case" id="use-case">
      <div className="container">
        <div className="use-case__inner reveal" ref={revealRef}>
          <div className="section-label">Use Case</div>
          <h2 className="section-title">Built for real healthcare operations</h2>

          <div className="use-case__card">
            <div className="use-case__card-header">
              <div className="use-case__card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M3 9L12 2L21 9V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3>Long-Term Care Facility</h3>
            </div>

            <div className="use-case__steps">
              <div className="use-case__steps-line" aria-hidden="true" />
              <div className="use-case__step">
                <div className="use-case__step-num">1</div>
                <div className="use-case__step-content">
                  <h4>Schedule internal staff first</h4>
                  <p>
                    The facility uses Staffy Workforce Scheduling to assign shifts to
                    their existing workforce based on availability, credentials, and
                    CBA rules.
                  </p>
                </div>
              </div>
              <div className="use-case__step">
                <div className="use-case__step-num">2</div>
                <div className="use-case__step-content">
                  <h4>Gaps cascade automatically</h4>
                  <p>
                    When coverage gaps remain, unfilled shifts automatically cascade
                    to Staffy's marketplace of 20,000+ vetted external workers.
                  </p>
                </div>
              </div>
              <div className="use-case__step">
                <div className="use-case__step-num">3</div>
                <div className="use-case__step-content">
                  <h4>Every assignment is verified</h4>
                  <p>
                    Every worker — internal or external — is verified for compliance
                    before the assignment is confirmed. No exceptions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UseCase
