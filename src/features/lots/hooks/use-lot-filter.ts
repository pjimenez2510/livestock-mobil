import { z } from "zod";
import { Purpose } from "../interfaces/lots.interface";

export const schemaLotFilter = z.object({
  name: z.string().optional(),
  purpose: z.nativeEnum(Purpose).optional(),
  dimension: z.number().optional(),
  farmId: z.number().optional(),
});

export type FormFieldsLotFilter = z.infer<typeof schemaLotFilter>;
