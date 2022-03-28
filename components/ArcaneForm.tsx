import { useState } from "react";
import { useForm } from "react-hook-form";

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
        <input
          type="number"
          className="border-2 border-gray-300 rounded-md w-1/2 pl-1.5 py-0.5 focus:border-orange-400 focus:outline-none"
          {...register("level")}
        />
      </div>
      <div className="flex items-center justify-center  ">
        <input
          type="number"
          className="border-2 border-gray-300 rounded-md w-1/2 pl-1.5 py-0.5  focus:border-orange-400 focus:outline-none"
          {...register("progress")}
        />
      </div>
      <div className="flex items-center justify-center  ">
        <input
          className="form-checkbox border rounded-md border-gray-700 focus:outline-none focus:border-orange-400 text-orange-400"
          type="checkbox"
          {...register("hunt")}
        />
      </div>
      <div className="flex items-center justify-center  ">
        <input
          className="form-checkbox border rounded-md border-gray-700 focus:outline-none focus:border-orange-400 text-orange-400"
          type="checkbox"
          {...register("content")}
        />
      </div>

      <button className="flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-white rounded-xl transition-colors focus:outline-none">
        Calc
      </button>

      <span className="flex items-center justify-center text-xs">
        {remainDate === 0 ? "Done!" : remainDate && `${remainDate} days left`}
      </span>
    </form>
  );
}
