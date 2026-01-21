import type { Metadata } from "next";
import PostesClient from "./PostesClient";

export const metadata: Metadata = {
  title: "Postes de Alumbrado Público e Industrial | Venta de Postes",
  description: "Venta de postes de alumbrado para proyectos públicos, industriales y comerciales. Alta durabilidad, diseños funcionales y compatibilidad con luminarias LED.",
};

export default function PostesPage() {
  return <PostesClient />;
}
