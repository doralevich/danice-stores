import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { company } from "@/data/company";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

// One family, two widths: the width axis gives us the wide display cut.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: "Danice Stores | Women's fashion in New York since 1934",
    template: "%s | Danice Stores",
  },
  description: company.summary,
  openGraph: {
    description: company.summary,
    siteName: company.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f9e4f6",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:bg-white focus:px-4 focus:py-2 focus:text-lg focus:font-semibold"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
