import { useQuery } from "@tanstack/react-query";
import { FarmService } from "../services/farm.service";
import { QUERY_KEYS } from "@/src/shared/constants/query-key";

export const useFarmsQuery = () => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.FARMS],
    queryFn: async () => await FarmService.getInstance().getAll(),
  });

  return query;
};

export const useFarmByIdQuery = (id: number) => {
  const query = useQuery({
    queryKey: [QUERY_KEYS.FARMS, String(id)],
    queryFn: async () => await FarmService.getInstance().getById(id),
    enabled: !!id,
  });

  return query;
};
