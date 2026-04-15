import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import Problem from "../components/Problem"
import Solution from "../components/Solution"
import Features from "../components/Features"
import Differentiation from "../components/Differentiation"
import UseCase from "../components/UseCase"
import PilotCTA from "../components/PilotCTA"
import Footer from "../components/Footer"
import PilotModal from "../components/PilotModal"

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
    <title>Staffy Workforce Scheduling | Healthcare Workforce Management</title>
    <meta
      name="description"
      content="Schedule your people first. Fill the rest with ours. A closed-loop workforce management platform built specifically for healthcare. Every worker verified. Every shift compliant."
    />
  </>
)
