import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn;
  type: string;
  required: boolean;
}

export default function Input({ register, type, required }: InputProps) {
  return (
    <input
      {...register}
      type={type}
      required={required}
      className="border-2 border-gray-300 rounded-md w-1/2 py-0.5  focus:border-orange-400 focus:outline-none text-center"
    />
  );
}
