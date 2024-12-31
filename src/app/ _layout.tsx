import { Slot, Stack } from "expo-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastProvider } from "react-native-toast-notifications";
import { AuthProvider } from "../core/providers/AuthProvider";
import queryClient from "../core/infrastructure/react-query/query-client";

export default function RootLayout() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Stack />
        </AuthProvider>
      </QueryClientProvider>
    </ToastProvider>
  );
}
