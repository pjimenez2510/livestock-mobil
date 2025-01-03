"use client";

import { z } from "zod";
import { Farm, Purpose } from "../interfaces/farm.interface";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FarmService } from "../services/farm.service";
import { useFarmStore } from "../context/use-farm-store";
import queryClient from "@/src/core/infrastructure/react-query/query-client";
import { QUERY_KEYS } from "@/src/shared/constants/query-key";
import { Href, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";

const schema = z.object({
  name: z.string().min(1, "El nombre de la finca es requerida"),
  address: z.string().min(1, "La dirección es requerida"),
  purpose: z.enum([Purpose.DualPurpose, Purpose.Meat, Purpose.Milk], {
    message: "El proposito es requerido",
  }),
  dimension: z.coerce
    .number({ message: "La dimensión debe ser un número" })
    .min(1, "La dimension debe ser igula o mayor a 1"),
});

type FormFields = z.infer<typeof schema>;

interface FarmFormProps {
  farm?: Farm;
}

export const useFarmForm = ({ farm }: FarmFormProps) => {
  const { setFarm } = useFarmStore();
  const router = useRouter();
  const toast = useToast();
  const methods = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: farm?.name || "",
      address: farm?.address || "",
      dimension: farm?.dimension || undefined,
      purpose: farm?.purpose || undefined,
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (farm) {
      await FarmService.getInstance()
        .update(farm.id, data)
        .then((response) => {
          toast.show(`Finca ${response.name} actualizada`, { type: "success" });
          queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FARMS] });
          setFarm({ farm: response });
          router.replace(`/(app)/management/farm/${response.id}` as Href);
          methods.reset();
        })
        .catch((error) => {
          console.error(error);
        });
      return;
    }
    await FarmService.getInstance()
      .create(data)
      .then((response) => {
        toast.show(`Finca ${response.name} creada correctamente`, {
          type: "success",
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.FARMS] });
        setFarm({ farm: response });
        router.replace(`/(app)/management/farm/${response.id}` as Href);
        methods.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return { onSubmit, methods, isSubmiting: methods.formState.isSubmitting };
};
