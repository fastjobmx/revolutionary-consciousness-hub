import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Navbar } from "@/components/cr/Navbar";
import { Footer } from "@/components/cr/Footer";

function NotFoundComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[color:var(--void)]">
      <div className="text-center max-w-md">
        <div className="cr-eyebrow">404</div>
        <h1 className="cr-display text-5xl mt-3">Sendero no encontrado</h1>
        <p className="mt-4 text-[color:var(--ash)]">El camino que buscas no existe en esta biblioteca.</p>
        <Link to="/" className="cr-btn cr-btn-gold mt-8 inline-flex">Volver al inicio</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="cr-eyebrow">Interrupción</div>
        <h1 className="cr-display text-4xl mt-3">Algo se ha velado</h1>
        <p className="mt-3 text-sm text-[color:var(--ash)]">{error.message}</p>
        <div className="mt-6 flex gap-3 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="cr-btn cr-btn-gold">Reintentar</button>
          <Link to="/" className="cr-btn cr-btn-ghost">Inicio</Link>
        </div>
      </div>
    </div>
  );
}

const SITE_URL = "https://concienciarevolucionaria.app";

// Schema.org Organization JSON-LD
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Conciencia Revolucionaria",
  "alternateName": "Escuela del Conocimiento de Sí Mismo",
  "url": SITE_URL,
  "logo": `${SITE_URL}/assets/logo/logo.png`,
  "description": "Escuela viva del Conocimiento de Sí Mismo con 75 conferencias gratuitas sobre auto-observación, meditación y trabajo interior.",
  "sameAs": [
    "https://www.youtube.com/@concienciarevolucionaria",
    "https://www.instagram.com/concienciarevolucionaria18/",
    "https://www.facebook.com/profile.php?id=61550522941805",
    "https://www.tiktok.com/@concienciarevolucionaria"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Información y soporte",
    "availableLanguage": "Spanish"
  }
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Conciencia Revolucionaria — El Conocimiento de Sí Mismo" },
      { name: "description", content: "Una escuela viva del Conocimiento de Sí Mismo: 75 conferencias, estudios psicológicos de los Yoes y la práctica diaria de la Revolución de la Conciencia." },
      { name: "author", content: "Conciencia Revolucionaria" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0a0a0f" },
      { property: "og:site_name", content: "Conciencia Revolucionaria" },
      { property: "og:locale", content: "es_ES" },
      { property: "og:title", content: "Conciencia Revolucionaria — El Conocimiento de Sí Mismo" },
      { property: "og:description", content: "Una escuela viva del Conocimiento de Sí Mismo: 75 conferencias, estudios psicológicos de los Yoes y la práctica diaria de la Revolución de la Conciencia." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Conciencia Revolucionaria — El Conocimiento de Sí Mismo" },
      { name: "twitter:description", content: "Una escuela viva del Conocimiento de Sí Mismo: 75 conferencias, estudios psicológicos de los Yoes y la práctica diaria de la Revolución de la Conciencia." },
      { property: "og:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/971acc0b-00c3-4437-bdd4-c38cdefcd2ee" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:image", content: "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/971acc0b-00c3-4437-bdd4-c38cdefcd2ee" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      // Preconnect a dominios externos para acelerar carga
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      // Preload de CSS crítico
      { rel: "preload", href: appCss, as: "style" },
      { rel: "stylesheet", href: appCss },
      // Fuentes con display=swap para evitar FOIT
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" },
      { rel: "icon", href: "/assets/logo/logo.png" },
      { rel: "apple-touch-icon", href: "/assets/logo/logo.png" },
      // Preload de logo para LCP
      { rel: "preload", href: "/assets/logo/logo.png", as: "image", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify(organizationSchema),
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <div className="min-h-screen flex flex-col bg-[color:var(--void)]">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <Scripts />
    </QueryClientProvider>
  );
}
