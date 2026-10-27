import * as React from "react";
import type { TextInputProps } from "react-native";
import {
	I18nManager,
	TextInput as NTextInput,
	StyleSheet,
	View,
} from "react-native";
import { tv } from "tailwind-variants";

import colors from "./colors";
import { Text } from "./text";

const inputTv = tv({
	slots: {
		container: "mb-2",
		label: "mb-1 text-lg text-neutral-400 dark:text-neutral-100",
		input:
			"font-inter mt-0 rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3 text-base/5 font-medium text-neutral-500 dark:border-neutral-400 dark:bg-neutral-500 dark:text-white",
	},

	variants: {
		focused: {
			true: {
				input: "border-neutral-400 dark:border-neutral-300",
			},
		},
		error: {
			true: {
				input: "border-danger-600",
				label: "text-danger-700 dark:text-danger-400",
			},
		},
		disabled: {
			true: {
				input: "bg-neutral-200 dark:bg-neutral-500",
			},
		},
	},
	defaultVariants: {
		focused: false,
		error: false,
		disabled: false,
	},
});

export type NInputProps = {
	label?: string;
	disabled?: boolean;
	error?: string;
} & TextInputProps;

export function Input({
	ref,
	...props
}: NInputProps & { ref?: React.Ref<React.ComponentRef<typeof NTextInput>> }) {
	const {
		label,
		error,
		testID,
		onBlur: onBlurProp,
		onFocus: onFocusProp,
		...inputProps
	} = props;
	const [isFocussed, setIsFocussed] = React.useState(false);

	const onBlur = React.useCallback(
		(e: any) => {
			setIsFocussed(false);
			onBlurProp?.(e);
		},
		[onBlurProp],
	);

	const onFocus = React.useCallback(
		(e: any) => {
			setIsFocussed(true);
			onFocusProp?.(e);
		},
		[onFocusProp],
	);

	const styles = inputTv({
		error: Boolean(error),
		focused: isFocussed,
		disabled: Boolean(props.disabled),
	});

	return (
		<View className={styles.container()}>
			{label && (
				<Text
					testID={testID ? `${testID}-label` : undefined}
					className={styles.label()}
				>
					{label}
				</Text>
			)}
			<NTextInput
				testID={testID}
				ref={ref}
				placeholderTextColor={colors.neutral[400]}
				className={styles.input()}
				onBlur={onBlur}
				onFocus={onFocus}
				{...inputProps}
				style={StyleSheet.flatten([
					{ writingDirection: I18nManager.isRTL ? "rtl" : "ltr" },
					{ textAlign: I18nManager.isRTL ? "right" : "left" },
					inputProps.style,
				])}
			/>
			{error && (
				<Text
					testID={testID ? `${testID}-error` : undefined}
					className="text-sm text-danger-700 dark:text-danger-400"
				>
					{error}
				</Text>
			)}
		</View>
	);
}
