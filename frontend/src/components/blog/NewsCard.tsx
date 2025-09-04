interface NewsCardProps {
  image: string;
  title: string;
  date: string;
}

export default function NewsCard({ image, title, date }: NewsCardProps) {
  return (
    <div className="flex items-start gap-4">
      {/* Imagen */}
      <img
        src={image}
        alt={title}
        className="w-20 h-20 rounded-md object-cover flex-shrink-0"
      />

      {/* Contenido */}
      <div className="flex flex-col">
        <h4 className="text-sm font-semibold text-black leading-snug">
          {title}
        </h4>
        <span className="text-sm text-gray-600 mt-1">{date}</span>
      </div>
    </div>
  );
}
