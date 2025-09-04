import Italo from "../../assets/sgv/us/italo.svg";
import Javiera from "../../assets/sgv/us/javiera.svg";
// import Oscar from "../../assets/sgv/us/oscar.svg";
import Esteban from "../../assets/sgv/us/esteban.svg";
import Jeremy from "../../assets/sgv/us/jeremy.svg";
import Diego from "../../assets/sgv/us/diego.svg";
import Alex from "../../assets/sgv/us/alex.svg";

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Esteban Saez",
      description:
        "Esteban Saez es Programador Full Stack e Ingeniero en Informática formado en DuocUC. Con pasión por la tecnología y el desarrollo digital, contribuye a que Universilandia sea una plataforma funcional e intuitiva, brindando a los jóvenes una mejor experiencia en su búsqueda vocacional.",
      avatar: Esteban,
      position: "left",
    },
    {
      id: 2,
      name: "Jeremy Correa",
      description:
        "Jeremy Correa es Programador Full Stack e Ingeniero en Informática formado en DuocUC. Especialista en desarrollo web, aplicaciones móviles y bases de datos, aporta su conocimiento para hacer de Universalandia una plataforma eficiente e innovadora.",
      avatar: Jeremy,
      position: "right",
    },
    {
      id: 3,
      name: "Javiera Silva",
      description:
        "Javiera Silva es Diseñadora Gráfica Multimedia, titulada en el Instituto Profesional Arcos. Apasionada por la creatividad y la comunicación visual, aporta su talento para que Universalandia tenga una identidad atractiva y amigable, haciendo de la orientación vocacional una experiencia visualmente inspiradora.",
      avatar: Javiera,
      position: "left",
    },
    {
      id: 4,
      name: "Diego Díaz",
      description:
        "Diego Díaz es Ingeniero Comercial con mención en Finanzas y Economía, formado en la UNAB. Con su experiencia en el mundo financiero, aporta a Universalandia una visión estratégica para seguir creciendo y llegar a más jóvenes en busca de su vocación.",
      avatar: Diego,
      position: "right",
    },
    {
      id: 5,
      name: "Alex",
      description: "",
      avatar: Alex,
      position: "right",
    },
    {
      id: 6,
      name: "Italo Briones",
      description:
        "Italo Briones es Ingeniero Civil Industrial de la UNAB, además de CEO y el corazón detrás de Universalandia. Con un fuerte compromiso por la educación y la inclusión, su misión es transformar la orientación vocacional a través de experiencias reales, ayudando a jóvenes a descubrir su camino y conectarse con nuevas oportunidades.",
      avatar: Italo,
      position: "left",
    },
  ];
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-12 text-left">
          Equipo
        </h1>

        <div className="space-y-16">
          {teamMembers.map(member => (
            <div
              key={member.id}
              className="flex flex-col md:flex-row items-center rounded-2xl gap-8 bg-[#F9F7F5] p-2"
            >
              {member.position === "right" ? (
                <>
                  <div className="flex-1 text-center md:text-left">
                    {member.description && (
                      <p className="text-gray-700 text-lg leading-relaxed font-semibold">
                        {member.description}
                      </p>
                    )}
                    {!member.description && (
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {member.name} es
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-orange-100">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={`Avatar de ${member.name}`}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-shrink-0 order-2 md:order-1">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-orange-100">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={`Avatar de ${member.name}`}
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-right order-1 md:order-2">
                    <p className="text-gray-700 text-lg leading-relaxed font-semibold">
                      {member.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
