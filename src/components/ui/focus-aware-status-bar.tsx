import { useIsFocused, useTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";

type Props = { hidden?: boolean };

export function FocusAwareStatusBar({ hidden = false }: Props) {
	const isFocused = useIsFocused();
	const { dark } = useTheme();

	if (Platform.OS === "web") return null;

	return isFocused ? (
		<StatusBar style={dark ? "light" : "dark"} hidden={hidden} />
	) : null;
}
