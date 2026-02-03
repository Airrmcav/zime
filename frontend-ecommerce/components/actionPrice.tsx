"use client";
import React, { useState } from "react";
import {
  Shield,
  Zap,
  Mail,
  Phone,
  User,
  Building,
  MessageSquare,
  Send,
  Star,
  Award,
  Clock,
} from "lucide-react";

const ActionPrice = () => {
  const [emailForm, setEmailForm] = useState({ email: "" });
  const [quoteForm, setQuoteForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });

  const handleEmailSubmit = () => {
    if (emailForm.email) {
      console.log("Email suscrito:", emailForm.email);
      // Aquí iría la lógica para suscribir al email
      alert("¡Te has suscrito exitosamente a nuestras ofertas!");
      setEmailForm({ email: "" });
    }
  };

  const handleQuoteSubmit = () => {
    if (
      quoteForm.name &&
      quoteForm.email &&
      quoteForm.phone &&
      quoteForm.category
    ) {
      console.log("Cotización solicitada:", quoteForm);
      // Aquí iría la lógica para enviar la cotización
      alert("¡Cotización enviada! Nos pondremos en contacto contigo pronto.");
      setQuoteForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        category: "",
        message: "",
      });
    } else {
      alert("Por favor completa todos los campos obligatorios (*)");
    }
  };

  const eppProducts = [
    { name: "Cascos de Seguridad", price: "Desde $250", icon: "🪖" },
    { name: "Guantes Dieléctricos", price: "Desde $180", icon: "🧤" },
    { name: "Calzado de Seguridad", price: "Desde $890", icon: "👢" },
    { name: "Chalecos Reflectivos", price: "Desde $120", icon: "🦺" },
    { name: "Mascarillas N95", price: "Desde $35", icon: "😷" },
    { name: "Lentes de Seguridad", price: "Desde $95", icon: "🥽" },
  ];

  const electricProducts = [
    { name: "Cables de Alta Tensión", price: "Desde $45/m", icon: "⚡" },
    { name: "Interruptores Industriales", price: "Desde $1,250", icon: "🔌" },
    { name: "Transformadores", price: "Desde $3,500", icon: "🔋" },
    { name: "Medidores Eléctricos", price: "Desde $850", icon: "📊" },
    { name: "Tableros de Control", price: "Desde $2,100", icon: "⚙️" },
    { name: "Fusibles y Breakers", price: "Desde $65", icon: "🔧" },
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Secciones principales de productos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Equipo de Protección Personal */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">
                  Equipo de Protección Personal
                </h2>
              </div>
              <p className="text-orange-100 mt-2">
                Protección garantizada para tu equipo de trabajo
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {eppProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-yellow-50 transition-colors duration-200 border border-gray-200 hover:border-yellow-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{product.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {product.name}
                          </h3>
                          <p className="text-orange-600 font-bold text-sm">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-yellow-600 mr-2" />
                  <span className="text-yellow-800 font-semibold text-sm">
                    Certificaciones: ANSI/ISEA, CE Mark, STPS
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="bg-linear-to-r from-orange-500 to-red-500 p-6">
              <div className="flex items-center">
                <Zap className="w-8 h-8 text-white mr-3" />
                <h2 className="text-2xl font-bold text-white">Luminarias</h2>
              </div>
              <p className="text-orange-100 mt-2">
                Soluciones eléctricas industriales de alta calidad
              </p>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {electricProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 hover:bg-orange-50 transition-colors duration-200 border border-gray-200 hover:border-orange-300"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{product.icon}</span>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-sm">
                            {product.name}
                          </h3>
                          <p className="text-orange-600 font-bold text-sm">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="text-orange-800 font-semibold text-sm">
                    Garantía extendida y soporte técnico 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Llamada a la acción para ofertas */}
        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl shadow-2xl p-8 mb-12 text-center">
          <div className="max-w-3xl mx-auto">
            <Mail className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-4">
              ¡No te pierdas nuestras ofertas especiales!
            </h2>
            <p className="text-orange-100 mb-6 text-lg">
              Suscríbete a nuestro newsletter y recibe descuentos exclusivos,
              lanzamientos de productos y consejos de seguridad industrial.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ email: e.target.value })}
                className="flex-1 px-4 py-3 rounded-lg border-0 text-gray-800 placeholder-gray-500 focus:ring-4 focus:ring-white/30 focus:outline-none"
              />
              <button
                onClick={handleEmailSubmit}
                className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                <Send className="w-5 h-5 mr-2" />
                Suscribirse
              </button>
            </div>

            <div className="flex items-center justify-center mt-4 text-orange-100 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              Ofertas semanales • Sin spam • Cancela cuando quieras
            </div>
          </div>
        </div>

        {/* Formulario de cotización */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gray-900 p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Solicita tu Cotización
            </h2>
            <p className="text-gray-300">
              Obtén precios personalizados para tu empresa
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Información personal */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    value={quoteForm.name}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <Building className="w-4 h-4 inline mr-2" />
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={quoteForm.company}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, company: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    value={quoteForm.email}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Información del proyecto */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    value={quoteForm.phone}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Categoría de interés *
                  </label>
                  <select
                    value={quoteForm.category}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, category: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option value="epp">Equipo de Protección Personal</option>
                    <option value="electrico">Luminarias</option>
                    <option value="ambos">Ambas categorías</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Descripción del proyecto
                  </label>
                  <textarea
                    value={quoteForm.message}
                    onChange={(e) =>
                      setQuoteForm({ ...quoteForm, message: e.target.value })
                    }
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all resize-none"
                    placeholder="Describe qué productos necesitas, cantidades aproximadas, plazos, etc."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleQuoteSubmit}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-yellow-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Solicitar Cotización Gratuita
              </button>
              <p className="text-gray-500 text-sm mt-3">
                * Respuesta garantizada en menos de 24 horas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionPrice;
