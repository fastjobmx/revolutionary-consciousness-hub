import { useReveal } from "./Reveal";
import { BookOpen, User, Calendar, FileText, Download } from "lucide-react";
import type { Libro } from "@/lib/cr/types";

interface BookCardProps {
  book: Libro;
  typeLabel: string;
  typeColor: string;
  index?: number;
}

const getDefaultDescription = (title: string, author: string): string => {
  return `Material de estudio "${title}" de ${author} para profundizar en el trabajo interior.`;
};

export function BookCard({ book, typeLabel, typeColor, index = 0 }: BookCardProps) {
  const ref = useReveal();
  const description = book.description?.trim() 
    ? book.description 
    : getDefaultDescription(book.title, book.author);
  const altText = `Portada del libro "${book.title}" de ${book.author}. ${typeLabel}.`;

  return (
    <div 
      ref={ref}
      className="cr-card cr-reveal flex flex-col h-full group p-5 sm:p-6"
      style={{ transitionDelay: `${(index % 8) * 50}ms` }}
    >
      {/* Portada */}
      <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-xl bg-[color-mix(in_oklab,var(--void)_90%,var(--gold))] shadow-lg shadow-black/40">
        {book.cover ? (
          <img 
            src={book.cover} 
            alt={altText}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-20 h-20 text-[color:var(--ash)] opacity-20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <span className={`absolute top-4 right-4 text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1.5 rounded-lg border backdrop-blur-md ${typeColor} bg-black/40 font-bold`}>
          {typeLabel}
        </span>
      </div>
      
      {/* Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-lg sm:text-xl leading-snug mb-3 group-hover:text-[color:var(--gold2)] transition-colors duration-300">
          {book.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-[color:var(--ash)] mb-4">
          <div className="w-6 h-6 rounded-full bg-[color-mix(in_oklab,var(--gold)_10%,transparent)] flex items-center justify-center">
            <User className="w-3 h-3 text-[color:var(--gold)]" />
          </div>
          <span className="font-medium">{book.author}</span>
        </div>
        
        <p className="text-sm text-[color:var(--ash)] leading-relaxed mb-6 flex-1 line-clamp-3 opacity-90">
          {description}
        </p>
        
        {/* Metadatos */}
        <div className="flex items-center gap-5 text-[0.7rem] text-[color:var(--ash)] mb-6 opacity-80 font-medium">
          {book.year > 0 && (
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[color:var(--gold)]" />
              <span>{book.year}</span>
            </div>
          )}
          {book.pages > 0 && (
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[color:var(--gold)]" />
              <span>{book.pages} págs.</span>
            </div>
          )}
        </div>
        
        {/* Botón */}
        {book.downloadUrl && book.downloadUrl !== "#" ? (
          <a 
            href={book.downloadUrl}
            target="_blank"
            rel="noreferrer"
            className="cr-btn cr-btn-gold w-full flex items-center justify-center gap-2 text-sm min-h-[48px] shadow-md shadow-[var(--gold)]/10 active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Descargar PDF</span>
          </a>
        ) : (
          <button 
            disabled
            className="cr-btn cr-btn-ghost w-full opacity-40 cursor-not-allowed text-sm min-h-[48px] border-dashed"
          >
            <Download className="w-4 h-4" />
            <span>Próximamente</span>
          </button>
        )}
      </div>
    </div>
  );
}
