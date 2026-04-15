import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PilotModal from "../components/PilotModal"
import "./contact.scss"

const ContactPage = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Contact Information */}
      <section className="contact-info">
        <div className="contact-info__grid">
          <div className="contact-info__intro">
            <h2 className="contact-info__heading">Contact Information</h2>
            <p className="contact-info__description">
              We'd love to hear from you! Whether you're interested in learning
              more about Salus, requesting a demo, or have questions about our
              platform, our team is here to help.
            </p>
          </div>

          <div className="contact-info__details">
            <div className="contact-info__block">
              <h3 className="contact-info__subheading">Get in Touch</h3>
              <p>
                <strong>Email:</strong> info@staffy.com{" "}
                <strong>Phone:</strong> +1 (647) 492-7823{" "}
                <strong>Address:</strong> 485 Queen Street West, Suite 200,
                Toronto, ON, Canada M5V 2A9
              </p>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__subheading">Business Hours</h3>
              <p>
                <strong>Monday to Friday:</strong> 9:00 AM — 6:00 PM Eastern
                Time <strong>Holiday Schedule:</strong> Closed on Canadian
                statutory holidays <strong>Response Time:</strong> We strive to
                respond to all inquiries within one business day
              </p>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__subheading">Support Services</h3>
              <p>Our dedicated support team is available to assist with:</p>
              <ul className="contact-info__list">
                <li>Platform demonstrations and product tours</li>
                <li>Onboarding assistance for new organizations</li>
                <li>Technical support and troubleshooting</li>
                <li>Custom configuration and integration guidance</li>
                <li>Training resources and best practices</li>
                <li>Pricing and subscription inquiries</li>
              </ul>
            </div>

            <div className="contact-info__block">
              <h3 className="contact-info__subheading">Connect With Us Online</h3>
              <p>
                <strong>Website:</strong> salus.staffy.com
              </p>
              <p>
                You can also fill out the contact form on our website, and a
                member of our team will reach out to you promptly with more
                information tailored to your organization's specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <PilotModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </main>
  )
}

export default ContactPage

export const Head = () => (
  <>
    <title>Contact | Salus Workforce Scheduling</title>
    <meta
      name="description"
      content="Get in touch with the Salus Scheduling team. We're here to answer your questions about healthcare workforce management."
    />
  </>
)
