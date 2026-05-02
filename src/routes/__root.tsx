import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { FloatingContact } from "@/components/site/FloatingContact";
import { I18nProvider } from "@/i18n/I18nProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MAS Prints | Wholesale Print Prices. Guaranteed. Iceland." },
      { name: "description", content: "Direct access to high-capacity European printing factories. Icelandic invoice. Lowest price guarantee. Quote in 24h." },
      { name: "author", content: "Mountain All Service ehf." },
      { property: "og:title", content: "MAS Prints | Wholesale Print Prices. Guaranteed. Iceland." },
      { property: "og:description", content: "Direct access to European printing factories. Icelandic invoice. Lowest price guarantee. Quote in 24h." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: "MAS Prints | Wholesale Print Prices. Iceland." },
      { name: "twitter:description", content: "Direct access to European printing factories. Icelandic invoice. Lowest price guarantee." },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "MAS Prints",
          legalName: "Mountain All Service ehf.",
          telephone: "+354 787 8617",
          email: "prints@masgroup.is",
          url: "https://masprints.is",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Njarðarbraut 3i",
            postalCode: "260",
            addressLocality: "Njarðvík",
            addressCountry: "IS",
          },
          taxID: "690725-0450",
          areaServed: "IS",
          priceRange: "$$",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <Outlet />
      <FloatingContact />
    </I18nProvider>
  );
}
