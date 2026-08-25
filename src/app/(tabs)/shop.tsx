import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";

import {
  CookingScreen,
  IngredientStoreScreen,
} from "@/components/RecipeFlow";
import { palette } from "@/constants/theme";
import { useAppAccess } from "@/context/AppAccess";
import { getRecipeForRouteParams } from "@/utils/recipes";

type ShopStep = "ingredients" | "cook";

export default function ShopRoute() {
  const router = useRouter();
  const { query, recipeId } = useLocalSearchParams<{
    query?: string;
    recipeId?: string;
  }>();
  const { isPremium, openPaywall } = useAppAccess();
  const [step, setStep] = useState<ShopStep>("ingredients");

  const recipe = useMemo(
    () => getRecipeForRouteParams({ query, recipeId }),
    [query, recipeId],
  );

  useEffect(() => {
    setStep("ingredients");
  }, [recipe.id]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.appShell}
      >
        {step === "ingredients" ? (
          <IngredientStoreScreen
            onBack={() => router.replace("/")}
            onStartCooking={() => setStep("cook")}
            recipe={recipe}
          />
        ) : (
          <CookingScreen
            isPremium={isPremium}
            onBack={() => setStep("ingredients")}
            onFinish={() => router.replace("/")}
            onOpenPaywall={openPaywall}
            recipe={recipe}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
  appShell: {
    backgroundColor: palette.background,
    flex: 1,
  },
});
