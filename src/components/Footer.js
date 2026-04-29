import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import useScrollReveal from "../hooks/useScrollReveal"
import "./Footer.scss"

const Footer = () => {
  const revealRef = useScrollReveal({ threshold: 0.1 })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top reveal-stagger" ref={revealRef}>
          <div className="footer__col footer__col--solutions reveal-child">
            <h4>Our solutions</h4>
            <ul>
              <li><a href="https://staffy.com/" target="_blank" rel="noopener noreferrer">Marketplace</a></li>
              <li><a href="https://salus.staffy.com/" target="_blank" rel="noopener noreferrer">Credential Management</a></li>
            </ul>
            <div className="footer__canada">
              <span>Proudly made in Canada</span>
              <StaticImage src="../images/flaf.webp" alt="Canadian flag" className="footer__canada-flag" loading="lazy" />
            </div>
          </div>

          <div className="footer__col reveal-child">
            <ul>
              <li><a href="https://staffy.com/find-talent" target="_blank" rel="noopener noreferrer">Find Talent</a></li>
              <li><a href="/#difference">About Us</a></li>
            </ul>
            <div className="footer__social">
              <a href="https://twitter.com/staffyapp" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/StaffyApp" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/staffyapp" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__col reveal-child">
            <ul>
              <li><a href="/faq">FAQ</a></li>
              <li><a href="/contact" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Contact</a></li>
              <li><a href="https://salus.staffy.com/#book" target="_blank" rel="noopener noreferrer">Book a demo</a></li>
            </ul>
          </div>

          <div className="footer__col footer__col--apps reveal-child">
            <h4>Mobile Apps</h4>
            <div className="footer__app-badges">
              <a href="https://apps.apple.com/us/app/staffy/id1133559351" target="_blank" rel="noopener noreferrer" className="footer__app-badge" aria-label="Download on the App Store">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <div>
                  <span className="footer__app-badge-label">Download on the</span>
                  <span className="footer__app-badge-store">App Store</span>
                </div>
              </a>
              <a href="https://play.google.com/store/apps/details?id=ca.staffy.app" target="_blank" rel="noopener noreferrer" className="footer__app-badge" aria-label="Get it on Google Play">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M3.18 23.71c.17.09.37.14.56.14.19 0 .37-.04.54-.14L17.6 16.3l-3.56-3.57L3.18 23.71zM20.16 10.13l-3.89-2.23-3.79 3.79 3.79 3.79 3.89-2.23c.74-.43.74-1.13 0-1.56v-1.56zM2.1 1.05C2.04 1.2 2 1.37 2 1.56v20.88c0 .19.04.36.1.51L13.44 11.6 2.1 1.05zM17.6 7.7L4.28.84c-.35-.2-.75-.2-1.1 0L14.04 11.6 17.6 7.7z" />
                </svg>
                <div>
                  <span className="footer__app-badge-label">GET IT ON</span>
                  <span className="footer__app-badge-store">Google Play</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Staffy Health. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
