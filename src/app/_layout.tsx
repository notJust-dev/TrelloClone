import { Link, Slot, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, DarkTheme } from '@react-navigation/native';
import Realm from '../providers/Realm';
import { FontAwesome } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <>
      <ThemeProvider value={DarkTheme}>
        <Realm>
          <Stack
            screenOptions={{
              headerRight: () => (
                <View style={{ gap: 10, flexDirection: 'row' }}>
                  <Link href="/login">
                    <FontAwesome name="sign-in" size={24} color="lightgray" />
                  </Link>
                  <Link href="/profile">
                    <FontAwesome
                      name="user-circle-o"
                      size={24}
                      color="lightgray"
                    />
                  </Link>
                </View>
              ),
            }}
          ></Stack>
        </Realm>
      </ThemeProvider>
      <StatusBar style="light" />
    </>
  );
}
