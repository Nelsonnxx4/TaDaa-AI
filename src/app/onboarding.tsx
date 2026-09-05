import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
} from "react-native";

import {
	AppIcon,
	PrimaryButton,
	ProgressDots,
	SurfaceCard,
} from "@/components/AppPrimitives";
import { palette, radius, spacing, typography } from "@/constants/theme";
import { heroImage } from "@/data/mock";

type OnboardingSlide = {
	title: string;
	body?: string;
	image?: string;
	steps?: {
		icon: "camera" | "sparkles" | "restaurant";
		title: string;
		body: string;
	}[];
};

const onboardingSlides: OnboardingSlide[] = [
	{
		title: "Snap it and recreate",
		image: heroImage,
	},
	{
		title: "Kitchen magic in your pocket",
		body: "Three quick steps take you from craving to cooking.",
		steps: [
			{
				icon: "camera",
				title: "1. Snap or search",
				body: "Capture a dish or describe the meal you want.",
			},
			{
				icon: "sparkles",
				title: "2. AI identifies",
				body: "Get a practical recipe with ingredients and timing.",
			},
			{
				icon: "restaurant",
				title: "3. Cook with confidence",
				body: "Shop missing items and follow guided cooking steps.",
			},
		],
	},
	{
		title: "Cook smarter tonight",
		body: "Start with free text search, then unlock Food Snap and hands-free voice when you are ready.",
	},
];

export default function OnboardingRoute() {
	const router = useRouter();
	const [index, setIndex] = useState(0);
	const { width } = useWindowDimensions();
	const slide = onboardingSlides[index];
	const isHero = Boolean(slide.image);
	const isNarrow = width < 600;
	const contentWidth = Math.min(
		Math.max(width - spacing.gutter * 2, 240),
		isNarrow ? 350 : 390,
	);

	return (
		<SafeAreaView
			style={[styles.onboardingShell, isHero && styles.onboardingHeroShell]}
		>
			{slide.image ? (
				<Image
					contentFit="cover"
					source={{ uri: slide.image }}
					style={StyleSheet.absoluteFill}
				/>
			) : null}
			{isHero ? <View style={styles.heroScrim} /> : null}

			<View
				style={[
					styles.onboardingContent,
					{ width: contentWidth },
					isNarrow
						? styles.onboardingContentNarrow
						: styles.onboardingContentWide,
				]}
			>
				<ProgressDots current={index} total={onboardingSlides.length} />

				<View style={styles.onboardingMain}>
					{slide.steps ? (
						<View style={styles.stepList}>
							{slide.steps.map((step) => (
								<SurfaceCard key={step.title} style={styles.stepCard}>
									<View style={styles.stepIcon}>
										<AppIcon
											color={palette.primary}
											name={step.icon}
											size={28}
										/>
									</View>
									<View style={styles.stepCopy}>
										<Text style={styles.stepTitle}>{step.title}</Text>
										<Text style={styles.stepBody}>{step.body}</Text>
									</View>
								</SurfaceCard>
							))}
						</View>
					) : (
						<View style={styles.onboardingGraphic}>
							<View style={styles.cameraHalo}>
								<AppIcon
									color={isHero ? palette.inverse : palette.primary}
									name={index === 0 ? "camera" : "restaurant"}
									size={58}
								/>
							</View>
						</View>
					)}
				</View>

				<View style={styles.onboardingBottom}>
					<Text
						style={[
							styles.onboardingTitle,
							isHero && styles.onboardingTitleLight,
						]}
					>
						{slide.title}
					</Text>
					<Text
						style={[
							styles.onboardingBody,
							isHero && styles.onboardingBodyLight,
						]}
					>
						{slide.body}
					</Text>
					<PrimaryButton
						icon={
							index === onboardingSlides.length - 1
								? "sparkles"
								: "arrow-forward"
						}
						label={
							index === onboardingSlides.length - 1 ? "Get Started" : "Next"
						}
						onPress={() => {
							if (index === onboardingSlides.length - 1) {
								router.replace("/auth");
							} else {
								setIndex((current) => current + 1);
							}
						}}
					/>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	onboardingShell: {
		backgroundColor: palette.background,
		flex: 1,
	},
	onboardingHeroShell: {
		backgroundColor: palette.dark,
	},
	heroScrim: {
		backgroundColor: "rgba(24, 33, 28, 0.44)",
		bottom: 0,
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
	},
	onboardingContent: {
		flex: 1,
		gap: spacing.lg,
		justifyContent: "space-between",
		paddingBottom: spacing.xl,
		paddingTop: spacing.lg,
	},
	onboardingContentNarrow: {
		marginLeft: spacing.gutter,
	},
	onboardingContentWide: {
		alignSelf: "center",
	},
	onboardingMain: {
		flex: 1,
		justifyContent: "center",
	},
	onboardingGraphic: {
		alignItems: "center",
		justifyContent: "center",
	},
	cameraHalo: {
		alignItems: "center",
		backgroundColor: "rgba(16, 185, 129, 0.16)",
		borderColor: "rgba(255, 255, 255, 0.36)",
		borderRadius: radius.xl,
		borderWidth: StyleSheet.hairlineWidth,
		height: 150,
		justifyContent: "center",
		width: 150,
	},
	onboardingBottom: {
		gap: spacing.md,
		width: "100%",
	},
	onboardingTitle: {
		...typography.display,
		color: palette.primary,
		textAlign: "center",
	},
	onboardingTitleLight: {
		color: palette.inverse,
		textShadowColor: "rgba(0, 0, 0, 0.24)",
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 10,
	},
	onboardingBody: {
		...typography.body,
		color: palette.textMuted,
		textAlign: "center",
	},
	onboardingBodyLight: {
		color: "rgba(248, 250, 247, 0.92)",
	},
	stepList: {
		gap: spacing.md,
	},
	stepCard: {
		alignItems: "center",
		flexDirection: "row",
		gap: spacing.md,
	},
	stepIcon: {
		alignItems: "center",
		backgroundColor: palette.primarySoft,
		borderRadius: radius.full,
		height: 56,
		justifyContent: "center",
		width: 56,
	},
	stepCopy: {
		flex: 1,
		gap: spacing.xs,
	},
	stepTitle: {
		...typography.title,
		color: palette.primary,
	},
	stepBody: {
		...typography.bodySmall,
		color: palette.textMuted,
	},
});
