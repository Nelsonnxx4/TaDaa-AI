import type { ComponentProps, PropsWithChildren, ReactNode } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from "react-native";
import type { TextInputProps } from "react-native";

import { AppIcon } from "@/components/AppPrimitives";
import { palette, spacing } from "@/constants/theme";

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
		<SafeAreaView className="flex-1 bg-onboardingBg">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className="flex-1"
			>
				<ScrollView
					contentContainerClassName="flex-grow justify-center px-5 py-8"
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View className="gap-4 self-center" style={{ width: contentWidth }}>
						<Pressable
							accessibilityLabel="Go back"
							accessibilityRole="button"
							onPress={onBack}
							className="h-11 w-11 items-center justify-center self-start rounded-full bg-primarySoft active:scale-[0.98] active:opacity-[0.86]"
						>
							<AppIcon color={palette.primary} name="chevron-back" size={22} />
						</Pressable>

						<View className="gap-6 rounded-3xl border border-[rgba(5,5,5,0.05)] bg-surface p-6 shadow-sm">
							<View className="h-[68px] w-[68px] items-center justify-center self-center rounded-full bg-primarySoft">
								<AppIcon color={palette.primary} name={icon} size={30} />
							</View>
							<Text className="text-center text-label text-accent200">{stepLabel}</Text>
							<View className="gap-1">
								<Text className="text-center text-headline text-text">{title}</Text>
								<Text className="text-center text-body-sm text-textMuted">{subtitle}</Text>
							</View>

							<View className="gap-4">{children}</View>

							<Pressable
								accessibilityRole="button"
								disabled={primaryDisabled}
								onPress={onPrimaryPress}
								className={`min-h-12 items-center justify-center rounded-full px-6 shadow-sm ${
									primaryDisabled ? "bg-surface-muted" : "bg-accent200 active:scale-[0.98] active:opacity-[0.86]"
								}`}
							>
								<Text className={`text-body-sm font-extrabold ${primaryDisabled ? "text-textMuted" : "text-inverse"}`}>
									{primaryLabel}
								</Text>
							</Pressable>

							{footer ? <View className="items-center gap-1">{footer}</View> : null}
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
			className="min-h-[52px] rounded-2xl border border-outline bg-surface-low px-4 py-2 text-body text-text"
			style={style}
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
		<Text className={`text-center text-body-sm ${tone === "error" ? "text-red" : "text-textMuted"}`}>
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
			className="px-2 py-1 active:scale-[0.98] active:opacity-[0.86]"
		>
			<Text className="text-center text-body-sm font-extrabold text-accent200">{label}</Text>
		</Pressable>
	);
}
