import { View, Text } from "react-native";
import React from "react";
import { useFarmStore } from "@/src/features/farms/context/use-farm-store";
import FarmView from "@/src/features/farms/presentation/screens/FarmView";
import { Stack } from "expo-router";
import Drawer from "expo-router/drawer";

export default function FarmScreen() {
  const { farm } = useFarmStore();
  return (
    <>
      <Drawer.Screen options={{ headerTitle: farm?.name }} />
      <FarmView />
    </>
  );
}
