import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import FarmForm from "../components/FarmForm";
import { useFarmStore } from "../../context/use-farm-store";

export default function FarmEdit() {
  const { farm, loading } = useFarmStore();

  if (loading) {
    return <ActivityIndicator />;
  }

  return <FarmForm farm={farm} type="update" />;
}
