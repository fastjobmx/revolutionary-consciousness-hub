import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useReveal } from "./Reveal";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

export function FAQAccordion({ items, className = "" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useReveal();

  return (
    <div ref={ref} className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className="cr-card cr-reveal"
          style={{ transitionDelay: `${index * 60}ms` }}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between text-left py-2"
            aria-expanded={openIndex === index}
          >
            <span className="font-display text-lg pr-4">{item.question}</span>
            <ChevronDown 
              className={`w-5 h-5 text-[color:var(--gold)] transition-transform shrink-0 ${
                openIndex === index ? 'rotate-180' : ''
              }`} 
            />
          </button>
          {openIndex === index && (
            <div className="pt-3 pb-2 text-[color:var(--ash)] leading-relaxed border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)] mt-3">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
