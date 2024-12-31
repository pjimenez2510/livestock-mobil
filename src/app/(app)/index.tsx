import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function HomeScreen() {
  const navigation = useNavigation();

  const features = [
    {
      icon: "map",
      title: "Gestión de Ganado",
      description:
        "Registra y monitorea tu ganado con información detallada incluyendo edad, raza y fotografías.",
    },
    {
      icon: "map",
      title: "Control de Fincas",
      description:
        "Administra tus fincas, define lotes y realiza un seguimiento preciso de la ubicación del ganado.",
    },
    {
      icon: "medical",
      title: "Seguimiento Sanitario",
      description:
        "Mantén un registro de vacunas y tratamientos médicos para cada animal.",
    },
    {
      icon: "stats-chart",
      title: "Reportes y Análisis",
      description:
        "Obtén información valiosa para la toma de decisiones en tu negocio ganadero.",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Image
          source={require("../../../assets/images/logo-app.jpg")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>RanchApp</Text>
        <Text style={styles.subtitle}>
          Sistema Integral de Control Ganadero
        </Text>
        <Text style={styles.description}>
          Gestiona tu ganado de manera eficiente con nuestra plataforma
          especializada para ganaderos
        </Text>
      </View>

      {/* Features Section */}
      <View style={styles.featuresContainer}>
        <Text style={styles.sectionTitle}>Características Principales</Text>
        <View style={styles.features}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <Ionicons name={feature.icon as any} size={32} color="#22C55E" />
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Comienza Ahora</Text>
        <Text style={styles.ctaDescription}>
          Únete a la comunidad de ganaderos que ya están optimizando su gestión
        </Text>
        <View style={styles.buttonContainer}>
          <Link href="/auth/login" style={[styles.button, styles.loginButton]}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </Link>
          <Link
            href="/auth/register"
            style={[styles.button, styles.registerButton]}
          >
            <Text style={styles.buttonText}>Registrarse</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  hero: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginHorizontal: 20,
  },
  featuresContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  features: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  featureCard: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  featureDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  ctaSection: {
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
    marginTop: 20,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    minWidth: 150,
  },
  loginButton: {
    backgroundColor: "#22C55E",
  },
  registerButton: {
    backgroundColor: "#333",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
