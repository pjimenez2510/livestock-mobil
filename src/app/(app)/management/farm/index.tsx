import { View, Text } from "react-native";
import React from "react";
import { useSegments } from "expo-router";

export default function ListFarmScreen() {
  const segments = useSegments();
  return (
    <View>
      <Text>{segments}</Text>
    </View>
  );
}
