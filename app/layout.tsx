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
  title: "ArtBusCart - Arte y Cultura en Medellín",
  description: "Descubre arte, cultura y eventos en Medellín. Tienda de arte, lugares turísticos y experiencias únicas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="bg-black text-white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <div className="w-full max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
