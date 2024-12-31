"use client";

import { z } from "zod";
import { Lot, Purpose } from "../interfaces/lots.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LotService } from "../services/lot.service";
import { Href, useRouter } from "expo-router";
import { useFarmStore } from "../../farms/context/use-farm-store";
import queryClient from "@/src/core/infrastructure/react-query/query-client";
import { QUERY_KEYS } from "@/src/shared/constants/query-key";

const schema = z.object({
  name: z.string().min(1, "El nombre de la finca es requerida"),
  purpose: z.enum([Purpose.DualPurpose, Purpose.Meat, Purpose.Milk], {
    message: "El proposito es requerido",
  }),
  dimension: z.coerce
    .number({ message: "La dimensión debe ser un número" })
    .min(0.1, "La dimension debe ser igual o mayor a 0.1"),
  farmId: z.string().min(1, "La finca es requerida"),
});

type FormFields = z.infer<typeof schema>;

interface LotFormProps {
  lot?: Lot;
}

export const useLotForm = ({ lot }: LotFormProps) => {
  const router = useRouter();
  const { farm } = useFarmStore();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: lot?.name || "",
      dimension: lot?.dimension || undefined,
      purpose: lot?.purpose || undefined,
      farmId: String(farm?.id) || undefined,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!farm) return;
    if (lot) {
      await LotService.getInstance()
        .update(lot.id, { ...data, farmId: Number(data.farmId) })
        .then(() => {
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTS] });
          const route = `/management/farm/${farm?.id}/lot/list`;
          router.push(route as any);
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    await LotService.getInstance()
      .create({ ...data, farmId: Number(data.farmId) })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTS] });
        router.push(`/management/farm/${farm?.id}/lot/list` as Href);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
};
