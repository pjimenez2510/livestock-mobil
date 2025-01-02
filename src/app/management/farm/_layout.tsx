import { View, Text } from "react-native";
import React from "react";
import { FarmProvider } from "@/src/core/providers/FarmProvider";
import { Slot } from "expo-router";

export default function LayoutFarm() {
  return (
    <FarmProvider>
      <Slot />
    </FarmProvider>
  );
}
