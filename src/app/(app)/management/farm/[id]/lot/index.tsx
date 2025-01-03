import React from "react";
import LotView from "@/src/features/lots/presentation/screen/LotView";
import Drawer from "expo-router/drawer";

export default function ListLotScreen() {
  return (
    <>
      <Drawer.Screen options={{ headerTitle: "Lotes" }} />
      <LotView />
    </>
  );
}
