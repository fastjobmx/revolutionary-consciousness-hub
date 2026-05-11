import { useReveal } from "./Reveal";
import { MapPin, Users, Clock, ExternalLink } from "lucide-react";

interface LocationCardProps {
  name: string;
  city: string;
  address?: string;
  schedule: string;
  contact?: string;
  mapUrl?: string;
  index?: number;
}

export function LocationCard({
  name,
  city,
  address,
  schedule,
  contact,
  mapUrl,
  index = 0
}: LocationCardProps) {
  const ref = useReveal();
  
  return (
    <div 
      ref={ref}
      className="cr-card cr-reveal"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-full bg-[color-mix(in_oklab,var(--gold)_10%,transparent)]">
          <MapPin className="w-5 h-5 text-[color:var(--gold)]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-display text-xl">{name}</h3>
            {mapUrl && (
              <a 
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[color:var(--ash)] hover:text-[color:var(--gold)] transition"
                aria-label="Ver en mapa"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          <p className="text-[color:var(--gold)] text-sm mb-3">{city}</p>
          
          {address && (
            <p className="text-sm text-[color:var(--ash)] mb-3">{address}</p>
          )}
          
          <div className="flex items-center gap-2 text-sm text-[color:var(--ash)] mb-2">
            <Clock className="w-4 h-4" />
            <span>{schedule}</span>
          </div>
          
          {contact && (
            <div className="flex items-center gap-2 text-sm text-[color:var(--ash)]">
              <Users className="w-4 h-4" />
              <span>{contact}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
