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

/**
 * Clases reutilizables reactivas al tema (Tailwind v4 arbitrary properties).
 * Los colores se resuelven con variables CSS que SiteShell define según el tema
 * (ver --site-* en SiteShell). Así claro/oscuro funcionan sin tocar cada página.
 */
export const cx = {
  // Superficies de vidrio
  card: 'backdrop-blur-xl rounded-2xl [background:var(--site-surface)] [border:1px_solid_var(--site-border)]',
  cardHover:
    'transition-all duration-300 hover:[background:var(--site-surface-hover)] hover:[border-color:var(--site-border-hover)]',
  // Texto
  ink: '[color:var(--site-ink)]',
  muted: '[color:var(--site-muted)]',
  // Gradiente de marca (los stops cambian por tema para mantener contraste)
  gradText:
    'bg-clip-text text-transparent [background-image:linear-gradient(to_right,var(--site-grad-a),var(--site-grad-b))]',
  gradBg: 'bg-gradient-to-r from-[#7c3aed] to-[#2563eb]',
  gradBgHover: 'hover:from-[#8b5cf6] hover:to-[#3b82f6]',
  // Botones
  btnPrimary:
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] hover:from-[#8b5cf6] hover:to-[#3b82f6] transition-all duration-300 hover:scale-[1.03] shadow-lg shadow-[#7c3aed]/25',
  btnGhost:
    'inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold [color:var(--site-muted)] [border:1px_solid_var(--site-border)] hover:[border-color:var(--site-border-hover)] hover:[background:var(--site-surface-hover)] hover:[color:var(--site-ink)] transition-all duration-300',
  // Badge / pill
  pill:
    'inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium [background:var(--site-surface)] [border:1px_solid_var(--site-border)] [color:var(--site-muted)]',
} as const;
