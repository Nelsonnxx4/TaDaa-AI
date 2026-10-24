import { Image } from "@/components/StyledImage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	SafeAreaView,
	Text,
	View,
	useWindowDimensions,
} from "react-native";

import {
	AppIcon,
	PrimaryButton,
	ProgressDots,
} from "@/components/AppPrimitives";
import { palette, spacing } from "@/constants/theme";
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
			className={`flex-1 ${isHero ? "bg-dark" : "bg-onboardingBg"}`}
		>
			{slide.image ? (
				<Image
					contentFit="cover"
					source={{ uri: slide.image }}
					className="absolute inset-0"
				/>
			) : null}
			{isHero ? <View className="absolute inset-0 bg-overlay-hero" /> : null}

			<View
				className={`flex-1 justify-between gap-6 pb-8 pt-6 ${
					isNarrow ? "ml-5" : "self-center"
				}`}
				style={{ width: contentWidth }}
			>
				<ProgressDots current={index} total={onboardingSlides.length} />

				<View className="flex-1 justify-center">
					<View className="items-center justify-center">
						<View className="h-[150px] w-[150px] items-center justify-center rounded-3xl border border-[rgba(255,255,255,0.36)] bg-[rgba(16,185,129,0.16)]">
							<AppIcon
								color={isHero ? palette.inverse : palette.primary}
								name={slide.icon}
								size={58}
							/>
						</View>
					</View>
				</View>

				<View className="w-full gap-4">
					<Text className={`text-display text-center ${isHero ? "text-inverse" : "text-accent200"}`}>
						{slide.title}
					</Text>
					<Text className={`text-body text-center ${isHero ? "text-[rgba(248,250,247,0.92)]" : "text-textMuted"}`}>
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
