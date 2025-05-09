import JovenesLibros from "../../assets/sgv/jovenes-tablet-libros.svg";

export default function Review() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center py-14">
      {/* Título */}
      <h1 className="text-6xl font-bold">Reseñas de carreras</h1>

      {/* Imagen */}
      <img
        src={JovenesLibros}
        alt="Ilustración de reseñas de carreras"
        className="ww-full max-w-[600px] h-auto mt-[-60px] mb-[-80px]"
      />

      {/* Barra inferior decorativa */}
      <div className="w-[520px] h-16 bg-[#1A1A1A] rounded-full"></div>
    </section>
  );
}
