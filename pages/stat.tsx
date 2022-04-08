import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import Input from "../components/Input";
import {
  FdipElements,
  getFdip,
  getInferredElements,
  InferredElements,
  RequiredElements,
} from "../libs/statCalculator";

interface LineInputProps {
  type?: string;
  selectdata?: string[];
  labelwords: string;
  register: UseFormRegisterReturn;
}

interface TwoLineInputProps {
  type?: string;
  selectdata?: string[];
  labelwords1: string;
  labelwords2: string;
  register: UseFormRegisterReturn;
}

interface Calculator {
  firstOption: string;
  secondOption: string;
  value: number;
}

const LineInput = ({
  type = "number",
  selectdata,
  labelwords,
  register,
}: LineInputProps) => {
  return (
    <div className="grid grid-cols-2 ">
      <span className="pl-4 text-xs flex items-center">{labelwords}</span>
      <div className="flex items-center justify-center">
        <Input
          type={type}
          required
          register={register}
          selectdata={selectdata}
        />
      </div>
    </div>
  );
};

const TwoLineInput = ({
  type = "number",
  selectdata,
  labelwords1,
  labelwords2,
  register,
}: TwoLineInputProps) => {
  return (
    <div className="grid grid-cols-2 ">
      <div className="flex flex-col">
        <span className="pl-4 text-xs flex items-center">{labelwords1}</span>
        <span className="pl-4 text-[5px] flex items-center">{labelwords2}</span>
      </div>
      <div className="flex items-center justify-center">
        <Input
          type={type}
          required
          register={register}
          selectdata={selectdata}
        />
      </div>
    </div>
  );
};

const valueToFdip = (value: string, fdip: FdipElements) => {
  if (value === "주스탯") return fdip.fdipStat;
  else if (value === "주스탯 %") return fdip.fdipStatPer;
  else if (value === "공격력") return fdip.fdipAttack;
  else if (value === "공격력 %") return fdip.fdipAttackPer;
  else if (value === "올스탯 %") return fdip.fdipAllStatPer;
  else if (value === "데미지 %") return fdip.fdipDmg;
  else if (value === "크뎀 %") return fdip.fdipCritDmg;
  else return 0;
};

const Stats: NextPage = () => {
  const { register, handleSubmit } = useForm<RequiredElements>();
  const { register: calcRegister, handleSubmit: calcHandleSubmit } =
    useForm<Calculator>();
  const [calculatedValue, setCalculatedValue] = useState<number>(1);
  const [reqElements, setReqElements] = useState<RequiredElements>();
  const [infElements, setInfElements] = useState<InferredElements>();
  const [fdipElements, setFdipElements] = useState<FdipElements>({
    fdipStat: 0,
    fdipStatPer: 0,
    fdipAttack: 0,
    fdipAttackPer: 0,
    fdipAllStatPer: 0,
    fdipDmg: 0,
    fdipCritDmg: 0,
  });

  const onValid = async (element: RequiredElements) => {
    setReqElements(element);
    const infElement = await getInferredElements(element);
    setInfElements(infElement);
  };
  const onCalcValid = ({ firstOption, secondOption, value }: Calculator) => {
    const fdi = valueToFdip(firstOption, fdipElements) * value;
    setCalculatedValue(fdi / valueToFdip(secondOption, fdipElements));
  };

  useEffect(() => {
    console.log(infElements);
    if (reqElements && infElements) {
      const fdipStat = getFdip(reqElements, infElements);
      setFdipElements(fdipStat);
    }
  }, [infElements]);

  return (
    <div className="mt-20 flex">
      <div className="w-1/2 border border-gray-200 rounded-xl shadow-md">
        <form onSubmit={handleSubmit(onValid)}>
          <div className="py-2 flex flex-col space-y-4">
            <LineInput
              type="selectbox"
              labelwords="직업"
              register={register("job")}
              selectdata={["아델"]}
            />
            <LineInput labelwords="레벨" register={register("level")} />
            <LineInput
              labelwords="메용 O 주스탯"
              register={register("finalStat")}
            />
            <LineInput
              labelwords="메용 X 주스탯"
              register={register("finalStatWoBuff")}
            />

            <TwoLineInput
              labelwords1="고정 주스탯"
              labelwords2="(심볼, 유니온, 어빌, 하이퍼)"
              register={register("fixedStat")}
            />

            <LineInput
              labelwords="부스탯"
              register={register("subFinalStat")}
            />
            <LineInput
              labelwords="부스탯 1당 스탯 상승 비율"
              register={register("subStatIncRatio")}
            />

            <TwoLineInput
              labelwords1="고정 부스탯"
              labelwords2="(심볼, 유니온, 어빌, 하이퍼)"
              register={register("subFixedStat")}
            />

            <LineInput
              labelwords="스탯 공격력"
              register={register("statAbility")}
            />

            <LineInput labelwords="데미지" register={register("dmgPer")} />
            <LineInput labelwords="보공" register={register("bossDmgPer")} />
            <LineInput labelwords="크뎀" register={register("critDmgPer")} />
            <LineInput labelwords="방무" register={register("iGuard")} />
            <LineInput labelwords="템 공퍼" register={register("attackPer")} />
            <button className="flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-white rounded-xl transition-colors focus:outline-none">
              Submit!
            </button>
          </div>
        </form>
      </div>
      <div className="w-1/2 grid grid-cols-1">
        <div className="border border-gray-200 rounded-xl shadow-md py-2 flex flex-col space-y-4">
          <span className="text-center">최종 데미지 상승량</span>
          <div className="grid grid-cols-2 text-center">
            <span className="text-xs">주스탯 1당</span>
            <span className="text-xs">{`${fdipElements.fdipStat.toFixed(
              5
            )}%`}</span>
          </div>
          <div className="grid grid-cols-2 text-center">
            <span className="text-xs">주스탯 1%당</span>
            <span className="text-xs">{`${fdipElements.fdipStatPer.toFixed(
              5
            )}%`}</span>
          </div>
          <div className="grid grid-cols-2 text-center">
            <span className="text-xs">공격력 1당</span>
            <span className="text-xs">{`${fdipElements.fdipAttack.toFixed(
              5
            )}%`}</span>
          </div>
          <div className="grid grid-cols-2 text-center">
            <span className="text-xs">공격력 1%당</span>
            <span className="text-xs">{`${fdipElements.fdipAttackPer.toFixed(
              5
            )}%`}</span>
          </div>
          <div className="grid grid-cols-2 text-center">
            <span className="text-xs">올스탯 1%당</span>
            <span className="text-xs">{`${fdipElements.fdipAllStatPer.toFixed(
              5
            )}%`}</span>
          </div>
          <div className="grid grid-cols-2 text-center">
            <span className="text-xs">데미지 1%당 (보공과 동일)</span>
            <span className="text-xs">{`${fdipElements.fdipDmg.toFixed(
              5
            )}%`}</span>
          </div>
          <div className="grid grid-cols-2 text-center">
            <span className="text-xs">크뎀 1%당</span>
            <span className="text-xs">{`${fdipElements.fdipCritDmg.toFixed(
              5
            )}%`}</span>
          </div>
        </div>
        <form
          onSubmit={calcHandleSubmit(onCalcValid)}
          className="border border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center"
        >
          <h1>Translator</h1>
          <div className="mt-12 flex items-center space-x-4 w-1/2">
            <Input
              type="selectbox"
              register={calcRegister("firstOption")}
              selectdata={[
                "주스탯",
                "주스탯 %",
                "공격력",
                "공격력 %",
                "올스탯 %",
                "데미지 %",
                "크뎀 %",
              ]}
            />
            <Input type="number" register={calcRegister("value")} required />
          </div>
          <h2 className="mt-4">&darr;</h2>
          <div className="mt-4 flex items-center space-x-4 w-1/2">
            <Input
              type="selectbox"
              register={calcRegister("secondOption")}
              selectdata={[
                "주스탯",
                "주스탯 %",
                "공격력",
                "공격력 %",
                "올스탯 %",
                "데미지 %",
                "크뎀 %",
              ]}
            />
            <span className="border-2 border-gray-300 rounded-md w-1/2 py-0.5 focus:border-orange-400 text-center">
              {calculatedValue.toFixed(3)}
            </span>
          </div>
          <button className="mt-24 flex items-center justify-center text-orange-400 hover:bg-orange-400 hover:text-white rounded-xl transition-colors focus:outline-none px-3">
            Calculate!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Stats;
