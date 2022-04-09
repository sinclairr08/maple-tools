interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
  return (
    <button className="flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-white rounded-lg transition-colors focus:outline-none py-1 px-3">
      {text}
    </button>
  );
}
