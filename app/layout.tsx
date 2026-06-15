import type { Metadata } from "next";
import { Geist, Geist_Mono, Schibsted_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/src/context/ThemeContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Schibsted_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "BuscArt - Busca, compara y contrata arte cerca de ti",
  description: "Encuentra y contrata artistas locales. Compara precios, estilos y disponibilidad para tu próximo evento o proyecto.",
};

// Script bloqueante: pinta el fondo correcto antes del primer paint (evita el flash).
const themeInit = `(function(){try{var t=localStorage.getItem('buscart-theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;var r=document.documentElement;r.dataset.theme=d?'dark':'light';r.style.backgroundColor=d?'#0a0618':'#f0ebff';}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased min-h-screen flex flex-col`}>
        <ThemeProvider>
          <div className="w-full flex-1 flex flex-col">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
