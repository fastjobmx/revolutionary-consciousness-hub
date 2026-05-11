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
    <section className={`relative mx-auto max-w-7xl px-4 sm:px-6 md:px-10 mb-12 md:mb-16 ${className}`}>
      <div className="cr-halo" style={{ inset: "-20% 20%", height: "120%", opacity: 0.4 }} />
      <div className="relative text-center">
        {eyebrow && <div className="cr-eyebrow cr-reveal mb-4">{eyebrow}</div>}
        <h1 className="cr-display text-[clamp(2.25rem,1.5rem+4vw,4.5rem)] mt-2 cr-reveal leading-[1.1] balance-text">
          {highlight ? (
            <>
              {title} <span className="cr-shimmer block sm:inline">{highlight}</span>
            </>
          ) : (
            <span className="cr-shimmer">{title}</span>
          )}
        </h1>
        <p className="mt-6 text-sm sm:text-base md:text-lg text-[color:var(--ash)] max-w-2xl mx-auto cr-reveal leading-relaxed line-clamp-4 sm:line-clamp-none">
          {subtitle}
        </p>
        {children && (
          <div className="mt-8 md:mt-10 cr-reveal flex flex-col sm:flex-row items-center justify-center gap-4">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
