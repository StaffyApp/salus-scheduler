import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Problem from "../components/Problem"
import Solution from "../components/Solution"
import Features from "../components/Features"
import Workforce from "../components/Workforce"
import Differentiation from "../components/Differentiation"
import UseCase from "../components/UseCase"
import PilotCTA from "../components/PilotCTA"
import Footer from "../components/Footer"
import PilotModal from "../components/PilotModal"
import { homeSchemaGraph } from "../seo/schema"

const IndexPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar onOpenModal={() => setModalOpen(true)} />
      <Hero onOpenModal={() => setModalOpen(true)} />
      <Problem />
      <Solution />
      <Features />
      <Workforce />
      <Differentiation />
      <UseCase />
      <PilotCTA onOpenModal={() => setModalOpen(true)} />
      <Footer />
      <PilotModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1a2b3d" />

    <title>Healthcare Workforce Scheduling Platform | Staffy</title>
    <meta
      name="description"
      content="Closed-loop healthcare workforce scheduling. Fill every shift with credential-verified staff. Built for long-term care, hospitals, and homecare. Book a demo."
    />
    <link rel="canonical" href="https://salus.staffy.com/" />
    <meta name="robots" content="index, follow, max-image-preview:large" />

    <link rel="icon" type="image/webp" href="/favicon.webp" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Staffy" />
    <meta property="og:url" content="https://salus.staffy.com/" />
    <meta property="og:title" content="Healthcare Workforce Scheduling Platform | Staffy" />
    <meta
      property="og:description"
      content="Schedule internal staff first. Fill gaps automatically with 20,000+ vetted healthcare workers. Every shift credential-verified."
    />
    <meta property="og:image" content="https://salus.staffy.com/social/workforce-scheduling-og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="Staffy Workforce Scheduling dashboard showing the April 2026 calendar, filled and unfilled shifts, and KPI tiles"
    />
    <meta property="og:locale" content="en_CA" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@staffyapp" />
    <meta name="twitter:title" content="Healthcare Workforce Scheduling Platform | Staffy" />
    <meta
      name="twitter:description"
      content="Schedule internal staff first. Fill gaps automatically with 20,000+ vetted workers. Every shift credential-verified."
    />
    <meta name="twitter:image" content="https://salus.staffy.com/social/workforce-scheduling-og.png" />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchemaGraph) }}
    />
  </>
)
