import { useFarmStore } from "@/src/features/farms/context/use-farm-store";
import { useFarmsQuery } from "@/src/features/farms/hooks/use-farm-query";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native";

interface FarmProviderProps {
  children: React.ReactNode;
}

export const FarmProvider: React.FC<FarmProviderProps> = ({ children }) => {
  const { loading, setFarm } = useFarmStore((state) => state);
  const { id } = useLocalSearchParams();
  useEffect(() => {
    setFarm({ idFarm: Number(id) });
  }, [setFarm]);

  if (loading) return <ActivityIndicator />;

  return children;
};
