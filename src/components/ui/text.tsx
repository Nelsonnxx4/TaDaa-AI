import type { TxKeyPath } from "@/lib/i18n/utils";
import * as React from "react";
import type { TextProps, TextStyle } from "react-native";
import { I18nManager, Text as NNText, StyleSheet } from "react-native";

import { translate } from "@/lib/i18n/utils";
import { twMerge } from "tailwind-merge";

type Props = {
	className?: string;
	tx?: TxKeyPath;
} & TextProps;

export function Text({ className = "", style, tx, children, ...props }: Props) {
	const textStyle = React.useMemo(
		() =>
			twMerge(
				"font-inter text-base font-normal text-black dark:text-white",
				className,
			),
		[className],
	);

	const nStyle = React.useMemo(
		() =>
			StyleSheet.flatten([
				{
					writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
				},
				style,
			]) as TextStyle,
		[style],
	);
	return (
		<NNText className={textStyle} style={nStyle} {...props}>
			{tx ? translate(tx) : children}
		</NNText>
	);
}
