import { useEffect, useRef, useState } from "react";

// Returns true when a fixed top bar should hide: reveal when scrolling up or
// near the top, hide when scrolling down past `revealOffset`.
export function useHideOnScroll(revealOffset = 64, delta = 6) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const diff = y - lastY.current;

      if (y <= revealOffset) {
        setHidden(false);
      } else if (Math.abs(diff) > delta) {
        setHidden(diff > 0);
      }

      lastY.current = y;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [revealOffset, delta]);

  return hidden;
}
