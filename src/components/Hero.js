import React from "react"
import calendarImg from "../images/mockups/Untitled5.png"
import kpiImg from "../images/mockups/Screenshot 2026-04-17 102152.png"
import "./Hero.scss"

const Hero = ({ onOpenModal }) => {
  return (
    <section className="hero">
      <div className="container container--wide">
        <div className="hero__layout">
          <div className="hero__content">
            <h1 className="hero__title">
              Schedule your people first.
              <br />
              Fill the rest with ours.
            </h1>
            <p className="hero__subtitle">
              A closed-loop workforce management platform built specifically for
              healthcare. Every worker verified. Every shift compliant.
            </p>
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--orange"
                onClick={onOpenModal}
              >
                Request Beta Access
              </button>
              <a
                href="https://salus.staffy.com/#book"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__secondary-link"
              >
                Or book a demo →
              </a>
            </div>
          </div>

          <div className="hero__visual">
            <div className="mockup-frame">
              <div className="mockup-frame__bar" aria-hidden="true">
                <span className="mockup-frame__dot" />
                <span className="mockup-frame__dot" />
                <span className="mockup-frame__dot" />
              </div>
              <div className="mockup-frame__media">
                <img
                  src={calendarImg}
                  alt="Staffy Workforce Scheduling — April 2026 upcoming shifts calendar with staff-assigned shift pills across the month"
                  loading="eager"
                />
              </div>
            </div>
            <div
              className="hero__kpi-overlay"
              aria-label="Workforce KPIs at a glance"
            >
              <img
                src={kpiImg}
                alt="KPI summary — 9 unfilled requests, 6 filled, 0 completed, 27 total shifts"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
