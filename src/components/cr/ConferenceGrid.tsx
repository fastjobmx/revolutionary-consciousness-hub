import { ConferenceCard } from "./ConferenceCard";
import type { Conferencia } from "@/lib/cr/types";

interface ConferenceGridProps {
  conferences: Conferencia[];
  showPhase?: boolean;
  columns?: 2 | 3 | 4;
  emptyMessage?: {
    title: string;
    subtitle: string;
    action?: {
      label: string;
      onClick: () => void;
    };
  };
}

export function ConferenceGrid({ 
  conferences, 
  showPhase = true,
  columns = 3,
  emptyMessage
}: ConferenceGridProps) {
  const getGridClass = () => {
    switch (columns) {
      case 2: return "grid-cols-1 md:grid-cols-2";
      case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4";
      case 3:
      default: return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  if (conferences.length === 0 && emptyMessage) {
    return (
      <div className="text-center py-24">
        <div className="cr-eyebrow">{emptyMessage.title}</div>
        <h3 className="cr-display text-3xl mt-3">{emptyMessage.subtitle}</h3>
        {emptyMessage.action && (
          <button 
            onClick={emptyMessage.action.onClick}
            className="cr-btn cr-btn-gold mt-6"
          >
            {emptyMessage.action.label}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className={`grid gap-6 ${getGridClass()}`}>
      {conferences.map((conference, index) => (
        <ConferenceCard 
          key={conference.id}
          conference={conference}
          index={index}
          showPhase={showPhase}
        />
      ))}
    </div>
  );
}
