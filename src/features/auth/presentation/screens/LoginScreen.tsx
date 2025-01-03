import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FormProvider } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";
import RHFTextInput from "@/src/shared/components/inputs/RHFTextInput";
import { Button } from "@/src/shared/components/ui/Button";

export const LoginScreen = () => {
  const { methods, onSubmit, isSubmiting } = useLogin();
  const { handleSubmit } = methods;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../../assets/images/logo-app.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>RanchApp</Text>
        <Text style={styles.subtitle}>La aplicación para los ganaderos</Text>

        <FormProvider {...methods}>
          <View style={styles.form}>
            <RHFTextInput
              name="username"
              label="Usuario"
              placeholder="usuario"
              autoComplete="username"
              autoCapitalize="none"
              autoCorrect={false}
            />

            <RHFTextInput
              name="password"
              label="Contraseña"
              secureTextEntry={true}
              placeholder="******"
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              loading={isSubmiting}
              touchSoundDisabled={isSubmiting}
            >
              Iniciar sesión
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
};

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
