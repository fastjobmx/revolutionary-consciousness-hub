import { useState } from "react";
import type { Block } from "@/lib/cr/types";

export function ContentBlocks({ blocks }: { blocks: Block[] }) {
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);
  return (
    <>
      <div className="cr-prose">
        {blocks.map((b, i) => {
          switch (b.type) {
            case "heading": {
              const Tag = (b.level === 2 ? "h2" : "h3") as "h2" | "h3";
              return <Tag key={i} id={`h-${i}`}>{b.text}</Tag>;
            }
            case "paragraph": return <p key={i}>{b.text}</p>;
            case "list": return <ul key={i}>{b.items.map((it, k) => <li key={k}>{it}</li>)}</ul>;
            case "quote": return <blockquote key={i} className="cr-quote">{b.text}</blockquote>;
            case "mantra": return <div key={i} className="cr-mantra">{b.text}</div>;
            case "practice":
              return (
                <div key={i} className="cr-practice">
                  <div className="cr-practice-title">{b.title}</div>
                  <ol className="list-decimal pl-5 space-y-1.5">
                    {b.steps.map((s, k) => <li key={k}>{s}</li>)}
                  </ol>
                </div>
              );
            case "table":
              return (
                <div key={i} className="my-8 overflow-x-auto cr-luxury-border rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-[color-mix(in_oklab,var(--gold)_10%,var(--obsidian))]">
                      <tr>{b.headers.map((h, k) => <th key={k} className="px-4 py-3 text-left font-display">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {b.rows.map((r, k) => <tr key={k} className="border-t border-[color-mix(in_oklab,var(--gold)_15%,transparent)]">{r.map((c, j) => <td key={j} className="px-4 py-3">{c}</td>)}</tr>)}
                    </tbody>
                  </table>
                </div>
              );
            case "image":
              return (
                <figure key={i} className="cr-figure">
                  <img loading="lazy" src={b.src} alt={b.alt} onClick={() => setZoom({ src: b.src, alt: b.alt })} />
                  {b.caption && <figcaption>{b.caption}</figcaption>}
                </figure>
              );
            default: return null;
          }
        })}
      </div>
      {zoom && (
        <div className="fixed inset-0 z-[80] bg-black/90 flex items-center justify-center p-6 cursor-zoom-out animate-in fade-in duration-200" onClick={() => setZoom(null)}>
          <img src={zoom.src} alt={zoom.alt} className="max-h-[92vh] max-w-[92vw] object-contain rounded-lg border border-[color:var(--gold)]" />
        </div>
      )}
    </>
  );
}
