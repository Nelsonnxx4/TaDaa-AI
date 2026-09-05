import { Tabs } from "expo-router";

import { AppIcon } from "@/components/AppPrimitives";
import { palette } from "@/constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: palette.primary,
        tabBarInactiveTintColor: palette.textMuted,
        tabBarStyle: {
          backgroundColor: "rgba(250, 249, 246, 0.96)",
          borderTopColor: "rgba(187, 202, 191, 0.55)",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AppIcon color={color} name="home" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="pantry"
        options={{
          title: "Pantry",
          tabBarIcon: ({ color, size }) => (
            <AppIcon color={color} name="basket" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="camera"
        options={{
          title: "Snap",
          tabBarIcon: ({ color, size }) => (
            <AppIcon color={color} name="camera" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <AppIcon color={color} name="storefront" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AppIcon color={color} name="person" size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
