import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";

const requirements = [
  0, 12, 15, 20, 27, 36, 47, 60, 75, 92, 111, 132, 155, 180, 207, 236, 267, 300,
  335, 372,
];

const getRemainSymbols = (level: number, progress: number) => {
  let remainSymbols = 0;
  requirements.map((req, i) => {
    if (i >= level) remainSymbols += req;
  });
  if (progress > remainSymbols) {
    remainSymbols = 0;
  } else {
    remainSymbols -= progress;
  }

  return remainSymbols;
};

interface StateSymbolInfo {
  level: number;
  progress: number;
  hunt: boolean;
  content: boolean;
}

interface StateInfo {
  imgurl: string;
  huntFactor: number;
  contentFactor: number;
}

export default function ArcaneForm({
  imgurl,
  huntFactor,
  contentFactor,
}: StateInfo) {
  const { register, handleSubmit } = useForm<StateSymbolInfo>();
  const [remainDate, setRemainDate] = useState<undefined | number | "Inf">();

  const onValid = (data: StateSymbolInfo) => {
    const remainSymbols = getRemainSymbols(data.level, data.progress);
    if (remainSymbols <= 0) {
      setRemainDate(0);
      return;
    }

    let perday =
      (data.hunt ? huntFactor : 0) + (data.content ? contentFactor : 0);

    if (perday === 0) setRemainDate("Inf");
    else setRemainDate(Math.ceil(remainSymbols / perday));

    return;
  };
  return (
    <form onSubmit={handleSubmit(onValid)} className="grid grid-cols-7 w-full">
      <span className="flex items-center justify-center  ">
        <img src={imgurl} />
      </span>

      <div className="flex items-center justify-center  ">
        <Input
          type="number"
          required
          register={register("level", { max: 20 })}
        />
      </div>
      <div className="flex items-center justify-center  ">
        <Input type="number" required register={register("progress")} />
      </div>
      <div className="flex items-center justify-center  ">
        <Input type="checkbox" register={register("hunt")} />
      </div>
      <div className="flex items-center justify-center  ">
        <Input type="checkbox" register={register("content")} />
      </div>

      <div className="flex justify-center w-full">
        <Button text="Calc" />
      </div>

      <span className="flex items-center justify-center text-xs">
        {remainDate === 0 ? "Done!" : remainDate && `${remainDate} days left`}
      </span>
    </form>
  );
}
