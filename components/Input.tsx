import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  register: UseFormRegisterReturn;
  type: string;
  required?: boolean;
  selectdata?: string[];
}

export default function Input({
  register,
  type,
  required,
  selectdata,
}: InputProps) {
  return (
    <>
      {type === "number" ? (
        <input
          {...register}
          type="number"
          required={required}
          className="border-2 border-gray-300 rounded-md w-1/2 py-0.5 focus:border-orange-400 focus:outline-none text-center"
        />
      ) : null}
      {type === "checkbox" ? (
        <input
          {...register}
          type="checkbox"
          className="form-checkbox border rounded-md border-gray-700 focus:outline-none focus:border-orange-400 text-orange-400"
        />
      ) : null}
      {type === "selectbox" ? (
        <select {...register} className="w-1/2 py-1 focus:outline-none">
          {selectdata?.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      ) : null}
    </>
  );
}
