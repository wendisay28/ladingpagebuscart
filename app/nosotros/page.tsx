import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Users, UserCheck, Compass, Heart, LayoutGrid, Building2,
  ShieldCheck, Route, Scale, Zap, Star, Globe, Rocket,
  Home as HomeIcon, Bookmark, ArrowRight, BadgeCheck,
} from 'lucide-react';
import SiteShell from '@/src/components/site/SiteShell';
import { cx } from '@/src/components/site/theme';

export const metadata: Metadata = {
  title: 'Nosotros — BuscArt',
  description:
    'BuscArt es el sistema que organiza, protege y hace escalable la industria creativa: descubre, conecta, reserva y vive el arte.',
};

const modulos = [
  { icon: HomeIcon, title: 'Home', desc: 'Feed cultural tipo red social con un algoritmo que da visibilidad a los artistas emergentes, no solo a los famosos.' },
  { icon: Compass, title: 'Explorar', desc: 'Descubre artistas, eventos cercanos y espacios culturales. Reserva o asiste desde un solo lugar.' },
  { icon: UserCheck, title: 'Perfil', desc: 'Portafolio de fotos y videos, servicios con precios y publicaciones. Tu vitrina y tu herramienta de venta.' },
  { icon: Bookmark, title: 'Favoritos', desc: 'Guarda artistas, eventos, publicaciones y espacios con una estética visual inspirada en los muros que amas.' },
  { icon: LayoutGrid, title: 'Portal de Autores', desc: 'Centro de control: contrataciones, pagos, seguimiento de servicios, creación de eventos y publicación de espacios.' },
  { icon: Building2, title: 'Espacios y Salas', desc: 'Museos, estudios, cafés culturales y salones. Venta de entradas por horarios, alquiler y acceso a experiencias.' },
];

const valores = [
  { icon: Rocket, title: 'Innovación', desc: 'Tecnología e inteligencia artificial al servicio de la cultura y el arte.' },
  { icon: ShieldCheck, title: 'Confiabilidad', desc: 'Procesos claros, seguros y transparentes en cada contratación y transacción.' },
  { icon: Zap, title: 'Accesibilidad', desc: 'Eliminamos barreras geográficas y económicas entre el talento y las oportunidades.' },
  { icon: Scale, title: 'Equidad', desc: 'Oportunidades justas para artistas emergentes y consolidados por igual.' },
  { icon: Star, title: 'Impacto social', desc: 'Fortalecemos la economía naranja y el desarrollo cultural de Colombia.' },
  { icon: Heart, title: 'Pasión cultural', desc: 'Cada interacción con el arte debe ser memorable e inspiradora.' },
];

const impacto = [
  { value: '3,4%', label: 'del PIB colombiano lo aporta la economía naranja' },
  { value: '0%', label: 'de comisión para artistas durante el lanzamiento' },
  { value: '100%', label: 'de los pagos protegidos con Mercado Pago' },
  { value: '3', label: 'ciudades para empezar: Bogotá, Medellín y Cali' },
];

export default function NosotrosPage() {
  return (
    <SiteShell activeSection="nosotros">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`${cx.pill} reveal mb-8`}>
            <BadgeCheck className="w-4 h-4 [color:var(--site-accent)]" />
            Transformando la industria creativa colombiana
          </div>
          <h1 className="reveal d1 text-5xl md:text-7xl font-bold leading-[1.05] mb-8">
            No conectamos artistas.
            <span className={`block ${cx.gradText}`}>Organizamos una industria.</span>
          </h1>
          <p className={`reveal d2 text-lg md:text-xl ${cx.muted} max-w-3xl mx-auto leading-relaxed`}>
            BuscArt no es una app para contratar artistas. Es el ecosistema donde ocurre la
            experiencia completa: descubrir, conectar, reservar y vivir el arte — un sistema que
            organiza, protege y hace escalable la economía creativa.
          </p>
          <div className="reveal d3 flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link href="/explorar" className={cx.btnPrimary}>
              Explorar la plataforma <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/como-funciona" className={cx.btnGhost}>
              Cómo funciona
            </Link>
          </div>
        </div>
      </section>

      {/* Misión / Visión / Propósito */}
      <section className="px-4 py-20 border-t border-[#7c3aed]/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Nuestra misión</h2>
            <p className={`${cx.muted} text-lg leading-relaxed`}>
              Democratizar el acceso a la cultura, profesionalizar el sector creativo colombiano y
              generar oportunidades económicas sostenibles para cada artista.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Globe, t: 'Visión', d: 'Ser la plataforma líder de economía naranja en Latinoamérica, transformando cómo se crea y consume cultura.' },
              { icon: Rocket, t: 'Propósito', d: 'Empoderar a cada artista con herramientas digitales de clase mundial para hacer crecer su carrera.' },
              { icon: Heart, t: 'Compromiso', d: 'Construir una comunidad inclusiva donde cada talento encuentre su lugar y su oportunidad de brillar.' },
            ].map(({ icon: Icon, t, d }, i) => (
              <div key={t} className={`reveal d${i + 1} ${cx.card} ${cx.cardHover} p-8`}>
                <div className={`w-14 h-14 rounded-2xl ${cx.gradBg} flex items-center justify-center mb-6`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3">{t}</h3>
                <p className={`${cx.muted} leading-relaxed`}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section className="px-4 py-20 border-t border-[#7c3aed]/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Un ecosistema, seis módulos</h2>
            <p className={`${cx.muted} text-lg`}>
              Todo lo que la industria creativa necesita, integrado en una sola plataforma.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modulos.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`reveal d${(i % 3) + 1} ${cx.card} ${cx.cardHover} p-7 group`}>
                <div className="w-12 h-12 rounded-xl bg-[#7c3aed]/15 border border-[#7c3aed]/25 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 [color:var(--site-accent)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className={`${cx.muted} text-sm leading-relaxed`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo protegemos */}
      <section className="px-4 py-20 border-t border-[#7c3aed]/10">
        <div className="max-w-5xl mx-auto">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">El artista siempre protegido</h2>
            <p className={`${cx.muted} text-lg`}>
              Confianza por diseño: cada contratación tiene garantías reales para ambas partes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, t: 'Garantía de desembolso', d: 'El pago se retiene y se libera al artista solo tras validar la entrega mediante códigos de verificación.' },
              { icon: Route, t: 'Enrutamiento de procesos', d: 'Cada contratación tiene un recorrido visible: llegada del artista → ejecución → entrega final.' },
              { icon: Scale, t: 'Disputas y calificación', d: 'Sistema de disputas y calificación bidireccional entre cliente y artista. Transparencia total.' },
            ].map(({ icon: Icon, t, d }, i) => (
              <div key={t} className={`reveal d${i + 1} ${cx.card} p-8 text-center`}>
                <div className={`w-16 h-16 mx-auto rounded-2xl ${cx.gradBg} flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold mb-3">{t}</h3>
                <p className={`${cx.muted} text-sm leading-relaxed`}>{d}</p>
              </div>
            ))}
          </div>
          <p className={`reveal ${cx.muted} text-center text-sm mt-10 max-w-2xl mx-auto`}>
            Para artistas: sin costo de entrada, comisión baja solo cuando ganan. Pagos procesados
            de forma segura con Mercado Pago, optimizado para Colombia.
          </p>
        </div>
      </section>

      {/* Valores */}
      <section className="px-4 py-20 border-t border-[#7c3aed]/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Nuestros valores</h2>
            <p className={`${cx.muted} text-lg`}>Los principios que guían cada decisión en BuscArt.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className={`reveal d${(i % 3) + 1} ${cx.card} ${cx.cardHover} p-7`}>
                <div className="w-12 h-12 rounded-xl bg-[#2563eb]/15 border border-[#2563eb]/25 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 [color:var(--site-accent-2)]" />
                </div>
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className={`${cx.muted} text-sm leading-relaxed`}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impacto */}
      <section className="px-4 py-20 border-t border-[#7c3aed]/10">
        <div className="max-w-6xl mx-auto">
          <div className="reveal text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-5">Por qué construimos BuscArt</h2>
            <p className={`${cx.muted} text-lg`}>
              La economía naranja mueve a Colombia y nosotros apenas empezamos:
              estos son nuestros compromisos desde el primer día.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impacto.map((s, i) => (
              <div key={s.label} className={`reveal d${(i % 4) + 1} ${cx.card} p-8 text-center`}>
                <p className={`text-4xl md:text-5xl font-bold mb-3 ${cx.gradText}`}>{s.value}</p>
                <p className={`${cx.muted} text-sm leading-relaxed`}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24">
        <div className="reveal max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            ¿Listo para ser parte de la
            <span className={`block ${cx.gradText}`}>revolución cultural?</span>
          </h2>
          <p className={`${cx.muted} text-lg mb-10`}>
            Únete a la comunidad que está profesionalizando la industria creativa colombiana.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/soy-artista" className={cx.btnPrimary}>
              <Users className="w-5 h-5" /> Soy artista
            </Link>
            <Link href="/busco-artistas" className={cx.btnGhost}>
              <Building2 className="w-5 h-5" /> Busco talento
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
