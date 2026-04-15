import React from "react"
import "./Hero.scss"

const Hero = ({ onOpenModal }) => {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <h1 className="hero__title">
          Schedule your people first.
          <br />
          Fill the rest with ours.
        </h1>
        <p className="hero__subtitle hero-enter hero-enter--2">
          A closed-loop workforce management platform built specifically for
          healthcare. Every worker verified. Every shift compliant.
        </p>
        <div className="hero__actions hero-enter hero-enter--3">
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
            className="btn btn--dark"
          >
            Book a Demo
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
