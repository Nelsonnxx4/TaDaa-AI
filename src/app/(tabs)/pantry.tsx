import { SafeAreaView } from "react-native";

import { PantryScreen } from "@/components/PantryProfile";

export default function PantryRoute() {
  return (
    <SafeAreaView className="flex-1 bg-onboardingBg">
      <PantryScreen />
    </SafeAreaView>
  );
}
