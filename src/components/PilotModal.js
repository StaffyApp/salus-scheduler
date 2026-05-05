import React, { useState, useEffect, useRef } from "react"
import "./PilotModal.scss"

const FACILITY_TYPE_LABELS = {
  ltc: "Long-Term Care",
  retirement: "Retirement Home",
  hospital: "Hospital",
  homecare: "Homecare",
  other: "Other",
}

// Formsubmit.co relays form submissions to the target email with no backend.
// First submission to a new address triggers a one-time activation email that
// must be confirmed before subsequent submissions are delivered.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/info@staffy.com"

function validateFields(data) {
  const errors = {}
  if (data.facilityName.trim() && !/^[A-Za-z0-9\s\-.,'&]{2,100}$/.test(data.facilityName.trim())) {
    errors.facilityName = "Please enter a valid facility name (letters, numbers, spaces)"
  }
  if (!data.contactName.trim()) {
    errors.contactName = "Contact name is required"
  } else if (!/^[A-Za-z\s\-.']{2,80}$/.test(data.contactName.trim())) {
    errors.contactName = "Please enter a name using letters only"
  }
  if (!data.email.trim()) {
    errors.email = "Email is required"
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address"
  }
  if (data.phone.trim() && !/^[\d\s()+\-.]{7,20}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number"
  }
  if (!data.facilityType) errors.facilityType = "Please select a facility type"
  if (data.staffCount !== "" && (isNaN(data.staffCount) || Number(data.staffCount) < 0 || Number(data.staffCount) > 100000)) {
    errors.staffCount = "Please enter a valid number (0–100,000)"
  }
  return errors
}

const PilotModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    facilityName: "",
    contactName: "",
    email: "",
    phone: "",
    facilityType: "",
    staffCount: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const firstInputRef = useRef(null)
  const previousFocusRef = useRef(null)

  useEffect(() => {
    let focusTimer
    if (isOpen) {
      previousFocusRef.current = document.activeElement
      document.body.style.overflow = "hidden"
      focusTimer = setTimeout(() => firstInputRef.current?.focus(), 100)
    } else {
      document.body.style.overflow = ""
      setSubmitted(false)
      setSubmitError("")
      setFieldErrors({})
      setFormData({
        facilityName: "",
        contactName: "",
        email: "",
        phone: "",
        facilityType: "",
        staffCount: "",
      })
    }
    return () => {
      document.body.style.overflow = ""
      if (focusTimer) clearTimeout(focusTimer)
      if (!isOpen && previousFocusRef.current && typeof previousFocusRef.current.focus === "function") {
        previousFocusRef.current.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === "Escape") {
        onClose()
        return
      }
      if (e.key !== "Tab") return
      const root = contentRef.current
      if (!root) return
      const focusables = root.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [isOpen, onClose])

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

    const facilityLabel =
      FACILITY_TYPE_LABELS[formData.facilityType] || formData.facilityType

    const payload = {
      _subject: `Salus Beta Access Request — ${formData.facilityName || formData.contactName}`,
      _template: "table",
      _captcha: "false",
      _cc: "sumaiya@staffy.com",
      "Contact Name": formData.contactName,
      Email: formData.email,
      Phone: formData.phone || "—",
      "Facility Name": formData.facilityName || "—",
      "Facility Type": facilityLabel,
      "Number of Staff": formData.staffCount || "—",
      Source: "salusworkforcemanagement.staffy.com",
    }

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: "POST",
        mode: "cors",
        referrerPolicy: "unsafe-url",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSubmitted(true)
    } catch (err) {
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) onClose()
  }

  if (!isOpen) return null

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions -- keyboard close handled via window-level Escape listener above
    <div
      className="pilot-modal__backdrop"
      ref={modalRef}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pilot-modal-title"
    >
      <div className="pilot-modal__content" ref={contentRef}>
        <button
          type="button"
          className="pilot-modal__close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {submitted ? (
          <div className="pilot-modal__success" aria-live="polite">
            <div className="pilot-modal__success-icon">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                <circle className="pilot-modal__success-circle" cx="24" cy="24" r="22" stroke="#10B981" strokeWidth="2" fill="#10B981" fillOpacity="0.12" />
                <path className="pilot-modal__success-check" d="M16 24L22 30L32 18" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Request received</h3>
            <p>Thank you for your interest. Our team will be in touch to discuss next steps.</p>
            <button type="button" className="btn btn--secondary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="pilot-modal-title" className="pilot-modal__title">Request Beta Access</h2>
            <p className="pilot-modal__desc">
              Tell us about your facility and we'll reach out to discuss the beta program.
            </p>
            <form className="pilot-modal__form" onSubmit={handleSubmit}>
              <div className={`pilot-modal__field${fieldErrors.facilityName ? " pilot-modal__field--error" : ""}`}>
                <label htmlFor="facilityName">Facility Name</label>
                <input
                  ref={firstInputRef}
                  type="text"
                  id="facilityName"
                  name="facilityName"
                  value={formData.facilityName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!fieldErrors.facilityName}
                  aria-describedby={fieldErrors.facilityName ? "facilityName-error" : undefined}
                  placeholder="e.g. Sunrise Long-Term Care"
                />
                {fieldErrors.facilityName && <span id="facilityName-error" className="pilot-modal__error" role="alert">{fieldErrors.facilityName}</span>}
              </div>
              <div className="pilot-modal__row">
                <div className={`pilot-modal__field${fieldErrors.contactName ? " pilot-modal__field--error" : ""}`}>
                  <label htmlFor="contactName">Contact Name <span className="pilot-modal__required">*</span></label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.contactName}
                    aria-describedby={fieldErrors.contactName ? "contactName-error" : undefined}
                    placeholder="Jane Smith"
                  />
                  {fieldErrors.contactName && <span id="contactName-error" className="pilot-modal__error" role="alert">{fieldErrors.contactName}</span>}
                </div>
                <div className={`pilot-modal__field${fieldErrors.email ? " pilot-modal__field--error" : ""}`}>
                  <label htmlFor="email">Email <span className="pilot-modal__required">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    placeholder="jane@facility.com"
                  />
                  {fieldErrors.email && <span id="email-error" className="pilot-modal__error" role="alert">{fieldErrors.email}</span>}
                </div>
              </div>
              <div className="pilot-modal__row">
                <div className={`pilot-modal__field${fieldErrors.phone ? " pilot-modal__field--error" : ""}`}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!fieldErrors.phone}
                    aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                    placeholder="(416) 555-0100"
                  />
                  {fieldErrors.phone && <span id="phone-error" className="pilot-modal__error" role="alert">{fieldErrors.phone}</span>}
                </div>
                <div className={`pilot-modal__field${fieldErrors.facilityType ? " pilot-modal__field--error" : ""}`}>
                  <label htmlFor="facilityType">Facility Type <span className="pilot-modal__required">*</span></label>
                  <select
                    id="facilityType"
                    name="facilityType"
                    value={formData.facilityType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    aria-required="true"
                    aria-invalid={!!fieldErrors.facilityType}
                    aria-describedby={fieldErrors.facilityType ? "facilityType-error" : undefined}
                  >
                    <option value="">Select type...</option>
                    <option value="ltc">Long-Term Care</option>
                    <option value="retirement">Retirement Home</option>
                    <option value="hospital">Hospital</option>
                    <option value="homecare">Homecare</option>
                    <option value="other">Other</option>
                  </select>
                  {fieldErrors.facilityType && <span id="facilityType-error" className="pilot-modal__error" role="alert">{fieldErrors.facilityType}</span>}
                </div>
              </div>
              <div className={`pilot-modal__field${fieldErrors.staffCount ? " pilot-modal__field--error" : ""}`}>
                <label htmlFor="staffCount">Number of Staff</label>
                <input
                  type="number"
                  id="staffCount"
                  name="staffCount"
                  value={formData.staffCount}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  min="0"
                  placeholder="e.g. 150"
                />
                {fieldErrors.staffCount && <span id="staffCount-error" className="pilot-modal__error" role="alert">{fieldErrors.staffCount}</span>}
              </div>
              {submitError && <div className="pilot-modal__submit-error" role="alert">{submitError}</div>}
              <button type="submit" className="btn btn--primary btn--lg pilot-modal__submit" disabled={submitting}>
                {submitting ? "Submitting\u2026" : "Request Beta Access"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default PilotModal
