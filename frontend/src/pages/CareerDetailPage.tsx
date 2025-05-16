import { useParams } from "react-router-dom";
import { useCarrera } from "../hooks/useCarrera";
import PublicLayout from "../layouts/PublicLayout";

export default function CareerDetailPage() {
  const { id } = useParams();
  const { carrera, loading, error } = useCarrera(id || "");

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!carrera) return <p className="text-center mt-10">Carrera no encontrada.</p>;

  const videoUrl = "https://www.youtube.com/watch?v=25lp_CbayJo&t=2s"; // temporal

  return (
    <PublicLayout>
    <section className="px-6 lg:px-20 py-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Video lado izquierdo */}
        <div className="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <iframe
            className="w-full h-full"
            src={videoUrl}
            title="Vodcast de la carrera"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Info lado derecho */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{carrera.nombreCarrera}</h1>
          <p className="text-gray-700 text-lg">{carrera.descripcion}</p>

          <div className="text-base text-gray-800 space-y-2">
            <p><strong>Duración:</strong> {carrera.semestres} semestres</p>
            <p>
              <strong>Arancel:</strong>{" "}
              <span className="text-green-700 font-semibold">
                ${carrera.arancel.toLocaleString("es-CL")}
              </span>
            </p>
            {carrera.universidad && (
              <p><strong>Universidad:</strong> {carrera.universidad.nombre}</p>
            )}
          </div>

          {/* Botón volver */}
          <div className="pt-4">
            <a
              href="/reseña"
              className="inline-block bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition"
            >
              Volver a todas las carreras
            </a>
          </div>
        </div>
      </div>
    </section>
  </PublicLayout>
  );
}