import { useState } from "react";

const incRatioToPer = (incRatio: number) => {
  return (incRatio - 1) * 100;
};

const ratioToPer = (ratio: number) => {
  return ratio * 100;
};

const perToIncRatio = (per: number) => {
  return per / 100 + 1;
};

const perToRatio = (per: number) => {
  return +(per / 100);
};

export interface RequiredElements {
  job: string;
  level: number;
  finalStat: number;
  finalStatWoBuff: number;
  fixedStat: number;
  subFinalStat: number;
  subFixedStat: number;
  subStatIncRatio: number;
  statAbility: number;
  dmgPer: number;
  bossDmgPer: number;
  critDmgPer: number;
  iGuard: number;
  attackPer: number;
}

export interface InferredElements {
  pureStat: number;
  forceStat: number;
  woFiexdStat: number;
  statIncRatio: number;
  sumStat: number;
  subSumStat: number;
  statFactor: number;
  attack: number;
  attackPerFactor: number;
}

export interface FdipElements {
  fdipStat: number;
  fdipStatPer: number;
  fdipAttack: number;
  fdipAttackPer: number;
  fdipAllStatPer: number;
  fdipDmg: number;
  fdipCritDmg: number;
}

export async function getInferredElements({
  job,
  level,
  finalStat,
  finalStatWoBuff,
  fixedStat,
  subFinalStat,
  subFixedStat,
  subStatIncRatio,
  statAbility,
  dmgPer,
  attackPer,
}: RequiredElements): Promise<InferredElements> {
  let pureStat = 5 * level + 18;
  let forceStat = Math.floor(pureStat * 0.15);
  let woFiexdStat = finalStat - fixedStat;
  let statIncRatio = (finalStat - finalStatWoBuff) / forceStat;
  let sumStat = woFiexdStat / statIncRatio;

  let subWOFixedStat = subFinalStat - subFixedStat;
  let subSumStat = subWOFixedStat / subStatIncRatio;

  let statFactor = 4 * +finalStat + +subFinalStat;
  let finalDmgFactor = 1.495;
  let dmgFactor = perToIncRatio(dmgPer);
  let attackPerFactor = perToIncRatio(attackPer) + 0.1;
  let weaponFactor = 1.3;
  let jobFactor = 1;

  let attack = Math.ceil(
    statAbility /
      (finalDmgFactor *
        attackPerFactor *
        dmgFactor *
        statFactor *
        weaponFactor *
        jobFactor *
        0.01)
  );

  return {
    pureStat,
    forceStat,
    woFiexdStat,
    statIncRatio,
    sumStat,
    subSumStat,
    statFactor,
    attack,
    attackPerFactor,
  };
}

export const getFdip = (
  { dmgPer, bossDmgPer, critDmgPer }: RequiredElements,
  {
    statIncRatio,
    subSumStat,
    sumStat,
    statFactor,
    attack,
    attackPerFactor,
  }: InferredElements
): FdipElements => {
  const fdipStat = ratioToPer((4 * +statIncRatio) / statFactor);

  const fdipStatPer = ratioToPer((4 * sumStat * perToRatio(1)) / statFactor);

  const fdipAttack = ratioToPer(1 / attack);
  const fdipAttackPer = ratioToPer(perToRatio(1) / attackPerFactor);
  const fdipAllStatPer = ratioToPer(
    ((4 * sumStat + subSumStat) * perToRatio(1)) / statFactor
  );
  const fdipDmg = ratioToPer(
    perToRatio(1) / perToIncRatio(+dmgPer + +bossDmgPer)
  );
  const fdipCritDmg = ratioToPer(
    perToRatio(1) / perToIncRatio(35 + +critDmgPer)
  );
  console.log(perToIncRatio(35 + +critDmgPer));

  return {
    fdipStat,
    fdipStatPer,
    fdipAttack,
    fdipAttackPer,
    fdipAllStatPer,
    fdipDmg,
    fdipCritDmg,
  };
};
