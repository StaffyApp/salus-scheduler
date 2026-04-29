import { useEffect, useLayoutEffect, useRef } from "react"

/**
 * Attaches an IntersectionObserver to the ref element.
 * Adds 'is-visible' class when the element enters the viewport.
 * Observes once — after reveal, stops observing.
 *
 * The class is also re-applied via useLayoutEffect on every render so React's
 * className reconciliation doesn't wipe it when the component re-renders for
 * an unrelated reason (e.g. a sibling state toggle changing className strings).
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const hasRevealed = useRef(false)

  useLayoutEffect(() => {
    if (hasRevealed.current && ref.current) {
      ref.current.classList.add("is-visible")
    }
  })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Skip animation entirely if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hasRevealed.current = true
      el.classList.add("is-visible")
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasRevealed.current = true
          el.classList.add("is-visible")
          observer.unobserve(el)
        }
      },
      { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? "0px 0px -40px 0px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return ref
}
