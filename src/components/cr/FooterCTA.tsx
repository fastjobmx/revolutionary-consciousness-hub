import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowRight } from "lucide-react";

export function FooterCTA() {
  return (
    <div className="relative mb-14 md:mb-20">
      <div className="cr-luxury-border relative overflow-hidden rounded-3xl p-6 sm:p-8 md:p-10 cr-glass">
        {/* Soft gold glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[color:var(--gold)] opacity-[0.07] blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-32 -left-20 h-64 w-64 rounded-full bg-[color:var(--gold2)] opacity-[0.04] blur-[120px]" />
        <Sparkles
          aria-hidden
          className="pointer-events-none absolute right-6 top-6 h-6 w-6 text-[color:var(--gold)] opacity-30"
        />

        <div className="relative z-10 flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-xl">
            <p className="cr-eyebrow mb-3 text-[color:var(--gold)] opacity-80">
              Llamado interior
            </p>
            <h3 className="font-display text-2xl leading-[1.15] text-[color:var(--bone)] sm:text-3xl md:text-4xl">
              Comienza tu <span className="cr-shimmer">trabajo interior</span>
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-[color:var(--ash)] opacity-85">
              Estudia las conferencias, observa tus yoes y lleva la práctica al
              diario vivir.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:max-w-[360px] sm:flex-row sm:max-w-none lg:w-auto lg:shrink-0">
            <Link
              to="/conferencia/$id"
              params={{ id: "fase-a-01" }}
              className="cr-btn cr-btn-gold w-full justify-center px-7 py-3.5 !text-[0.7rem] !font-bold sm:w-auto"
            >
              Comenzar por Conf. 01
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
            <Link
              to="/yoes"
              className="cr-btn cr-btn-ghost w-full justify-center px-7 py-3.5 !text-[0.7rem] !font-bold sm:w-auto"
            >
              Estudiar Yo de la Semana
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
