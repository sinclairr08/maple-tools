import { NextPage } from "next";
import { cls } from "../libs/utils";
import flameImg from "../public/flame.png";
import addiImg from "../public/addi.png";
import potenImg from "../public/poten.png";
import starImg from "../public/star.png";
import Image from "next/image";
import LineInput from "../components/LineInput";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Character, Item, ItemType, Status } from "@prisma/client";
import useSWR from "swr";
import axios from "axios";
import { motion, useViewportScroll } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";

interface ItemBtnProps {
  status: Status;
  onClick: any;
  item: Item;
}

interface ItemBtnLineProps {
  imgsrc: string;
  value: string | number;
}

interface ItemForm {
  name: string;
  flame?: string;
  poten?: string;
  addi?: string;
  star?: string;
  status: Status;
}

interface CharForm {
  name: string;
  level: number;
  job: string;
}

interface CharacterWItems extends Character {
  items: Item[];
}

interface CharacterReturn {
  ok: boolean;
  characters: CharacterWItems[];
}

const ItemBtnLine = ({ imgsrc, value }: ItemBtnLineProps) => {
  return (
    <div className="grid grid-cols-[2fr_3fr] gap-x-0.5 mb-0.5 items-center">
      <div className="w-4 h-4 text-red-400">{imgsrc}</div>
      <span>{value}</span>
    </div>
  );
};

const statusStyle = (status: Status) => {
  if (status === "DONE") return "border-2 border-gray-800";
  else if (status === "BLANK") return "border-2 border-red-600";
  else if (status === "TEMP") return "border-2 border-blue-600";
  else if (status === "CLOSED") return "text-white bg-white";
  else return "";
};

const ItemBtn = ({ status, onClick, item }: ItemBtnProps) => {
  return (
    <button
      onClick={onClick}
      className={cls(
        "p-0.5 rounded-md flex items-center justify-center flex-col w-16",
        statusStyle(status)
      )}
    >
      <span className="flex text-xs text-center">{item.name}</span>
      <div className="flex flex-col text-xs items-center justify-center">
        {item.flame ? (
          <ItemBtnLine imgsrc="추" value={item.flame} />
        ) : (
          <div className="w-4 h-4 mb-0.5" />
        )}
        {item.star ? (
          <ItemBtnLine imgsrc="별" value={item.star} />
        ) : (
          <div className="w-4 h-4 mb-0.5" />
        )}
        {item.poten ? (
          <ItemBtnLine imgsrc="잠" value={item.poten} />
        ) : (
          <div className="w-4 h-4 mb-0.5" />
        )}
        {item.addi ? (
          <ItemBtnLine imgsrc="에" value={item.addi} />
        ) : (
          <div className="w-4 h-4 mb-0.5" />
        )}
      </div>
    </button>
  );
};

const HeaderBtn = ({ value }: { value: string }) => {
  return (
    <span className="flex items-center justify-center border-2 border-gray-200 rounded-md p-0.5 text-xs w-16">
      {value}
    </span>
  );
};

const ITEM_LIST = Object.values(ItemType);

const ITEM_LIST_KOR = {
  WEAPON: "무기",
  SUBWEAPON: "보조",
  EMBLEM: "엠블",
  RING1: "반1",
  RING2: "반2",
  RING3: "반3",
  RING4: "반4",
  POCKET: "포켓",
  PENDANT: "목1",
  SUBPENDANT: "목2",
  BELT: "벨트",
  CAP: "모자",
  FOREHEAD: "얼장",
  EYEACC: "눈장",
  CLOTHES: "상의",
  PANTS: "하의",
  SHOES: "신발",
  EARACC: "귀걸",
  SHOULDER: "견갑",
  GLOVES: "장갑",
  BADGE: "뱃지",
  MEDAL: "훈장",
  CAPE: "망토",
  HEART: "심장",
};

const compareItems = (item1: Item, item2: Item) => {
  const idx1 = ITEM_LIST.indexOf(item1.type);
  const idx2 = ITEM_LIST.indexOf(item2.type);

  return idx1 - idx2;
};

const compareChars = (char1: Character, char2: Character) => {
  if (char1.level === char2.level) return char1.id - char2.id;
  else return char2.level - char1.level;
};

const Union: NextPage = () => {
  const [itemId, setItemId] = useState<string | null>(null);
  const [charId, setCharId] = useState<string | null>(null);
  const [charAdd, setCharAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register: registerItem,
    handleSubmit: handleSubmitItem,
    setValue: setItem,
  } = useForm<ItemForm>();
  const {
    register: registerChar,
    handleSubmit: handleSubmitChar,
    setValue: setChar,
  } = useForm<CharForm>();

  const { data, mutate } = useSWR<CharacterReturn>(`/api/characters`);
  const { scrollX, scrollY } = useViewportScroll();

  const [x, setX] = useState(scrollX.get());
  const [y, setY] = useState(scrollY.get());

  const onItemBtnClicked = ({
    id,
    name,
    flame,
    star,
    poten,
    addi,
    status,
  }: Item) => {
    setItemId("" + id);

    setItem("name", name);
    setItem("flame", flame ? flame : "");
    setItem("star", star ? star : "");
    setItem("poten", poten ? poten : "");
    setItem("addi", addi ? addi : "");
    setItem("status", status);
  };

  const onCharBtnClicked = ({ id, name, job, level }: Character) => {
    setCharId("" + id);

    setChar("name", name);
    setChar("level", level);
    setChar("job", job);
  };

  const onCharAddBtnClicked = () => {
    setCharAdd(true);

    setChar("name", "");
    setChar("level", 1);
    setChar("job", "");
  };

  const onCharValid = async (form: CharForm) => {
    if (loading) return;
    else setLoading(true);

    if (charAdd) {
      alert("Sorry, This function is currentlt disabled");
      /**  
      await axios.post("/api/characters", form);
      mutate();
      */

      setCharAdd(false);
    } else if (charId) {
      alert("Sorry, This function is currentlt disabled");
      /**
      await axios.put(`/api/characters/${charId}`, form);
      mutate();
       */

      setCharId(null);
    }
    setLoading(false);
  };

  const onItemValid = async (form: ItemForm) => {
    if (!itemId || loading) return;
    else setLoading(true);

    alert("Sorry, This function is currentlt disabled");
    /**
    await axios.put(`/api/items/${itemId}`, form);
    mutate();
     */

    setItemId(null);
    setLoading(false);
  };

  useEffect(() => {
    scrollX.onChange(() => {
      setX(scrollX.get());
    });
    scrollY.onChange(() => {
      setY(scrollY.get());
    });
  }, []);
  return (
    <>
      <div className="mx-2 min-w-fit">
        <motion.div
          className="flex items-center fixed top-14 z-20 bg-white"
          style={{ x: -x }}
        >
          <HeaderBtn value="이름" key={0} />
          {ITEM_LIST.map((item, i) => (
            <HeaderBtn value={ITEM_LIST_KOR[item]} key={i + 1} />
          ))}
        </motion.div>
        {data?.characters.sort(compareChars).map((character) => (
          <div className="flex items-center mb-0.5" key={character.id}>
            <button
              className="flex flex-col items-center justify-center border-2 border-gray-800 rounded-md p-0.5 text-xs w-16"
              onClick={() => onCharBtnClicked(character)}
            >
              <span>{character.name.slice(0, 4)}</span>
              <span>LV {character.level}</span>
              <span>{character.job}</span>
            </button>

            {character.items.sort(compareItems).map((item) => (
              <ItemBtn
                status={item.status}
                key={item.id}
                item={item}
                onClick={() => onItemBtnClicked(item)}
              />
            ))}
          </div>
        ))}
        <div
          className="w-full flex items-center mx-3"
          onClick={onCharAddBtnClicked}
        >
          <Button text="+" />
        </div>
      </div>
      {itemId ? (
        <motion.div
          className={cls(
            "w-full h-full bg-gray-900 flex items-center justify-center z-30"
          )}
          style={{
            position: "absolute",
            left: x,
            top: y,
          }}
        >
          <div className="flex flex-col bg-white rounded-md ">
            <button
              onClick={() => setItemId(null)}
              className="pt-4 text-xs text-orange-400"
            >
              뒤로
            </button>
            <form
              onSubmit={handleSubmitItem(onItemValid)}
              className="flex flex-col space-y-4 py-4"
            >
              <LineInput
                register={registerItem("name", { required: true })}
                labelword="이름"
                type="text"
              />
              <LineInput
                register={registerItem("star")}
                labelword="별"
                type="number"
              />
              <LineInput
                register={registerItem("flame")}
                labelword="추옵"
                type="text"
              />
              <LineInput
                register={registerItem("poten")}
                labelword="잠재"
                type="text"
              />
              <LineInput
                register={registerItem("addi")}
                labelword="에디"
                type="text"
              />
              <div className="w-full flex justify-center items-center">
                <Input
                  type="selectbox"
                  register={registerItem("status")}
                  selectdata={Object.values(Status)}
                />
              </div>
              <button className="text-xs text-orange-400 py-0.5">제출</button>
            </form>
          </div>
        </motion.div>
      ) : null}
      {charAdd || charId ? (
        <motion.div
          className={cls(
            "w-full h-full bg-gray-900 flex items-center justify-center z-30"
          )}
          style={{
            position: "absolute",
            left: x,
            top: y,
          }}
        >
          <div className="flex flex-col bg-white rounded-md ">
            <button
              onClick={() => {
                setCharAdd(false);
                setCharId(null);
              }}
              className="pt-4 text-xs text-orange-400"
            >
              뒤로
            </button>
            <form
              onSubmit={handleSubmitChar(onCharValid)}
              className="flex flex-col space-y-4 py-4"
            >
              <LineInput
                register={registerChar("name", { required: true })}
                labelword="캐릭 이름"
                type="text"
              />
              <LineInput
                register={registerChar("level", { required: true })}
                labelword="캐릭 레벨"
                type="number"
              />
              <LineInput
                register={registerChar("job", { required: true })}
                labelword="캐릭 직업"
                type="text"
              />
              <button className="text-xs text-orange-400 py-0.5">제출</button>
            </form>
          </div>
        </motion.div>
      ) : null}
    </>
  );
};

export default Union;
