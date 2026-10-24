import { Image } from "@/components/StyledImage";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  AppIcon,
  HeaderBar,
  Pill,
  SectionHeader,
  SurfaceCard,
} from "@/components/AppPrimitives";
import { palette } from "@/constants/theme";
import { pantryItems, recipes } from "@/data/mock";
import type { AppScreen, PantryItem } from "@/types/app";

const pantryCategories = [
  "All",
  "Vegetables",
  "Dairy",
  "Proteins",
  "Pantry Staples",
];

const receiptItems: PantryItem[] = [
  {
    id: "tomatoes",
    name: "Cherry Tomatoes",
    quantity: "1 pint",
    category: "Vegetables",
    imageUrl:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "eggs",
    name: "Eggs",
    quantity: "12 count",
    category: "Proteins",
    expiresInDays: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=600&q=80",
  },
];

export function PantryScreen() {
  const [items, setItems] = useState(pantryItems);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesQuery =
        !normalizedQuery ||
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, items, query]);

  const addReceiptItems = () => {
    setItems((current) => {
      const existing = new Set(current.map((item) => item.id));
      const incoming = receiptItems.filter((item) => !existing.has(item.id));
      return [...incoming, ...current];
    });
  };

  const addManualItem = () => {
    setItems((current) => {
      if (current.some((item) => item.id === "spinach")) {
        return current;
      }

      return [
        {
          id: "spinach",
          name: "Baby Spinach",
          quantity: "1 bag",
          category: "Vegetables",
          expiresInDays: 4,
          imageUrl:
            "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
        },
        ...current,
      ];
    });
  };

  return (
    <ScrollView
      contentContainerClassName="gap-6 px-5 pb-32 pt-6"
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar subtitle={`${items.length} ingredients tracked`} title="My Pantry" />

      <SurfaceCard className="p-2">
        <View className="min-h-[52px] flex-row items-center gap-2 rounded-full bg-surface-low px-4">
          <AppIcon color={palette.textMuted} name="search" size={22} />
          <TextInput
            onChangeText={setQuery}
            placeholder="Search your pantry..."
            placeholderTextColor={palette.textMuted}
            className="min-w-0 flex-1 text-body text-text"
            value={query}
          />
        </View>
      </SurfaceCard>

      <Pressable
        onPress={addReceiptItems}
        className="flex-row items-center gap-4 rounded-3xl border border-[rgba(5,5,5,0.05)] bg-surface-low p-4 shadow-sm active:scale-[0.99] active:opacity-[0.84]"
      >
        <View className="h-12 w-12 items-center justify-center rounded-full bg-surface">
          <AppIcon color={palette.primary} name="receipt" size={24} />
        </View>
        <View className="flex-1">
          <Text className="text-body font-extrabold text-text">Auto-add from receipt</Text>
          <Text className="text-body-sm text-textMuted">Snap a grocery receipt to stock pantry items.</Text>
        </View>
        <AppIcon color={palette.textMuted} name="chevron-forward" size={22} />
      </Pressable>

      <ScrollView
        contentContainerClassName="gap-2 pr-5"
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {pantryCategories.map((category) => (
          <Pill
            active={category === activeCategory}
            key={category}
            label={category}
            onPress={() => setActiveCategory(category)}
          />
        ))}
      </ScrollView>

      <View>
        <SectionHeader action="Grid view" title="Recently Added" />
        <View className="flex-row flex-wrap gap-4">
          {visibleItems.map((item) => (
            <PantryItemCard item={item} key={item.id} />
          ))}
          <Pressable
            onPress={addManualItem}
            className="min-h-[210px] min-w-[150px] grow basis-[47%] items-center justify-center gap-2 rounded-2xl border border-dashed border-outline bg-surface-low p-4 active:scale-[0.99] active:opacity-[0.84]"
          >
            <View className="h-14 w-14 items-center justify-center rounded-full bg-primarySoft">
              <AppIcon color={palette.primary} name="add" size={26} />
            </View>
            <Text className="text-body font-extrabold text-accent200">Add Item</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export function ProfileScreen({
  onNavigate,
}: {
  onNavigate: (screen: AppScreen) => void;
}) {
  return (
    <ScrollView
      contentContainerClassName="gap-6 px-5 pb-32 pt-6"
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar subtitle="Preferences and account" />

      <SurfaceCard className="flex-row items-center gap-4 bg-surface-low">
        <View className="h-[72px] w-[72px] items-center justify-center rounded-full bg-primarySoft">
          <AppIcon color={palette.primary} name="person" size={36} />
        </View>
        <View className="min-w-0 flex-1">
          <Text className="text-headline text-text">Nelson</Text>
          <Text className="text-body-sm text-textMuted">Home cook</Text>
        </View>
      </SurfaceCard>

      <View className="flex-row flex-wrap gap-4">
        <ProfileAction
          body="Diet, allergies, servings, and cuisine choices."
          icon="options"
          onPress={() => onNavigate("home")}
          title="Personal Preferences"
        />
        <ProfileAction
          body={`${recipes.length} recipes ready to revisit.`}
          icon="bookmark"
          onPress={() => onNavigate("home")}
          title="Saved Recipes"
        />
        <ProfileAction
          body="Pantry and store history from your last plans."
          icon="basket"
          onPress={() => onNavigate("pantry")}
          title="Shopping History"
        />
        <ProfileAction
          body="Notifications, units, privacy, and app settings."
          icon="settings"
          onPress={() => onNavigate("profile")}
          title="Settings"
        />
        <ProfileAction
          body="End this local MVP session."
          icon="log-out"
          onPress={() => onNavigate("home")}
          tone="danger"
          title="Sign Out"
        />
      </View>

      <SurfaceCard className="gap-2">
        <SectionHeader title="Cooking Profile" />
        <View className="flex-row items-center justify-between border-t border-[rgba(5,5,5,0.08)] pt-2">
          <Text className="text-body-sm text-textMuted">Diet</Text>
          <Text className="text-body-sm font-extrabold text-text">Flexible</Text>
        </View>
        <View className="flex-row items-center justify-between border-t border-[rgba(5,5,5,0.08)] pt-2">
          <Text className="text-body-sm text-textMuted">Default servings</Text>
          <Text className="text-body-sm font-extrabold text-text">2</Text>
        </View>
        <View className="flex-row items-center justify-between border-t border-[rgba(5,5,5,0.08)] pt-2">
          <Text className="text-body-sm text-textMuted">Budget mode</Text>
          <Text className="text-body-sm font-extrabold text-text">Balanced</Text>
        </View>
      </SurfaceCard>
    </ScrollView>
  );
}

function PantryItemCard({ item }: { item: PantryItem }) {
  return (
    <SurfaceCard className="relative min-w-[150px] grow basis-[47%] bg-surface-low p-2">
      {item.expiresInDays ? (
        <View
          className={`absolute right-4 top-4 z-10 flex-row items-center gap-1 rounded-full px-2 py-1 ${
            item.expiresInDays <= 3 ? "bg-red" : "bg-surface"
          }`}
        >
          <AppIcon
            color={item.expiresInDays <= 3 ? palette.inverse : palette.text}
            name="warning"
            size={12}
          />
          <Text className={`text-label ${item.expiresInDays <= 3 ? "text-inverse" : "text-text"}`}>
            {item.expiresInDays} days
          </Text>
        </View>
      ) : null}
      <Image
        contentFit="cover"
        source={{ uri: item.imageUrl }}
        className="mb-2 aspect-square w-full rounded-3xl bg-surface"
      />
      <Text className="text-body font-extrabold text-text" numberOfLines={1}>
        {item.name}
      </Text>
      <Text className="text-body-sm text-textMuted">{item.quantity}</Text>
    </SurfaceCard>
  );
}

function ProfileAction({
  title,
  body,
  icon,
  tone,
  onPress,
}: {
  title: string;
  body: string;
  icon:
    | "basket"
    | "bookmark"
    | "lock-closed"
    | "log-out"
    | "options"
    | "settings"
    | "sparkles";
  tone?: "danger";
  onPress: () => void;
}) {
  const isDanger = tone === "danger";

  return (
    <Pressable
      onPress={onPress}
      className={`min-h-[156px] min-w-[150px] grow basis-[47%] gap-2 rounded-3xl border border-[rgba(5,5,5,0.05)] p-4 shadow-sm active:scale-[0.99] active:opacity-[0.84] ${
        isDanger ? "bg-redSoft" : "bg-surface-low"
      }`}
    >
      <View className={`h-11 w-11 items-center justify-center rounded-full ${isDanger ? "bg-[rgba(164,58,58,0.12)]" : "bg-surface"}`}>
        <AppIcon
          color={isDanger ? palette.red : palette.primary}
          name={icon}
          size={24}
        />
      </View>
      <Text className={`text-body font-extrabold ${isDanger ? "text-red" : "text-text"}`}>
        {title}
      </Text>
      <Text className="text-body-sm text-textMuted">{body}</Text>
    </Pressable>
  );
}
