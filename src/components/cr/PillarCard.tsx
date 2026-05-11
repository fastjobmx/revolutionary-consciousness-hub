import { useReveal } from "./Reveal";

interface PillarCardProps {
  number: string;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

export function PillarCard({ 
  number, 
  title, 
  description, 
  index = 0,
  className = "" 
}: PillarCardProps) {
  const ref = useReveal();
  
  return (
    <div 
      ref={ref}
      className={`cr-card cr-reveal text-center ${className}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="cr-eyebrow text-[color:var(--gold)] mb-3">{number}</div>
      <h3 className="font-display text-2xl mb-3">{title}</h3>
      <p className="text-sm text-[color:var(--ash)] leading-relaxed">{description}</p>
    </div>
  );
}
