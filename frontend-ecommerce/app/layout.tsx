import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SocialMediaLinks from "@/components/socialMedia-links";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader"; 

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"], 
});

export const metadata: Metadata = {
  title: "Venta de Equipo de Protección Personal y Materiales Eléctricos |Venta en México",
  description: "Venta de materiales eléctricos y equipo de protección personal de alta calidad. Amplio catálogo de productos con las mejores marcas como LUCECO, PHILCO, TECNOLED y SUPRA/AUBE.",
  keywords: [
    "materiales eléctricos",
    "equipo de protección personal",
    "luminarias",
    "LUCECO",
    "PHILCO",
    "TECNOLED",
    "SUPRA/AUBE",
    "material eléctrico México",
    "EPP México"
  ],
  authors: [{ name: "ZIME" }],
  creator: "ZIME",
  publisher: "ZIME",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/logo/logo.webp",
    shortcut: "/logo/logo.webp",
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://zime.com.mx',
    siteName: 'ZIME',
    title: 'ZIME - Materiales Eléctricos y Equipo de Protección Personal',
    description: 'Venta de materiales eléctricos y equipo de protección personal de alta calidad. Amplio catálogo de productos con las mejores marcas.',
  },
  category: 'industrial',
  classification: 'Materiales Eléctricos y EPP',
  other: {
    'contact:phone_number': '+52 55 6091 3395',
    'contact:country_name': 'México',
    'DC.title': 'ZIME - Materiales Eléctricos y Equipo de Protección Personal',
    'DC.creator': 'ZIME',
    'DC.subject': 'Materiales Eléctricos, Equipo de Protección Personal',
    'DC.description': 'Materiales eléctricos y equipo de protección personal de alta calidad',
    'geo.region': 'MX',
    'geo.placename': 'México',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <head>
        {/* Preconnect para mejorar velocidad */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch para recursos externos */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://zime.com.mx" />

        {/* Structured Data - Organización */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "ZIME",
              "description": "Venta de materiales eléctricos y equipo de protección personal de alta calidad",
              "url": "https://zime.com.mx",
              "logo": "https://zime.com.mx/logo/logo.webp",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+52 55 6091 3395",
                "contactType": "customer service",
                "areaServed": "MX",
                "availableLanguage": "Spanish"
              },
              "sameAs": [
                "https://facebook.com/zime",
                "https://instagram.com/zime",
              ]
            })
          }}
        />

        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ZIME",
              "url": "https://zime.com.mx",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://zime.com.mx/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <NextTopLoader
          color="#F97316"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #F97316,0 0 5px #F97316"
          template='<div class="bar" role="bar"><div class="peg"></div></div>  
<div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <Navbar/>
        <SocialMediaLinks/>
        <Toaster />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
