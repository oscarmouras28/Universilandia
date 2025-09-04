import React from "react";

interface CardProps {
  image: string;
  category: string;
  title: string;
  description: string;
  link?: string;
}

export default function BlogCard({
  image,
  category,
  title,
  description,
  link = "#",
}: CardProps) {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md p-6 w-[340px]">
      {/* Imagen */}
      <img
        src={image}
        alt={title}
        className="rounded-md w-full h-60 object-cover"
      />

      {/* Categoría */}
      <span className="mt-4 inline-block bg-[#FFD93D] w-10 min-w-32 text-center text-black text-sm font-bold px-4 py-1.5 rounded-full">
        {category}
      </span>

      {/* Título */}
      <h3 className="mt-3 text-xl font-semibold text-gray-900 leading-snug">
        {title}
      </h3>

      {/* Descripción */}
      <p className="mt-2 text-gray-600 text-base">{description}</p>

      {/* Enlace */}
      <a
        href={link}
        className="mt-4 inline-flex items-center text-black font-semibold text-base hover:underline"
      >
        Leer más
        <span className="ml-1">→</span>
      </a>
    </div>
  );
}
