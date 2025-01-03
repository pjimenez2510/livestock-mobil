import { Redirect, Stack, useRouter, useSegments } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useAuthStore } from "../../features/auth/context/useAuthStore";
import { useEffect } from "react";

export default function Layout() {
  const { isLoading, token, initialize } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, []);

  const segments = useSegments();
  if (isLoading) return <ActivityIndicator />;

  const isPriveteRoute = segments[1] === "management";

  if (isPriveteRoute && !token) {
    return <Redirect href="/(app)/auth/login" />;
  }

  if (!isPriveteRoute && token) {
    console.log("Redirect to management");
    return <Redirect href="/(app)/management/farm" />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen name="403/index" />
      <Stack.Screen name="management" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
