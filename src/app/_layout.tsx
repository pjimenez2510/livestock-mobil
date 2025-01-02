import { QueryClientProvider } from "@tanstack/react-query";
import { Slot, Stack } from "expo-router";
import { ToastProvider } from "react-native-toast-notifications";
import queryClient from "../core/infrastructure/react-query/query-client";

export default function AppLayout() {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <Slot />
      </QueryClientProvider>
    </ToastProvider>
  );
}
