import { Button } from "@/src/shared/components/ui/Button";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Purpose } from "../../interfaces/lots.interface";
import { PurposeSpanish } from "../../constants/purpose";

interface LoteCardProps {
  name: string;
  dimension: number;
  purpose: Purpose;
  onEdit: () => void;
  onDelete: () => void;
}

export default function LoteCard({
  name,
  dimension,
  purpose,
  onEdit,
  onDelete,
}: LoteCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.detail}>Dimensión: {dimension}</Text>
      <Text style={styles.detail}>Propósito: {PurposeSpanish[purpose]}</Text>
      <View style={styles.buttonContainer}>
        <Button variant="secondary" style={styles.editButton} onPress={onEdit}>
          Editar
        </Button>
        <Button
          variant="destructive"
          style={styles.deleteButton}
          onPress={onDelete}
        >
          Eliminar
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  detail: {
    fontSize: 14,
    marginBottom: 4,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  editButton: {
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});
