import AvatarPlaceholder from "../../assets/AvatarPlaceholder.png"; // Usa la imagen real
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function SuccessStories() {
  return (
    <section className="bg-[#031B3C] text-white rounded-2xl px-6 lg:px-16 py-12 mt-20 max-w-5xl mx-auto">
      {/* Título */}
      <h2 className="text-3xl font-bold text-center mb-10">
        Historias de Éxito
      </h2>

      {/* Contenido */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Bloque amarillo de testimonio */}
        <div className="bg-[#FFD447] text-white rounded-lg px-6 py-8 text-center text-lg font-medium max-w-xl">
          <p>
            Próximamente conocerás historias de jóvenes que encontraron su
            camino con Universilandia.
          </p>
          <br />
          <p>
            Escuchar a profesionales contar sus experiencias me ayudó a tomar
            una decisión sin miedo.
          </p>
        </div>

        {/* Bloque perfil */}
        <div className="flex flex-col items-center gap-4 text-center">
          {/* Avatar */}
          <img
            src={AvatarPlaceholder}
            alt="Foto de Juanita"
            className="w-32 h-32 rounded-full object-cover border-2 border-white"
          />

          {/* Nombre y descripción */}
          <div>
            <p className="font-bold text-sm">Juanita Pérez</p>
            <p className="text-xs text-gray-300 max-w-[200px]">
              Tiene dos años de carrera y le encanta su profesión
            </p>
          </div>

          {/* Botones de navegación */}
          <div className="flex gap-4 mt-2">
            <button className="bg-white text-black p-2 rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 39 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.7195 17.3409C38.6637 17.4753 38.6119 17.6138 38.5482 17.7483C38.2055 18.4761 37.6317 18.8914 36.8268 18.9824C36.6395 19.0022 36.4482 18.9982 36.2609 18.9982C27.9289 18.9982 19.6008 18.9982 11.2688 18.9982C11.1174 18.9982 10.97 18.9982 10.7269 18.9982C10.8664 19.1446 10.954 19.2395 11.0457 19.3305C13.6078 21.8818 16.174 24.4291 18.7362 26.9804C19.5451 27.7873 19.7881 28.8474 19.1705 29.6622C18.6047 30.4098 17.9034 31.0902 17.1542 31.6637C16.441 32.2135 15.4368 32.0553 14.7395 31.4739C14.6439 31.3947 14.5522 31.3077 14.4606 31.2207C9.89807 26.6917 5.33557 22.1626 0.773075 17.6336C-0.0557458 16.8069 -0.231073 15.8061 0.314833 14.9122C0.438359 14.7104 0.601732 14.5285 0.76909 14.3624C5.3276 9.82936 9.8901 5.30031 14.4526 0.771263C15.4846 -0.253212 16.7119 -0.253212 17.748 0.763351C18.0787 1.0877 18.4094 1.41601 18.7402 1.74432C19.7403 2.74506 19.7483 3.95544 18.7441 4.95223C16.1581 7.51539 13.568 10.0746 10.9819 12.6378C10.8863 12.7327 10.7986 12.8316 10.6472 12.9898C10.8664 12.9898 11.0138 12.9898 11.1572 12.9898C19.4375 12.9898 27.7177 12.9898 35.9979 12.9898C37.6755 12.9898 38.1059 13.2746 38.7275 14.7935C38.7195 15.64 38.7195 16.4904 38.7195 17.3409Z"
                  fill="black"
                />
              </svg>
            </button>
            <button className="bg-white text-black p-2 rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 39 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.280524 17.3409C0.33631 17.4753 0.388108 17.6138 0.451863 17.7483C0.794549 18.4761 1.36835 18.8914 2.17326 18.9824C2.36054 19.0022 2.55181 18.9982 2.73909 18.9982C11.0711 18.9982 19.3992 18.9982 27.7312 18.9982C27.8826 18.9982 28.0301 18.9982 28.2731 18.9982C28.1337 19.1446 28.046 19.2395 27.9544 19.3305C25.3922 21.8818 22.826 24.4291 20.2639 26.9804C19.455 27.7873 19.2119 28.8474 19.8295 29.6622C20.3954 30.4098 21.0967 31.0902 21.8458 31.6637C22.5591 32.2135 23.5632 32.0553 24.2605 31.4739C24.3562 31.3947 24.4478 31.3077 24.5395 31.2207C29.102 26.6917 33.6645 22.1626 38.227 17.6336C39.0558 16.8069 39.2311 15.8061 38.6852 14.9122C38.5617 14.7104 38.3983 14.5285 38.2309 14.3624C33.6724 9.82936 29.1099 5.30031 24.5474 0.771263C23.5154 -0.253212 22.2881 -0.253212 21.2521 0.763351C20.9213 1.0877 20.5906 1.41601 20.2599 1.74432C19.2597 2.74506 19.2517 3.95544 20.2559 4.95223C22.842 7.51539 25.432 10.0746 28.0181 12.6378C28.1137 12.7327 28.2014 12.8316 28.3528 12.9898C28.1337 12.9898 27.9862 12.9898 27.8428 12.9898C19.5626 12.9898 11.2823 12.9898 3.00208 12.9898C1.32452 12.9898 0.894168 13.2746 0.272552 14.7935C0.280522 15.64 0.280524 16.4904 0.280524 17.3409Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
