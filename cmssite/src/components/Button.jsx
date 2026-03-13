export default function Button({
  text,
  onClick,
  color = "blue",
  type = "button",
}) {
  const colors = {
    blue: "bg-blue-600 hover:bg-blue-700",
    yellow: "bg-yellow-500 hover:bg-yellow-600",
    red: "bg-red-500 hover:bg-red-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${colors[color]} text-white px-3 py-1 rounded`}
    >
      {text}
    </button>
  );
}
