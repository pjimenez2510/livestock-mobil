import { Lot, LotCreate, LotUpdate } from "../interfaces/lots.interface";
import { FilterLotsParams } from "../interfaces/filter-lot.interface";
import { BaseHttpService } from "@/src/core/services/base-http.service";

export class LotService extends BaseHttpService<
  Lot,
  LotCreate,
  LotUpdate,
  FilterLotsParams
> {
  protected baseUrl: string = "/lots";
}
