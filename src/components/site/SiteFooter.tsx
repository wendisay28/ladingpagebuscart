'use client';

import Link from 'next/link';
import { Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';
import { useTheme } from '@/src/context/ThemeContext';
import { cx } from './theme';

const columns = [
  {
    title: 'Plataforma',
    links: [
      { name: 'Explorar', href: '/explorar' },
      { name: 'Busco artistas', href: '/busco-artistas' },
      { name: 'Soy artista', href: '/soy-artista' },
      { name: 'Cómo funciona', href: '/como-funciona' },
    ],
  },
  {
    title: 'BuscArt',
    links: [
      { name: 'Nosotros', href: '/nosotros' },
      { name: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Términos y condiciones', href: '/contacto' },
      { name: 'Política de privacidad', href: '/contacto' },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Youtube, href: '#', label: 'YouTube' },
];

export default function SiteFooter() {
  const { isDark } = useTheme();

  return (
    <footer
      className="relative z-10"
      style={{
        borderTop: '1px solid var(--site-border)',
        backgroundColor: isDark ? '#070410' : '#e9e0ff',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* CTA */}
        <div className={`${cx.card} p-10 md:p-14 text-center mb-16`}>
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${cx.ink}`} style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
            Conecta con la industria <span className={cx.gradText}>creativa</span>
          </h2>
          <p className={`max-w-2xl mx-auto mb-8 ${cx.muted}`}>
            Artistas, empresas, eventos y espacios culturales en una sola plataforma.
            Sin costo de entrada para artistas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/explorar" className={cx.btnPrimary}>
              Explorar talento <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/register" className={cx.btnGhost}>
              Crear perfil gratis
            </Link>
          </div>
        </div>

        {/* Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <span className={`text-2xl font-bold ${cx.gradText}`} style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
              BuscArt
            </span>
            <p className={`leading-relaxed mt-4 max-w-sm text-sm ${cx.muted}`}>
              El sistema que organiza, protege y hace escalable la industria creativa.
              Descubre, conecta, reserva y vive el arte.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 [color:var(--site-muted)] hover:[color:var(--site-ink)]"
                  style={{ background: 'var(--site-surface)', border: '1px solid var(--site-border)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className={`text-sm font-semibold mb-5 ${cx.ink}`} style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors duration-200 [color:var(--site-muted)] hover:[color:var(--site-ink)]"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid var(--site-border)' }}>
          <p className={`text-sm ${cx.muted}`}>
            © {new Date().getFullYear()} BuscArt. Todos los derechos reservados.
          </p>
          <p className={`text-xs ${cx.muted}`}>Hecho en Colombia · Economía naranja</p>
        </div>
      </div>
    </footer>
  );
}
