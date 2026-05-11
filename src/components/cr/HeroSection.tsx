import { useReveal } from "./Reveal";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle: string;
  children?: React.ReactNode;
  className?: string;
}

export function HeroSection({ 
  eyebrow, 
  title, 
  highlight, 
  subtitle, 
  children,
  className = "" 
}: HeroSectionProps) {
  const ref = useReveal();
  
  return (
    <section className={`relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-16 ${className}`}>
      <div className="cr-halo" style={{ inset: "-20% 20%", height: "120%", opacity: 0.4 }} />
      <div className="relative text-center">
        {eyebrow && <div className="cr-eyebrow cr-reveal">{eyebrow}</div>}
        <h1 className="cr-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 cr-reveal leading-[1.05]">
          {highlight ? (
            <>
              {title} <span className="cr-shimmer">{highlight}</span>
            </>
          ) : (
            <span className="cr-shimmer">{title}</span>
          )}
        </h1>
        <p className="mt-6 text-base sm:text-lg text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed">
          {subtitle}
        </p>
        {children && (
          <div className="mt-6 cr-reveal">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
