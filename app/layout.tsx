import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { company } from "@/data/company";
import "./globals.css";

// One family, two widths: the width axis gives us the wide display cut.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: "Danice Stores | Coming soon",
  description: company.summary,
  openGraph: {
    title: "Danice Stores | Coming soon",
    description: company.summary,
    siteName: company.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f9e4f5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
