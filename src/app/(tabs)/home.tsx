import { Image } from "@/components/StyledImage";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  AppIcon,
  FoodCard,
  HeaderBar,
  Pill,
  PrimaryButton,
  SectionHeader,
  SurfaceCard,
} from "@/components/AppPrimitives";
import { heroImage, inspirationChips, recipes } from "@/data/mock";
import { palette } from "@/constants/theme";
import type { Recipe } from "@/types/app";
import { getRecipeForQuery } from "@/utils/recipes";

export default function HomeRoute() {
  const router = useRouter();

  const openRecipe = (recipe: Recipe) => {
    router.push({
      pathname: "/shop",
      params: { recipeId: recipe.id },
    });
  };

  const handleSearch = (query: string) => {
    const recipe = getRecipeForQuery(query);

    if (recipe.id.startsWith("text-search-")) {
      router.push({
        pathname: "/shop",
        params: { query },
      });
      return;
    }

    openRecipe(recipe);
  };

  const handleSnap = () => {
    router.push("/camera");
  };

  return (
    <SafeAreaView className="flex-1 bg-onboardingBg">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 bg-onboardingBg"
      >
        <HomeScreen
          onRecipeSelect={openRecipe}
          onSearch={handleSearch}
          onSnap={handleSnap}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function HomeScreen({
  onRecipeSelect,
  onSearch,
  onSnap,
}: {
  onRecipeSelect: (recipe: Recipe) => void;
  onSearch: (query: string) => void;
  onSnap: () => void;
}) {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState(inspirationChips[0]);

  const filteredRecipes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const normalizedChip = activeChip.toLowerCase();
    return recipes.filter((recipe) => {
      const matchesQuery =
        !normalizedQuery ||
        recipe.name.toLowerCase().includes(normalizedQuery) ||
        recipe.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));
      const matchesChip =
        !activeChip ||
        recipe.tags.some((tag) => tag.toLowerCase() === normalizedChip);
      return matchesQuery || matchesChip;
    });
  }, [activeChip, query]);

  const visibleRecipes = filteredRecipes.length > 0 ? filteredRecipes : recipes;

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-5 pb-32 pt-6"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar subtitle="Recent food plans" title="History" />

      <SurfaceCard className="gap-4 p-2">
        <View className="min-h-[52px] flex-row items-center gap-2 rounded-full bg-surface-low px-4">
          <AppIcon color={palette.textMuted} name="search" size={22} />
          <TextInput
            onChangeText={setQuery}
            onSubmitEditing={() => onSearch(query)}
            placeholder="What do you want to eat today?"
            placeholderTextColor={palette.textMuted}
            returnKeyType="search"
            className="min-w-0 flex-1 py-2 text-body text-text"
            value={query}
          />
        </View>
        <PrimaryButton
          icon="restaurant"
          label="Find recipe"
          onPress={() => onSearch(query)}
        />
      </SurfaceCard>

      <Pressable
        onPress={onSnap}
        className="min-h-[134px] flex-row items-center justify-between gap-4 overflow-hidden rounded-3xl bg-surface-low p-4 shadow-sm active:opacity-90"
      >
        <View className="h-24 w-24 items-center justify-center overflow-hidden rounded-3xl bg-surface">
          <Image
            contentFit="cover"
            source={{ uri: heroImage }}
            className="h-full w-full"
          />
        </View>
        <View className="min-w-0 flex-1 gap-1">
          <Text className="text-title text-text">Snap Your Food</Text>
          <Text className="text-body-sm text-textMuted">
            Turn a dish photo into ingredients, stores, and cooking steps.
          </Text>
        </View>
        <View className="h-[46px] w-[46px] items-center justify-center rounded-full bg-accent200 shadow-md">
          <AppIcon color={palette.inverse} name="camera" size={21} />
        </View>
      </Pressable>

      <View>
        <ScrollView
          contentContainerClassName="gap-2 pr-5"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {inspirationChips.map((chip) => (
            <Pill
              active={chip === activeChip}
              key={chip}
              label={chip}
              onPress={() => setActiveChip(chip)}
            />
          ))}
        </ScrollView>
      </View>

      <View>
        <SectionHeader action="Saved 8" title="Recent items" />
        <ScrollView
          contentContainerClassName="flex-row gap-4 pr-5"
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
        >
          {visibleRecipes.map((recipe) => (
            <View key={recipe.id} className="w-[302px]">
              <FoodCard
                onPress={() => onRecipeSelect(recipe)}
                recipe={recipe}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}
