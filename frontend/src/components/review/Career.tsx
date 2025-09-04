import { useCarreras } from "../../hooks/useCarreras";
import { useNavigate } from "react-router-dom";
import SearchBar from "../forms/SearchBar";
import Filter from "../forms/Filter";

export default function CarreraList() {
  const { carreras, /*loading, */ error } = useCarreras();
  const navigate = useNavigate();

  return (
    <section className="px-6 lg:px-20 py-16">
      {/* Título */}
      <h2 className="text-3xl font-bold mb-6">Carreras</h2>

      {/* Buscador + Filtro */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 max-w-md">
        <SearchBar placeholder="Buscar carrera..." />
        <Filter>Filtros</Filter>
      </div>

      {/* Tarjetas */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 sm:grid-cols-2 gap-6 place-items-center mt-16">
          {carreras.map((carrera: any) => (
            <div
              key={carrera.idCarrUni}
              onClick={() => navigate(`/carrera/${carrera.idCarrUni}`)}
              className="cursor-pointer w-full max-w-[380px] lg:max-w-[450px] h-[500px] flex flex-col rounded-[40px] overflow-hidden shadow-lg border-2 border-black transition-transform hover:scale-[1.01] bg-white"
            >
              {/* Imagen y titulo sobre la imagen */}
              <div className="relative h-48 overflow-hidden rounded-[35px]">
                <img
                  src={carrera.imagen}
                  alt={carrera.nombreCarrera}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                  <h3 className="text-white text-lg sm:text-2xl font-semibold text-center px-2 drop-shadow-xl">
                    {carrera.nombreCarrera}
                  </h3>
                </div>
              </div>

              {/* Aranceles y Semestres */}
              <div className="flex flex-col gap-4 py-8 px-6 border-b-2 border-black">
                <div className="px-4 py-2 rounded-full text-sm font-medium border border-black">
                  Arancel: ${carrera.arancel.toLocaleString("es-CL")}
                </div>
                <div className="px-4 py-2 rounded-full text-sm font-medium border border-black">
                  Semestres: {carrera.semestres}
                </div>
              </div>

              {/* Descripcion */}
              <div className="p-5 flex-1 flex items-start">
                <p className="text-gray-700 break-words w-full">
                  {carrera.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
