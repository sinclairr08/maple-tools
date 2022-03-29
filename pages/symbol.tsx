import { NextPage } from "next";
import ArcaneForm from "../components/ArcaneForm";

const Symbols: NextPage = () => {
  return (
    <div className="mt-20 flex flex-col items-center justify-center space-y-4 px-6 ">
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
        contentFactor={7}
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
    </div>
  );
};

export default Symbols;
