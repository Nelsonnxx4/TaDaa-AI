import { useRouter } from "expo-router";
import { useState } from "react";
import {
	SafeAreaView,
	Pressable,
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

type OnboardingSlide = {
	title: string;
	body: string;
	icon: "camera" | "restaurant" | "search";
};

const onboardingSlides: OnboardingSlide[] = [
	{
		title: "Welcome to Ta-Daa AI!",
		body: "Turn a dish photo into ingredients, shopping ideas, and easy steps to cook at home.",
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
	const isWelcome = index === 0;
	const isNarrow = width < 600;
	const contentWidth = Math.min(
		Math.max(width - spacing.gutter * 2, 240),
		isNarrow ? 350 : 390,
	);

	return (
		<SafeAreaView
			className={`flex-1 ${isWelcome ? "bg-accent200" : "bg-onboardingBg"}`}
		>
			<View
				className={`flex-1 justify-between gap-6 pb-8 pt-6 ${
					isNarrow ? "ml-5" : "self-center"
				}`}
				style={{ width: contentWidth }}
			>
				{isWelcome ? (
					<Text className="text-title font-extrabold text-inverse">
						Ta-Daa AI
					</Text>
				) : (
					<ProgressDots current={index} total={onboardingSlides.length} />
				)}

				<View className="flex-1 justify-center">
					{!isWelcome ? (
						<View className="items-center justify-center">
							<View className="h-[150px] w-[150px] items-center justify-center rounded-3xl border border-[rgba(255,255,255,0.36)] bg-[rgba(16,185,129,0.16)]">
								<AppIcon
									color={palette.primary}
									name={slide.icon}
									size={58}
								/>
							</View>
						</View>
					) : null}
					<View className={`gap-4 ${isWelcome ? "mt-0" : "mt-8"}`}>
						<Text
							className={`text-center ${
								isWelcome
									? "text-headline text-inverse"
									: "text-display text-accent200"
							}`}
						>
							{slide.title}
						</Text>
						<Text
							className={`text-center ${
								isWelcome
									? "text-body-sm text-[rgba(248,250,247,0.88)]"
									: "text-body text-textMuted"
							}`}
						>
							{slide.body}
						</Text>
					</View>
				</View>

				<View className="w-full gap-4">
					{isWelcome ? (
						<ProgressDots
							current={index}
							onDark
							total={onboardingSlides.length}
						/>
					) : null}
					<PrimaryButton
						icon={
							index === onboardingSlides.length - 1
								? "sparkles"
								: "arrow-forward"
						}
						label={
							index === onboardingSlides.length - 1 ? "Get Started" : "Next"
						}
						inverse={isWelcome}
						onPress={() => {
							if (index === onboardingSlides.length - 1) {
								router.replace("/auth");
							} else {
								setIndex((current) => current + 1);
							}
						}}
					/>
					{isWelcome ? (
						<View className="flex-row justify-center">
							<Text className="text-body-sm text-[rgba(248,250,247,0.88)]">
								Already have an account?{" "}
							</Text>
							<Pressable
								accessibilityRole="button"
								className="active:opacity-80"
								onPress={() => router.replace("/auth")}
							>
								<Text className="text-body-sm font-extrabold text-inverse">
									Sign in
								</Text>
							</Pressable>
						</View>
					) : null}
				</View>
			</View>
		</SafeAreaView>
	);
}
