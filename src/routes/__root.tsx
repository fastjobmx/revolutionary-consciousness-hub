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

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Conciencia Revolucionaria — El conocimiento de sí mismo" },
      { name: "description", content: "Una escuela viva del conocimiento de sí mismo: 75 conferencias, estudios psicológicos de los Yoes y la práctica diaria de la Revolución de la Conciencia." },
      { name: "author", content: "Conciencia Revolucionaria" },
      { property: "og:title", content: "Conciencia Revolucionaria" },
      { property: "og:description", content: "El camino no se explica. Se recorre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" },
      { rel: "icon", href: "/assets/logo/logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-[color:var(--void)]">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
