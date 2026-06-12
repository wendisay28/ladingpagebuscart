import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, ArrowRight, MessageCircle, Star } from 'lucide-react';
import SiteShell from '@/src/components/site/SiteShell';
import { cx } from '@/src/components/site/theme';

export const metadata: Metadata = {
  title: 'Contacto — BuscArt',
  description: '¿Tienes preguntas? Nuestro equipo está listo para ayudarte a conectar con el mundo del arte.',
};

const contactInfo = [
  { icon: Mail, title: 'Correo electrónico', desc: 'hola@buscart.co', link: 'mailto:hola@buscart.co' },
  { icon: Phone, title: 'Teléfono', desc: '+57 300 123 4567', link: 'tel:+573001234567' },
  { icon: MapPin, title: 'Ubicación', desc: 'Medellín, Colombia', link: 'https://maps.google.com/?q=Medellin,Colombia' },
];

const faqs = [
  { q: '¿Cómo me registro en la plataforma?', a: 'Haz clic en "Registrarse" y completa el formulario. Crear tu perfil es gratis y toma solo unos minutos.' },
  { q: '¿Cuánto cuesta usar BuscArt?', a: 'Para artistas no hay costo de entrada: solo pagas una comisión baja cuando concretas una contratación exitosa.' },
  { q: '¿Cómo contacto a un artista?', a: 'Búscalo en Explorar y contáctalo directamente desde su perfil verificado. Toda la gestión queda dentro de la plataforma.' },
  { q: '¿Cómo se protege mi pago?', a: 'El pago se retiene y se libera al artista solo tras validar la entrega mediante códigos de verificación.' },
];

const fieldCls =
  'w-full px-4 py-3.5 bg-[#0a0618]/60 border border-[#7c3aed]/25 rounded-xl text-white placeholder-[#c9bdf0]/40 focus:ring-2 focus:ring-[#8b5cf6]/50 focus:border-[#8b5cf6]/50 outline-none transition-all duration-300';
const labelCls = 'block text-sm font-medium text-[#c9bdf0] mb-2';

export default function ContactoPage() {
  return (
    <SiteShell activeSection="contacto">
      {/* Hero */}
      <section className="px-4 pt-20 pb-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className={`${cx.pill} reveal mb-8`}>
            <Star className="w-4 h-4 text-[#a78bfa]" />
            Estamos aquí para ayudarte
          </div>
          <h1 className="reveal d1 text-5xl md:text-7xl font-bold mb-6">
            Hablemos de <span className={cx.gradText}>arte</span>
          </h1>
          <p className={`reveal d2 text-lg md:text-xl ${cx.muted} max-w-2xl mx-auto`}>
            ¿Tienes una pregunta o necesitas ayuda? Nuestro equipo está listo para conectarte con
            el mundo creativo.
          </p>
        </div>
      </section>

      {/* Grid form + info */}
      <section className="px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form */}
          <div className={`reveal ${cx.card} p-8`}>
            <div className="flex items-center mb-8">
              <div className={`w-12 h-12 rounded-xl ${cx.gradBg} flex items-center justify-center mr-4`}>
                <Send className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Envíanos un mensaje</h2>
                <p className={`${cx.muted} text-sm`}>Te responderemos lo antes posible</p>
              </div>
            </div>

            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className={labelCls}>Nombre completo</label>
                  <input id="name" name="name" type="text" className={fieldCls} placeholder="Tu nombre" />
                </div>
                <div>
                  <label htmlFor="email" className={labelCls}>Correo electrónico</label>
                  <input id="email" name="email" type="email" className={fieldCls} placeholder="tu@email.com" />
                </div>
              </div>
              <div>
                <label htmlFor="type" className={labelCls}>Tipo de consulta</label>
                <select id="type" name="type" className={fieldCls}>
                  <option value="">Selecciona una opción</option>
                  <option value="artist">Soy artista</option>
                  <option value="business">Busco contratar talento</option>
                  <option value="support">Soporte técnico</option>
                  <option value="partnership">Alianzas comerciales</option>
                  <option value="other">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="subject" className={labelCls}>Asunto</label>
                <input id="subject" name="subject" type="text" className={fieldCls} placeholder="¿En qué podemos ayudarte?" />
              </div>
              <div>
                <label htmlFor="message" className={labelCls}>Mensaje</label>
                <textarea id="message" name="message" rows={5} className={`${fieldCls} resize-none`} placeholder="Cuéntanos más detalles..." />
              </div>
              <button type="submit" className={`${cx.btnPrimary} w-full`}>
                Enviar mensaje <Send className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Info + FAQ */}
          <div className="space-y-6">
            <div className={`reveal d1 ${cx.card} p-8`}>
              <h2 className="text-2xl font-bold mb-3">Información de contacto</h2>
              <p className={`${cx.muted} mb-6 leading-relaxed`}>
                Conecta con nosotros a través de cualquiera de estos canales.
              </p>
              <div className="space-y-3">
                {contactInfo.map(({ icon: Icon, title, desc, link }) => (
                  <Link
                    key={title}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center p-4 rounded-xl bg-[#0a0618]/50 border border-[#7c3aed]/15 hover:border-[#8b5cf6]/45 hover:bg-[#1a1035]/60 transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#7c3aed]/15 border border-[#7c3aed]/25 flex items-center justify-center text-[#a78bfa] group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{title}</h3>
                      <p className={`${cx.muted} text-sm`}>{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#c9bdf0]/40 ml-auto group-hover:text-[#a78bfa] group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            <div className={`reveal d2 ${cx.card} p-8`}>
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <span className={`w-9 h-9 rounded-lg ${cx.gradBg} flex items-center justify-center mr-3`}>
                  <MessageCircle className="w-4 h-4 text-white" />
                </span>
                Preguntas frecuentes
              </h3>
              <div className="space-y-5">
                {faqs.map((f) => (
                  <div key={f.q} className="border-b border-[#7c3aed]/12 pb-5 last:border-0 last:pb-0">
                    <h4 className="font-semibold mb-2">{f.q}</h4>
                    <p className={`${cx.muted} text-sm leading-relaxed`}>{f.a}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/preguntas-frecuentes"
                className="group inline-flex items-center mt-7 text-[#a78bfa] font-medium hover:text-white transition-colors"
              >
                Ver todas las preguntas frecuentes
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
