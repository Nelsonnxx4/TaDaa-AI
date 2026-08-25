import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";

export default function RootLayout() {
  return (
    <Fragment>
      <Stack initialRouteName="onboarding" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style="dark" />
    </Fragment>
  );
}
