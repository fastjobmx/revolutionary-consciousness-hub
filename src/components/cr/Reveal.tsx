import { useEffect, useRef } from "react";

export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const root = ref.current; if (!root) return;
    const els = root.querySelectorAll<HTMLElement>(".cr-reveal");
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}
