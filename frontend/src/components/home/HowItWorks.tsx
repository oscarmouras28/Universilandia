import Headphones from "../../assets/sgv/home/headphones.svg";
import Monitor from "../../assets/sgv/home/monitor.svg";
import Tasks from "../../assets/sgv/home/tasks.svg";

export default function HowItWorks() {
  return (
    <section className="p-16">
      <div className="border rounded-2xl bg-[#E5E5E5] p-12 text-center">
        {/* Titulo y Descripción */}
        <h1 className="font-semibold text-3xl">¿Cómo Funciona?</h1>
        <p className="mt-14 text-lg">
          Universilandia ..... para que conozcas de primera mano cómo es
          realmente cada carrera.
        </p>

        {/* Bloques de iconos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-32">
          {/* Bloque 1 */}
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center h-auto sm:h-80">
            <div className="bg-white -mt-24 rounded-full p-6">
              <img
                src={Headphones}
                alt="Audífonos"
                className="w-20 sm:w-20 md:w-24 max-w-full p-4"
              />
            </div>
            <p className="mt-6">Contenido del primer bloque</p>
          </div>

          {/* Bloque 2 */}
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center h-auto sm:h-80">
            <div className="bg-white -mt-24 rounded-full p-6">
              <img
                src={Monitor}
                alt="Monitor"
                className="w-20 sm:w-20 md:w-24 max-w-full p-4"
              />
            </div>
            <p className="mt-6">Contenido del segundo bloque</p>
          </div>

          {/* Bloque 3 */}
          <div className="bg-white rounded-3xl p-6 flex flex-col items-center h-auto sm:h-80">
            <div className="bg-white -mt-24 rounded-full p-6">
              <img
                src={Tasks}
                alt="Lista de Tareas"
                className="w-20 sm:w-20 md:w-24 max-w-full p-4"
              />
            </div>
            <p className="mt-6">Contenido del tercer bloque</p>
          </div>
        </div>
      </div>
    </section>
  );
}
