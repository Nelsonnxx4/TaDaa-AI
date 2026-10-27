import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export function MeetTadScreen() {
	const router = useRouter();

	return (
		<SafeAreaView className="flex-1 bg-charcoal-900">
			<View className="flex-1 items-center justify-center px-6">
				{/* Tooltip */}
				<View className="items-center">
					<View className="rounded-2xl bg-white px-5 py-3">
						<Text className="text-center text-base font-medium text-charcoal-900">
							Hi, I'm Tad. Care for a brief convo?
						</Text>
					</View>
					{/* Tail */}
					<View
						style={{
							width: 0,
							height: 0,
							borderLeftWidth: 10,
							borderRightWidth: 10,
							borderTopWidth: 12,
							borderLeftColor: "transparent",
							borderRightColor: "transparent",
							borderTopColor: "#fff",
						}}
					/>
				</View>

				<Image
					source={require("../../assets/images/tad.png")}
					className="mt-2 h-56 w-56"
					resizeMode="contain"
				/>
			</View>

			<View className="px-6 pb-8">
				<Pressable
					onPress={() => router.push("/question-1")}
					className="h-14 items-center justify-center rounded-full bg-accent-500 active:opacity-80"
				>
					<Text className="text-base font-semibold text-white">Continue</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	);
}
