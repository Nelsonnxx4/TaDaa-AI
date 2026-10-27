import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export function FirstQuestionScreen() {
	const router = useRouter();

	const answer = (value: boolean) => {
		// TODO: save the answer (state, store, or Supabase)
		// router.push("/question-2"); // your next screen
	};

	return (
		<SafeAreaView className="flex-1 bg-charcoal-900">
			{/* Tad, top-left, holding pencil and notes */}
			<View className="px-6 pt-2">
				<Image
					source={require("../../assets/images/tad-notes.png")}
					className="h-24 w-24"
					resizeMode="contain"
				/>
			</View>

			<View className="flex-1 justify-center px-6">
				<Text className="text-3xl font-bold leading-10 text-white">
					Ever been in a restaurant and wondered what ingredients they used?
				</Text>
			</View>

			{/* Yes / No at opposite ends */}
			<View className="flex-row justify-between px-6 pb-8">
				<Pressable
					onPress={() => answer(false)}
					className="h-14 w-[48%] items-center justify-center rounded-full border border-white/30 active:opacity-80"
				>
					<Text className="text-base font-semibold text-white">No</Text>
				</Pressable>
				<Pressable
					onPress={() => answer(true)}
					className="h-14 w-[48%] items-center justify-center rounded-full bg-accent-500 active:opacity-80"
				>
					<Text className="text-base font-semibold text-white">Yes</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
