'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import { PRODUCT_NAME, COMPANY_NAME } from '@/config/site';
import { Sparkles, Shield, Zap, ArrowLeftRight, Database } from 'lucide-react';
import { sendContactEmail } from '@/app/actions/contact';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    neighborhood: '',
    location: '',
    lots: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const conquestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
        }
      });
    }, observerOptions);

    const refs = [heroRef, metricsRef, featuresRef, previewRef, conquestRef, comparisonRef, ctaRef];
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    if (!formData.name || !formData.whatsapp || !formData.neighborhood || !formData.location || !formData.lots) {
      alert('Por favor completa todos los campos');
      setIsSubmitting(false);
      return;
    }
    
    // Send email using Server Action
    const result = await sendContactEmail(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', whatsapp: '', neighborhood: '', location: '', lots: '' });
      }, 3000);
    } else {
      alert('Error al enviar el mensaje. Por favor intentá nuevamente.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Navbar />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section ref={heroRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 opacity-0 transition-opacity duration-700">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              La gestión de tu barrio, ahora es{' '}
              <span className="text-blue-600">Smart</span> y{' '}
              <span className="text-blue-600">Transparente</span>.
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Automatizá expensas, controlá accesos con QR y mejorá la convivencia en un solo lugar. 
              El sistema que los administradores aman y los vecinos confían.
            </p>
            <button 
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Solicitar Demo
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </section>

        {/* Social Proof / Metrics */}
        <section ref={metricsRef} className="py-16 bg-white opacity-0 transition-opacity duration-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">+1000</div>
                <div className="text-gray-600">Vecinos Conectados</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">99%</div>
                <div className="text-gray-600">Transparencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="text-gray-600">Soporte</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section ref={featuresRef} className="py-20 bg-gray-50 opacity-0 transition-opacity duration-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Todo lo que tu barrio necesita
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Financias */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Finanzas</h3>
                <p className="text-gray-600 leading-relaxed">
                  Automatización de expensas, recibos PDF automáticos y reportes de morosidad.
                </p>
              </div>

              {/* Seguridad Smart */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Seguridad Smart <span className="text-sm text-blue-600">v1.1</span></h3>
                <p className="text-gray-600 leading-relaxed">
                  Control de acceso con QR dinámico, registro de visitas y gestión de obras privadas.
                </p>
              </div>

              {/* Comunidad */}
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Comunidad</h3>
                <p className="text-gray-600 leading-relaxed">
                  Muro de comunicados, reporte de incidentes con fotos y reservas de amenities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Preview v1.1.0 - Bento Grid */}
        <section ref={previewRef} className="py-20 bg-gray-50 opacity-0 transition-opacity duration-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
              Preview v1.1.0
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Nuevas funcionalidades que transformarán tu gestión
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* IA de Conciliación - Large Card */}
              <div className="md:col-span-2 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-3">Asistente Administrativo con IA</h3>
                    <p className="text-blue-100 text-lg leading-relaxed">
                      Optimice su gestión con inteligencia artificial. Nuestra IA redacta comunicados profesionales para los vecinos y mejora la redacción de sus mensajes, ahorrando un 80% de tiempo en tareas cotidianas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Módulo Obras */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Módulo Obras</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Validación de ART y seguros en tiempo real con bloqueo automático en guardia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Performance Boost */}
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Zap className="w-7 h-7 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Performance Boost</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Optimización de carga y respuesta instantánea para una experiencia fluida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner de Conquista (Switching Zero) */}
        <section ref={conquestRef} className="py-16 bg-gradient-to-r from-orange-500 to-red-600 opacity-0 transition-opacity duration-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center text-white">
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <ArrowLeftRight className="w-8 h-8 text-white" />
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Database className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                ¿Querés migrar tus datos desde otro sistema?
              </h3>
              <p className="text-lg md:text-xl text-orange-100 max-w-3xl mx-auto leading-relaxed">
                Te ayudamos con la transición completa de tu historial sin cargo y sin errores.
              </p>
            </div>
          </div>
        </section>

        {/* Comparative Section */}
        <section ref={comparisonRef} className="py-20 bg-white opacity-0 transition-opacity duration-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
              Por qué elegirnos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Administración Tradicional */}
              <div className="bg-red-50 rounded-2xl p-8 border-2 border-red-200">
                <h3 className="text-2xl font-bold text-red-600 mb-6">
                  Administración Tradicional
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <span className="text-gray-700">Lenta y manual</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <span className="text-gray-700">Papel y carpetas</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <span className="text-gray-700">Opaca y sin trazabilidad</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 text-xl">✗</span>
                    <span className="text-gray-700">Comunicación lenta</span>
                  </li>
                </ul>
              </div>

              {/* {PRODUCT_NAME} */}
              <div className="bg-green-50 rounded-2xl p-8 border-2 border-green-200">
                <h3 className="text-2xl font-bold text-green-600 mb-6">
                  {PRODUCT_NAME}
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">Instantánea y automatizada</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">100% digital</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">Auditable y transparente</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 text-xl">✓</span>
                    <span className="text-gray-700">Comunicación en tiempo real</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section id="contact-form" ref={ctaRef} className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 opacity-0 transition-opacity duration-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
              <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                Solicitá tu Cotización Personalizada
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Completá el formulario y nos pondremos en contacto con vos
              </p>
              
              {isSuccess ? (
                <div className="max-w-md mx-auto text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-2">
                    ¡Mensaje enviado!
                  </h3>
                  <p className="text-gray-600">
                    Te contactaremos pronto
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="text"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Barrio/Consorcio *
                    </label>
                    <input
                      type="text"
                      name="neighborhood"
                      value={formData.neighborhood}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="Barrio Los Pinos"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Localidad *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="Buenos Aires"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad de Lotes *
                    </label>
                    <input
                      type="text"
                      name="lots"
                      value={formData.lots}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      placeholder="50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Solicitar Cotización Personalizada'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            {PRODUCT_NAME} | Powered by {COMPANY_NAME}
          </p>
        </div>
      </footer>
    </div>
  );
}
