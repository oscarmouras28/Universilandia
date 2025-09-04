import PublicLayout from "../layouts/PublicLayout";
import BlogCard from "../components/blog/BlogCard";
import SearchBar from "../components/forms/SearchBar";
import Filter from "../components/forms/Filter";
import NewsCard from "../components/blog/NewsCard";
import Girl from "../assets/sgv/blog/girl.svg";
import Handshake from "../assets/sgv/blog/handshake.svg";

export default function Blog() {
  return (
    <PublicLayout>
      {/* Hero + filtros */}
      <section className="bg-[#F9F7F5]">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col items-center gap-8">
          <div className="text-center">
            <h1 className="font-bold text-4xl mb-3">Blog Universilandia</h1>
            <h2 className="font-semibold text-xl">
              Artículos, consejos y recursos sobre educación y vocación
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <SearchBar placeholder="Buscar" />
            <Filter>Carreras</Filter>
            <Filter>Tips</Filter>
            <Filter>Becas</Filter>
            <Filter>Noticias</Filter>
          </div>
        </div>
      </section>

      {/* Cards destacadas */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
          <BlogCard
            image="https://www.comunidadbaratz.com/wp-content/uploads/La-libertad-intelectual-es-un-derecho-fundamental-de-las-personas.jpg"
            category="Becas"
            title="Las mejores becas para estudiantes en 2025"
            description="¿Cuáles son y cómo postular a ellas?"
            link="#"
          />
          <BlogCard
            image="https://www.comunidadbaratz.com/wp-content/uploads/La-libertad-intelectual-es-un-derecho-fundamental-de-las-personas.jpg"
            category="Becas"
            title="Las mejores becas para estudiantes en 2025"
            description="¿Cuáles son y cómo postular a ellas?"
            link="#"
          />
          <BlogCard
            image="https://www.comunidadbaratz.com/wp-content/uploads/La-libertad-intelectual-es-un-derecho-fundamental-de-las-personas.jpg"
            category="Becas"
            title="Las mejores becas para estudiantes en 2025"
            description="¿Cuáles son y cómo postular a ellas?"
            link="#"
          />
        </div>
      </section>

      {/* Noticias recientes + Suscripción */}
      <section className="max-w-6xl mx-auto px-6 pb-14">
        <h3 className="font-bold text-2xl mb-6">Noticias recientes</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Columna izquierda: lista de noticias */}
          <div className="md:col-span-2 space-y-6">
            <NewsCard
              image={Girl}
              title="¿Qué considerar antes de inscribirte en una carrera en el extranjero?"
              date="10 de Julio de 2025"
            />
            <NewsCard
              image={Handshake}
              title="Las carreras con mayor demanda en el mundo laboral"
              date="28 de Abril de 2025"
            />

            <div>
              <button
                type="button"
                className="mt-2 inline-flex items-center rounded-full bg-[#EDEDED] px-4 py-2 text-sm font-semibold hover:bg-[#e4e4e4] transition text-black"
              >
                Ver más noticias
              </button>
            </div>
          </div>

          {/* Columna derecha: tarjeta de suscripción */}
          <aside className="md:col-span-1">
            <div className="rounded-2xl bg-[#F9F7F5] p-6 md:p-8 shadow-sm">
              <h4 className="font-bold text-xl leading-6">
                Recibe novedades en tu correo
              </h4>
              <p className="mt-2 text-sm text-gray-700">
                Suscribirse a nuestro boletín
              </p>

              <form className="mt-6 space-y-3">
                <input
                  type="email"
                  className="w-full rounded-full border border-gray-200 px-4 py-2 placeholder-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
                  placeholder="Tu email"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#FFD94B] px-5 py-2 font-semibold hover:brightness-95 transition"
                >
                  Suscríbete
                </button>
              </form>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
