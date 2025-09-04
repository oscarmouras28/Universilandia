import Telescope from "../../assets/sgv/us/telescope.svg";
import Rocket from "../../assets/sgv/us/rocket.svg";

export default function Vision() {
  return (
    <section className="p-16 bg-[#F9F7F5]">
      <div className="flex justify-between">
        <div className="w-1/2 pr-12">
          <h1 className="font-semibold text-3xl mb-4">
            Conoce al equipo <br /> detrás de <br /> Universilandia
          </h1>
          <p className="text-lg">
            Somos una plataforma creada por jóvenes que también dudaron al
            elegir su camino. Nacimos para acompañarte en esa decisión que
            muchas veces da miedo: elegir tu futuro. Nos dedicamos a la
            orientación vocacional real, con testimonios auténticos de
            estudiantes que ya viven las carreras que estás pensando estudiar.
            No somos un test, ni una charla más. Somos una comunidad que
            transforma la confusión en claridad, con contenido humano, cercano y
            útil. Estamos aquí para que no elijas a ciegas, sino con sentido.
          </p>
        </div>

        <div className="w-1/2 pl-12">
          <h2 className="font-semibold text-3xl mb-4">
            Sobre <br /> Nosotros
          </h2>
          <p className="text-lg">
            ¿Quienes somos? Nadie te enseña cómo elegir tu futuro. Y cuando
            llega el momento, te sientes perdido. Nosotros también lo vivimos.
            Por eso creamos Universilandia.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {/* Nuestra Misión */}
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="mb-4 flex justify-center">
            <img src={Rocket} alt="Cohete" />
          </div>
          <h4 className="font-semibold text-3xl mb-4">Nuestra Misión</h4>
          <p className="text-lg">
            Misión de Universilandia Democratizar la orientación vocacional
            entregando experiencias reales y humanas que ayuden a jóvenes a
            tomar decisiones informadas sobre su futuro académico y profesional.
          </p>
        </div>

        {/* Nuestra Visión */}
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="mb-4 flex justify-center">
            <img src={Telescope} alt="Telescopio" />
          </div>
          <h4 className="font-semibold text-3xl mb-4">Nuestra Visión</h4>
          <p className="text-lg">
            Visión de Universilandia Transformar la forma en que los jóvenes
            eligen su futuro, convirtiéndonos en la principal plataforma de
            orientación vocacional en Latinoamérica, donde las decisiones no se
            toman con miedo, sino con información real y experiencias humanas.
          </p>
        </div>
      </div>
    </section>
  );
}
