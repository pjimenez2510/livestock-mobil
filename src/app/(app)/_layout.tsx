import { Redirect, Stack, useRouter, useSegments } from "expo-router";
import { useAuth } from "../../core/providers/AuthProvider";
import { ActivityIndicator } from "react-native";

export default function AppLayout() {
  const { isLoading, token } = useAuth();
  const segments = useSegments();
  if (isLoading) return <ActivityIndicator />;

  const isPriveteRoute = segments[0] === "management";
  const isAllowedRoute = segments[0] === "403";

  if (isPriveteRoute && !token) {
    return <Redirect href={"/(app)/auth/login"} />;
  } else if (!isPriveteRoute && token && !isAllowedRoute) {
    return <Redirect href={"/(app)/management/farm"} />;
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
