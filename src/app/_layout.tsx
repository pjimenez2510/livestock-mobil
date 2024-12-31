import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "../core/infrastructure/react-query/query-client";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider, useAuth } from "../core/providers/AuthProvider";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ProtectedRoute />
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="403/index" />
            <Stack.Screen name="management" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}

function ProtectedRoute() {
  const { token, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      const isPriveteRoute = segments[0] === "management";
      const isAllowedRoute = segments[0] === "403";
      if (isPriveteRoute && !token) {
        router.replace("/auth/login");
      } else if (!isPriveteRoute && token && !isAllowedRoute) {
        router.replace("/management/farm");
      }
    }
  }, [token, segments, isLoading]);

  return null;
}
