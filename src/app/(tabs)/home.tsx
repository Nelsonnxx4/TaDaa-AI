import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.appShell}
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
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar subtitle="Recent food plans" title="History" />

      <SurfaceCard style={styles.searchPanel}>
        <View style={styles.searchInputRow}>
          <AppIcon color={palette.textMuted} name="search" size={22} />
          <TextInput
            onChangeText={setQuery}
            onSubmitEditing={() => onSearch(query)}
            placeholder="What do you want to eat today?"
            placeholderTextColor={palette.textMuted}
            returnKeyType="search"
            style={styles.searchInput}
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
        style={({ pressed }) => [
          styles.snapBanner,
          pressed && styles.pressedBanner,
        ]}
      >
        <View style={styles.snapProduct}>
          <Image
            contentFit="cover"
            source={{ uri: heroImage }}
            style={styles.snapImage}
          />
        </View>
        <View style={styles.snapCopy}>
          <Text style={styles.snapTitle}>Snap Your Food</Text>
          <Text style={styles.snapBody}>
            Turn a dish photo into ingredients, stores, and cooking steps.
          </Text>
        </View>
        <View style={styles.snapButton}>
          <AppIcon color={palette.inverse} name="camera" size={21} />
        </View>
      </Pressable>

      <View>
        <ScrollView
          contentContainerStyle={styles.chipRow}
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
          contentContainerStyle={styles.recipeRail}
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
        >
          {visibleRecipes.map((recipe) => (
            <View key={recipe.id} style={styles.recipeCardShell}>
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

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
  appShell: {
    backgroundColor: palette.background,
    flex: 1,
  },
  scrollContent: {
    gap: spacing.lg,
    paddingBottom: 128,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
  },
  searchPanel: {
    backgroundColor: palette.surface,
    gap: spacing.md,
    padding: spacing.sm,
  },
  searchInputRow: {
    alignItems: "center",
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.full,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },
  searchInput: {
    ...typography.body,
    color: palette.text,
    flex: 1,
    minWidth: 0,
    paddingVertical: spacing.sm,
  },
  snapBanner: {
    alignItems: "center",
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.xl,
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
    minHeight: 134,
    overflow: "hidden",
    padding: spacing.md,
    ...(shadow.card ?? {}),
  },
  pressedBanner: {
    opacity: 0.9,
  },
  snapProduct: {
    alignItems: "center",
    backgroundColor: palette.surface,
    borderRadius: radius.xl,
    height: 96,
    justifyContent: "center",
    overflow: "hidden",
    width: 96,
  },
  snapImage: {
    height: "100%",
    width: "100%",
  },
  snapCopy: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
  },
  snapTitle: {
    ...typography.title,
    color: palette.text,
  },
  snapBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  snapButton: {
    alignItems: "center",
    backgroundColor: palette.primary,
    borderRadius: radius.full,
    height: 46,
    justifyContent: "center",
    width: 46,
    ...(shadow.float ?? {}),
  },
  chipRow: {
    gap: spacing.sm,
    paddingRight: spacing.gutter,
  },
  recipeRail: {
    flexDirection: "row",
    gap: spacing.md,
    paddingRight: spacing.gutter,
  },
  recipeCardShell: {
    width: 302,
  },
});
