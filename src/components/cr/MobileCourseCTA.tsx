import { Link, useLocation } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";

interface MobileCourseCTAProps {
  isNavOpen: boolean;
}

export function MobileCourseCTA({ isNavOpen }: MobileCourseCTAProps) {
  const location = useLocation();
  
  // No mostrar en el menú de navegación, ni en páginas donde ya hay CTAs claros
  const excludedPaths = ["/como-empezar", "/conferencias-fase-a", "/conferencias-fase-b"];
  const isExcluded = excludedPaths.some(p => location.pathname.startsWith(p));
  
  if (isNavOpen || isExcluded) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 pb-[max(16px,env(safe-area-inset-bottom))] pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        {/* Gradient shadow overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--void)]/80 to-transparent -z-10" />
        
        <div 
          className="
            p-1.5 rounded-2xl 
            bg-[color-mix(in_oklab,var(--obsidian)_80%,transparent)] 
            border border-[color-mix(in_oklab,var(--gold)_30%,transparent)]
            shadow-[0_8px_32px_-4px_rgba(0,0,0,0.6)]
            backdrop-blur-xl
            animate-in slide-in-from-bottom-4 duration-500
          "
        >
          <Link
            to="/como-empezar"
            className="
              flex items-center justify-center gap-3 
              py-3.5 px-6 rounded-[14px]
              bg-[var(--gold)] text-[var(--ink)]
              font-bold text-sm
              hover:bg-[var(--gold2)] 
              active:scale-[0.98]
              transition-all duration-300
              shadow-lg shadow-[var(--gold)]/20
            "
          >
            <GraduationCap className="w-5 h-5" />
            <span className="font-display text-base tracking-wide">Comenzar curso gratuito</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
