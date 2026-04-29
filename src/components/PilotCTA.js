import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useScrollReveal from "../hooks/useScrollReveal"
import "./PilotCTA.scss"

const PilotCTA = ({ onOpenModal }) => {
  const revealRef = useScrollReveal()
  const visualRef = useScrollReveal()

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

          <div
            className="pilot-cta__visual reveal"
            aria-label="Sign in on desktop or mobile"
            ref={visualRef}
          >
            <div className="pilot-cta__desktop">
              <div className="mockup-frame">
                <div className="mockup-frame__bar" aria-hidden="true">
                  <span className="mockup-frame__dot" />
                  <span className="mockup-frame__dot" />
                  <span className="mockup-frame__dot" />
                </div>
                <div className="mockup-frame__media">
                  <StaticImage
                    src="../images/mockups/login-desktop.webp"
                    alt="Sign in to Staffy Workforce Scheduling — brand panel on the left with the tagline 'Making a Difference', sign-in form on the right"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <div className="pilot-cta__phone-float" aria-hidden="true">
              <div className="phone-frame">
                <StaticImage
                  src="../images/mockups/login-mobile.webp"
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PilotCTA
