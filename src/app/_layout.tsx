import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Fragment } from "react";
import { ThemeProvider } from "@react-navigation/native";

import { useThemeConfig } from "@/components/ui/use-theme-config";
import "../styles/globals.css";

export const unstable_settings = {
	initialRouteName: "index",
};

export default function RootLayout() {
	const theme = useThemeConfig();

	return (
		<ThemeProvider value={theme}>
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
				<StatusBar style={theme.dark ? "light" : "dark"} />
			</Fragment>
		</ThemeProvider>
	);
}
