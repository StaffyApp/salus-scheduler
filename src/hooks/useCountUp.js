import { useEffect, useRef, useState } from "react"

/**
 * Animates from 0 to `target` when the returned ref element enters the viewport.
 * SSR renders the final value (good for SEO and avoids a 0→target flash); on
 * hydration, if the element is still below the fold we reset to 0 and animate
 * up as it scrolls into view. Respects prefers-reduced-motion.
 */
export default function useCountUp(target, { duration = 1800, threshold = 0.4 } = {}) {
  const ref = useRef(null)
  const [value, setValue] = useState(target)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const rect = el.getBoundingClientRect()
    const alreadyOnScreen = rect.top < window.innerHeight && rect.bottom > 0
    if (alreadyOnScreen) return

    setValue(0)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.unobserve(el)

        const start = performance.now()
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(Math.floor(eased * target))
          if (t < 1) requestAnimationFrame(step)
          else setValue(target)
        }
        requestAnimationFrame(step)
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, threshold])

  return [ref, value]
}
