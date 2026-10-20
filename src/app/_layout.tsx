import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";

import "../styles/globals.css";

export const unstable_settings = {
	initialRouteName: "index",
};

export default function RootLayout() {
	return (
		<Fragment>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="onboarding" />
				<Stack.Screen name="auth" />
				<Stack.Screen name="forgot-password" />
				<Stack.Screen name="verify-reset-code" />
				<Stack.Screen name="new-password" />
				<Stack.Screen name="(tabs)" />
			</Stack>
			<StatusBar style="dark" />
		</Fragment>
	);
}
