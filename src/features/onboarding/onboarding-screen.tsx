import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function OnboardingScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-accent-500">
			<View className="flex-1 items-center justify-center">
				<Image
					source={require("../../assets/images/Tadaa-logo.png")}
					className="h-32 w-32"
					resizeMode="contain"
				/>
			</View>

			<View className="px-6 pb-8">
				<Pressable
					onPress={() => router.push("/meet-tad")}
					className="h-14 items-center justify-center rounded-full bg-charcoal-950 active:opacity-80"
				>
					<Text className="text-base font-semibold text-accent-500">
						Get Started
					</Text>
				</Pressable>

				<Pressable
					onPress={() => router.push("/meet-tad")}
					className="h-14 items-center justify-center rounded-full bg-white active:opacity-80"
				>
					<Text className="text-base font-semibold text-accent-500">
						Already have an account? Sign In
					</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
