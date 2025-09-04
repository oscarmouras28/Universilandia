interface InfoCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <img src={icon} alt={title} className="h-32 w-32" />
      <h3 className="font-extrabold text-xl">{title}</h3>
      <p className="text-base text-gray-700">{description}</p>
    </div>
  );
}
