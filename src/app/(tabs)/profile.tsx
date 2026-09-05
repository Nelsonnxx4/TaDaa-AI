import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import { ProfileScreen } from "@/components/PantryProfile";
import { palette } from "@/constants/theme";
import type { AppScreen } from "@/types/app";

const routes: Record<AppScreen, "/home" | "/pantry" | "/profile" | "/shop"> = {
  home: "/home",
  pantry: "/pantry",
  ingredients: "/shop",
  cook: "/shop",
  profile: "/profile",
};

export default function ProfileRoute() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileScreen
        onNavigate={(screen) => router.push(routes[screen])}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
});
