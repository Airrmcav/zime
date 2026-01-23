import { Metadata } from "next";
import LuminariasClient from "./components/luminarias-client";

export const metadata: Metadata = {  
  title: "Luminarias LED, Iluminación Eficiente y Proveedores Industriales – ZIME",
  description: "Proveedores autorizados de luminarias LED de las mejores marcas como LUCECO, LUMIANCE, PHILCO, TECNOLED, SUPRA y LEDVANCE. Ofrecemos soluciones de iluminación eficientes y de alta calidad para proyectos residenciales, comerciales e industriales.",  
  keywords: "luminarias LED, iluminación LED, Luceco, Lumiance, Philco, Tecnoled, Supra, Ledvance, iluminación residencial, iluminación comercial, iluminación industrial, proveedores de luminarias",  
};

export default function LuminariasPage() {
  return <LuminariasClient />;
}