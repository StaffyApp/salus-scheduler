import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import "./Navbar.scss"

const Navbar = ({ onOpenModal }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    let ticking = false
    const update = () => {
      setScrolled(window.scrollY > 10)
      const sections = ["solution", "features", "use-case", "difference"]
      let current = ""
      let minDistance = Infinity
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const top = el.getBoundingClientRect().top
        if (top <= 150 && Math.abs(top) < minDistance) {
          minDistance = Math.abs(top)
          current = id
        }
      }
      setActiveTab(current)
      ticking = false
    }
    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
      role="navigation"
      aria-label="Primary navigation"
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="Go to homepage">
          <StaticImage
            src="../images/logo-v3.webp"
            alt="Staffy Health + Hospitality — Made in Canada"
            className="navbar__logo-img"
            loading="eager"
            placeholder="none"
          />
        </Link>

        <button
          type="button"
          className={`navbar__hamburger ${mobileOpen ? "active" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          aria-controls="navbar-menu"
        >
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <>
              <span /><span /><span />
            </>
          )}
        </button>

        <div id="navbar-menu" className={`navbar__menu ${mobileOpen ? "navbar__menu--open" : ""}`}>
          <ul className="navbar__links">
            <li><a href="/#solution" className={activeTab === "solution" ? "active" : ""} onClick={() => setMobileOpen(false)}>Solutions</a></li>
            <li><a href="/#features" className={activeTab === "features" ? "active" : ""} onClick={() => setMobileOpen(false)}>How it works</a></li>
            <li><a href="/#difference" className={activeTab === "difference" ? "active" : ""} onClick={() => setMobileOpen(false)}>Why Us</a></li>
            <li><a href="/#use-case" className={activeTab === "use-case" ? "active" : ""} onClick={() => setMobileOpen(false)}>Use Cases</a></li>
            <li className="navbar__mobile-only"><a href="/contact" onClick={() => setMobileOpen(false)}>Contact</a></li>
            <li className="navbar__mobile-only"><a href="/faq" onClick={() => setMobileOpen(false)}>FAQ</a></li>
          </ul>
          <div className="navbar__actions">
            <a
              href="https://app.salus.staffy.com/login"
              className="navbar__link-cta"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </a>
            <a
              href="https://salus.staffy.com/#book"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--orange navbar__btn"
              onClick={() => setMobileOpen(false)}
            >
              <span className="navbar__btn-main">Book a demo</span>
              <span className="navbar__btn-sub">Facilities</span>
            </a>
            <a
              href="https://staffy.com/app"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--dark navbar__btn"
              onClick={() => setMobileOpen(false)}
            >
              <span className="navbar__btn-main">Download app</span>
              <span className="navbar__btn-sub">Professionals</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
