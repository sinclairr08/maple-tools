import { NextPage } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ArcaneForm from "../components/ArcaneForm";
import Input from "../components/Input";

interface DreamBreakerForm {
  floor: number;
}

const Symbols: NextPage = () => {
  const { register, handleSubmit } = useForm<DreamBreakerForm>({
    defaultValues: { floor: 10 },
  });
  const [dbFloor, setdbFloor] = useState(1);
  const onValid = ({ floor }: DreamBreakerForm) => {
    setdbFloor(floor / 10);
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-4 px-6 ">
      <div className="grid grid-cols-7 w-full ">
        <span className="flex items-center justify-center text-sm ">
          Symbol
        </span>
        <span className="flex items-center justify-center text-sm ">Level</span>
        <span className="flex items-center justify-center text-sm  ">
          Progress
        </span>
        <span className="flex items-center justify-center text-sm  ">
          Hunting
        </span>
        <span className="flex items-center justify-center text-sm  ">
          Conetent
        </span>

        <span className="flex items-center justify-center text-sm  ">
          Caculate
        </span>
        <span className="flex items-center justify-center text-sm  ">Days</span>
      </div>
      <ArcaneForm
        imgurl="https://avatar.maplestory.nexon.com/ItemIcon/KEIDJHOA.png"
        huntFactor={16}
        contentFactor={6}
      />
      <ArcaneForm
        imgurl="https://avatar.maplestory.nexon.com/ItemIcon/KEIDJHOD.png"
        huntFactor={8}
        contentFactor={15}
      />
      <ArcaneForm
        imgurl="https://avatar.maplestory.nexon.com/ItemIcon/KEIDJHOC.png"
        huntFactor={8}
        contentFactor={dbFloor}
      />
      <ArcaneForm
        imgurl="https://avatar.maplestory.nexon.com/ItemIcon/KEIDJHOF.png"
        huntFactor={8}
        contentFactor={10}
      />
      <ArcaneForm
        imgurl="https://avatar.maplestory.nexon.com/ItemIcon/KEIDJHOE.png"
        huntFactor={8}
        contentFactor={6}
      />
      <ArcaneForm
        imgurl="https://avatar.maplestory.nexon.com/ItemIcon/KEIDJHOH.png"
        huntFactor={8}
        contentFactor={6}
      />
      <form
        onSubmit={handleSubmit(onValid)}
        className="pt-4 grid grid-cols-3 w-full"
      >
        <span className="flex items-center justify-center text-sm">
          Your dream breaker floor
        </span>
        <div className="flex items-center justify-center text-sm">
          <Input register={register("floor")} type="text" required />
        </div>

        <button className="text-orange-400 rounded-md text-center text-sm">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Symbols;
