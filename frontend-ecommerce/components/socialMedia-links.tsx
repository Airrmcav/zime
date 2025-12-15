"use client"
import React, { useState } from 'react';
import { Facebook, Instagram, Music } from 'lucide-react';

const SocialMediaLinks = () => {
    const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

    return (
        <>
            {/* Enlaces del lado izquierdo - Facebook, Instagram, TikTok */}
            <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col space-y-4">
                {/* Facebook */}
                <div 
                    className="group relative"
                    onMouseEnter={() => setHoveredIcon('facebook')}
                    onMouseLeave={() => setHoveredIcon(null)}
                >
                    <a 
                        href="https://www.facebook.com/zimemx" 
                        target="_blank"
                        className="cursor-pointer flex items-center bg-blue-600 text-white p-3 rounded-r-full shadow-lg transform transition-all duration-300 hover:translate-x-2 hover:scale-110 hover:shadow-2xl animate-pulse"
                    >
                        <Facebook className="w-6 h-6" />
                        <span className={`ml-3 font-medium transition-all duration-300 overflow-hidden ${
                            hoveredIcon === 'facebook' ? 'w-24 opacity-100' : 'w-0 opacity-0'
                        }`}>
                            Facebook
                        </span>
                    </a>
                    {/* Efecto de ondas para Facebook */}
                    {/* <div className="absolute inset-0 rounded-r-full bg-blue-600 opacity-30 animate-ping group-hover:animate-none"></div> */}
                </div>

                {/* Instagram */}
                <div 
                    className="group relative"
                    onMouseEnter={() => setHoveredIcon('instagram')}
                    onMouseLeave={() => setHoveredIcon(null)}
                >
                    <a 
                        href="https://www.instagram.com/zimemx" 
                        target="_blank"
                        className="cursor-pointer flex items-center bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white p-3 rounded-r-full shadow-lg transform transition-all duration-300 hover:translate-x-2 hover:scale-110 hover:shadow-2xl hover:rotate-6"
                    >
                        <Instagram className="w-6 h-6 animate-spin" style={{animationDuration: '3s'}} />
                        <span className={`ml-3 font-medium transition-all duration-300 overflow-hidden ${
                            hoveredIcon === 'instagram' ? 'w-24 opacity-100' : 'w-0 opacity-0'
                        }`}>
                            Instagram
                        </span>
                    </a>
                    {/* Efecto de brillo para Instagram */}
                    {/* <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-r-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div> */}
                </div>


            </div>

            {/* WhatsApp en esquina inferior derecha */}
            <div className="fixed bottom-6 right-6 z-50">
                <div 
                    className="group relative"
                    onMouseEnter={() => setHoveredIcon('whatsapp')}
                    onMouseLeave={() => setHoveredIcon(null)}
                >
                    <a 
                        href="https://api.whatsapp.com/send?phone=525510070205" 
                        target="_blank"
                        className="cursor-pointer flex items-center justify-center bg-green-500 text-white p-4 rounded-full shadow-2xl transform transition-all duration-500 hover:scale-125 hover:rotate-12 animate-bounce"
                        style={{animationDuration: '2s'}}
                    >
                        {/* Ícono de WhatsApp personalizado */}
                        <svg 
                            className="w-8 h-8" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                    </a>
                    
                    {/* Tooltip animado */}
                    <div className={`absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg transition-all duration-300 whitespace-nowrap ${
                        hoveredIcon === 'whatsapp' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                    }`}>
                        ¡Contáctanos por WhatsApp!
                        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                    </div>

                    {/* Ondas expansivas para WhatsApp */}
                    {/* <div className="absolute inset-0 rounded-full bg-green-400 opacity-30 animate-ping -z-50"></div>
                    <div className="absolute inset-0 rounded-full bg-green-300 opacity-20 animate-ping -z-50" style={{animationDelay: '0.5s'}}></div> */}
                    
                    {/* Efecto de notificación */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Estilos CSS adicionales */}
            <style jsx>{`
                @keyframes wiggle {
                    0%, 7% { transform: rotateZ(0); }
                    15% { transform: rotateZ(-15deg); }
                    20% { transform: rotateZ(10deg); }
                    25% { transform: rotateZ(-10deg); }
                    30% { transform: rotateZ(6deg); }
                    35% { transform: rotateZ(-4deg); }
                    40%, 100% { transform: rotateZ(0); }
                }
                
                .group:hover .animate-wiggle {
                    animation: wiggle 1s ease-in-out infinite;
                }
            `}</style>
        </>
    );
};

export default SocialMediaLinks;