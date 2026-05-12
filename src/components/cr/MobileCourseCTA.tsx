import { Link, useLocation } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";

interface MobileCourseCTAProps {
  isNavOpen: boolean;
}

export function MobileCourseCTA({ isNavOpen }: MobileCourseCTAProps) {
  const location = useLocation();
  
  // No mostrar en páginas donde ya hay CTAs claros o el flujo es distinto
  const excludedPaths = ["/como-empezar", "/conferencias-fase-a", "/conferencias-fase-b"];
  const isExcluded = excludedPaths.some(p => location.pathname.startsWith(p));
  
  if (isNavOpen || isExcluded) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden px-4 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <div 
          className="
            relative overflow-hidden
            p-[1px] rounded-full 
            bg-gradient-to-r from-[color:var(--gold)]/20 to-transparent
            shadow-[0_15px_40px_-10px_rgba(0,0,0,0.8)]
            backdrop-blur-2xl
            animate-in slide-in-from-bottom-6 duration-1000
          "
        >
          <div className="absolute inset-0 bg-[color:var(--ink)]/80 rounded-full" />
          
          <Link
            to="/como-empezar"
            className="
              relative z-10
              flex items-center justify-between
              py-3.5 px-7 rounded-full
              bg-[var(--gold)] text-[var(--ink)]
              font-black text-[0.6rem] uppercase tracking-[0.2em]
              active:scale-[0.96]
              transition-all duration-500
            "
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Tomar curso gratuito</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
