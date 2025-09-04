import Arrow from "../../assets/sgv/home/arrow.svg";

export default function Doubts() {
  return (
    <section className="p-10 text-center">
      <h1 className="font-semibold text-3xl mb-16">
        ¿Tienes dudas?
        <p>Estas son algunas preguntas frecuentes:</p>
      </h1>

      <div className="space-y-4">
        {[
          "¿Cuánto tiempo tendré acceso a los contenidos?",
          "¿A cuáles beneficios puedo acceder?",
          "¿Universilandia reemplaza la orientación vocacional del colegio?",
          "¿Necesito registrarme para usar todas las funciones?",
          "¿Cómo puede mi colegio implementar Universilandia?",
        ].map((question, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-3xl p-4 flex justify-between items-center cursor-pointer"
          >
            <p className="text-lg">{question}</p>
            <img src={Arrow} alt="Flecha" className="w-6 mr-4" />
          </div>
        ))}
      </div>
    </section>
  );
}
