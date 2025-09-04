import GuysOnPodcast from "../../assets/sgv/home/estudiantes-podcast.svg";

export default function AboutSection() {
  return (
    <section className="text-center px-6 lg:px-20 py-16 space-y-12 bg-[#F9F7F5]">
      {/* Indicadores */}
      <div className="flex justify-center gap-2">
        <span className="w-4 h-4 rounded-full bg-[#DDD] inline-block" />
        <span className="w-4 h-4 rounded-full bg-[#DDD] inline-block" />
        <span className="w-4 h-4 rounded-full bg-[#DDD] inline-block" />
      </div>

      {/* Texto introductorio */}
      <p className="max-w-3xl mx-auto text-lg font-medium text-gray-800">
        Tomar la decisión sobre tu futuro no es fácil, pero no tienes que
        hacerlo solo. En Universilandia, reunimos historias de profesionales de
        distintas áreas para que conozcas de primera mano cómo es realmente cada
        carrera.
      </p>

      {/* Imagen + texto (responsive layout) */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
        <img
          src={GuysOnPodcast}
          alt="Estudiantes viendo Podcast de Universilandia"
          className="w-full max-w-lg mx-auto"
        />
        <p className="max-w-sm text-gray-700 text-base lg:text-right text-center">
          Explora nuestros episodios, accede a recursos exclusivos y encuentra
          el camino que mejor se adapte a ti. <br />
          <strong>¡Tu futuro empieza aquí!</strong>
        </p>
      </div>

      {/* Botón */}
      <div>
        <a
          href="https://universilandia-front-592919962120.southamerica-west1.run.app/reseña"
          className="bg-[#022D50] text-white px-6 py-3 rounded-lg font-semibold shadow"
        >
          Más información
        </a>
      </div>
    </section>
  );
}
