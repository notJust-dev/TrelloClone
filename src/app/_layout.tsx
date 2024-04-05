import { Slot, Stack } from 'expo-router';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';

export default function RootLayout() {
  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{}}></Stack>

      <StatusBar style="light" />
    </ThemeProvider>
  );
}
