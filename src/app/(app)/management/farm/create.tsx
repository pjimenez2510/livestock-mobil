import { View, Text } from "react-native";
import React from "react";
import FarmCreate from "@/src/features/farms/presentation/screens/FarmCreate";
import Drawer from "expo-router/drawer";

export default function CreateFarmScreen() {
  return (
    <>
      <Drawer.Screen options={{ headerTitle: "Nueva finca" }} />
      <FarmCreate />
    </>
  );
}
