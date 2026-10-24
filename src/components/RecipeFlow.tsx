import { Image } from "@/components/StyledImage";
import { useEffect, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
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
import { palette } from "@/constants/theme";
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
      contentContainerClassName="gap-6 px-5 pb-32 pt-6"
      showsVerticalScrollIndicator={false}
    >
      <View className="flex-row items-center justify-between">
        <Pressable onPress={onBack} className="h-[42px] min-w-[42px] items-center justify-center rounded-full bg-surface px-2 shadow-sm">
          <AppIcon color={palette.primary} name="chevron-back" size={24} />
        </Pressable>
        <Text className="text-title text-text">Ingredients</Text>
        <View className="h-[42px] min-w-[42px] items-center justify-center rounded-full bg-surface px-2 shadow-sm">
          <AppIcon color={palette.primary} name="map" size={22} />
        </View>
      </View>

      <SurfaceCard className="gap-4 bg-surface-low p-2">
        <Image
          contentFit="cover"
          source={{ uri: recipe.imageUrl }}
          className="aspect-[1.55] w-full rounded-3xl bg-surface"
        />
        <View className="gap-2 p-2">
          <Text className="text-headline text-text">{recipe.name}</Text>
          <Text className="text-body-sm text-textMuted">{recipe.summary}</Text>
          <View className="flex-row flex-wrap gap-2">
            <Metric icon="time-outline" label={recipe.time} />
            <Metric icon="person" label={`${servings} servings`} />
            <Metric icon="wallet-outline" label={recipe.cost} />
          </View>
          <View className="flex-row items-center gap-4 self-start rounded-full bg-surface-low p-1">
            <Pressable
              onPress={() => setServings((value) => Math.max(1, value - 1))}
              className="h-8 w-8 items-center justify-center rounded-full bg-accent200"
            >
              <AppIcon color={palette.inverse} name="remove" size={18} />
            </Pressable>
            <Text className="text-body font-bold text-text">{servings}</Text>
            <Pressable
              onPress={() => setServings((value) => value + 1)}
              className="h-8 w-8 items-center justify-center rounded-full bg-accent200"
            >
              <AppIcon color={palette.inverse} name="add" size={18} />
            </Pressable>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard className="gap-2">
        <SectionHeader
          action={`${missingIngredients.length} to buy`}
          title="Pantry check"
        />
        <View className="gap-2">
          {recipe.ingredients.map((ingredient) => {
            const owned = ownedIds.includes(ingredient.id);
            return (
              <Pressable
                key={ingredient.id}
                onPress={() => toggleIngredient(ingredient)}
                className={`min-h-[62px] flex-row items-center gap-2 rounded-2xl p-4 ${
                  owned ? "bg-primarySoft" : "bg-surface-low"
                }`}
              >
                <AppIcon
                  color={owned ? palette.primaryBright : palette.textMuted}
                  name={owned ? "checkmark-circle" : "ellipse-outline"}
                  size={24}
                />
                <View className="min-w-0 flex-1">
                  <Text className="text-body font-bold text-text">{ingredient.name}</Text>
                  <Text className="text-body-sm text-textMuted">
                    {ingredient.quantity} - {ingredient.category}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </SurfaceCard>

      <SurfaceCard className="bg-surface">
        <View className="flex-row items-center gap-4">
          <View className="h-12 w-12 items-center justify-center rounded-full bg-primarySoft">
            <AppIcon color={palette.primary} name="cart" size={22} />
          </View>
          <View className="flex-1 gap-1">
            <Text className="text-body font-extrabold text-text">Missing items</Text>
            <Text className="text-body-sm text-textMuted">
              {missingIngredients.length > 0
                ? missingIngredients
                    .map((ingredient) => ingredient.name)
                    .join(", ")
                : "You have everything for this recipe."}
            </Text>
          </View>
        </View>
      </SurfaceCard>

      <SurfaceCard className="gap-1">
        <View className="flex-row items-center justify-between">
          <Text className="text-title text-text">Pantry</Text>
          <Text className="rounded-full bg-surface-low px-2 py-1 text-label text-text">{ownedIngredients.length}</Text>
        </View>
        <Text className="text-body-sm text-textMuted">
          {ownedIngredients.length > 0
            ? ownedIngredients.map((ingredient) => ingredient.name).join(", ")
            : "Check items above to move them into your pantry list."}
        </Text>
      </SurfaceCard>

      <SurfaceCard className="gap-4">
        <SectionHeader action="Top 3" title="Nearby supermarkets" />
        <View className="h-[220px] overflow-hidden rounded-3xl bg-[#E9EEF3]">
          <View className="absolute -left-[30px] top-[82px] h-7 w-[360px] rotate-[-18deg] rounded-full bg-[rgba(255,255,255,0.72)]" />
          <View className="absolute -right-10 top-[140px] h-[22px] w-[300px] rotate-[28deg] rounded-full bg-[rgba(255,255,255,0.72)]" />
          <View className="absolute left-[45%] top-[42%] h-[42px] w-[42px] items-center justify-center rounded-full border-[3px] border-inverse bg-accent200">
            <AppIcon color={palette.inverse} name="navigate" size={18} />
          </View>
          {stores.map((store, index) => (
            <View
              key={store.id}
              className={`absolute h-[38px] w-[38px] items-center justify-center rounded-full border-[3px] border-inverse bg-red ${
                index === 0 ? "left-[18%] top-[24%]" : ""
              } ${index === 1 ? "right-[18%] top-[32%]" : ""} ${
                index === 2 ? "bottom-[18%] left-[32%]" : ""
              }`}
            >
              <AppIcon color={palette.inverse} name="storefront" size={16} />
            </View>
          ))}
        </View>
        <ScrollView
          contentContainerClassName="gap-4 pr-5"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {stores.map((store) => (
            <View key={store.id} className="w-[220px] gap-2 rounded-3xl bg-surface p-4">
              <Text className="text-body font-extrabold text-text">{store.name}</Text>
              <View className="flex-row gap-2">
                <Text className="text-label text-textMuted">{store.distance}</Text>
                <Text className="text-label text-textMuted">{store.rating.toFixed(1)}</Text>
                <Text className="text-label text-textMuted">{store.eta}</Text>
              </View>
              <Text className="text-body-sm text-textMuted" numberOfLines={2}>
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
    <View className="flex-1 gap-6 px-5 pb-32 pt-6">
      <View className="flex-row items-center justify-between">
        <Pressable onPress={onBack} className="h-[42px] min-w-[42px] items-center justify-center rounded-full bg-surface px-2 shadow-sm">
          <AppIcon color={palette.primary} name="chevron-back" size={24} />
        </Pressable>
        <Text className="text-title text-text">Cooking Mode</Text>
        <View className="h-[42px] min-w-[42px] items-center justify-center rounded-full bg-surface px-2 shadow-sm">
          <Text className="text-label text-accent200">{progress}%</Text>
        </View>
      </View>

      <View className="h-2.5 overflow-hidden rounded-full bg-surface-muted">
        <View className="h-full rounded-full bg-accent200" style={{ width: `${progress}%` }} />
      </View>
      <Text className="text-label uppercase text-textMuted">
        Step {stepIndex + 1} of {recipe.steps.length}
      </Text>

      <SurfaceCard className="flex-1 justify-center gap-4">
        <Text className="text-display text-text">{currentStep.title}</Text>
        <Text className="text-body text-textMuted">{currentStep.body}</Text>
      </SurfaceCard>

      <SurfaceCard className="gap-4">
        <View className="flex-row items-center gap-2">
          <AppIcon color={palette.primary} name="timer-outline" size={22} />
          <Text className="text-body font-extrabold text-text">Step timer</Text>
        </View>
        <Text className="text-center text-[44px] font-extrabold leading-[52px] text-accent200">
          {hasTimer ? formatClock(secondsLeft) : "No timer needed"}
        </Text>
        <View className="flex-row gap-2">
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

      <View className="flex-row items-center gap-4 rounded-3xl border border-[rgba(5,5,5,0.06)] bg-surface p-4 shadow-sm">
        <View className="h-[42px] flex-row items-center gap-[3px]">
          {[14, 26, 18, 34, 22].map((height, index) => (
            <View key={index} className="w-[5px] rounded-full bg-accent200" style={{ height }} />
          ))}
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-body font-extrabold text-text">Listening for next step</Text>
          <Text className="text-body-sm text-textMuted">
            Ask questions or say next step while cooking.
          </Text>
        </View>
        <AppIcon color={palette.primary} name="mic" size={24} />
      </View>

      <View className="flex-row items-center justify-between gap-4">
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
    <View className="flex-row items-center gap-1 rounded-full bg-surface px-2 py-1">
      <AppIcon color={palette.primary} name={icon} size={16} />
      <Text className="text-label text-textMuted">{label}</Text>
    </View>
  );
}
