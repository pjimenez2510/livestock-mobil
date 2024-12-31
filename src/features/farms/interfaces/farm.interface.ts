export enum Purpose {
  Milk = "MILK",
  Meat = "MEAT",
  DualPurpose = "DUAL_PURPOSE",
}

export interface FarmBase {
  name: string;
  address: string;
  purpose: Purpose;
  dimension: number;
}

export interface Farm extends FarmBase {
  id: number;
  createAt: string;
}

export type FarmCrete = FarmBase;

export type FarmUpdate = Partial<FarmBase>;
