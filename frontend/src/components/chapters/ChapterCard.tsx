import Padlock from "../../assets/sgv/chapters/padlock.svg";

type ChapterStatus = "free" | "locked";

interface ChapterCardProps {
  title: string;
  img?: string;
  status: ChapterStatus;
}

export default function ChapterCard({ title, img, status }: ChapterCardProps) {
  const isFree = status === "free";
  return (
    <div className="rounded-xl bg-white p-4 flex flex-col items-center">
      {/* Imagen / ilustración */}
      <div className="w-full aspect-[5/4] rounded-lg bg-gray-100 grid place-items-center overflow-hidden">
        {img ? (
          <img src={img} alt={title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400">(ilustración)</span>
        )}
      </div>

      {/* CTA */}
      {isFree ? (
        <button className="mt-3 inline-flex items-center justify-center rounded-xl bg-[#FFD94B] px-4 py-2 text-[12px] font-semibold hover:brightness-95 transition">
          Escuchar Gratis
        </button>
      ) : (
        <button className="mt-3 inline-flex items-center justify-center rounded-xl bg-[#0E3A53] px-4 py-2 text-[12px] font-semibold text-white hover:brightness-110 transition">
          <span className="mr-2">
            <img src={Padlock} alt="Candado" className="w-5 h-5" />
          </span>
          Desbloquear
        </button>
      )}
    </div>
  );
}
