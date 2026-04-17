import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import availableShiftsImg from "../images/mockups/b1.png"
import "./UseCase.scss"

const UseCase = () => {
  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()
  const cardRef = useScrollReveal({ threshold: 0.1 })
  const deviceRef = useScrollReveal({ threshold: 0.1 })

  return (
    <section className="use-case" id="use-case">
      <div className="container">
        <div className="use-case__inner">
          <div className="section-label reveal" ref={labelRef}>
            Use Case
          </div>
          <h2 className="section-title reveal" ref={titleRef}>
            Built for real healthcare operations
          </h2>

          <div className="use-case__layout">
            <div className="use-case__card reveal" ref={cardRef}>
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

            <div
              className="use-case__device reveal"
              aria-label="Worker-side mobile app"
              ref={deviceRef}
            >
              <div className="phone-frame">
                <img
                  src={availableShiftsImg}
                  alt="Available shifts feed on the worker mobile app — new shifts matching the worker's profile appear automatically"
                  loading="lazy"
                />
              </div>

              <div className="stat-card" aria-hidden="true">
                <div className="stat-card__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="stat-card__value">New shift match</div>
                  <div className="stat-card__label">Sent to verified workers</div>
                </div>
              </div>

              <div className="stat-card stat-card--bottom" aria-hidden="true">
                <div className="stat-card__icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3L4 7v5c0 5.5 3.6 10.7 8 12 4.4-1.3 8-6.5 8-12V7l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <div className="stat-card__value">Credential verified</div>
                  <div className="stat-card__label">Before every assignment</div>
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
