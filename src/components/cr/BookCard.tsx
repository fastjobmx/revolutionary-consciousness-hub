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
      className="cr-card cr-reveal flex flex-col h-full group"
      style={{ transitionDelay: `${(index % 8) * 50}ms` }}
    >
      {/* Portada */}
      <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-[color-mix(in_oklab,var(--void)_90%,var(--gold))]">
        {book.cover ? (
          <img 
            src={book.cover} 
            alt={altText}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-[color:var(--ash)] opacity-30" />
          </div>
        )}
        <span className={`absolute top-3 right-3 text-[0.6rem] tracking-[0.16em] uppercase px-2 py-1 rounded border ${typeColor} bg-[color:var(--void)]`}>
          {typeLabel}
        </span>
      </div>
      
      {/* Info */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-lg leading-snug mb-2 group-hover:text-[color:var(--gold2)] transition">
          {book.title}
        </h3>
        
        <div className="flex items-center gap-2 text-sm text-[color:var(--ash)] mb-3">
          <User className="w-3.5 h-3.5" />
          <span>{book.author}</span>
        </div>
        
        <p className="text-sm text-[color:var(--ash)] leading-relaxed mb-4 flex-1 line-clamp-3">
          {description}
        </p>
        
        {/* Metadatos */}
        <div className="flex items-center gap-4 text-xs text-[color:var(--ash)] mb-4">
          {book.year > 0 && (
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{book.year}</span>
            </div>
          )}
          {book.pages > 0 && (
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3" />
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
            className="cr-btn cr-btn-gold w-full flex items-center justify-center gap-2 text-sm"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </a>
        ) : (
          <button 
            disabled
            className="cr-btn cr-btn-ghost w-full opacity-50 cursor-not-allowed text-sm"
          >
            <Download className="w-4 h-4" />
            Próximamente
          </button>
        )}
      </div>
    </div>
  );
}
