import AuthProvider from '@/context/auth_context';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css'
import '../lib/i18n';


export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
      </Stack>
      <StatusBar style='auto' />
    </AuthProvider>
  );
}