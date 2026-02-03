import MarcaContent from "./components/marca-content";
import { generateMetadata } from "./components/marca-metadata";

export { generateMetadata };

export default async function MarcaPage({
  params,
}: {
  params: { marcaName: string };
}) {
  // Asegurarse de que params y marcaName existan antes de pasarlos
  const { marcaName = "" } = await params;
  return <MarcaContent marcaName={marcaName} />;
}
