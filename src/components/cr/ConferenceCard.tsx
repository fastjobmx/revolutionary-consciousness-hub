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
      className="cr-card cr-reveal block group p-6 sm:p-7"
      style={{ transitionDelay: `${(index % 9) * 50}ms` }}
    >
      <div className="flex items-center justify-between text-xs mb-4">
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
      </div>
      
      <h3 className="font-display text-xl sm:text-2xl mb-4 group-hover:text-[color:var(--gold2)] transition leading-tight">
        {conference.title}
      </h3>
      
      <p className="text-sm sm:text-base text-[color:var(--ash)] leading-relaxed line-clamp-3 mb-6">
        {conference.summary}
      </p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
        <span className="text-[0.7rem] tracking-[0.2em] uppercase text-[color:var(--gold)] font-medium">
          Estudiar lección →
        </span>
        <BookOpen className="w-5 h-5 text-[color:var(--ash)] opacity-40 group-hover:opacity-100 group-hover:text-[color:var(--gold)] transition" />
      </div>
    </Link>
  );
}
