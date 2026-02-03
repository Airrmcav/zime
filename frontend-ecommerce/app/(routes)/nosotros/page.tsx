import type { Metadata } from "next";
import NosotrosClient from "./NosotrosClient";

export const metadata: Metadata = {
  title: "Nosotros - Tu Tienda de Equipo de Protección",
  description:
    "Conoce nuestra misión, visión y compromiso con la seguridad laboral y las luminarias de la más alta calidad.",
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}
