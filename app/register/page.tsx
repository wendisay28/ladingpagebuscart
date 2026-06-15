"use client";

import { useState } from 'react';
import { Loader2, CheckCircle, XCircle, Star, Zap, Mail, ShieldCheck, BadgeCheck } from 'lucide-react';
import SiteShell from '@/src/components/site/SiteShell';
import { cx } from '@/src/components/site/theme';

const PERKS = [
  { Icon: BadgeCheck, text: 'Acceso anticipado al lanzamiento' },
  { Icon: Zap, text: '0% de comisión para artistas fundadores' },
  { Icon: ShieldCheck, text: 'Pagos protegidos con Mercado Pago' },
];

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: 'Por favor ingresa tu correo electrónico', type: 'error' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage({ text: 'Por favor ingresa un correo electrónico válido', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'register' }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la solicitud');
      }

      setMessage({
        text: '¡Listo! Te avisaremos apenas abramos. Gracias por sumarte temprano.',
        type: 'success',
      });
      setEmail('');
    } catch (error) {
      console.error('Error al suscribirse:', error);
      setMessage({
        text: error instanceof Error ? error.message : 'Ocurrió un error al registrarse',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SiteShell activeSection="register">
      <section className="px-4 py-20 md:py-28">
        <div className="max-w-xl mx-auto">

          {/* Encabezado */}
          <div className="reveal text-center mb-10">
            <span className={`${cx.pill} mb-6`}>
              <Star className="w-4 h-4 [color:var(--site-accent)]" />
              Lista de espera abierta
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
              style={{ fontFamily: 'var(--font-display), system-ui, sans-serif' }}
            >
              Sé de los <span className={cx.gradText}>primeros</span> en BuscArt
            </h1>
            <p className={`${cx.muted} text-lg`}>
              Estamos afinando los últimos detalles. Déjanos tu correo y te
              avisamos apenas abramos en tu ciudad.
            </p>
          </div>

          {/* Tarjeta del formulario */}
          <div className={`reveal d1 ${cx.card} p-8`}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 [color:var(--site-muted)]">
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 [color:var(--site-muted)]" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    disabled={isSubmitting}
                    className="w-full pl-11 pr-4 py-3.5 rounded-xl outline-none transition-all duration-300 disabled:opacity-60 [background:var(--site-surface)] [border:1px_solid_var(--site-border)] [color:var(--site-ink)] placeholder:[color:var(--site-muted)] focus:[border-color:var(--site-border-hover)]"
                  />
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className={`${cx.btnPrimary} w-full disabled:opacity-70`}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" />
                    Procesando...
                  </>
                ) : (
                  'Unirme a la lista de espera'
                )}
              </button>
            </form>

            {message && (
              <div
                className="mt-5 p-4 rounded-xl flex items-start gap-3"
                style={{
                  background: message.type === 'success' ? 'rgba(16,185,129,0.12)' : 'rgba(239,68,68,0.12)',
                  border: `1px solid ${message.type === 'success' ? 'rgba(16,185,129,0.4)' : 'rgba(239,68,68,0.4)'}`,
                }}
              >
                {message.type === 'success' ? (
                  <CheckCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#34d399' }} />
                ) : (
                  <XCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: '#f87171' }} />
                )}
                <p className="text-sm" style={{ color: 'var(--site-ink)' }}>{message.text}</p>
              </div>
            )}

            {/* Beneficios */}
            <div className="mt-7 pt-6 flex flex-col gap-3" style={{ borderTop: '1px solid var(--site-border)' }}>
              {PERKS.map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center rounded-lg shrink-0 [color:var(--site-accent)]"
                    style={{ width: 28, height: 28, background: 'var(--site-surface)', border: '1px solid var(--site-border)' }}
                  >
                    <Icon size={15} />
                  </span>
                  <span className={`text-sm ${cx.muted}`}>{text}</span>
                </div>
              ))}
            </div>

            <p className={`mt-6 text-xs text-center ${cx.muted}`}>
              Al unirte aceptas nuestra Política de Privacidad y Términos de Servicio.
            </p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
