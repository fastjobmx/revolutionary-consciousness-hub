import { useReveal } from "./Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({ 
  eyebrow, 
  title, 
  subtitle,
  className = "",
  align = "center"
}: SectionHeaderProps) {
  const ref = useReveal();
  const alignClass = align === "center" ? "text-center" : "text-left";
  
  return (
    <div ref={ref} className={`mb-16 ${alignClass} ${className}`}>
      {eyebrow && <div className="cr-eyebrow cr-reveal">{eyebrow}</div>}
      <h2 className="cr-display text-4xl md:text-5xl mt-4 cr-reveal">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-[color:var(--ash)] max-w-xl mx-auto cr-reveal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
