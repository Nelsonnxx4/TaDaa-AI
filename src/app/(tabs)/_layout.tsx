import { Tabs } from "expo-router";

import { AppIcon } from "@/components/AppPrimitives";
import { palette, radius, shadow, spacing } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.inverse,
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.68)",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "700",
        },
        tabBarStyle: {
          backgroundColor: palette.primary,
          borderRadius: radius.full,
          borderTopWidth: 0,
          bottom: spacing.lg,
          height: 64,
          left: spacing.gutter,
          paddingBottom: spacing.sm,
          paddingTop: spacing.sm,
          position: "absolute",
          right: spacing.gutter,
          ...(shadow.float ?? {}),
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              color={typeof color === "string" ? color : palette.inverse}
              name="home"
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: "Pantry",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              color={typeof color === "string" ? color : palette.inverse}
              name="basket"
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Snap",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              color={typeof color === "string" ? color : palette.inverse}
              name="camera"
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              color={typeof color === "string" ? color : palette.inverse}
              name="storefront"
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AppIcon
              color={typeof color === "string" ? color : palette.inverse}
              name="person"
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
