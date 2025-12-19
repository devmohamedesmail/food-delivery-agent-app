
import AuthProvider from "@/context/auth_context";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import "../lib/i18n";
import ToastManager from "toastify-react-native";
import ProfileProvider from "@/context/ProfileContext";
import 'react-native-gesture-handler';
import { useNotificationObserver } from "@/hooks/useNotificationObserver";
import { NetworkProvider } from "@/context/NetworkProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";




export default function RootLayout() {
  useNotificationObserver();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
      <ProfileProvider>
        <NetworkProvider>
        <Stack screenOptions={{ headerShown: false }}></Stack>
        <ToastManager />
        <StatusBar style="auto" />
        </NetworkProvider>
      </ProfileProvider>
    </AuthProvider>
    </QueryClientProvider>
    
  );
}
