import PublicLayout from "../layouts/PublicLayout";
import InfoCard from "../components/community/InfoCard";
import Discord from "../assets/sgv/community/discord.svg";
import Student from "../assets/sgv/community/student.svg";
import Connection from "../assets/sgv/community/connection.svg";
import Events from "../assets/sgv/community/events.svg";
import Resources from "../assets/sgv/community/resources.svg";

export default function Community() {
  return (
    <PublicLayout>
      <section className="w-full">
        {/* Hero: título + ilustración (laptop/discord) */}
        <div className="p-20 flex justify-center">
          <img src={Discord} alt="Imagen de Discord" className=" w-3/4 " />
        </div>

        {/* Bloque curvo pegado a la izquierda */}
        <div className="w-[92%] md:w-[88%] lg:w-[82%] ml-0 mr-auto">
          <div className="bg-[#F9F7F5] rounded-r-full overflow-hidden">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-8 py-10 md:py-12 px-6">
              {/* Texto + CTA */}
              <div className="space-y-6">
                <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                  Conecta con otros estudiantes, <br />
                  comparte experiencias y crece <br />
                  junto a nosotros.
                </p>
                <a
                  href="https://discord.com/invite/tu-invitacion"
                  className="inline-block bg-[#0E3A53] text-white font-semibold px-6 py-3 rounded-lg hover:brightness-110 transition"
                >
                  Entrar al Discord
                </a>
              </div>

              {/* Ilustración a la derecha */}
              <div className="flex justify-center md:justify-end">
                <img
                  src={Student}
                  alt="Estudiante conectado"
                  className="w-full max-w-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tarjetas: Conexión / Eventos / Recursos */}
        <div className="mx-auto max-w-6xl px-6 mt-8 mb-12">
          <div className="rounded-3xl bg-[#F9F7F5] p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {/* Item 1 */}
              <InfoCard
                icon={Connection}
                title="Conexión"
                description="Chatea con otros preuniversitarios y explora nuevas perspectivas."
              />

              {/* Item 2 */}
              <InfoCard
                icon={Events}
                title="Eventos"
                description="Participa en charlas, talleres ye ventos en linea."
              />

              {/* Item 3 */}
              <InfoCard
                icon={Resources}
                title="Recursos"
                description="Accede a consejos, tips y recursos en tiempo  real."
              />
            </div>
          </div>
        </div>

        {/* Banda final CTA */}
        <div className="bg-[#022D50] py-10">
          <div className="max-w-6xl mx-auto px-6 text-center text-white">
            <p className="text-2xl md:text-3xl font-extrabold">
              ¿Qué esperas? ¡Te vemos dentro!
            </p>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
