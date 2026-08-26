import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITULO = "Mate — Cargá facturas de proveedores en segundos";
const DESCRIPCION =
  "Mate recuerda qué le comprás a cada proveedor para que la próxima factura se cargue sola. Gratis, sin tarjeta, pensado para comercios de barrio.";
const URL_SITIO = "https://mate-app-one.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: {
    default: TITULO,
    template: "%s — Mate",
  },
  description: DESCRIPCION,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: URL_SITIO,
    siteName: "Mate",
    title: TITULO,
    description: DESCRIPCION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
