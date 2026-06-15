import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Search, Send, Lock, Route, KeyRound, Star,
  Users, Building2, ArrowRight, ShieldCheck, Wallet, TicketCheck,
} from 'lucide-react';
import SiteShell from '@/src/components/site/SiteShell';
import { cx } from '@/src/components/site/theme';

export const metadata: Metadata = {
  title: 'Cómo funciona — BuscArt',
  description:
    'Descubre, contrata y vive el arte con pagos protegidos y enrutamiento de procesos: del primer contacto a la entrega final.',
};

const pasos = [
  { icon: Search, t: 'Descubre y compara', d: 'Explora artistas, eventos y espacios. Compara portafolios, precios y disponibilidad en un solo lugar.' },
  { icon: Send, t: 'Envía tu solicitud', d: 'Contacta al artista o lanza una oferta con los detalles de tu evento. La negociación queda dentro de la plataforma.' },
  { icon: Lock, t: 'Pago protegido', d: 'Tu pago se procesa con Mercado Pago y se retiene de forma segura. El artista no recibe nada hasta cumplir.' },
  { icon: Route, t: 'Enrutamiento del proceso', d: 'Sigue cada etapa en tiempo real: llegada del artista → ejecución → entrega final. Transparencia total.' },
  { icon: KeyRound, t: 'Validación por código', d: 'Confirmas la entrega con un código de verificación. Solo entonces se libera el pago al artista.' },
  { icon: Star, t: 'Calificación mutua', d: 'Cliente y artista se califican entre sí. La reputación construye confianza para toda la comunidad.' },
];

export default function ComoFuncionaPage() {
  return (
    <SiteShell activeSection="como-funciona">
      {/* Hero */}
      <section className="px-4 pt-20 pb-16 text-center">
        <div className="max-w-3xl mx-auto">
          <div className={`${cx.pill} reveal mb-8`}>
            <ShieldCheck className="w-4 h-4 [color:var(--site-accent)]" />
            Pagos protegidos · Enrutamiento de procesos
          </div>
          <h1 className="reveal d1 text-5xl md:text-7xl font-bold mb-6 leading-[1.05]">
            Del primer contacto
            <span className={`block ${cx.gradText}`}>a la entrega final</span>
          </h1>
          <p className={`reveal d2 text-lg md:text-xl ${cx.muted} max-w-2xl mx-auto`}>
            Contratar arte debería ser tan seguro como sencillo. Así protegemos cada paso del
            proceso, para ti y para el artista.
          </p>
        </div>
      </section>

      {/* Pasos */}
      <section className="px-4 py-12">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pasos.map(({ icon: Icon, t, d }, i) => (
            <div key={t} className={`reveal d${(i % 3) + 1} ${cx.card} ${cx.cardHover} p-7 relative`}>
              <span className="absolute top-6 right-7 text-5xl font-bold [color:var(--site-accent)] opacity-15">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className={`w-12 h-12 rounded-xl ${cx.gradBg} flex items-center justify-center mb-5`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">{t}</h3>
              <p className={`${cx.muted} text-sm leading-relaxed`}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dos caminos */}
      <section className="px-4 py-20 border-t border-[#7c3aed]/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="reveal text-3xl md:text-4xl font-bold text-center mb-14">
            Pensado para ambos lados
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`reveal d1 ${cx.card} p-8`}>
              <div className="w-14 h-14 rounded-2xl bg-[#7c3aed]/15 border border-[#7c3aed]/25 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 [color:var(--site-accent)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Para artistas</h3>
              <ul className="space-y-3">
                {[
                  'Sin costo de entrada: creas tu perfil gratis.',
                  'Comisión baja, solo cuando concretas una contratación.',
                  'Pago garantizado: se libera tras validar tu entrega.',
                  'Portafolio, servicios con precios y publicaciones en un solo perfil.',
                ].map((li) => (
                  <li key={li} className={`flex gap-3 ${cx.muted} text-sm`}>
                    <Wallet className="w-4 h-4 [color:var(--site-accent)] mt-0.5 shrink-0" />
                    {li}
                  </li>
                ))}
              </ul>
              <Link href="/soy-artista" className={`${cx.btnPrimary} mt-7 w-full`}>
                Únete como artista <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className={`reveal d2 ${cx.card} p-8`}>
              <div className="w-14 h-14 rounded-2xl bg-[#2563eb]/15 border border-[#2563eb]/25 flex items-center justify-center mb-6">
                <Building2 className="w-7 h-7 [color:var(--site-accent-2)]" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Para empresas y eventos</h3>
              <ul className="space-y-3">
                {[
                  'Encuentra y compara talento verificado por categoría y ciudad.',
                  'Publica eventos pagos y vende entradas por horarios.',
                  'Reserva y monetiza espacios y salas culturales.',
                  'Procesos claros con seguimiento y soporte dedicado.',
                ].map((li) => (
                  <li key={li} className={`flex gap-3 ${cx.muted} text-sm`}>
                    <TicketCheck className="w-4 h-4 [color:var(--site-accent-2)] mt-0.5 shrink-0" />
                    {li}
                  </li>
                ))}
              </ul>
              <Link href="/busco-artistas" className={`${cx.btnGhost} mt-7 w-full`}>
                Busco talento <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center">
        <div className="reveal max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Empieza <span className={cx.gradText}>hoy</span>
          </h2>
          <p className={`${cx.muted} text-lg mb-10`}>
            Crear tu cuenta es gratis. Descubre por qué BuscArt es el sistema que organiza la
            industria creativa.
          </p>
          <Link href="/register" className={cx.btnPrimary}>
            Crear cuenta gratis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
