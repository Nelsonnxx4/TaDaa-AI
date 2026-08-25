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
  GhostButton,
  HeaderBar,
  Pill,
  PrimaryButton,
  SectionHeader,
  SurfaceCard,
} from "@/components/AppPrimitives";
import { useAppAccess } from "@/context/AppAccess";
import { heroImage, inspirationChips, recipes } from "@/data/mock";
import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
import type { Recipe } from "@/types/app";
import { getRecipeForQuery } from "@/utils/recipes";

export default function HomeRoute() {
  const router = useRouter();
  const { isPremium, openPaywall } = useAppAccess();

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
    if (!isPremium) {
      openPaywall();
      return;
    }

    openRecipe(recipes[2]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.appShell}
      >
        <HomeScreen
          isPremium={isPremium}
          onOpenPaywall={openPaywall}
          onRecipeSelect={openRecipe}
          onSearch={handleSearch}
          onSnap={handleSnap}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function HomeScreen({
  isPremium,
  onOpenPaywall,
  onRecipeSelect,
  onSearch,
  onSnap,
}: {
  isPremium: boolean;
  onOpenPaywall: () => void;
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
      <HeaderBar premium={isPremium} subtitle="Snap, shop and cook" />

      <SurfaceCard style={styles.searchPanel}>
        <View style={styles.searchInputRow}>
          <AppIcon color={palette.textMuted} name="search" size={22} />
          <TextInput
            onChangeText={setQuery}
            onSubmitEditing={() => onSearch(query)}
            placeholder="What do you want to eat today?"
            placeholderTextColor="#6C7A71"
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
        <Image
          contentFit="cover"
          source={{ uri: heroImage }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.snapOverlay} />
        <View style={styles.snapCopy}>
          <View style={styles.snapIcon}>
            <AppIcon color="#684000" name="camera" size={28} />
          </View>
          <View style={styles.snapTextBlock}>
            <View style={styles.snapTitleRow}>
              <Text style={styles.snapTitle}>Snap Your Food</Text>
              {!isPremium ? (
                <View style={styles.lockPill}>
                  <AppIcon color={palette.inverse} name="lock-closed" size={12} />
                  <Text style={styles.lockText}>Premium</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.snapBody}>
              Turn a dish photo into ingredients, stores, and cooking steps.
            </Text>
          </View>
        </View>
      </Pressable>

      {!isPremium ? (
        <GhostButton
          icon="sparkles"
          label="See Premium"
          onPress={onOpenPaywall}
        />
      ) : null}

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
        <SectionHeader action="View all" title="Recommended for tonight" />
        <View style={styles.recipeGrid}>
          {visibleRecipes.map((recipe) => (
            <FoodCard
              key={recipe.id}
              onPress={() => onRecipeSelect(recipe)}
              recipe={recipe}
            />
          ))}
        </View>
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
    paddingTop: spacing.md,
  },
  searchPanel: {
    gap: spacing.md,
  },
  searchInputRow: {
    alignItems: "center",
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.md,
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
    borderRadius: radius.xl,
    justifyContent: "flex-end",
    minHeight: 178,
    overflow: "hidden",
    padding: spacing.lg,
    ...(shadow.card ?? {}),
  },
  pressedBanner: {
    opacity: 0.9,
  },
  snapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(24, 33, 28, 0.42)",
  },
  snapCopy: {
    alignItems: "flex-end",
    flexDirection: "row",
    gap: spacing.md,
  },
  snapIcon: {
    alignItems: "center",
    backgroundColor: palette.amberSoft,
    borderRadius: radius.lg,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  snapTextBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  snapTitleRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  snapTitle: {
    ...typography.headline,
    color: palette.inverse,
  },
  lockPill: {
    alignItems: "center",
    backgroundColor: "rgba(24, 33, 28, 0.72)",
    borderRadius: radius.full,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  lockText: {
    ...typography.label,
    color: palette.inverse,
  },
  snapBody: {
    ...typography.bodySmall,
    color: "rgba(248, 250, 247, 0.9)",
  },
  chipRow: {
    gap: spacing.sm,
    paddingRight: spacing.gutter,
  },
  recipeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
});
