import { Option } from "@/shared/interfaces/option.interface";
import { Lot } from "../interfaces/lots.interface";

export const getLotsOptions = (lots: Lot[]): Option[] => {
  return lots.map((lot) => ({
    value: lot.id.toString(),
    label: lot.name,
  }));
};
