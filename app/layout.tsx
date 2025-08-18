import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "../src/components/landing/components/Navigation";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-black text-white">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}>

        <Navigation />
        <div className="max-w-[1200px] mx-auto pt-16">
          {children}
        </div>
      </body>
    </html>
  );
}
