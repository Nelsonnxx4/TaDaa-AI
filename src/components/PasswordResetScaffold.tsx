import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from "react-native";
import type { TextInputProps } from "react-native";

import { AppIcon } from "@/components/AppPrimitives";
import {
	palette,
	radius,
	shadow,
	spacing,
	typography,
} from "@/constants/theme";

type IconName = ComponentProps<typeof AppIcon>["name"];

type PasswordResetScaffoldProps = PropsWithChildren<{
	footer?: ReactNode;
	icon: IconName;
	onBack: () => void;
	onPrimaryPress: () => void;
	primaryDisabled?: boolean;
	primaryLabel: string;
	stepLabel: string;
	subtitle: string;
	title: string;
}>;

export function PasswordResetScaffold({
	children,
	footer,
	icon,
	onBack,
	onPrimaryPress,
	primaryDisabled = false,
	primaryLabel,
	stepLabel,
	subtitle,
	title,
}: PasswordResetScaffoldProps) {
	const { width } = useWindowDimensions();
	const contentWidth = Math.min(Math.max(width - spacing.gutter * 2, 280), 420);

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				style={styles.keyboardShell}
			>
				<ScrollView
					contentContainerStyle={styles.scrollContent}
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View style={[styles.content, { width: contentWidth }]}>
						<Pressable
							accessibilityLabel="Go back"
							accessibilityRole="button"
							onPress={onBack}
							style={({ pressed }) => [
								styles.backButton,
								pressed && styles.pressed,
							]}
						>
							<AppIcon color={palette.primary} name="chevron-back" size={22} />
						</Pressable>

						<View style={styles.card}>
							<View style={styles.iconBubble}>
								<AppIcon color={palette.primary} name={icon} size={30} />
							</View>
							<Text style={styles.stepLabel}>{stepLabel}</Text>
							<View style={styles.copyStack}>
								<Text style={styles.heading}>{title}</Text>
								<Text style={styles.subtitle}>{subtitle}</Text>
							</View>

							<View style={styles.form}>{children}</View>

							<Pressable
								accessibilityRole="button"
								disabled={primaryDisabled}
								onPress={onPrimaryPress}
								style={({ pressed }) => [
									styles.primaryAction,
									primaryDisabled && styles.primaryActionDisabled,
									pressed && !primaryDisabled && styles.pressed,
								]}
							>
								<Text
									style={[
										styles.primaryActionText,
										primaryDisabled && styles.primaryActionTextDisabled,
									]}
								>
									{primaryLabel}
								</Text>
							</Pressable>

							{footer ? <View style={styles.footer}>{footer}</View> : null}
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

export function PasswordResetInput({
	placeholderTextColor = palette.textMuted,
	style,
	...props
}: TextInputProps) {
	return (
		<TextInput
			placeholderTextColor={placeholderTextColor}
			style={[styles.input, style]}
			{...props}
		/>
	);
}

export function PasswordResetInlineMessage({
	children,
	tone = "neutral",
}: {
	children?: ReactNode;
	tone?: "neutral" | "error";
}) {
	if (!children || (typeof children === "string" && !children.trim())) {
		return null;
	}

	return (
		<Text style={[styles.inlineMessage, tone === "error" && styles.errorText]}>
			{children}
		</Text>
	);
}

export function PasswordResetTextButton({
	label,
	onPress,
}: {
	label: string;
	onPress: () => void;
}) {
	return (
		<Pressable
			accessibilityRole="button"
			onPress={onPress}
			style={({ pressed }) => [styles.textButton, pressed && styles.pressed]}
		>
			<Text style={styles.textButtonLabel}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	safeArea: {
		backgroundColor: palette.background,
		flex: 1,
	},
	keyboardShell: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
		paddingHorizontal: spacing.gutter,
		paddingVertical: spacing.xl,
	},
	content: {
		alignSelf: "center",
		gap: spacing.md,
	},
	backButton: {
		alignItems: "center",
		alignSelf: "flex-start",
		backgroundColor: palette.primarySoft,
		borderRadius: radius.full,
		height: 44,
		justifyContent: "center",
		width: 44,
	},
	card: {
		backgroundColor: palette.surface,
		borderColor: "rgba(5, 5, 5, 0.05)",
		borderRadius: radius.xl,
		borderWidth: StyleSheet.hairlineWidth,
		gap: spacing.lg,
		padding: spacing.lg,
		...(shadow.card ?? {}),
	},
	iconBubble: {
		alignItems: "center",
		alignSelf: "center",
		backgroundColor: palette.primarySoft,
		borderRadius: radius.full,
		height: 68,
		justifyContent: "center",
		width: 68,
	},
	stepLabel: {
		...typography.label,
		color: palette.primary,
		textAlign: "center",
	},
	copyStack: {
		gap: spacing.xs,
	},
	heading: {
		...typography.headline,
		color: palette.text,
		textAlign: "center",
	},
	subtitle: {
		...typography.bodySmall,
		color: palette.textMuted,
		textAlign: "center",
	},
	form: {
		gap: spacing.md,
	},
	input: {
		...typography.body,
		backgroundColor: palette.surfaceLow,
		borderColor: palette.outline,
		borderRadius: radius.lg,
		borderWidth: StyleSheet.hairlineWidth,
		color: palette.text,
		minHeight: 52,
		paddingHorizontal: spacing.md,
		paddingVertical: spacing.sm,
	},
	inlineMessage: {
		...typography.bodySmall,
		color: palette.textMuted,
		textAlign: "center",
	},
	errorText: {
		color: palette.red,
	},
	primaryAction: {
		alignItems: "center",
		backgroundColor: palette.primary,
		borderRadius: radius.full,
		justifyContent: "center",
		minHeight: 48,
		paddingHorizontal: spacing.lg,
		...(shadow.card ?? {}),
	},
	primaryActionDisabled: {
		backgroundColor: palette.surfaceMuted,
	},
	primaryActionText: {
		...typography.bodySmall,
		color: palette.inverse,
		fontWeight: "800",
	},
	primaryActionTextDisabled: {
		color: palette.textMuted,
	},
	footer: {
		alignItems: "center",
		gap: spacing.xs,
	},
	textButton: {
		paddingHorizontal: spacing.sm,
		paddingVertical: spacing.xs,
	},
	textButtonLabel: {
		...typography.bodySmall,
		color: palette.primary,
		fontWeight: "800",
		textAlign: "center",
	},
	pressed: {
		opacity: 0.86,
		transform: [{ scale: 0.98 }],
	},
});
