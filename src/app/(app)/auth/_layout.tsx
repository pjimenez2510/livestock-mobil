import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login/index" options={{ title: "Iniciar sesión" }} />
      <Stack.Screen name="register/index" options={{ title: "Registrarse" }} />
    </Stack>
  );
}
