import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";

import { ProfileScreen } from "@/components/PantryProfile";
import { palette } from "@/constants/theme";
import { useAppAccess } from "@/context/AppAccess";
import type { AppScreen } from "@/types/app";

const routes: Record<AppScreen, "/" | "/pantry" | "/profile" | "/shop"> = {
  home: "/",
  pantry: "/pantry",
  ingredients: "/shop",
  cook: "/shop",
  profile: "/profile",
};

export default function ProfileRoute() {
  const router = useRouter();
  const { isPremium, openPaywall } = useAppAccess();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ProfileScreen
        isPremium={isPremium}
        onNavigate={(screen) => router.push(routes[screen])}
        onOpenPaywall={openPaywall}
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
