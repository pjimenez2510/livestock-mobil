import React from "react";
import FarmEdit from "@/src/features/farms/presentation/screens/FarmEdit";
import { useFarmStore } from "@/src/features/farms/context/use-farm-store";
import Drawer from "expo-router/drawer";

export default function EditFarmScreen() {
  const { farm } = useFarmStore();
  return (
    <>
      <Drawer.Screen options={{ headerTitle: `Editar finca: ${farm?.name}` }} />
      <FarmEdit />
    </>
  );
}
