import { View, Text } from "react-native";
import React from "react";
import LotEdit from "@/src/features/lots/presentation/screen/LotEdit";
import Drawer from "expo-router/drawer";

export default function EditLotScreen() {
  return (
    <>
      <Drawer.Screen options={{ headerTitle: "Editar Lote" }} />
      <LotEdit />
    </>
  );
}
