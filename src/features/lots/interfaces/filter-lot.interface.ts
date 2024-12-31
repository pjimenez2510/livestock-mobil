import { Purpose } from "./lots.interface";

export interface FilterLotsParams {
  name?: string;
  purpose?: Purpose;
  dimension?: number;
  farmId?: number;
}
