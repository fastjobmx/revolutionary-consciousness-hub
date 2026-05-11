import { Link } from "@tanstack/react-router";
import { useReveal } from "./Reveal";
import type { Conferencia } from "@/lib/cr/types";
import { BookOpen } from "lucide-react";

interface ConferenceCardProps {
  conference: Conferencia;
  index?: number;
  showPhase?: boolean;
}

export function ConferenceCard({ 
  conference, 
  index = 0,
  showPhase = true 
}: ConferenceCardProps) {
  const ref = useReveal();
  
  return (
    <Link 
      to="/conferencia/$id" 
      params={{ id: conference.id }}
      className="cr-card cr-reveal block group"
      style={{ transitionDelay: `${(index % 9) * 50}ms` }}
    >
      <div className="flex items-center justify-between text-xs mb-3">
        {showPhase && (
          <span className="cr-eyebrow text-[color:var(--gold)]">
            Fase {conference.phase} · {conference.number}
          </span>
        )}
        {!showPhase && (
          <span className="cr-eyebrow text-[color:var(--gold)]">
            Conf. {conference.number}
          </span>
        )}
        {conference.images.length > 0 && (
          <span className="text-[color:var(--ash)]">◇ Diagramas</span>
        )}
      </div>
      
      <h3 className="font-display text-xl mb-3 group-hover:text-[color:var(--gold2)] transition leading-tight">
        {conference.title}
      </h3>
      
      <p className="text-sm text-[color:var(--ash)] leading-relaxed line-clamp-3 mb-4">
        {conference.summary}
      </p>
      
      <div className="flex items-center justify-between mt-auto">
        <span className="text-[0.65rem] tracking-[0.18em] uppercase text-[color:var(--gold)]">
          Leer más →
        </span>
        <BookOpen className="w-4 h-4 text-[color:var(--ash)] opacity-50 group-hover:opacity-100 transition" />
      </div>
    </Link>
  );
}
