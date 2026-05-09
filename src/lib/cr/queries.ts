import { queryOptions } from "@tanstack/react-query";
import type { Conferencia, Yo } from "./types";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`No se pudo cargar ${url}`);
  return res.json();
}

export const conferenciasQuery = () =>
  queryOptions({
    queryKey: ["conferencias"],
    queryFn: () => fetchJSON<Conferencia[]>("/data/conferencias.json"),
    staleTime: 1000 * 60 * 30,
  });

export const yoesQuery = () =>
  queryOptions({
    queryKey: ["yoes"],
    queryFn: () => fetchJSON<Yo[]>("/data/yoes.json"),
    staleTime: 1000 * 60 * 30,
  });

export const SOCIAL = {
  whatsappGroup: "https://chat.whatsapp.com/KWamxv5ZAsK2JobCfTkkzF",
  whatsappPhone: "+57 302 232 3472",
  whatsappPhoneRaw: "+573022323472",
  youtube: "https://www.youtube.com/@concienciarevolucionaria",
  instagram: "https://www.instagram.com/concienciarevolucionaria18/",
  tiktok: "https://www.tiktok.com/@concienciarevolucionaria",
  facebook: "https://www.facebook.com/profile.php?id=61550522941805",
};

export const FILTER_TAGS = [
  { id: "todas", label: "Todas" },
  { id: "phase:A", label: "Fase A" },
  { id: "phase:B", label: "Fase B" },
  { id: "psicologia", label: "Psicología" },
  { id: "practica", label: "Práctica" },
  { id: "meditacion", label: "Meditación" },
  { id: "astral", label: "Astral" },
  { id: "karma", label: "Karma" },
  { id: "ego", label: "Ego" },
  { id: "tres-factores", label: "Tres Factores" },
  { id: "with-images", label: "Con imágenes" },
  { id: "leidas", label: "Leídas" },
  { id: "no-leidas", label: "No leídas" },
];

export function estimateReadingTime(c: { content: { type: string; text?: string; items?: string[] }[] }) {
  let words = 0;
  for (const b of c.content) {
    if ("text" in b && b.text) words += b.text.split(/\s+/).length;
    if ("items" in b && b.items) words += b.items.join(" ").split(/\s+/).length;
  }
  return Math.max(1, Math.round(words / 220));
}

export function normalize(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
