import { Image } from "expo-image";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  AppIcon,
  GhostButton,
  HeaderBar,
  Pill,
  PrimaryButton,
  SectionHeader,
  SurfaceCard,
} from "@/components/AppPrimitives";
import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
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
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar subtitle={`${items.length} ingredients tracked`} title="My Pantry" />

      <SurfaceCard style={styles.searchPanel}>
        <View style={styles.searchInputRow}>
          <AppIcon color={palette.textMuted} name="search" size={22} />
          <TextInput
            onChangeText={setQuery}
            placeholder="Search your pantry..."
            placeholderTextColor="#6C7A71"
            style={styles.searchInput}
            value={query}
          />
        </View>
      </SurfaceCard>

      <Pressable
        onPress={addReceiptItems}
        style={({ pressed }) => [
          styles.receiptBanner,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.receiptIcon}>
          <AppIcon color="#684000" name="receipt" size={24} />
        </View>
        <View style={styles.receiptCopy}>
          <Text style={styles.receiptTitle}>Auto-add from receipt</Text>
          <Text style={styles.receiptBody}>Snap a grocery receipt to stock pantry items.</Text>
        </View>
        <AppIcon color={palette.textMuted} name="chevron-forward" size={22} />
      </Pressable>

      <ScrollView
        contentContainerStyle={styles.chipRow}
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
        <View style={styles.pantryGrid}>
          {visibleItems.map((item) => (
            <PantryItemCard item={item} key={item.id} />
          ))}
          <Pressable
            onPress={addManualItem}
            style={({ pressed }) => [
              styles.addItemCard,
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.addIcon}>
              <AppIcon color={palette.primary} name="add" size={26} />
            </View>
            <Text style={styles.addItemText}>Add Item</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export function ProfileScreen({
  isPremium,
  onOpenPaywall,
  onNavigate,
}: {
  isPremium: boolean;
  onOpenPaywall: () => void;
  onNavigate: (screen: AppScreen) => void;
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <HeaderBar premium={isPremium} subtitle="Preferences and account" />

      <SurfaceCard style={styles.profileHero}>
        <View style={styles.profileAvatar}>
          <AppIcon color={palette.primary} name="person" size={36} />
        </View>
        <View style={styles.profileCopy}>
          <Text style={styles.profileName}>Nelson</Text>
          <Text style={styles.profileMeta}>
            {isPremium ? "Premium member" : "Free plan"}
          </Text>
        </View>
        {!isPremium ? (
          <GhostButton icon="sparkles" label="Upgrade" onPress={onOpenPaywall} />
        ) : null}
      </SurfaceCard>

      <View style={styles.menuGrid}>
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
          body={
            isPremium
              ? "Premium active with Food Snap and Voice."
              : "Unlock camera scanning and cooking voice mode."
          }
          icon={isPremium ? "sparkles" : "lock-closed"}
          onPress={onOpenPaywall}
          title="Subscription"
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

      <SurfaceCard style={styles.preferencePanel}>
        <SectionHeader title="Cooking Profile" />
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceLabel}>Diet</Text>
          <Text style={styles.preferenceValue}>Flexible</Text>
        </View>
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceLabel}>Default servings</Text>
          <Text style={styles.preferenceValue}>2</Text>
        </View>
        <View style={styles.preferenceRow}>
          <Text style={styles.preferenceLabel}>Budget mode</Text>
          <Text style={styles.preferenceValue}>Balanced</Text>
        </View>
      </SurfaceCard>
    </ScrollView>
  );
}

function PantryItemCard({ item }: { item: PantryItem }) {
  return (
    <SurfaceCard style={styles.pantryItemCard}>
      {item.expiresInDays ? (
        <View
          style={[
            styles.expiryBadge,
            item.expiresInDays <= 3 && styles.expiryBadgeSoon,
          ]}
        >
          <AppIcon
            color={item.expiresInDays <= 3 ? palette.inverse : "#684000"}
            name="warning"
            size={12}
          />
          <Text
            style={[
              styles.expiryText,
              item.expiresInDays <= 3 && styles.expiryTextSoon,
            ]}
          >
            {item.expiresInDays} days
          </Text>
        </View>
      ) : null}
      <Image
        contentFit="cover"
        source={{ uri: item.imageUrl }}
        style={styles.pantryImage}
      />
      <Text numberOfLines={1} style={styles.pantryItemName}>
        {item.name}
      </Text>
      <Text style={styles.pantryItemQuantity}>{item.quantity}</Text>
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
      style={({ pressed }) => [
        styles.profileAction,
        isDanger && styles.profileActionDanger,
        pressed && styles.pressed,
      ]}
    >
      <View style={[styles.profileActionIcon, isDanger && styles.dangerIcon]}>
        <AppIcon
          color={isDanger ? palette.red : palette.primary}
          name={icon}
          size={24}
        />
      </View>
      <Text style={[styles.profileActionTitle, isDanger && styles.dangerText]}>
        {title}
      </Text>
      <Text style={styles.profileActionBody}>{body}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: 128,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.md,
  },
  searchPanel: {
    padding: spacing.sm,
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
  },
  receiptBanner: {
    alignItems: "center",
    backgroundColor: palette.amberSoft,
    borderColor: "rgba(245, 158, 11, 0.28)",
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: spacing.md,
    padding: spacing.md,
    ...(shadow.card ?? {}),
  },
  receiptIcon: {
    alignItems: "center",
    backgroundColor: "#FFD88F",
    borderRadius: radius.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  receiptCopy: {
    flex: 1,
  },
  receiptTitle: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  receiptBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  chipRow: {
    gap: spacing.sm,
    paddingRight: spacing.gutter,
  },
  pantryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  pantryItemCard: {
    flexBasis: "47%",
    flexGrow: 1,
    minWidth: 150,
    padding: spacing.sm,
    position: "relative",
  },
  pantryImage: {
    aspectRatio: 1,
    backgroundColor: palette.surfaceMuted,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
    width: "100%",
  },
  pantryItemName: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  pantryItemQuantity: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  expiryBadge: {
    alignItems: "center",
    backgroundColor: palette.amberSoft,
    borderRadius: radius.full,
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    position: "absolute",
    right: spacing.md,
    top: spacing.md,
    zIndex: 2,
  },
  expiryBadgeSoon: {
    backgroundColor: palette.red,
  },
  expiryText: {
    ...typography.label,
    color: "#684000",
  },
  expiryTextSoon: {
    color: palette.inverse,
  },
  addItemCard: {
    alignItems: "center",
    backgroundColor: palette.surface,
    borderColor: palette.outline,
    borderRadius: radius.lg,
    borderStyle: "dashed",
    borderWidth: 1,
    flexBasis: "47%",
    flexGrow: 1,
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 210,
    minWidth: 150,
    padding: spacing.md,
  },
  addIcon: {
    alignItems: "center",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.full,
    height: 56,
    justifyContent: "center",
    width: 56,
  },
  addItemText: {
    ...typography.body,
    color: palette.primary,
    fontWeight: "800",
  },
  profileHero: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  profileAvatar: {
    alignItems: "center",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.full,
    height: 72,
    justifyContent: "center",
    width: 72,
  },
  profileCopy: {
    flex: 1,
    minWidth: 0,
  },
  profileName: {
    ...typography.headline,
    color: palette.primary,
  },
  profileMeta: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  profileAction: {
    backgroundColor: palette.surface,
    borderColor: "rgba(187, 202, 191, 0.45)",
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    flexBasis: "47%",
    flexGrow: 1,
    gap: spacing.sm,
    minHeight: 156,
    minWidth: 150,
    padding: spacing.md,
    ...(shadow.card ?? {}),
  },
  profileActionDanger: {
    backgroundColor: palette.redSoft,
  },
  profileActionIcon: {
    alignItems: "center",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.md,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  dangerIcon: {
    backgroundColor: "rgba(164, 58, 58, 0.12)",
  },
  profileActionTitle: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  profileActionBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  dangerText: {
    color: palette.red,
  },
  preferencePanel: {
    gap: spacing.sm,
  },
  preferenceRow: {
    alignItems: "center",
    borderTopColor: "rgba(187, 202, 191, 0.48)",
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: spacing.sm,
  },
  preferenceLabel: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  preferenceValue: {
    ...typography.bodySmall,
    color: palette.primary,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.84,
    transform: [{ scale: 0.99 }],
  },
});
