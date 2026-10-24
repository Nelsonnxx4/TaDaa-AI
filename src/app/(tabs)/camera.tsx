import { Image } from "@/components/StyledImage";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	Alert,
	Pressable,
	SafeAreaView,
	Text,
	View,
} from "react-native";

import { AppIcon, GhostButton, SurfaceCard } from "@/components/AppPrimitives";
import { palette } from "@/constants/theme";
import { heroImage, recipes } from "@/data/mock";

const snapRecipe = recipes[2];

export default function CameraRoute() {
	const router = useRouter();
	const [selectedPhotoUri, setSelectedPhotoUri] = useState<string | null>(null);
	const hasSelectedPhoto = Boolean(selectedPhotoUri);

	const continueToShop = () => {
		router.push({
			pathname: "/shop",
			params: { recipeId: snapRecipe.id },
		});
	};

	const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
		if (result.canceled) {
			return;
		}

		const imageUri = result.assets[0]?.uri;

		if (imageUri) {
			setSelectedPhotoUri(imageUri);
		}
	};

	const openCamera = async () => {
		const permission = await ImagePicker.requestCameraPermissionsAsync();

		if (!permission.granted) {
			Alert.alert(
				"Camera access needed",
				"Allow camera access to snap a dish photo.",
			);
			return;
		}

		const result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 3],
			mediaTypes: ["images"],
			quality: 0.85,
		});

		handleImageResult(result);
	};

	const openImageLibrary = async () => {
		const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (!permission.granted) {
			Alert.alert(
				"Photo access needed",
				"Allow photo access to upload a dish image.",
			);
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 3],
			mediaTypes: ["images"],
			quality: 0.85,
		});

		handleImageResult(result);
	};

	return (
		<SafeAreaView className="flex-1 bg-onboardingBg">
			<View className="flex-1 gap-6 bg-onboardingBg px-5 pb-32 pt-6">
				<View className="flex-row items-center justify-between">
					<Pressable
						onPress={() => router.replace("/home")}
						className="h-[42px] min-w-[42px] items-center justify-center rounded-full bg-surface px-2 shadow-sm"
					>
						<AppIcon color={palette.primary} name="chevron-back" size={24} />
					</Pressable>
					<Text className="text-title text-text">Food Snap</Text>
					<View className="h-[42px] min-w-[42px] items-center justify-center rounded-full bg-surface px-2 shadow-sm">
						<AppIcon color={palette.primary} name="camera" size={22} />
					</View>
				</View>

				<View className="min-h-[360px] flex-1 overflow-hidden rounded-3xl bg-surface-low shadow-sm">
					<Image
						contentFit="cover"
						source={{ uri: selectedPhotoUri ?? heroImage }}
						className="absolute inset-0"
					/>
					<View className="absolute inset-0 bg-[rgba(5,5,5,0.16)]" />
					<View className="absolute bottom-[18%] left-6 right-6 top-[18%] rounded-3xl border border-[rgba(248,250,247,0.38)]">
						<View className="absolute -left-0.5 -top-0.5 h-11 w-11 border-l-4 border-t-4 border-accent200" />
						<View className="absolute -right-0.5 -top-0.5 h-11 w-11 border-r-4 border-t-4 border-accent200" />
						<View className="absolute -bottom-0.5 -left-0.5 h-11 w-11 border-b-4 border-l-4 border-accent200" />
						<View className="absolute -bottom-0.5 -right-0.5 h-11 w-11 border-b-4 border-r-4 border-accent200" />
					</View>
				</View>

				<SurfaceCard className="gap-4">
					<View className="flex-row items-center gap-4">
						<View className="h-12 w-12 items-center justify-center rounded-xl bg-primarySoft">
							<AppIcon color={palette.primary} name="camera" size={22} />
						</View>
						<View className="min-w-0 flex-1 gap-1">
							<Text className="text-body font-extrabold text-text">
								{hasSelectedPhoto ? "Photo ready" : "Ready to scan"}
							</Text>
							<Text className="text-body-sm text-textMuted">
								{hasSelectedPhoto
									? "Analyze this image to create the ingredient plan."
									: "Capture or upload a dish photo to create the ingredient plan."}
							</Text>
						</View>
					</View>
				</SurfaceCard>

				<View className="flex-row items-center justify-between gap-4">
					<GhostButton
						icon="images"
						label="Upload"
						onPress={openImageLibrary}
					/>
					<Pressable
						accessibilityLabel="Snap food photo"
						accessibilityRole="button"
						onPress={openCamera}
						className="h-[74px] w-[74px] items-center justify-center rounded-full border-[5px] border-accent200 bg-surface shadow-sm active:scale-[0.97] active:opacity-[0.86]"
					>
						<View className="h-12 w-12 rounded-full bg-accent200" />
					</Pressable>
					<GhostButton icon="sparkles" label="Demo" onPress={continueToShop} />
				</View>
			</View>
		</SafeAreaView>
	);
}
