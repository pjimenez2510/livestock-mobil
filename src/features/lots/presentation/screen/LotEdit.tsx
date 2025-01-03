import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import LotForm from "../components/LotForm";
import { useLocalSearchParams } from "expo-router";
import { useLotByIdQuery } from "../../hooks/use-lot-query";

export default function LotEdit() {
  const { idLot } = useLocalSearchParams();
  const { data: lot, isFetching } = useLotByIdQuery(Number(idLot));
  if (isFetching) {
    return <ActivityIndicator size="large" />;
  }
  return <LotForm lot={lot} type="update" />;
}
