import { SafeAreaView, StyleSheet } from "react-native";

import { PantryScreen } from "@/components/PantryProfile";
import { palette } from "@/constants/theme";

export default function PantryRoute() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <PantryScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
});
