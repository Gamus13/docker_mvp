export default function Button({ text, className }) {
  return (
    <div
      className={`${className} active flex cursor-pointer  items-center justify-center rounded-sm  font-semibold text-background transition-all hover:opacity-80 active:scale-95`}
    >
      {text}
    </div>
  );
}
