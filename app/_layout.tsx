import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F1B2D' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Hotels",
        }}
      />
      <Stack.Screen
        name="hotel/[id]"
        options={{
          title: "Hotel Details",
          presentation: "card",
        }}
      />
    </Stack>
  );
}
