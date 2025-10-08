import { Metadata } from "next";
import LuminariasClient from "./components/luminarias-client";

export const metadata: Metadata = {  
  title: "Proveedores de Luminarias LED | ZIME",  
  description: "En ZIME somos proveedores autorizados de luminarias LED de las mejores marcas como Luceco, Lumiance, Philco, Tecnoled, Supra y Ledvance. Ofrecemos soluciones de iluminación eficientes y de alta calidad para proyectos residenciales, comerciales e industriales.",  
  keywords: "luminarias LED, iluminación LED, Luceco, Lumiance, Philco, Tecnoled, Supra, Ledvance, iluminación residencial, iluminación comercial, iluminación industrial, proveedores de luminarias",  
};

export default function LuminariasPage() {
  return <LuminariasClient />;
}