import { BaseHttpService } from "@/src/core/services/base-http.service";
import { Farm, FarmCrete, FarmUpdate } from "../interfaces/farm.interface";

export class FarmService extends BaseHttpService<
  Farm,
  FarmCrete,
  FarmUpdate,
  undefined
> {
  protected baseUrl: string = "/farms";
}
