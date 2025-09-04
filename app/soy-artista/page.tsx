'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Music, Calendar, DollarSign, MapPin, Users, Mail, Instagram, Youtube, Facebook, User, Loader2, XCircle } from 'lucide-react';

export default function SoyArtistaPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoArtista: '',
    experiencia: '',
    redes: '',
    mensaje: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  type FormField = keyof typeof formData;
  const requiredFields: FormField[] = ['nombre', 'email', 'telefono', 'tipoArtista', 'experiencia', 'mensaje'];

  const validateField = (name: string, value: string): string => {
    if (requiredFields.includes(name as FormField) && !value.trim()) {
      return 'Este campo es requerido';
    }
    
    if (name === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Ingresa un correo electrónico válido';
    }
    
    if (name === 'telefono' && value && !/^[0-9+\-\s()]{7,20}$/.test(value)) {
      return 'Ingresa un número de teléfono válido';
    }
    
    if (name === 'experiencia' && value && isNaN(Number(value))) {
      return 'Ingresa un número válido';
    }
    
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'experiencia' ? value.toString().replace(/\D/g, '') : value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    Object.entries(formData).forEach(([key, value]) => {
      if (requiredFields.includes(key as FormField)) {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
        }
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      // Aquí iría la llamada a tu API
      // Ejemplo: await submitArtistForm(formData);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulación de API call
      
      setSubmitStatus('success');
      // Limpiar el formulario después de un envío exitoso
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        tipoArtista: '',
        experiencia: '',
        redes: '',
        mensaje: ''
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const beneficios = [
    { icon: <Users className="w-8 h-8 text-purple-400 animate-bounce" />, title: "Más Oportunidades", description: "Conecta con miles de organizadores de eventos." },
    { icon: <DollarSign className="w-8 h-8 text-green-400 animate-bounce" />, title: "Mejores Ingresos", description: "Fija tus precios y recibe pagos seguros." },
    { icon: <Calendar className="w-8 h-8 text-blue-400 animate-bounce" />, title: "Agenda Digital", description: "Administra tus presentaciones desde un solo lugar." },
    { icon: <CheckCircle className="w-8 h-8 text-yellow-400 animate-bounce" />, title: "Perfil Verificado", description: "Gana credibilidad con reseñas de clientes reales." }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/20 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.3),transparent)] animate-pulse"></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
              Lleva tu talento al siguiente nivel
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Conecta con los organizadores de eventos más importantes y haz crecer tu carrera artística. 
              Gana más, administra tus presentaciones y construye tu audiencia con nosotros.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#registro"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-purple-500/30"
              >
                Comenzar ahora
                <ArrowRight className="ml-3 w-5 h-5" />
              </a>
              <a 
                href="#beneficios"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-medium text-lg hover:bg-white/20 transition-colors duration-300"
              >
                Conocer más
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Beneficios Exclusivos para Artistas</h2>
          <p className="text-gray-400 mb-12 max-w-3xl mx-auto">Impulsa tu carrera con todas las herramientas y oportunidades que ofrecemos.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {beneficios.map((b, i) => (
              <div key={i} className="bg-gray-800/40 backdrop-blur-md rounded-2xl p-6 hover:scale-105 transition-transform duration-300 shadow-lg border border-gray-700/40 hover:border-purple-500/50">
                <div className="w-16 h-16 flex items-center justify-center bg-gray-700/40 rounded-xl mb-4 mx-auto hover:rotate-12 transition-transform duration-300">
                  {b.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
                <p className="text-gray-300">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section (original layout) */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">¿Cómo Funciona?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Sigue estos sencillos pasos para comenzar a recibir propuestas laborales.</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500"></div>
              {[
                { step: 1, title: "Crea tu Perfil", description: "Completa tu perfil con fotos, videos y detalles sobre tu trabajo.", icon: <User className="w-6 h-6" /> },
                { step: 2, title: "Configura tu Disponibilidad", description: "Indica cuándo estás disponible para presentaciones.", icon: <Calendar className="w-6 h-6" /> },
                { step: 3, title: "Recibe Ofertas", description: "Los organizadores te contactarán para tus servicios.", icon: <Mail className="w-6 h-6" /> },
                { step: 4, title: "Gana Dinero", description: "Acepta ofertas, realiza tus presentaciones y recibe pagos seguros.", icon: <DollarSign className="w-6 h-6" /> }
              ].map((item, index) => (
                <div key={index} className={`flex flex-col md:flex-row items-center mb-12 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left md:flex-row-reverse'}`}>
                  <div className={`md:w-1/2 px-4 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4 animate-pulse">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  <div className="hidden md:block w-1/2 px-4">
                    <div className={`h-48 bg-gray-800/50 rounded-xl flex items-center justify-center ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'} animate-fade-in`} style={{ width: '80%' }}>
                      {item.icon && <div className="text-purple-400">{item.icon}</div>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section id="registro" className="py-20 bg-black/80">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-gray-900/60 backdrop-blur-lg rounded-3xl overflow-hidden border border-gray-700/50 shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Regístrate como Artista</h2>
                  <p className="text-gray-300 mb-8">Completa el formulario y empieza a recibir ofertas de trabajo.</p>
                  <ul className="space-y-4">
                    {['Sin costos ocultos', 'Pagos seguros y a tiempo', 'Soporte 24/7'].map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-8">
                  <p className="text-gray-400 mb-2">Contáctanos:</p>
                  <a href="mailto:artistas@buscart.co" className="flex items-center text-purple-400 hover:text-purple-300"><Mail className="w-5 h-5 mr-2" /> artistas@buscart.co</a>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12 bg-black/50">
                {submitStatus === 'success' ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">¡Solicitud Enviada!</h3>
                    <p className="text-gray-300 mb-6">Hemos recibido tu información. Nos pondremos en contacto contigo pronto.</p>
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Enviar otra solicitud
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {[
                      { id: 'nombre', type: 'text', label: 'Nombre Completo' },
                      { id: 'email', type: 'email', label: 'Correo Electrónico' },
                      { id: 'telefono', type: 'tel', label: 'Teléfono' },
                      {
                        id: 'tipoArtista',
                        type: 'select',
                        label: 'Tipo de Artista',
                        options: [
                          { value: '', label: 'Selecciona una opción', disabled: true },
                          { value: 'musico', label: 'Músico' },
                          { value: 'dj', label: 'DJ' },
                          { value: 'banda', label: 'Banda' },
                          { value: 'cantante', label: 'Cantante' },
                          { value: 'bailarin', label: 'Bailarín' },
                          { value: 'otro', label: 'Otro' }
                        ]
                      },
                      { 
                        id: 'experiencia', 
                        type: 'number', 
                        label: 'Años de Experiencia',
                        min: 0,
                        max: 100
                      },
                      { id: 'redes', type: 'text', label: 'Redes Sociales o Sitio Web (opcional)' },
                      { 
                        id: 'mensaje', 
                        type: 'textarea', 
                        label: 'Cuéntanos sobre ti',
                        placeholder: 'Describe tu estilo, experiencia y lo que te hace único...',
                        rows: 4
                      }
                    ].map((field) => (
                      <div key={field.id} className="space-y-1">
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-300">
                          {field.label}
                          {requiredFields.includes(field.id as FormField) && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>
                        
                        {field.type === 'select' ? (
                          <select
                            id={field.id}
                            name={field.id}
                            value={formData[field.id as FormField]}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 bg-gray-900/50 border ${
                              errors[field.id] ? 'border-red-500' : 'border-gray-800'
                            } rounded-lg focus:ring-2 focus:ring-purple-500 text-white`}
                          >
                            {field.options?.map((opt) => (
                              <option 
                                key={opt.value} 
                                value={opt.value}
                                disabled={opt.disabled}
                              >
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : field.type === 'textarea' ? (
                          <textarea
                            id={field.id}
                            name={field.id}
                            value={formData[field.id as FormField]}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            placeholder={field.placeholder}
                            rows={field.rows || 3}
                            className={`w-full px-4 py-3 bg-gray-900/50 border ${
                              errors[field.id] ? 'border-red-500' : 'border-gray-800'
                            } rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500`}
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={formData[field.id as FormField]}
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            min={field.min}
                            max={field.max}
                            className={`w-full px-4 py-3 bg-gray-900/50 border ${
                              errors[field.id] ? 'border-red-500' : 'border-gray-800'
                            } rounded-lg focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-500`}
                          />
                        )}
                        
                        {errors[field.id] && (
                          <p className="text-sm text-red-400">{errors[field.id]}</p>
                        )}
                      </div>
                    ))}
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          'Enviar Solicitud'
                        )}
                      </button>
                      
                      {submitStatus === 'error' && (
                        <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 text-red-200 rounded-lg text-sm flex items-center gap-2">
                          <XCircle className="w-5 h-5 flex-shrink-0" />
                          <span>Ocurrió un error al enviar el formulario. Por favor, inténtalo de nuevo.</span>
                        </div>
                      )}
                      
                      <p className="mt-4 text-xs text-gray-400">
                        Al enviar este formulario, aceptas nuestros Términos de Servicio y Política de Privacidad.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para Impulsar tu Carrera?</h2>
        <p className="text-gray-300 mb-8 max-w-3xl mx-auto">Únete a nuestra comunidad de artistas y comienza a recibir ofertas hoy mismo.</p>
        <a href="#registro" className="inline-flex items-center justify-center px-10 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:scale-105 transition-transform duration-300 shadow-md">
          Regístrate Ahora
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-gray-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Buscart</h3>
            <p className="text-gray-400 mt-2">Conectando artistas con oportunidades</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white"><Instagram className="w-6 h-6 hover:scale-110 transition-transform duration-200" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Facebook className="w-6 h-6 hover:scale-110 transition-transform duration-200" /></a>
            <a href="#" className="text-gray-400 hover:text-white"><Youtube className="w-6 h-6 hover:scale-110 transition-transform duration-200" /></a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Buscart. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
