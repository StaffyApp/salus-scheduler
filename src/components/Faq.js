import React, { useState } from "react"
import useScrollReveal from "../hooks/useScrollReveal"
import { homeFaqItems } from "../seo/schema"
import "./Faq.scss"

const FaqRow = ({ q, a, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index
  const rowRef = useScrollReveal({ threshold: 0.1 })
  const panelId = `home-faq-panel-${index}`
  const buttonId = `home-faq-trigger-${index}`

  return (
    <li
      ref={rowRef}
      className={`faq-home__item reveal${isOpen ? " faq-home__item--open" : ""}`}
      style={{ transitionDelay: `${Math.min(index, 3) * 60}ms` }}
    >
      <h3 className="faq-home__heading">
        <button
          type="button"
          id={buttonId}
          className="faq-home__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenIndex(isOpen ? -1 : index)}
        >
          <span className="faq-home__question">{q}</span>
          <span className="faq-home__icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M4 7L9 12L14 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="faq-home__panel"
      >
        <div className="faq-home__panel-inner">
          <p className="faq-home__answer">{a}</p>
        </div>
      </div>
    </li>
  )
}

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(0)
  const labelRef = useScrollReveal()
  const titleRef = useScrollReveal()

  return (
    <section className="faq-home" id="faq">
      <div className="container">
        <div className="faq-home__header">
          <div className="section-label reveal" ref={labelRef}>
            FAQ
          </div>
          <h2 className="section-title reveal" ref={titleRef}>
            Frequently asked questions
          </h2>
        </div>

        <ol className="faq-home__list">
          {homeFaqItems.map(({ q, a }, i) => (
            <FaqRow
              key={i}
              index={i}
              q={q}
              a={a}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Faq
