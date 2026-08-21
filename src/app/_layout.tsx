import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";

export default function RootLayout() {
  return (
    <Fragment>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="dark" />
    </Fragment>
  );
}
