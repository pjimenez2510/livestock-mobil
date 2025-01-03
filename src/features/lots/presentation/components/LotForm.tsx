import { View, Text, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/src/shared/components/ui/Button";
import RHFSelect from "@/src/shared/components/inputs/RHFSelect";
import RHFTextInput from "@/src/shared/components/inputs/RHFTextInput";
import { useLotForm } from "../../hooks/use-lot-form";
import { Lot } from "../../interfaces/lots.interface";
import { purposeOptions } from "../../constants/purposeOptions";
import { useFarmsQuery } from "@/src/features/farms/hooks/use-farm-query";

interface LotFormProps {
  type?: "create" | "update";
  lot?: Lot;
}

export default function LotForm({ lot, type = "create" }: LotFormProps) {
  const { methods, onSubmit, isSubmiting } = useLotForm({ lot });
  const { handleSubmit } = methods;
  const { data: farms } = useFarmsQuery();

  const farmOptions =
    farms?.map((farm) => ({
      value: String(farm.id),
      label: farm.name,
    })) || [];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <RHFTextInput
              name="name"
              label="Nombre del lote"
              autoCapitalize="words"
            />

            <RHFTextInput
              name="dimension"
              label="Dimensión (Hectáreas)"
              keyBoardType="numeric"
            />

            <RHFSelect
              name="purpose"
              label="Propósito"
              options={purposeOptions}
            />

            {type === "update" && (
              <RHFSelect
                name="farmId"
                label="Cambio de finca"
                options={farmOptions}
                searchPlaceholder="Buscar finca..."
                searchable
              />
            )}

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmiting}
              touchSoundDisabled={isSubmiting}
            >
              {type === "create" ? "Crear lote" : "Actualizar lote"}
            </Button>
          </View>
        </FormProvider>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    margin: "auto",
    padding: 20,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    gap: 8,
  },
});
