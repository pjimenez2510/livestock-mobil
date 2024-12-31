import { View, Text } from "react-native";
import React from "react";
import Drawer from "expo-router/drawer";

export default function ListBreedScreen() {
  return (
    <>
      <Drawer.Screen options={{ headerTitle: "Razas" }} />
      <View>
        <Text>Lista de razas</Text>
      </View>
    </>
  );
}
