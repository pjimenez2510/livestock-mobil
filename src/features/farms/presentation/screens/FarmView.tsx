import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFarmStore } from "../../context/use-farm-store";
import { PurposeSpanish } from "../../constants/purpose";
import { useRouter } from "expo-router";
import { Button } from "@/src/shared/components/ui/Button";

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const StatCard = ({ title, value, subtitle, icon }: StatCardProps) => (
  <View style={styles.statCard}>
    <View style={styles.statHeader}>
      <Text style={styles.statTitle}>{title}</Text>
      <Ionicons name={icon} size={24} color="#666" />
    </View>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statSubtitle}>{subtitle}</Text>
  </View>
);

export default function FarmView() {
  const { farm } = useFarmStore();
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.statsGrid}>
        <StatCard
          title="Lotes"
          value="+10"
          subtitle="Divisiones de la finca"
          icon="grid-outline"
        />
        <StatCard
          title="Animales"
          value="+230"
          subtitle="Animales vivos"
          icon="paw-outline"
        />
        <StatCard
          title="Gestaciones"
          value="+34"
          subtitle="Vacas en estado de gestación"
          icon="heart-outline"
        />
        <StatCard
          title="Ventas"
          value="+573"
          subtitle="Animales vendidos"
          icon="cash-outline"
        />
      </View>

      <View style={styles.farmCard}>
        <View style={styles.farmHeader}>
          <Text style={styles.farmName}>{farm?.name}</Text>
          <Button
            style={styles.editButton}
            onPress={() =>
              router.replace(`/(app)/management/farm/${farm?.id}/edit`)
            }
          >
            Editar
          </Button>
        </View>

        <View style={styles.farmDetails}>
          <View style={styles.farmDetail}>
            <Text style={styles.detailLabel}>Dirección:</Text>
            <Text style={styles.detailValue}>{farm?.address}</Text>
          </View>

          <View style={styles.farmDetail}>
            <Text style={styles.detailLabel}>Dimensión:</Text>
            <Text style={styles.detailValue}>{farm?.dimension} hectáreas</Text>
          </View>

          <View style={styles.farmDetail}>
            <Text style={styles.detailLabel}>Propósito:</Text>
            <Text style={styles.detailValue}>
              {farm?.purpose ? PurposeSpanish[farm.purpose] : "N/A"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  statCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "47%", // Aproximadamente la mitad del contenedor menos el gap
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statTitle: {
    fontSize: 16,
    color: "#666",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: "#666",
  },
  farmCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  farmHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  farmName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  editButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  editButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "500",
  },
  farmDetails: {
    gap: 8,
  },
  farmDetail: {
    flexDirection: "row",
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  detailValue: {
    fontSize: 14,
    color: "#666",
  },
});
