import type { Theme } from "@react-navigation/native";
import {
	DarkTheme as _DarkTheme,
	DefaultTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";

import { palette } from "@/constants/theme";

const DarkTheme: Theme = {
	..._DarkTheme,
	colors: {
		..._DarkTheme.colors,
		primary: palette.primaryBright,
		background: palette.dark,
		card: "#202923",
		text: "#F5F5F5",
		border: "#474747",
		notification: "#F87171",
	},
};

const LightTheme: Theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: palette.primary,
		background: palette.background,
		card: palette.surface,
		text: palette.text,
		border: palette.outline,
		notification: "#DC2626",
	},
};

export function useThemeConfig() {
	return useColorScheme() === "dark" ? DarkTheme : LightTheme;
}
