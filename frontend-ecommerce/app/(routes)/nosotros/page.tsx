import type { Metadata } from "next";
import NosotrosClient from "./NosotrosClient";

export const metadata: Metadata = {
  title: "Nosotros - Tu Tienda de Equipo de Protección",
  description: "Conoce nuestra misión, visión y compromiso con la seguridad laboral y el material eléctrico.",
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}
