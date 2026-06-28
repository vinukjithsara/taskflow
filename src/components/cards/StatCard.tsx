type Props = {
  title: string;
  value: number;
  color: string;
};

export default function StatCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div
      className={`
      ${color}
      rounded-3xl
      p-5
      text-white
      shadow-xl
      hover:scale-105
      transition-all
      duration-300
      cursor-pointer
      `}
    >
      <p className="text-white/80 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold mt-4">
        {value}
      </h2>

      <p className="mt-3 text-white/80">
        Tasks
      </p>
    </div>
  );
}