import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import RHFTextInput from "@/src/shared/components/inputs/RHFTextInput";
import { FormProvider } from "react-hook-form";
import { useFarmForm } from "../../hooks/use-farm-form";
import { Farm } from "../../interfaces/farm.interface";
import { Button } from "@/src/shared/components/ui/Button";
import RHFSelect from "@/src/shared/components/inputs/RHFSelect";
import { purposeOptions } from "../../constants/purposeOptions";

interface FarmFormProps {
  type?: "create" | "update";
  farm?: Farm;
}

export default function FarmForm({ farm, type = "create" }: FarmFormProps) {
  const { methods, onSubmit, isSubmiting } = useFarmForm({ farm });
  const { handleSubmit } = methods;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <FormProvider {...methods}>
          <View style={styles.form}>
            <RHFTextInput
              name="name"
              label="Nombre de la finca"
              placeholder="Los laureles"
              autoCapitalize="words"
            />

            <RHFTextInput
              name="address"
              label="Dirección"
              placeholder="Calle 123 # 1234"
              autoCapitalize="words"
            />

            <RHFTextInput
              name="dimension"
              label="Dimensión"
              placeholder="1000"
              keyBoardType="numeric"
            />

            <RHFTextInput
              name="purpose"
              label="Propósito"
              placeholder="Propósito"
              autoCapitalize="words"
            />

            <RHFSelect
              name="purpose"
              label="Propósito"
              placeholder="Propósito"
              options={purposeOptions}
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmiting}
              touchSoundDisabled={isSubmiting}
            >
              {type === "create" ? "Crear finca" : "Actualizar finca"}
            </Button>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>No tienes una cuenta? </Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Regístrate</Text>
              </TouchableOpacity>
            </View>
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
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerText: {
    color: "#666",
  },
  registerLink: {
    color: "#22C55E",
    fontWeight: "600",
  },
});
