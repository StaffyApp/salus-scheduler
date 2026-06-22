import React, { useEffect, useRef } from "react"
import { StaticImage } from "gatsby-plugin-image"
import "./Hero.scss"

const Hero = ({ onOpenModal }) => {
  const visualRef = useRef(null)

  useEffect(() => {
    const el = visualRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (window.matchMedia("(max-width: 1024px)").matches) return

    let raf = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      targetX = (e.clientX - cx) / rect.width
      targetY = (e.clientY - cy) / rect.height
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const handleLeave = () => {
      targetX = 0
      targetY = 0
      if (!raf) raf = requestAnimationFrame(tick)
    }

    const tick = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      const rotY = currentX * 4
      const rotX = -currentY * 3
      const tz = 0
      el.style.setProperty("--parallax-rot-y", `${rotY.toFixed(2)}deg`)
      el.style.setProperty("--parallax-rot-x", `${rotX.toFixed(2)}deg`)
      el.style.setProperty("--parallax-tz", `${tz}px`)

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        raf = requestAnimationFrame(tick)
      } else {
        raf = 0
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    window.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseleave", handleLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

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
              healthcare, made by Staffy. Every worker verified. Every shift
              compliant.
            </p>
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--orange"
                onClick={onOpenModal}
              >
                Request Beta Access
              </button>
            </div>
          </div>

          <div className="hero__visual" ref={visualRef}>
            <div className="hero__tilt">
              <div className="mockup-frame">
                <div className="mockup-frame__bar" aria-hidden="true">
                  <span className="mockup-frame__dot" />
                  <span className="mockup-frame__dot" />
                  <span className="mockup-frame__dot" />
                </div>
                <div className="mockup-frame__media">
                  <StaticImage
                    src="../images/mockups/Untitled5.webp"
                    alt="Staffy Workforce Scheduling — April 2026 upcoming shifts calendar with staff-assigned shift pills across the month"
                    loading="eager"
                    fetchpriority="high"
                  />
                </div>
              </div>
              <div
                className="hero__kpi-overlay"
                aria-label="Workforce KPIs at a glance"
              >
                <StaticImage
                  src="../images/mockups/kpi-summary.webp"
                  alt="KPI summary — 9 unfilled requests, 6 filled, 0 completed, 27 total shifts"
                  loading="eager"
                  fetchpriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
