import React from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import "./PilotCTA.scss"

const PilotCTA = ({ onOpenModal }) => {
  const revealRef = useScrollReveal()

  return (
    <section className="pilot-cta" id="pilot">
      <div className="container">
        <div className="pilot-cta__inner reveal" ref={revealRef}>
          <span className="pilot-cta__label">Beta Program</span>
          <h2 className="pilot-cta__title">Join the beta program</h2>
          <p className="pilot-cta__desc">
            We're launching Staffy Workforce Scheduling with select healthcare
            partners. Participate in the beta to help shape the future of
            workforce management.
          </p>
          <div className="pilot-cta__actions">
            <button
              type="button"
              className="btn btn--orange"
              onClick={onOpenModal}
            >
              Request Beta Access
            </button>
            <a href="/contact" className="pilot-cta__contact">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PilotCTA
