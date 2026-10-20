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
} from "@/components/AppPrimitives";
import { palette, radius, spacing, typography } from "@/constants/theme";
import { heroImage } from "@/data/mock";

type OnboardingSlide = {
	title: string;
	body: string;
	image?: string;
	icon: "camera" | "restaurant" | "search";
};

const onboardingSlides: OnboardingSlide[] = [
	{
		title: "Ever wanted to recreate a meal you had at a restaurant?",
		body: "But you didn't know how to make it at home.",
		image: heroImage,
		icon: "restaurant",
	},
	{
		title: "Tried figuring out the ingredients by guesswork?",
		body: "A pinch of this, a dash of that — but it never tastes quite right.",
		icon: "search",
	},
	{
		title: "Take a picture and Ta-daa!",
		body: "Get the ingredients and simple steps to make it yourself.",
		icon: "camera",
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
					<View style={styles.onboardingGraphic}>
						<View style={styles.cameraHalo}>
							<AppIcon
								color={isHero ? palette.inverse : palette.primary}
								name={slide.icon}
								size={58}
							/>
						</View>
					</View>
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
});
