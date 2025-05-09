import AboutPlaceholder from "../../assets/AboutPlaceholder.png";

export default function AboutSection() {
  return (
    <section className="text-center px-6 lg:px-20 py-16 space-y-12">
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

      {/* Imagen + texto */}
      <div className="flex lg:flex-row items-center justify-around gap-20">
        <img
          src={AboutPlaceholder}
          alt="Recurso educativo"
          className="w-max h-[360px] rounded-2xl object-cover shadow"
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
          href="#"
          className="bg-[#EEE6E0] text-black px-6 py-3 rounded-lg font-semibold shadow"
        >
          Más información
        </a>
      </div>
    </section>
  );
}
