import type { Metadata } from "next";
import { Syne, Instrument_Serif, Space_Mono, Manrope } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-technical",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const OG_IMAGE =
  "https://d8j0ntlcm91z4.cloudfront.net/user_31jsKS5Tv7Qv1EoTdhaNio59PHu/hf_20260925_194254_e01ff2a3-ace1-4df1-b099-cf3980c8e513.png";

export const metadata: Metadata = {
  title: "Pipeline de Produção com IA",
  description:
    "Curso e ferramenta de produção cinematográfica com IA, do roteiro à pós-produção.",
  openGraph: {
    title: "Pipeline de Produção com IA",
    description:
      "Curso e ferramenta de produção cinematográfica com IA, do roteiro à pós-produção.",
    images: [{ url: OG_IMAGE, width: 1200, height: 675, alt: "Pipeline." }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pipeline de Produção com IA",
    description:
      "Curso e ferramenta de produção cinematográfica com IA, do roteiro à pós-produção.",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${syne.variable} ${instrumentSerif.variable} ${spaceMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <noscript>
          <style>{`.scroll-reveal, .scroll-reveal-scale, .scroll-reveal-stagger > * { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        <svg className="film-grain" aria-hidden="true" focusable="false">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
        {children}
      </body>
    </html>
  );
}
