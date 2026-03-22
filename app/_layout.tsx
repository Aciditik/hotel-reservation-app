import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#F5F7FA' },
        animation: 'slide_from_right',
      }}
    />
  );
}
