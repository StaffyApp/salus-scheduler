import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useScrollReveal from "../hooks/useScrollReveal"
import useCountUp from "../hooks/useCountUp"
import "./Workforce.scss"

const Workforce = () => {
  const headerRef = useScrollReveal()
  const visualRef = useScrollReveal()
  const [countRef, count] = useCountUp(20000)

  return (
    <section className="workforce" id="workforce">
      <div className="container">
        <div className="workforce__header reveal" ref={headerRef}>
          <span className="section-label">Verified Workforce</span>
          <h2 className="section-title">Every worker, vetted and on file.</h2>
          <p className="section-subtitle">
            Browse an approved roster with reliability ratings, shift history,
            suspension signals, and credential status — all in one view.
            No spreadsheets. No agency intermediaries.
          </p>
        </div>
      </div>
      <div className="container container--wide">
        <div className="workforce__visual reveal" ref={visualRef}>
          <div className="mockup-frame mockup-frame--crop-left">
            <div className="mockup-frame__bar" aria-hidden="true">
              <span className="mockup-frame__dot" />
              <span className="mockup-frame__dot" />
              <span className="mockup-frame__dot" />
            </div>
            <div className="mockup-frame__media">
              <StaticImage
                src="../images/mockups/main.webp"
                alt="Approved Talent directory — a table of vetted healthcare workers with shift counts, acceptance rate, reliability rating, and credential status"
                loading="lazy"
              />
            </div>
          </div>

          <div className="stat-card stat-card--top" aria-hidden="true" ref={countRef}>
            <div className="stat-card__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L4 7v5c0 5.5 3.6 10.7 8 12 4.4-1.3 8-6.5 8-12V7l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <div className="stat-card__value">{count.toLocaleString()}+</div>
              <div className="stat-card__label">Vetted healthcare workers</div>
            </div>
          </div>

          <div className="stat-card stat-card--bottom" aria-hidden="true">
            <div className="stat-card__icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 12a9 9 0 1018 0 9 9 0 00-18 0z" stroke="currentColor" strokeWidth="2" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="stat-card__value">Live reliability</div>
              <div className="stat-card__label">Updated every shift</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Workforce
