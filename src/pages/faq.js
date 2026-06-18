import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PilotModal from "../components/PilotModal"
import useScrollReveal from "../hooks/useScrollReveal"
import { faqItems, faqSchemaGraph } from "../seo/schema"
import "./faq.scss"

const FaqItem = ({ q, a, index, openIndex, setOpenIndex }) => {
  const isOpen = openIndex === index
  const itemRef = useScrollReveal({ threshold: 0.1 })
  const panelId = `faq-panel-${index}`
  const buttonId = `faq-trigger-${index}`

  return (
    <li
      ref={itemRef}
      className={`faq__item reveal${isOpen ? " faq__item--open" : ""}`}
      style={{ transitionDelay: `${Math.min(index, 3) * 60}ms` }}
    >
      <h2 className="faq__heading">
        <button
          type="button"
          id={buttonId}
          className="faq__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setOpenIndex(isOpen ? -1 : index)}
        >
          <span className="faq__question">{q}</span>
          <span className="faq__icon" aria-hidden="true">
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
      </h2>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className="faq__panel"
      >
        <div className="faq__panel-inner">
          <p className="faq__answer">{a}</p>
        </div>
      </div>
    </li>
  )
}

const FaqPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(0)
  const headerRef = useScrollReveal({ threshold: 0.2 })

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <section className="faq">
        <div className="container">
          <header ref={headerRef} className="faq__header reveal">
            <span className="section-label">FAQ</span>
            <h1 className="faq__title">Frequently asked questions</h1>
            <p className="faq__subtitle">
              Answers to the most common questions about Staffy Workforce
              Scheduling. Can't find what you're looking for?{" "}
              <a href="/contact">Contact us</a>.
            </p>
          </header>

          <ol className="faq__list">
            {faqItems.map(({ q, a }, i) => (
              <FaqItem
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
      <Footer />
      <PilotModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

export default FaqPage

export const Head = () => (
  <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1a2b3d" />

    <title>FAQ — Staffy Workforce Scheduling</title>
    <meta
      name="description"
      content="Answers about Staffy Workforce Scheduling: closed-loop scheduling, credential verification, CBA compliance, and the 20,000+ vetted healthcare workforce"
    />
    <link rel="canonical" href="https://salusworkforcemanagement.staffy.com/faq/" />
    <meta name="robots" content="index, follow, max-image-preview:large" />

    <link rel="icon" type="image/webp" href="/favicon.webp" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Staffy" />
    <meta property="og:url" content="https://salusworkforcemanagement.staffy.com/faq/" />
    <meta property="og:title" content="FAQ — Staffy Workforce Scheduling" />
    <meta
      property="og:description"
      content="Closed-loop healthcare workforce scheduling — answers to the most common questions."
    />
    <meta property="og:image" content="https://salusworkforcemanagement.staffy.com/social/workforce-scheduling-og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="Staffy Workforce Scheduling — frequently asked questions"
    />
    <meta property="og:locale" content="en_CA" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@staffyapp" />
    <meta name="twitter:title" content="FAQ — Staffy Workforce Scheduling" />
    <meta
      name="twitter:description"
      content="Closed-loop healthcare workforce scheduling — answers to the most common questions."
    />
    <meta name="twitter:image" content="https://salusworkforcemanagement.staffy.com/social/workforce-scheduling-og.png" />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaGraph) }}
    />
  </>
)
