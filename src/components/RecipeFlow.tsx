import { Image } from "expo-image";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  AppIcon,
  GhostButton,
  PrimaryButton,
  SectionHeader,
  SurfaceCard,
} from "@/components/AppPrimitives";
import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
import { stores } from "@/data/mock";
import type { Ingredient, Recipe } from "@/types/app";

function formatClock(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function IngredientStoreScreen({
  recipe,
  onBack,
  onStartCooking,
}: {
  recipe: Recipe;
  onBack: () => void;
  onStartCooking: () => void;
}) {
  const [ownedIds, setOwnedIds] = useState<string[]>([]);
  const [servings, setServings] = useState(recipe.servings);

  useEffect(() => {
    setOwnedIds(
      recipe.ingredients
        .filter((ingredient) => ingredient.owned)
        .map((ingredient) => ingredient.id),
    );
    setServings(recipe.servings);
  }, [recipe]);

  const ownedIngredients = useMemo(
    () =>
      recipe.ingredients.filter((ingredient) => ownedIds.includes(ingredient.id)),
    [ownedIds, recipe.ingredients],
  );
  const missingIngredients = useMemo(
    () =>
      recipe.ingredients.filter(
        (ingredient) => !ownedIds.includes(ingredient.id),
      ),
    [ownedIds, recipe.ingredients],
  );

  const toggleIngredient = (ingredient: Ingredient) => {
    setOwnedIds((current) =>
      current.includes(ingredient.id)
        ? current.filter((id) => id !== ingredient.id)
        : [...current, ingredient.id],
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.iconButton}>
          <AppIcon color={palette.primary} name="chevron-back" size={24} />
        </Pressable>
        <Text style={styles.screenTitle}>Ingredients</Text>
        <View style={styles.iconButton}>
          <AppIcon color={palette.primary} name="map" size={22} />
        </View>
      </View>

      <SurfaceCard style={styles.recipeHero}>
        <Image
          contentFit="cover"
          source={{ uri: recipe.imageUrl }}
          style={styles.recipeImage}
        />
        <View style={styles.recipeInfo}>
          <Text style={styles.recipeName}>{recipe.name}</Text>
          <Text style={styles.recipeSummary}>{recipe.summary}</Text>
          <View style={styles.metricRow}>
            <Metric icon="time-outline" label={recipe.time} />
            <Metric icon="person" label={`${servings} servings`} />
            <Metric icon="wallet-outline" label={recipe.cost} />
          </View>
          <View style={styles.servingStepper}>
            <Pressable
              onPress={() => setServings((value) => Math.max(1, value - 1))}
              style={styles.stepperButton}
            >
              <AppIcon color={palette.inverse} name="remove" size={18} />
            </Pressable>
            <Text style={styles.stepperText}>{servings}</Text>
            <Pressable
              onPress={() => setServings((value) => value + 1)}
              style={styles.stepperButton}
            >
              <AppIcon color={palette.inverse} name="add" size={18} />
            </Pressable>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.ingredientPanel}>
        <SectionHeader
          action={`${missingIngredients.length} to buy`}
          title="Pantry check"
        />
        <View style={styles.ingredientList}>
          {recipe.ingredients.map((ingredient) => {
            const owned = ownedIds.includes(ingredient.id);
            return (
              <Pressable
                key={ingredient.id}
                onPress={() => toggleIngredient(ingredient)}
                style={[styles.ingredientRow, owned && styles.ingredientOwned]}
              >
                <AppIcon
                  color={owned ? palette.primaryBright : palette.textMuted}
                  name={owned ? "checkmark-circle" : "ellipse-outline"}
                  size={24}
                />
                <View style={styles.ingredientTextBlock}>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <Text style={styles.ingredientMeta}>
                    {ingredient.quantity} - {ingredient.category}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.missingPanel}>
        <View style={styles.calloutHeader}>
          <View style={styles.calloutIcon}>
            <AppIcon color={palette.primary} name="cart" size={22} />
          </View>
          <View style={styles.calloutCopy}>
            <Text style={styles.calloutTitle}>Missing items</Text>
            <Text style={styles.calloutBody}>
              {missingIngredients.length > 0
                ? missingIngredients
                    .map((ingredient) => ingredient.name)
                    .join(", ")
                : "You have everything for this recipe."}
            </Text>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard style={styles.pantryAccordion}>
        <View style={styles.accordionHeader}>
          <Text style={styles.accordionTitle}>Pantry</Text>
          <Text style={styles.accordionCount}>{ownedIngredients.length}</Text>
        </View>
        <Text style={styles.accordionBody}>
          {ownedIngredients.length > 0
            ? ownedIngredients.map((ingredient) => ingredient.name).join(", ")
            : "Check items above to move them into your pantry list."}
        </Text>
      </SurfaceCard>

      <SurfaceCard style={styles.mapPanel}>
        <SectionHeader action="Top 3" title="Nearby supermarkets" />
        <View style={styles.mapMock}>
          <View style={[styles.mapRoad, styles.mapRoadOne]} />
          <View style={[styles.mapRoad, styles.mapRoadTwo]} />
          <View style={styles.userPin}>
            <AppIcon color={palette.inverse} name="navigate" size={18} />
          </View>
          {stores.map((store, index) => (
            <View
              key={store.id}
              style={[
                styles.storePin,
                index === 0 && styles.storePinOne,
                index === 1 && styles.storePinTwo,
                index === 2 && styles.storePinThree,
              ]}
            >
              <AppIcon color={palette.inverse} name="storefront" size={16} />
            </View>
          ))}
        </View>
        <ScrollView
          contentContainerStyle={styles.storeList}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {stores.map((store) => (
            <View key={store.id} style={styles.storeCard}>
              <Text style={styles.storeName}>{store.name}</Text>
              <View style={styles.storeMetaRow}>
                <Text style={styles.storeMeta}>{store.distance}</Text>
                <Text style={styles.storeMeta}>{store.rating.toFixed(1)}</Text>
                <Text style={styles.storeMeta}>{store.eta}</Text>
              </View>
              <Text numberOfLines={2} style={styles.storeAvailable}>
                Has {store.available.slice(0, 3).join(", ")}
              </Text>
              <GhostButton icon="navigate" label="Get Directions" />
            </View>
          ))}
        </ScrollView>
      </SurfaceCard>

      <PrimaryButton
        icon="restaurant"
        label="Start Cooking Now"
        onPress={onStartCooking}
      />
    </ScrollView>
  );
}

export function CookingScreen({
  recipe,
  onBack,
  onFinish,
}: {
  recipe: Recipe;
  onBack: () => void;
  onFinish: () => void;
}) {
  const [stepIndex, setStepIndex] = useState(0);
  const currentStep = recipe.steps[stepIndex];
  const [secondsLeft, setSecondsLeft] = useState(currentStep.durationSeconds ?? 0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setStepIndex(0);
  }, [recipe.id]);

  useEffect(() => {
    setSecondsLeft(currentStep.durationSeconds ?? 0);
    setIsRunning(false);
  }, [currentStep]);

  useEffect(() => {
    if (!isRunning || secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((value) => Math.max(0, value - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  useEffect(() => {
    if (secondsLeft === 0) {
      setIsRunning(false);
    }
  }, [secondsLeft]);

  const progress = Math.round(((stepIndex + 1) / recipe.steps.length) * 100);
  const hasTimer = Boolean(currentStep.durationSeconds);

  return (
    <View style={styles.cookingShell}>
      <View style={styles.screenHeader}>
        <Pressable onPress={onBack} style={styles.iconButton}>
          <AppIcon color={palette.primary} name="chevron-back" size={24} />
        </Pressable>
        <Text style={styles.screenTitle}>Cooking Mode</Text>
        <View style={styles.iconButton}>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </View>

      <View style={styles.cookingProgress}>
        <View style={[styles.cookingProgressFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.stepCount}>
        Step {stepIndex + 1} of {recipe.steps.length}
      </Text>

      <SurfaceCard style={styles.currentStepCard}>
        <Text style={styles.currentStepTitle}>{currentStep.title}</Text>
        <Text style={styles.currentStepBody}>{currentStep.body}</Text>
      </SurfaceCard>

      <SurfaceCard style={styles.timerCard}>
        <View style={styles.timerHeader}>
          <AppIcon color={palette.primary} name="timer-outline" size={22} />
          <Text style={styles.timerTitle}>Step timer</Text>
        </View>
        <Text style={styles.timerValue}>
          {hasTimer ? formatClock(secondsLeft) : "No timer needed"}
        </Text>
        <View style={styles.timerControls}>
          <GhostButton
            icon={isRunning ? "pause" : "play"}
            label={isRunning ? "Pause" : "Start"}
            onPress={() => {
              if (hasTimer) {
                setIsRunning((value) => !value);
              }
            }}
          />
          <GhostButton
            icon="refresh"
            label="Reset"
            onPress={() => {
              setSecondsLeft(currentStep.durationSeconds ?? 0);
              setIsRunning(false);
            }}
          />
        </View>
      </SurfaceCard>

      <View style={styles.voiceBar}>
        <View style={styles.voiceWave}>
          {[14, 26, 18, 34, 22].map((height, index) => (
            <View key={index} style={[styles.voiceWaveBar, { height }]} />
          ))}
        </View>
        <View style={styles.voiceCopy}>
          <Text style={styles.voiceTitle}>Listening for next step</Text>
          <Text style={styles.voiceBody}>
            Ask questions or say next step while cooking.
          </Text>
        </View>
        <AppIcon color={palette.primary} name="mic" size={24} />
      </View>

      <View style={styles.cookingActions}>
        <GhostButton
          icon="chevron-back"
          label="Previous"
          onPress={() => setStepIndex((value) => Math.max(0, value - 1))}
        />
        <PrimaryButton
          icon={stepIndex === recipe.steps.length - 1 ? "checkmark" : "chevron-forward"}
          label={
            stepIndex === recipe.steps.length - 1
              ? "Finish Cooking"
              : "Next Step"
          }
          onPress={() => {
            if (stepIndex === recipe.steps.length - 1) {
              onFinish();
            } else {
              setStepIndex((value) => value + 1);
            }
          }}
        />
      </View>
    </View>
  );
}

function Metric({
  icon,
  label,
}: {
  icon: "time-outline" | "person" | "wallet-outline";
  label: string;
}) {
  return (
    <View style={styles.metric}>
      <AppIcon color={palette.primary} name={icon} size={16} />
      <Text style={styles.metricText}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: 128,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
  },
  screenHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: palette.surface,
    borderRadius: radius.full,
    height: 42,
    justifyContent: "center",
    minWidth: 42,
    paddingHorizontal: spacing.sm,
    ...(shadow.card ?? {}),
  },
  screenTitle: {
    ...typography.title,
    color: palette.text,
  },
  recipeHero: {
    backgroundColor: palette.surfaceLow,
    gap: spacing.md,
    padding: spacing.sm,
  },
  recipeImage: {
    aspectRatio: 1.55,
    backgroundColor: palette.surface,
    borderRadius: radius.xl,
    width: "100%",
  },
  recipeInfo: {
    gap: spacing.sm,
    padding: spacing.sm,
  },
  recipeName: {
    ...typography.headline,
    color: palette.text,
  },
  recipeSummary: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  metric: {
    alignItems: "center",
    backgroundColor: palette.surface,
    borderRadius: radius.full,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  metricText: {
    ...typography.label,
    color: palette.textMuted,
  },
  servingStepper: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.full,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.xs,
  },
  stepperButton: {
    alignItems: "center",
    backgroundColor: palette.primary,
    borderRadius: radius.full,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  stepperText: {
    ...typography.body,
    color: palette.text,
    fontWeight: "700",
  },
  ingredientPanel: {
    gap: spacing.sm,
  },
  ingredientList: {
    gap: spacing.sm,
  },
  ingredientRow: {
    alignItems: "center",
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.lg,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 62,
    padding: spacing.md,
  },
  ingredientOwned: {
    backgroundColor: palette.primarySoft,
  },
  ingredientTextBlock: {
    flex: 1,
    minWidth: 0,
  },
  ingredientName: {
    ...typography.body,
    color: palette.text,
    fontWeight: "700",
  },
  ingredientMeta: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  missingPanel: {
    backgroundColor: palette.surface,
  },
  calloutHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  calloutIcon: {
    alignItems: "center",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.full,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  calloutCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  calloutTitle: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  calloutBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  pantryAccordion: {
    gap: spacing.xs,
  },
  accordionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accordionTitle: {
    ...typography.title,
    color: palette.text,
  },
  accordionCount: {
    ...typography.label,
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.full,
    color: palette.text,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  accordionBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  mapPanel: {
    gap: spacing.md,
  },
  mapMock: {
    backgroundColor: "#E9EEF3",
    borderRadius: radius.xl,
    height: 220,
    overflow: "hidden",
  },
  mapRoad: {
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderRadius: radius.full,
    position: "absolute",
  },
  mapRoadOne: {
    height: 28,
    left: -30,
    top: 82,
    transform: [{ rotate: "-18deg" }],
    width: 360,
  },
  mapRoadTwo: {
    height: 22,
    right: -40,
    top: 140,
    transform: [{ rotate: "28deg" }],
    width: 300,
  },
  userPin: {
    alignItems: "center",
    backgroundColor: palette.primary,
    borderColor: palette.inverse,
    borderRadius: radius.full,
    borderWidth: 3,
    height: 42,
    justifyContent: "center",
    left: "45%",
    position: "absolute",
    top: "42%",
    width: 42,
  },
  storePin: {
    alignItems: "center",
    backgroundColor: palette.red,
    borderColor: palette.inverse,
    borderRadius: radius.full,
    borderWidth: 3,
    height: 38,
    justifyContent: "center",
    position: "absolute",
    width: 38,
  },
  storePinOne: {
    left: "18%",
    top: "24%",
  },
  storePinTwo: {
    right: "18%",
    top: "32%",
  },
  storePinThree: {
    bottom: "18%",
    left: "32%",
  },
  storeList: {
    gap: spacing.md,
    paddingRight: spacing.gutter,
  },
  storeCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.xl,
    gap: spacing.sm,
    padding: spacing.md,
    width: 220,
  },
  storeName: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  storeMetaRow: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  storeMeta: {
    ...typography.label,
    color: palette.textMuted,
  },
  storeAvailable: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  cookingShell: {
    flex: 1,
    gap: spacing.lg,
    paddingBottom: 128,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.lg,
  },
  progressText: {
    ...typography.label,
    color: palette.primary,
  },
  cookingProgress: {
    backgroundColor: palette.surfaceMuted,
    borderRadius: radius.full,
    height: 10,
    overflow: "hidden",
  },
  cookingProgressFill: {
    backgroundColor: palette.primary,
    borderRadius: radius.full,
    height: "100%",
  },
  stepCount: {
    ...typography.label,
    color: palette.textMuted,
    textTransform: "uppercase",
  },
  currentStepCard: {
    flex: 1,
    justifyContent: "center",
    gap: spacing.md,
  },
  currentStepTitle: {
    ...typography.display,
    color: palette.text,
  },
  currentStepBody: {
    ...typography.body,
    color: palette.textMuted,
  },
  timerCard: {
    gap: spacing.md,
  },
  timerHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  timerTitle: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  timerValue: {
    color: palette.primary,
    fontSize: 44,
    fontWeight: "800",
    lineHeight: 52,
    textAlign: "center",
  },
  timerControls: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  voiceBar: {
    alignItems: "center",
    backgroundColor: palette.surface,
    borderColor: "rgba(5, 5, 5, 0.06)",
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...(shadow.card ?? {}),
  },
  voiceWave: {
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
    height: 42,
  },
  voiceWaveBar: {
    backgroundColor: palette.primary,
    borderRadius: radius.full,
    width: 5,
  },
  voiceCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  voiceTitle: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  voiceBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  cookingActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
});
