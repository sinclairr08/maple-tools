import { UseFormRegisterReturn } from "react-hook-form";
import Input from "./Input";

interface LineInputProps {
  type?: string;
  selectdata?: string[];
  labelword?: string;
  labelwords?: string[];
  required?: boolean;
  register: UseFormRegisterReturn;
}

export default function LineInput({
  type = "number",
  selectdata,
  labelword,
  labelwords,
  required,
  register,
}: LineInputProps) {
  return (
    <div className="grid grid-cols-2 ">
      {labelword && (
        <span className="pl-4 text-xs flex items-center">{labelword}</span>
      )}
      {labelwords && (
        <div className="flex flex-col">
          {labelwords.map((labelword, i) => (
            <span key={i} className="pl-4 text-[5px] flex items-center">
              {labelword}
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center justify-center">
        <Input
          type={type}
          required={required}
          register={register}
          selectdata={selectdata}
        />
      </div>
    </div>
  );
}
