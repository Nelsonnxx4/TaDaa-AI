import { Image } from "expo-image";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
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
  BottomNav,
  FoodCard,
  GhostButton,
  HeaderBar,
  Pill,
  PrimaryButton,
  ProgressDots,
  SectionHeader,
  SurfaceCard,
} from "@/components/AppPrimitives";
import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
import { heroImage, inspirationChips, recipes } from "@/data/mock";
import type { AppScreen, Recipe } from "@/types/app";

type OnboardingSlide = {
  title: string;
  body: string;
  image?: string;
  steps?: Array<{
    icon: "camera" | "sparkles" | "restaurant";
    title: string;
    body: string;
  }>;
};

const onboardingSlides: OnboardingSlide[] = [
  {
    title: "Snap it and recreate",
    body: "Found a dish you love? Take a photo and Ta-Daa turns it into a recipe plan.",
    image: heroImage,
  },
  {
    title: "Kitchen magic in your pocket",
    body: "Three quick steps take you from craving to cooking.",
    steps: [
      {
        icon: "camera",
        title: "1. Snap or search",
        body: "Capture a dish or describe the meal you want.",
      },
      {
        icon: "sparkles",
        title: "2. AI identifies",
        body: "Get a practical recipe with ingredients and timing.",
      },
      {
        icon: "restaurant",
        title: "3. Cook with confidence",
        body: "Shop missing items and follow guided cooking steps.",
      },
    ],
  },
  {
    title: "Cook smarter tonight",
    body: "Start with free text search, then unlock Food Snap and hands-free voice when you are ready.",
  },
];

function titleCase(value: string) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getRecipeForQuery(query: string): Recipe {
  const normalized = query.trim().toLowerCase();
  const match = recipes.find(
    (recipe) =>
      recipe.name.toLowerCase().includes(normalized) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(normalized)),
  );

  if (match || !normalized) {
    return match ?? recipes[0];
  }

  const base = recipes[0];
  return {
    ...base,
    id: `text-search-${normalized.replace(/\s+/g, "-")}`,
    name: titleCase(query),
    tags: ["Text Search", "Weeknight", "Ta-Daa Draft"],
    summary:
      "A fast MVP recipe draft based on your craving, ready to shop and cook with the guided flow.",
  };
}

export default function Index() {
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [screen, setScreen] = useState<AppScreen>("home");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>(recipes[0]);
  const [isPremium, setIsPremium] = useState(false);
  const [paywallVisible, setPaywallVisible] = useState(false);

  const handleSnap = () => {
    if (!isPremium) {
      setPaywallVisible(true);
      return;
    }

    setSelectedRecipe(recipes[2]);
    setScreen("ingredients");
  };

  if (!hasSeenOnboarding) {
    return <OnboardingScreen onDone={() => setHasSeenOnboarding(true)} />;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.appShell}
      >
        {screen === "home" ? (
          <HomeScreen
            isPremium={isPremium}
            onOpenPaywall={() => setPaywallVisible(true)}
            onRecipeSelect={(recipe) => {
              setSelectedRecipe(recipe);
              setScreen("ingredients");
            }}
            onSearch={(query) => {
              setSelectedRecipe(getRecipeForQuery(query));
              setScreen("ingredients");
            }}
            onSnap={handleSnap}
          />
        ) : (
          <ComingSoonScreen
            recipe={selectedRecipe}
            screen={screen}
            setScreen={setScreen}
          />
        )}

        <BottomNav active={screen} onChange={setScreen} onSnap={handleSnap} />
        <PaywallModal
          onClose={() => setPaywallVisible(false)}
          onUpgrade={() => {
            setIsPremium(true);
            setPaywallVisible(false);
          }}
          visible={paywallVisible}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  const slide = onboardingSlides[index];
  const isHero = Boolean(slide.image);

  return (
    <SafeAreaView
      style={[styles.onboardingShell, isHero && styles.onboardingHeroShell]}
    >
      {slide.image ? (
        <Image
          contentFit="cover"
          source={{ uri: slide.image }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {isHero ? <View style={styles.heroScrim} /> : null}

      <View style={styles.onboardingContent}>
        <ProgressDots current={index} total={onboardingSlides.length} />

        <View style={styles.onboardingMain}>
          {slide.steps ? (
            <View style={styles.stepList}>
              {slide.steps.map((step) => (
                <SurfaceCard key={step.title} style={styles.stepCard}>
                  <View style={styles.stepIcon}>
                    <AppIcon color={palette.primary} name={step.icon} size={28} />
                  </View>
                  <View style={styles.stepCopy}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepBody}>{step.body}</Text>
                  </View>
                </SurfaceCard>
              ))}
            </View>
          ) : (
            <View style={styles.onboardingGraphic}>
              <View style={styles.cameraHalo}>
                <AppIcon
                  color={isHero ? palette.inverse : palette.primary}
                  name={index === 0 ? "camera" : "restaurant"}
                  size={58}
                />
              </View>
            </View>
          )}
        </View>

        <View style={styles.onboardingBottom}>
          <Text
            style={[
              styles.onboardingTitle,
              isHero && styles.onboardingTitleLight,
            ]}
          >
            {slide.title}
          </Text>
          <Text
            style={[styles.onboardingBody, isHero && styles.onboardingBodyLight]}
          >
            {slide.body}
          </Text>
          <PrimaryButton
            icon={
              index === onboardingSlides.length - 1 ? "sparkles" : "arrow-forward"
            }
            label={index === onboardingSlides.length - 1 ? "Get Started" : "Next"}
            onPress={() => {
              if (index === onboardingSlides.length - 1) {
                onDone();
              } else {
                setIndex((current) => current + 1);
              }
            }}
          />
        </View>
      </View>
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

function PaywallModal({
  visible,
  onClose,
  onUpgrade,
}: {
  visible: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}) {
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.modalScrim}>
        <View style={styles.paywall}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <AppIcon color={palette.textMuted} name="close" size={24} />
          </Pressable>

          <View style={styles.paywallHero}>
            <Image
              contentFit="cover"
              source={{ uri: heroImage }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.paywallHeroOverlay} />
            <AppIcon color={palette.inverse} name="sparkles" size={44} />
          </View>

          <Text style={styles.paywallTitle}>
            Unlock Food Snap and hands-free voice cooking
          </Text>
          <Text style={styles.paywallBody}>
            Premium opens the camera scanner, voice mode, unlimited recipe
            conversions, and pantry sync.
          </Text>

          <View style={styles.featureList}>
            {[
              "Snap any dish to extract a recipe instantly",
              "Hands-free streaming voice assistant while cooking",
              "Unlimited recipe conversions and pantry sync",
            ].map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <View style={styles.checkIcon}>
                  <AppIcon color={palette.inverse} name="checkmark" size={14} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.planRow}>
            <Pressable
              onPress={() => setPlan("monthly")}
              style={[
                styles.planCard,
                plan === "monthly" && styles.planCardActive,
              ]}
            >
              <Text style={styles.planLabel}>Monthly</Text>
              <Text style={styles.planPrice}>$4.99/mo</Text>
            </Pressable>
            <Pressable
              onPress={() => setPlan("annual")}
              style={[styles.planCard, plan === "annual" && styles.planCardActive]}
            >
              <Text style={styles.savePill}>Save 33%</Text>
              <Text style={styles.planLabel}>Annual</Text>
              <Text style={styles.planPrice}>$39.99/yr</Text>
            </Pressable>
          </View>

          <PrimaryButton
            icon="arrow-forward"
            label="Start 7-Day Free Trial"
            onPress={onUpgrade}
          />
          <Text style={styles.paywallFooter}>
            Restore Purchases | Terms of Service | Privacy Policy
          </Text>
        </View>
      </View>
    </Modal>
  );
}

function ComingSoonScreen({
  recipe,
  screen,
  setScreen,
}: {
  recipe: Recipe;
  screen: AppScreen;
  setScreen: (screen: AppScreen) => void;
}) {
  const titles: Record<AppScreen, string> = {
    home: "Home",
    ingredients: "Ingredient and Store Finder",
    cook: "Cooking Assistant",
    pantry: "My Pantry",
    profile: "Profile",
  };

  return (
    <View style={styles.placeholderShell}>
      <HeaderBar subtitle="MVP feature in progress" title={titles[screen]} />
      <SurfaceCard style={styles.placeholderCard}>
        <AppIcon color={palette.primary} name="restaurant" size={44} />
        <Text style={styles.placeholderTitle}>{recipe.name}</Text>
        <Text style={styles.placeholderBody}>
          This screen is queued in the next feature commit. The selected recipe
          and navigation state are already wired.
        </Text>
        <PrimaryButton
          icon="home"
          label="Back to Home"
          onPress={() => setScreen("home")}
        />
      </SurfaceCard>
    </View>
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
    position: "relative",
  },
  scrollContent: {
    gap: spacing.lg,
    paddingBottom: 128,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.md,
  },
  onboardingShell: {
    backgroundColor: palette.background,
    flex: 1,
  },
  onboardingHeroShell: {
    backgroundColor: palette.dark,
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(24, 33, 28, 0.44)",
  },
  onboardingContent: {
    flex: 1,
    gap: spacing.lg,
    justifyContent: "space-between",
    paddingBottom: spacing.xl,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
  },
  onboardingMain: {
    flex: 1,
    justifyContent: "center",
  },
  onboardingGraphic: {
    alignItems: "center",
    justifyContent: "center",
  },
  cameraHalo: {
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.16)",
    borderColor: "rgba(255, 255, 255, 0.36)",
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    height: 150,
    justifyContent: "center",
    width: 150,
  },
  onboardingBottom: {
    gap: spacing.md,
  },
  onboardingTitle: {
    ...typography.display,
    color: palette.primary,
    textAlign: "center",
  },
  onboardingTitleLight: {
    color: palette.inverse,
    textShadowColor: "rgba(0, 0, 0, 0.24)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  onboardingBody: {
    ...typography.body,
    color: palette.textMuted,
    textAlign: "center",
  },
  onboardingBodyLight: {
    color: "rgba(248, 250, 247, 0.92)",
  },
  stepList: {
    gap: spacing.md,
  },
  stepCard: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  stepIcon: {
    alignItems: "center",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.full,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  stepCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  stepTitle: {
    ...typography.title,
    color: palette.primary,
  },
  stepBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
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
  modalScrim: {
    backgroundColor: "rgba(24, 33, 28, 0.44)",
    flex: 1,
    justifyContent: "flex-end",
  },
  paywall: {
    backgroundColor: palette.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    gap: spacing.md,
    maxHeight: "94%",
    padding: spacing.gutter,
  },
  closeButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.full,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  paywallHero: {
    alignItems: "center",
    borderRadius: radius.xl,
    height: 156,
    justifyContent: "center",
    overflow: "hidden",
  },
  paywallHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 108, 73, 0.46)",
  },
  paywallTitle: {
    ...typography.headline,
    color: palette.primary,
    textAlign: "center",
  },
  paywallBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
    textAlign: "center",
  },
  featureList: {
    gap: spacing.sm,
  },
  featureRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  checkIcon: {
    alignItems: "center",
    backgroundColor: palette.primaryBright,
    borderRadius: radius.full,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  featureText: {
    ...typography.bodySmall,
    color: palette.text,
    flex: 1,
  },
  planRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  planCard: {
    backgroundColor: palette.surface,
    borderColor: "rgba(187, 202, 191, 0.6)",
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    minHeight: 94,
    padding: spacing.md,
  },
  planCardActive: {
    backgroundColor: palette.primarySoft,
    borderColor: palette.primaryBright,
  },
  savePill: {
    ...typography.label,
    alignSelf: "flex-start",
    backgroundColor: palette.amberSoft,
    borderRadius: radius.full,
    color: "#684000",
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  planLabel: {
    ...typography.bodySmall,
    color: palette.textMuted,
    fontWeight: "700",
  },
  planPrice: {
    ...typography.title,
    color: palette.primary,
  },
  paywallFooter: {
    ...typography.label,
    color: palette.textMuted,
    textAlign: "center",
  },
  placeholderShell: {
    flex: 1,
    paddingBottom: 128,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.md,
  },
  placeholderCard: {
    alignItems: "center",
    flex: 1,
    gap: spacing.md,
    justifyContent: "center",
  },
  placeholderTitle: {
    ...typography.headline,
    color: palette.primary,
    textAlign: "center",
  },
  placeholderBody: {
    ...typography.body,
    color: palette.textMuted,
    textAlign: "center",
  },
});
