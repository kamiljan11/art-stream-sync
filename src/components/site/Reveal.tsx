import { useEffect, useRef, useState, type ReactNode, type ElementType, type CSSProperties } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number; // ms
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  style?: CSSProperties;
  id?: string;
};

/**
 * Reveal: fades + slides content in when it enters the viewport.
 * Respects prefers-reduced-motion (handled via CSS).
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -10% 0px",
  once = true,
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  const Component = Tag as ElementType;
  return (
    <Component
      id={id}
      ref={ref as never}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Component>
  );
}