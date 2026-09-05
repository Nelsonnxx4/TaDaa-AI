import type { ComponentProps, PropsWithChildren } from "react";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import {
  type ColorValue,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
import type { AppScreen, Recipe } from "@/types/app";

type IconName = ComponentProps<typeof Ionicons>["name"];

type IconProps = {
  name: IconName;
  color?: ColorValue;
  size?: number;
};

export function AppIcon({ name, color = palette.text, size = 22 }: IconProps) {
  return <Ionicons color={color} name={name} size={size} />;
}

export function SurfaceCard({
  children,
  style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function Pill({
  label,
  active,
  tone = "green",
  onPress,
}: {
  label: string;
  active?: boolean;
  tone?: "green" | "amber" | "neutral";
  onPress?: () => void;
}) {
  const backgroundColor = active
    ? tone === "amber"
      ? palette.amberSoft
      : palette.primarySoft
    : palette.surfaceLow;
  const color = active
    ? tone === "amber"
      ? "#684000"
      : palette.primary
    : palette.textMuted;

  return (
    <Pressable onPress={onPress} style={[styles.pill, { backgroundColor }]}>
      <Text style={[styles.pillText, { color }]}>{label}</Text>
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  icon,
  onPress,
  disabled,
}: {
  label: string;
  icon?: IconName;
  onPress?: () => void;
  disabled?: boolean;
}) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        disabled && styles.disabledButton,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
      {icon ? <AppIcon color={palette.inverse} name={icon} size={20} /> : null}
    </Pressable>
  );
}

export function GhostButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon?: IconName;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.ghostButton, pressed && styles.pressed]}
    >
      {icon ? <AppIcon color={palette.primary} name={icon} size={19} /> : null}
      <Text style={styles.ghostButtonText}>{label}</Text>
    </Pressable>
  );
}

export function SectionHeader({
  title,
  action,
}: {
  title: string;
  action?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? <Text style={styles.sectionAction}>{action}</Text> : null}
    </View>
  );
}

export function ProgressDots({
  total,
  current,
}: {
  total: number;
  current: number;
}) {
  return (
    <View style={styles.progressRow}>
      {Array.from({ length: total }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressTrack,
            index <= current && styles.progressActive,
          ]}
        />
      ))}
    </View>
  );
}

export function FoodCard({
  recipe,
  onPress,
}: {
  recipe: Recipe;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.foodCard, pressed && styles.pressed]}
    >
      <Image
        contentFit="cover"
        source={{ uri: recipe.imageUrl }}
        style={styles.foodImage}
      />
      <View style={styles.foodContent}>
        <Text numberOfLines={1} style={styles.foodTitle}>
          {recipe.name}
        </Text>
        <View style={styles.foodMeta}>
          <AppIcon color={palette.amber} name="time-outline" size={14} />
          <Text style={styles.foodMetaText}>{recipe.time}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export function HeaderBar({
  title = "Ta-Daa AI",
  subtitle,
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.headerBar}>
      <View>
        <Text style={styles.logo}>{title}</Text>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.headerActions}>
        <View style={styles.avatar}>
          <AppIcon color={palette.primary} name="person" size={20} />
        </View>
      </View>
    </View>
  );
}

const tabs: {
  key: AppScreen | "snap";
  label: string;
  icon: IconName;
  activeFor: AppScreen[];
}[] = [
  { key: "home", label: "Home", icon: "home", activeFor: ["home"] },
  {
    key: "pantry",
    label: "Pantry",
    icon: "basket",
    activeFor: ["pantry"],
  },
  { key: "snap", label: "Snap", icon: "camera", activeFor: [] },
  {
    key: "ingredients",
    label: "Shop",
    icon: "storefront",
    activeFor: ["ingredients", "cook"],
  },
  {
    key: "profile",
    label: "Profile",
    icon: "person",
    activeFor: ["profile"],
  },
];

export function BottomNav({
  active,
  onChange,
  onSnap,
}: {
  active: AppScreen;
  onChange: (screen: AppScreen) => void;
  onSnap: () => void;
}) {
  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const isActive = tab.activeFor.includes(active);
        const isSnap = tab.key === "snap";
        return (
          <Pressable
            key={tab.key}
            onPress={() => {
              if (isSnap) {
                onSnap();
              } else {
                onChange(tab.key as AppScreen);
              }
            }}
            style={[styles.navItem, isActive && styles.navActive, isSnap && styles.navSnap]}
          >
            <View style={isSnap ? styles.navSnapIcon : undefined}>
              <AppIcon
                color={
                  isSnap
                    ? "#684000"
                    : isActive
                      ? palette.primary
                      : palette.textMuted
                }
                name={tab.icon}
                size={isSnap ? 24 : 22}
              />
            </View>
            <Text
              style={[
                styles.navText,
                isActive && styles.navTextActive,
                isSnap && styles.navSnapText,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderColor: "rgba(187, 202, 191, 0.45)",
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
    ...(shadow.card ?? {}),
  },
  pill: {
    alignItems: "center",
    borderRadius: radius.full,
    minHeight: 36,
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  pillText: {
    ...typography.label,
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: palette.primaryBright,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    ...(shadow.float ?? {}),
  },
  primaryButtonText: {
    ...typography.title,
    color: palette.inverse,
  },
  disabledButton: {
    backgroundColor: palette.outline,
  },
  ghostButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.md,
    flexDirection: "row",
    gap: spacing.sm,
    minHeight: 44,
    paddingHorizontal: spacing.md,
  },
  ghostButtonText: {
    ...typography.bodySmall,
    color: palette.primary,
    fontWeight: "700",
  },
  pressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.title,
    color: palette.text,
  },
  sectionAction: {
    ...typography.bodySmall,
    color: palette.primary,
    fontWeight: "700",
  },
  progressRow: {
    alignSelf: "stretch",
    flexDirection: "row",
    gap: spacing.xs,
    width: "100%",
  },
  progressTrack: {
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    borderRadius: radius.full,
    flex: 1,
    height: 6,
  },
  progressActive: {
    backgroundColor: palette.primaryBright,
  },
  foodCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    ...(shadow.card ?? {}),
  },
  foodImage: {
    aspectRatio: 1.16,
    backgroundColor: palette.surfaceMuted,
    width: "100%",
  },
  foodContent: {
    gap: spacing.xs,
    padding: spacing.md,
  },
  foodTitle: {
    ...typography.body,
    color: palette.text,
    fontWeight: "700",
  },
  foodMeta: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.xs,
  },
  foodMetaText: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  headerBar: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },
  logo: {
    ...typography.headline,
    color: palette.primary,
  },
  headerSubtitle: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  headerActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.full,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  bottomNav: {
    alignItems: "center",
    backgroundColor: "rgba(250, 249, 246, 0.94)",
    borderTopColor: "rgba(187, 202, 191, 0.55)",
    borderTopWidth: StyleSheet.hairlineWidth,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    left: 0,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.sm,
    paddingTop: spacing.sm,
    position: "absolute",
    right: 0,
  },
  navItem: {
    alignItems: "center",
    borderRadius: radius.md,
    gap: 2,
    minWidth: 58,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  navActive: {
    backgroundColor: palette.primarySoft,
  },
  navSnap: {
    marginTop: -spacing.lg,
  },
  navSnapIcon: {
    alignItems: "center",
    backgroundColor: palette.amberSoft,
    borderRadius: radius.full,
    height: 50,
    justifyContent: "center",
    marginBottom: 2,
    width: 50,
    ...(shadow.card ?? {}),
  },
  navText: {
    ...typography.label,
    color: palette.textMuted,
  },
  navTextActive: {
    color: palette.primary,
  },
  navSnapText: {
    color: "#684000",
  },
});
