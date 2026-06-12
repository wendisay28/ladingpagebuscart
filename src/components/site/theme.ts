/**
 * theme.ts — Tokens de marca BuscArt para la landing.
 * Fuente de verdad: artistas-app-web/src/lib/brand.ts
 * Paleta: púrpura #7c3aed → azul #2563eb sobre base oscura #0a0618.
 */

export const BRAND = {
  primary: '#7c3aed',
  primaryLight: '#8b5cf6',
  accent: '#9333ea',
  accentMid: '#a78bfa',
  blue: '#2563eb',
  blueLight: '#3b82f6',
  bg: '#0a0618',
  bgSecondary: '#130d2a',
  surface: '#1a1035',
  border: 'rgba(139,92,246,0.20)',
  textMuted: 'rgba(220,210,255,0.62)',
} as const;

/** Clases reutilizables para mantener consistencia (Tailwind v4 arbitrary values). */
export const cx = {
  // Superficies
  card: 'bg-[#130d2a]/60 backdrop-blur-xl border border-[#7c3aed]/20 rounded-2xl',
  cardHover:
    'hover:border-[#8b5cf6]/45 hover:bg-[#1a1035]/70 transition-all duration-300',
  // Texto
  muted: 'text-[#c9bdf0]/70',
  // Gradiente de marca
  gradText:
    'bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#60a5fa] bg-clip-text text-transparent',
  gradBg: 'bg-gradient-to-r from-[#7c3aed] to-[#2563eb]',
  gradBgHover: 'hover:from-[#8b5cf6] hover:to-[#3b82f6]',
  // Botones
  btnPrimary:
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] hover:from-[#8b5cf6] hover:to-[#3b82f6] transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-[#7c3aed]/25',
  btnGhost:
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#c9bdf0] border border-[#7c3aed]/30 hover:border-[#8b5cf6]/60 hover:bg-[#7c3aed]/10 hover:text-white transition-all duration-300',
  // Badge / pill
  pill:
    'inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7c3aed]/25 bg-[#7c3aed]/10 backdrop-blur-sm text-[#c9bdf0] text-sm font-medium',
} as const;
