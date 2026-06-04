import React, { useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PilotModal from "../components/PilotModal"
import useScrollReveal from "../hooks/useScrollReveal"
import { contactSchemaGraph } from "../seo/schema"
import "./contact.scss"

// AJAX target for gatsby runtime; the same URL handles the JS-stripped
// standalone build's regular form POST (it honors the hidden `_next` field).
// Configure host with GATSBY_STAFFY_API_BASE.
const STAFFY_API_BASE =
  process.env.GATSBY_STAFFY_API_BASE || "https://api.staffy.com"
const SALUS_LEAD_ENDPOINT = `${STAFFY_API_BASE}/api/salus-leads`

function validateFields(data) {
  const errors = {}
  if (!data.firstName.trim()) errors.firstName = "First name is required"
  else if (!/^[A-Za-z\s\-.']{1,60}$/.test(data.firstName.trim()))
    errors.firstName = "Please enter a valid first name"
  if (!data.lastName.trim()) errors.lastName = "Last name is required"
  else if (!/^[A-Za-z\s\-.']{1,60}$/.test(data.lastName.trim()))
    errors.lastName = "Please enter a valid last name"
  if (!data.email.trim()) errors.email = "Email is required"
  else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email.trim()))
    errors.email = "Please enter a valid email address"
  if (!data.phone.trim()) errors.phone = "Phone number is required"
  else if (!/^[\d\s()+\-.]{7,20}$/.test(data.phone.trim()))
    errors.phone = "Please enter a valid phone number"
  return errors
}

const ContactPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const introRef = useScrollReveal({ threshold: 0.15 })
  const formRef = useScrollReveal({ threshold: 0.1 })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleBlur = (e) => {
    const { name } = e.target
    const errors = validateFields(formData)
    if (errors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: errors[name] }))
    } else {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError("")
    const errors = validateFields(formData)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    setSubmitting(true)

    const payload = {
      type: "contact",
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      source: "salusworkforcemanagement.staffy.com/contact",
    }

    try {
      const res = await fetch(SALUS_LEAD_ENDPOINT, {
        method: "POST",
        mode: "cors",
        referrerPolicy: "origin",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitted(true)
      setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "" })
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* Contact Information + Form */}
      <section className="contact-info">
        <div className="contact-info__grid">
          <div ref={introRef} className="contact-info__intro reveal">
            <h2 className="contact-info__heading">Contact Us</h2>
            <p className="contact-info__description">
              We'd love to hear from you! Whether you're interested in learning
              more about Salus, requesting a demo, or have questions about our
              platform, our team is here to help.
            </p>
            <div className="contact-info__meta">
              <p>
                <strong>Email:</strong> info@staffy.com
              </p>
              <p>
                <strong>Phone:</strong> +1 (647) 492-7823
              </p>
              <p>
                <strong>Address:</strong> 485 Queen Street West, Suite 200,
                Toronto, ON, Canada M5V 2A9
              </p>
            </div>
          </div>

          <div ref={formRef} className="contact-info__form-wrap reveal reveal--delay-2">
            {submitted ? (
              <div className="contact-info__success" aria-live="polite">
                <div className="contact-info__success-icon">
                  <svg width="56" height="56" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                    <circle className="contact-info__success-circle" cx="24" cy="24" r="22" stroke="#10B981" strokeWidth="2" fill="#10B981" fillOpacity="0.12" />
                    <path className="contact-info__success-check" d="M16 24L22 30L32 18" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3>Message received</h3>
                <p>Thank you for reaching out. Our team will get back to you within one business day.</p>
              </div>
            ) : (
              <form
                className="contact-info__form"
                action={SALUS_LEAD_ENDPOINT}
                method="POST"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Hidden fields — consumed by the non-AJAX standalone POST */}
                <input type="hidden" name="type" value="contact" />
                <input type="hidden" name="source" value="salusworkforcemanagement.staffy.com/contact (standalone)" />
                <input type="hidden" name="_next" value="https://salusworkforcemanagement.staffy.com/contact/?submitted=1" />

                <div className="contact-info__row">
                  <div className={`contact-info__field${fieldErrors.firstName ? " contact-info__field--error" : ""}`}>
                    <label htmlFor="firstName">First name <span className="contact-info__required">*</span></label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="First name*"
                      autoComplete="given-name"
                      maxLength={60}
                    />
                    {fieldErrors.firstName && (
                      <span className="contact-info__error" role="alert">{fieldErrors.firstName}</span>
                    )}
                  </div>
                  <div className={`contact-info__field${fieldErrors.lastName ? " contact-info__field--error" : ""}`}>
                    <label htmlFor="lastName">Last name <span className="contact-info__required">*</span></label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Last name*"
                      autoComplete="family-name"
                      maxLength={60}
                    />
                    {fieldErrors.lastName && (
                      <span className="contact-info__error" role="alert">{fieldErrors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="contact-info__row">
                  <div className={`contact-info__field${fieldErrors.email ? " contact-info__field--error" : ""}`}>
                    <label htmlFor="email">Email <span className="contact-info__required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Email*"
                      autoComplete="email"
                      maxLength={120}
                    />
                    {fieldErrors.email && (
                      <span className="contact-info__error" role="alert">{fieldErrors.email}</span>
                    )}
                  </div>
                  <div className={`contact-info__field${fieldErrors.phone ? " contact-info__field--error" : ""}`}>
                    <label htmlFor="phone">Phone number <span className="contact-info__required">*</span></label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                      placeholder="Phone Number*"
                      autoComplete="tel"
                      maxLength={30}
                    />
                    {fieldErrors.phone && (
                      <span className="contact-info__error" role="alert">{fieldErrors.phone}</span>
                    )}
                  </div>
                </div>

                <div className="contact-info__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={6}
                    maxLength={2000}
                  />
                </div>

                {submitError && (
                  <div className="contact-info__submit-error" role="alert">{submitError}</div>
                )}

                <div className="contact-info__submit-row">
                  <button type="submit" className="contact-info__submit" disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit"}
                  </button>
                </div>
              </form>
            )}
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
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#1a2b3d" />

    <title>Contact | Staffy Workforce Scheduling</title>
    <meta
      name="description"
      content="Contact the Staffy Workforce Scheduling team. Email info@staffy.com or call +1 (647) 492-7823. Based in Toronto, serving healthcare facilities across Canada."
    />
    <link rel="canonical" href="https://salusworkforcemanagement.staffy.com/contact/" />
    <meta name="robots" content="index, follow, max-image-preview:large" />

    <link rel="icon" type="image/webp" href="/favicon.webp" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Staffy" />
    <meta property="og:url" content="https://salusworkforcemanagement.staffy.com/contact/" />
    <meta property="og:title" content="Contact | Staffy Workforce Scheduling" />
    <meta
      property="og:description"
      content="Contact the Staffy Workforce Scheduling team. Email info@staffy.com or call +1 (647) 492-7823."
    />
    <meta property="og:image" content="https://salusworkforcemanagement.staffy.com/social/workforce-scheduling-og.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="Staffy Workforce Scheduling — contact the healthcare scheduling team"
    />
    <meta property="og:locale" content="en_CA" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@staffyapp" />
    <meta name="twitter:title" content="Contact | Staffy Workforce Scheduling" />
    <meta
      name="twitter:description"
      content="Contact the Staffy Workforce Scheduling team. Email info@staffy.com or call +1 (647) 492-7823."
    />
    <meta name="twitter:image" content="https://salusworkforcemanagement.staffy.com/social/workforce-scheduling-og.png" />

    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchemaGraph) }}
    />
  </>
)
