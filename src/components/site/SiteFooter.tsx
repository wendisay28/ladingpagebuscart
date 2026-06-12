import Link from 'next/link';
import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';

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
      { name: 'Preguntas frecuentes', href: '/preguntas-frecuentes' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Términos y condiciones', href: '/terminos' },
      { name: 'Política de privacidad', href: '/privacidad' },
    ],
  },
];

const socials = [
  { Icon: Instagram, href: '#', label: 'Instagram' },
  { Icon: Facebook, href: '#', label: 'Facebook' },
  { Icon: Twitter, href: '#', label: 'Twitter' },
];

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[#7c3aed]/15 bg-[#0a0618]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        {/* CTA */}
        <div className="rounded-3xl border border-[#7c3aed]/20 bg-gradient-to-br from-[#130d2a] to-[#0a0618] p-10 md:p-14 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
            Conecta con la industria{' '}
            <span className="bg-gradient-to-r from-[#a78bfa] via-[#8b5cf6] to-[#60a5fa] bg-clip-text text-transparent">
              creativa
            </span>
          </h2>
          <p className="text-[#c9bdf0]/70 max-w-2xl mx-auto mb-8">
            Artistas, empresas, eventos y espacios culturales en una sola plataforma.
            Sin costo de entrada para artistas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/explorar"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-gradient-to-r from-[#7c3aed] to-[#2563eb] hover:from-[#8b5cf6] hover:to-[#3b82f6] transition-all duration-300 hover:scale-[1.03]"
            >
              Explorar talento <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[#c9bdf0] border border-[#7c3aed]/30 hover:border-[#8b5cf6]/60 hover:bg-[#7c3aed]/10 hover:text-white transition-all duration-300"
            >
              Crear perfil gratis
            </Link>
          </div>
        </div>

        {/* Columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-[#a78bfa] to-[#60a5fa] bg-clip-text text-transparent">
              BuscArt
            </span>
            <p className="text-[#c9bdf0]/60 leading-relaxed mt-4 max-w-sm text-sm">
              El sistema que organiza, protege y hace escalable la industria creativa.
              Descubre, conecta, reserva y vive el arte.
            </p>
            <div className="flex gap-3 mt-6">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-[#7c3aed]/25 bg-[#7c3aed]/10 flex items-center justify-center text-[#c9bdf0] hover:text-white hover:border-[#8b5cf6]/60 hover:bg-[#7c3aed]/20 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-[#a78bfa] mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#c9bdf0]/70 hover:text-white transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-[#7c3aed]/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#c9bdf0]/50 text-sm">
            © {new Date().getFullYear()} BuscArt. Todos los derechos reservados.
          </p>
          <p className="text-[#c9bdf0]/40 text-xs">Hecho en Colombia 🇨🇴 · Economía naranja</p>
        </div>
      </div>
    </footer>
  );
}
