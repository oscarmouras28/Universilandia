import PublicLayout from "../layouts/PublicLayout";
import ChapterCard from "../components/chapters/ChapterCard";
import Microphone from "../assets/sgv/chapters/microphone.svg";
import PlayerMock from "../assets/sgv/chapters/playerMock.svg";

export default function ChaptersPage() {
  return (
    <PublicLayout>
      {/* HERO */}
      <section className="bg-[#F9F7F5]">
        <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              Tu espacio de <br /> exploración gratuita
            </h1>
            <p className="mt-3 text-lg text-gray-700 max-w-md font-normal">
              Descubre historias reales de profesionales y encuentra el camino
              ideal para tu futuro.
            </p>

            {/* Player mock */}
            <div className="mt-5 w-[300px] md:w-[360px] rounded-lg p-5 bg-[#EEE6E0]">
              <div className="flex items-center gap-3">
                <button aria-label="Play/Pause" className="h-12 w-12">
                  <img src={PlayerMock} alt="Reproductor" />
                </button>
                <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-[#022D50]" />
                </div>
              </div>
            </div>
          </div>

          {/* Ilustración de micrófono (placeholder) */}
          <div className="flex justify-center md:justify-end h-3/4 w-3/4">
            <img src={Microphone} alt="Microfono" />
          </div>
        </div>
      </section>

      {/* LISTA DE CAPÍTULOS */}
      <section className="max-w-6xl mx-auto px-6 py-8">
        {/* Encabezado + chip */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-extrabold text-[#0E3A53]">Capítulos</h2>
          <span className="text-[12px] rounded-full bg-gray-100 px-3 py-1 text-gray-600">
            Carreras
          </span>
        </div>

        {/* Grid */}
        <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-5">
          {/* 3 gratuitos */}
          <ChapterCard title="Medicina" status="free" />
          <ChapterCard title="Ingeniería" status="free" />
          <ChapterCard title="Psicología" status="free" />
          {/* bloqueados fila 1 */}
          <ChapterCard title="(bloqueado)" status="locked" />
          {/* fila 2 */}
          <ChapterCard title="(bloqueado)" status="locked" />
          <ChapterCard title="(bloqueado)" status="locked" />
          <ChapterCard title="(bloqueado)" status="locked" />
          <ChapterCard title="(bloqueado)" status="locked" />
        </div>

        {/* Barra / mensaje “te queda 1 capítulo” */}
        <div className="mt-8">
          <p className="text-center font-semibold text-[#0E3A53] text-xl">
            Te queda 1 capítulo gratis por elegir
          </p>
          <div className="mx-auto mt-3 max-w-md">
            <div className="h-1.5 w-full bg-gray-200 rounded-full">
              <div className="h-full w-2/3 bg-[#FFD94B] rounded-full" />
            </div>
          </div>
        </div>

        {/* CTA PREMIUM */}
        <div className="mt-8">
          <div className="rounded-2xl bg-[#FFD94B] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 shadow-sm">
            <div>
              <h3 className="text-lg md:text-xl font-extrabold text-[#0E3A53]">
                Desbloquea todo el contenido por
                <br className="hidden md:block" /> una suscripción mensual
              </h3>
              <ul className="mt-3 text-sm text-[#0E3A53] list-disc pl-5 space-y-1">
                <li>Acceso ilimitado a todos los capítulos</li>
                <li>Material</li>
              </ul>
            </div>

            <button className="self-start md:self-auto inline-flex items-center justify-center rounded-full border-2 border-[#0E3A53] px-6 py-3 font-semibold text-[#0E3A53] hover:bg-[#0E3A53] hover:text-white transition">
              Hazte Premium
            </button>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
