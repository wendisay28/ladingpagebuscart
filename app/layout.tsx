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

export const metadata: Metadata = {
  title: "BuscArt - Busca, compara y contrata arte cerca de ti",
  description: "Encuentra y contrata artistas locales. Compara precios, estilos y disponibilidad para tu próximo evento o proyecto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-white text-[#1f2937]">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <div className="w-full flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
