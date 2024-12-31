import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Controller } from "react-hook-form";
import { useLogin } from "../../hooks/useLogin";

export const LoginScreen = () => {
  const { methods, onSubmit, isSubmiting } = useLogin();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../../../../assets/images/logo-app.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* App Name */}
        <Text style={styles.title}>RanchApp</Text>
        <Text style={styles.subtitle}>La aplicación para los ganaderos</Text>

        {/* Form */}
        <View style={styles.form}>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <>
                <Text style={styles.label}>Nombre de usuario</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese su nombre de usuario"
                  autoCapitalize="none"
                />
                {errors.username && (
                  <Text style={styles.errorText}>
                    {errors.username.message}
                  </Text>
                )}
              </>
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Ingrese su contraseña"
                  secureTextEntry
                />
                {errors.password && (
                  <Text style={styles.errorText}>
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmiting}
          >
            <Text style={styles.buttonText}>
              {isSubmiting ? "Ingresando..." : "Ingresar"}
            </Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>No tienes una cuenta? </Text>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  label: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#22C55E",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
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
