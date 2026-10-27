import { Image } from "@/components/StyledImage";
import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps, PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";

import { palette } from "@/constants/theme";
import type { AppScreen, Recipe } from "@/types/app";

type IconName = ComponentProps<typeof Ionicons>["name"];

type IconProps = {
	name: IconName;
	color?: ComponentProps<typeof Ionicons>["color"];
	size?: number;
};

export function AppIcon({ name, color = palette.text, size = 22 }: IconProps) {
	return <Ionicons color={color} name={name} size={size} />;
}

export function SurfaceCard({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	const hasBackgroundClass = className
		?.split(/\s+/)
		.some((classToken) => classToken.startsWith("bg-"));

	return (
		<View
			className={`rounded-xl border border-[rgba(5,5,5,0.05)] ${
				hasBackgroundClass ? "" : "bg-surface"
			} p-4 shadow-sm ${className ?? ""}`}
		>
			{children}
		</View>
	);
}

export function Pill({
	label,
	active,
	tone = "green",
	onPress,
}: {
	label: string;
	active?: boolean;
	tone?: "green" | "amber" | "neutral";
	onPress?: () => void;
}) {
	const color = active
		? tone === "amber"
			? palette.text
			: palette.text
		: palette.textMuted;

	return (
		<Pressable
			onPress={onPress}
			className={`min-h-9 items-center justify-center rounded-full border px-4 ${
				active
					? tone === "amber"
						? "border-[rgba(5,5,5,0.1)] bg-amberSoft"
						: "border-[rgba(5,5,5,0.1)] bg-surface"
					: "border-transparent bg-surface-low"
			}`}
		>
			<Text
				className={`text-label ${color === palette.text ? "text-text" : "text-textMuted"}`}
			>
				{label}
			</Text>
		</Pressable>
	);
}

export function PrimaryButton({
	label,
	icon,
	onPress,
	disabled,
	inverse = false,
}: {
	label: string;
	icon?: IconName;
	onPress?: () => void;
	disabled?: boolean;
	inverse?: boolean;
}) {
	return (
		<Pressable
			disabled={disabled}
			onPress={onPress}
			className={`min-h-[54px] flex-row items-center justify-center gap-2 rounded-full px-6 shadow-md ${
				disabled
					? "bg-outline"
					: inverse
						? "bg-inverse active:scale-[0.99] active:opacity-80"
						: "bg-accent200 active:scale-[0.99] active:opacity-80"
			}`}
		>
			<Text
				className={`text-body font-extrabold ${
					inverse && !disabled ? "text-accent200" : "text-inverse"
				}`}
			>
				{label}
			</Text>
			{icon ? (
				<AppIcon
					color={inverse && !disabled ? palette.primary : palette.inverse}
					name={icon}
					size={20}
				/>
			) : null}
		</Pressable>
	);
}

export function GhostButton({
	label,
	icon,
	onPress,
}: {
	label: string;
	icon?: IconName;
	onPress?: () => void;
}) {
	return (
		<Pressable
			onPress={onPress}
			className="min-h-11 flex-row items-center gap-2 self-start rounded-full bg-accent200 px-4 shadow-md active:scale-[0.99] active:opacity-80"
		>
			{icon ? <AppIcon color={palette.inverse} name={icon} size={19} /> : null}
			<Text className="text-body-sm font-bold text-inverse">{label}</Text>
		</Pressable>
	);
}

export function SectionHeader({
	title,
	action,
}: {
	title: string;
	action?: string;
}) {
	return (
		<View className="mb-4 flex-row items-center justify-between">
			<Text className="text-title text-text">{title}</Text>
			{action ? (
				<Text className="text-body-sm font-bold text-accent200">{action}</Text>
			) : null}
		</View>
	);
}

export function ProgressDots({
	total,
	current,
	onDark = false,
}: {
	total: number;
	current: number;
	onDark?: boolean;
}) {
	return (
		<View className="w-full flex-row gap-1 self-stretch">
			{Array.from({ length: total }).map((_, index) => (
				<View
					key={index}
					className={`h-1.5 flex-1 rounded-full ${
						index <= current
							? onDark
								? "bg-inverse"
								: "bg-accent200"
							: "bg-[rgba(255,255,255,0.35)]"
					}`}
				/>
			))}
		</View>
	);
}

export function FoodCard({
	recipe,
	onPress,
}: {
	recipe: Recipe;
	onPress?: () => void;
}) {
	const isTopRated = recipe.rating >= 4.75;
	const statusLabel = isTopRated ? "Good" : "Solid";

	return (
		<Pressable
			onPress={onPress}
			className="min-h-[124px] min-w-[50px] flex-row items-center gap-2 overflow-hidden rounded-xl bg-surface-low p-2 shadow-sm active:scale-[0.99] active:opacity-80"
		>
			<Image
				contentFit="cover"
				source={{ uri: recipe.imageUrl }}
				className="h-24 w-[82px] rounded-lg bg-surface-muted"
			/>
			<View className="min-w-0 flex-1 gap-1">
				<Text className="text-title text-text" numberOfLines={2}>
					{recipe.name}
				</Text>
				<View className="flex-row flex-wrap items-center gap-1">
					<View
						className={`h-2 w-2 rounded-full ${isTopRated ? "bg-green" : "bg-amber"}`}
					/>
					<Text className="text-label text-textMuted">{statusLabel}</Text>
					<AppIcon color={palette.textMuted} name="time-outline" size={13} />
					<Text className="text-label text-textMuted">{recipe.time}</Text>
				</View>
			</View>
			<View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-surface">
				<AppIcon color={palette.text} name="chevron-forward" size={17} />
			</View>
		</Pressable>
	);
}

export function HeaderBar({
	title = "Ta-Daa AI",
	subtitle,
}: {
	title?: string;
	subtitle?: string;
}) {
	return (
		<View className="mb-6 flex-row items-center justify-between">
			<View className="min-w-0 flex-1">
				<Text className="text-display text-text">{title}</Text>
				{subtitle ? (
					<Text className="text-body-sm text-textMuted">{subtitle}</Text>
				) : null}
			</View>
			<View className="flex-row items-center gap-2">
				<View className="h-10 w-10 items-center justify-center rounded-full bg-surface shadow-sm">
					<AppIcon color={palette.primary} name="person" size={20} />
				</View>
			</View>
		</View>
	);
}

const tabs: {
	key: AppScreen | "snap";
	label: string;
	icon: IconName;
	activeFor: AppScreen[];
}[] = [
	{ key: "home", label: "Home", icon: "home", activeFor: ["home"] },
	{
		key: "pantry",
		label: "Pantry",
		icon: "basket",
		activeFor: ["pantry"],
	},
	{ key: "snap", label: "Snap", icon: "camera", activeFor: [] },
	{
		key: "ingredients",
		label: "Shop",
		icon: "storefront",
		activeFor: ["ingredients", "cook"],
	},
	{
		key: "profile",
		label: "Profile",
		icon: "person",
		activeFor: ["profile"],
	},
];

export function BottomNav({
	active,
	onChange,
	onSnap,
}: {
	active: AppScreen;
	onChange: (screen: AppScreen) => void;
	onSnap: () => void;
}) {
	return (
		<View className="absolute bottom-6 left-5 right-5 flex-row items-center justify-around rounded-full bg-accent200 px-2 py-2 shadow-md">
			{tabs.map((tab) => {
				const isActive = tab.activeFor.includes(active);
				const isSnap = tab.key === "snap";
				return (
					<Pressable
						key={tab.key}
						onPress={() => {
							if (isSnap) {
								onSnap();
							} else {
								onChange(tab.key as AppScreen);
							}
						}}
						className={`min-w-[58px] items-center gap-0.5 rounded-xl px-2 py-1 ${
							isActive ? "bg-[rgba(255,255,255,0.18)]" : ""
						} ${isSnap ? "-mt-6" : ""}`}
					>
						<View
							className={
								isSnap
									? "mb-0.5 h-[50px] w-[50px] items-center justify-center rounded-full bg-surface shadow-sm"
									: undefined
							}
						>
							<AppIcon
								color={
									isSnap
										? palette.primary
										: isActive
											? palette.inverse
											: "rgba(255, 255, 255, 0.72)"
								}
								name={tab.icon}
								size={isSnap ? 24 : 22}
							/>
						</View>
						<Text
							className={`text-label ${
								isActive || isSnap
									? "text-inverse"
									: "text-[rgba(255,255,255,0.72)]"
							}`}
						>
							{tab.label}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}
