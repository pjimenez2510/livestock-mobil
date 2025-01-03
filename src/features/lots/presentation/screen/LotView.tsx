import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import LoteCard from "../components/LotCard";
import { useLotsQuery } from "../../hooks/use-lot-query";
import { useRouter } from "expo-router";
import { useFarmStore } from "@/src/features/farms/context/use-farm-store";
import { LotService } from "../../services/lot.service";
import queryClient from "@/src/core/infrastructure/react-query/query-client";
import { QUERY_KEYS } from "@/src/shared/constants/query-key";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "@/src/shared/components/ui/Button";

export default function LotView() {
  const { farm } = useFarmStore();
  const { data: lotes } = useLotsQuery({ farmId: farm?.id });
  const router = useRouter();
  const lotService = LotService.getInstance();

  const handleEdit = (id: number) => {
    router.replace(`/management/farm/${farm?.id}/lot/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Eliminar lote",
      "Estas seguro de eliminar este lote? Esta acción no se revertira.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await lotService.delete(id).then(() => {
              queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LOTS] });
            });
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Lotes</Text>
        <Text style={styles.headerSubtitle}>
          Lista de todos los lotes de la finca{" "}
          <Text style={styles.bold}>Sunny Acres</Text>
        </Text>
      </View>
      <FlatList
        data={lotes}
        renderItem={({ item }) => (
          <LoteCard
            name={item.name}
            dimension={item.dimension}
            purpose={item.purpose}
            onEdit={() => handleEdit(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
      />
      <Button
        style={styles.floatingButton}
        onPress={() => {
          router.replace(`/(app)/management/farm/${farm?.id}/lot/create`);
        }}
      >
        <Ionicons name="add" size={27} color="#fff" />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  bold: {
    fontWeight: "bold",
  },
  list: {
    marginTop: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#28a745",
    height: 57,
    width: 57,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Sombra en Android
    shadowColor: "#000", // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
