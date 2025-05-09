import PublicLayout from "../layouts/PublicLayout";
import { useParams } from "react-router-dom";
import { useCarrera } from "../hooks/useCarrera";

export default function CareerDetailPage() {
  const { id } = useParams();
  const { carrera, loading, error } = useCarrera(id || "");

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <PublicLayout>
      <h1>AQUI VA TODO EL CODIGO</h1>
      <p>ID: {carrera.idCarrUni}</p>
      <p>Nombre Carrera: {carrera.nombreCarrera}</p>
      <p>Modalidad: {carrera.modalidad}</p>
      <p>Arancel: {carrera.arancel}</p>
      <p>Semestres: {carrera.semestres}</p>
      <p>Descripcion: {carrera.descripcion}</p>
      <p>
        ID Universidad (No creo q lo uses pero t lo dejo igual):{" "}
        {carrera.idUniversidad}
      </p>
    </PublicLayout>
  );
}
