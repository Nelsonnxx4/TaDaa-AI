import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native";

import { ProfileScreen } from "@/components/PantryProfile";
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
    <SafeAreaView className="flex-1 bg-onboardingBg">
      <ProfileScreen
        onNavigate={(screen) => router.push(routes[screen])}
      />
    </SafeAreaView>
  );
}
