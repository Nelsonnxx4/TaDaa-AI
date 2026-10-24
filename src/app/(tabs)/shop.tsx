import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	SafeAreaView,
} from "react-native";

import { CookingScreen, IngredientStoreScreen } from "@/components/RecipeFlow";
import { getRecipeForRouteParams } from "@/utils/recipes";

type ShopStep = "ingredients" | "cook";

export default function ShopRoute() {
	const router = useRouter();
	const { query, recipeId } = useLocalSearchParams<{
		query?: string;
		recipeId?: string;
	}>();
	const [step, setStep] = useState<ShopStep>("ingredients");

	const recipe = useMemo(
		() => getRecipeForRouteParams({ query, recipeId }),
		[query, recipeId],
	);

	useEffect(() => {
		setStep("ingredients");
	}, [recipe.id]);

	return (
		<SafeAreaView className="flex-1 bg-onboardingBg">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className="flex-1 bg-onboardingBg"
			>
				{step === "ingredients" ? (
					<IngredientStoreScreen
						onBack={() => router.replace("/home")}
						onStartCooking={() => setStep("cook")}
						recipe={recipe}
					/>
				) : (
					<CookingScreen
						onBack={() => setStep("ingredients")}
						onFinish={() => router.replace("/home")}
						recipe={recipe}
					/>
				)}
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}
