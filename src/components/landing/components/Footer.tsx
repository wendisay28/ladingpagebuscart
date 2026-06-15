"use client";
import {
  Instagram, Facebook, Youtube, MapPin,
  UserPlus, Image as ImageIcon, Wallet, CalendarDays,
  Search, FileText, Tag, LifeBuoy,
  Info, Newspaper, Briefcase, Mail,
} from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";

const COLUMNS = [
  {
    heading: "Para artistas",
    links: [
      { name: "Crear perfil", Icon: UserPlus, href: "/register" },
      { name: "Portafolio", Icon: ImageIcon, href: "/soy-artista" },
      { name: "Comisiones", Icon: Wallet, href: "/servicios" },
      { name: "Eventos", Icon: CalendarDays, href: "/lugares" },
    ],
  },
  {
    heading: "Para clientes",
    links: [
      { name: "Buscar artistas", Icon: Search, href: "/busco-artistas" },
      { name: "Proyectos", Icon: FileText, href: "/servicios" },
      { name: "Precios", Icon: Tag, href: "/servicios#precios" },
      { name: "Soporte", Icon: LifeBuoy, href: "/contacto" },
    ],
  },
  {
    heading: "Empresa",
    links: [
      { name: "Acerca de", Icon: Info, href: "/nosotros" },
      { name: "Cómo funciona", Icon: Newspaper, href: "/como-funciona" },
      { name: "Espacios", Icon: Briefcase, href: "/lugares" },
      { name: "Contacto", Icon: Mail, href: "/contacto" },
    ],
  },
];

const SOCIAL = [
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Facebook, label: "Facebook", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
];

export default function Footer() {
  const { isDark } = useTheme();

  const ink = isDark ? "#f5f3ff" : "#1f2937";
  const accent = isDark ? "#a78bfa" : "#6d28d9";
  const body = isDark ? "#b9b3cf" : "#4b5563";
  const muted = isDark ? "#8d86a8" : "#6b7280";
  const hairline = isDark ? "rgba(255,255,255,0.10)" : "rgba(124,58,237,0.16)";

  return (
    <footer
      className="relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: isDark ? "#070410" : "#e9e0ff" }}
    >
      {/* Filo superior con luz de marca */}
      <div aria-hidden className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.55), rgba(37,99,235,0.45), transparent)" }} />
      {/* Glow cenital suave */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          left: "50%", top: "-30%", width: "60vw", aspectRatio: "1",
          transform: "translateX(-50%)",
          background: `radial-gradient(closest-side, ${isDark ? "rgba(124,58,237,0.16)" : "rgba(124,58,237,0.12)"}, transparent 70%)`,
        }}
      />

      <div className="relative max-w-[1320px] mx-auto px-4 sm:px-6 pt-16 lg:pt-20 pb-8 z-10">

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 mb-14">

          {/* Marca */}
          <div className="lg:col-span-2 max-w-sm">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#2563eb] bg-clip-text text-transparent" style={{ fontFamily: "var(--font-display), system-ui, sans-serif" }}>
              BuscArt
            </span>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: body, marginTop: 16, marginBottom: 24 }}>
              El ecosistema que conecta artistas, eventos y espacios culturales,
              con pagos protegidos de inicio a fin.
            </p>

            <div className="flex items-center gap-2 mb-7" style={{ fontSize: 13.5, color: muted }}>
              <MapPin size={14} style={{ color: accent }} />
              Bogotá · Medellín · Cali
            </div>

            <div className="flex gap-3">
              {SOCIAL.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                  style={{
                    width: 44, height: 44,
                    background: isDark ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.55)",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.9)"}`,
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    color: accent,
                  }}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Columnas de enlaces */}
          {COLUMNS.map(({ heading, links }) => (
            <div key={heading}>
              <h4
                style={{
                  fontFamily: "var(--font-display), system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: ink,
                  marginBottom: 18,
                }}
              >
                {heading}
              </h4>
              <ul className="flex flex-col gap-3.5">
                {links.map(({ name, Icon, href }) => (
                  <li key={name}>
                    <a
                      href={href}
                      className="group inline-flex items-center gap-2.5 transition-colors duration-200"
                      style={{ fontSize: 14, color: body }}
                    >
                      <Icon size={15} style={{ color: muted }} className="transition-colors duration-200 group-hover:!text-current" />
                      <span className="group-hover:underline underline-offset-4" style={{ textDecorationColor: accent }}>
                        {name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Barra inferior */}
        <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${hairline}` }}>
          <p style={{ fontSize: 13, color: muted }}>
            © {new Date().getFullYear()} BuscArt. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-7" style={{ fontSize: 13 }}>
            {["Términos de servicio", "Política de privacidad", "Cookies"].map((label) => (
              <a key={label} href="#" className="transition-colors duration-200 hover:underline underline-offset-4" style={{ color: muted, textDecorationColor: accent }}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
