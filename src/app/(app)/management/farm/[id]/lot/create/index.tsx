import React from "react";
import LotCreate from "@/src/features/lots/presentation/screen/LotCreate";
import Drawer from "expo-router/drawer";

export default function CreateLotScreen() {
  return (
    <>
      <Drawer.Screen options={{ headerTitle: "Nuevo Lote" }} />
      <LotCreate />
    </>
  );
}
