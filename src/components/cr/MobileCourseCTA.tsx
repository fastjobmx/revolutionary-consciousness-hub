import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

interface MobileCourseCTAProps {
  isNavOpen: boolean;
}

export function MobileCourseCTA({ isNavOpen }: MobileCourseCTAProps) {
  // No mostrar cuando el menú de navegación está abierto
  if (isNavOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden">
      {/* Gradient overlay para suavizar la transición */}
      <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-[var(--void)] to-transparent pointer-events-none" />
      
      {/* Botón contenedor con safe area para iPhone */}
      <div 
        className="
          mx-4 mb-[max(16px,env(safe-area-inset-bottom))] 
          p-1 rounded-2xl 
          bg-[color-mix(in_oklab,var(--gold)_20%,var(--obsidian))] 
          border border-[color-mix(in_oklab,var(--gold)_40%,transparent)]
          shadow-lg shadow-black/40
          backdrop-blur-md
        "
      >
        <Link
          to="/como-empezar"
          className="
            flex items-center justify-center gap-3 
            py-3.5 px-6 rounded-xl
            bg-[var(--gold)] text-[var(--ink)]
            font-medium text-sm
            hover:bg-[var(--gold2)] 
            active:scale-[0.98]
            transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--obsidian)]
          "
        >
          <GraduationCap className="w-5 h-5" />
          <span className="font-display text-base tracking-wide">Tomar curso</span>
        </Link>
      </div>
    </div>
  );
}
