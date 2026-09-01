import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import {
  AppIcon,
  GhostButton,
  PrimaryButton,
  SurfaceCard,
} from "@/components/AppPrimitives";
import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
import { useAppAccess } from "@/context/AppAccess";
import { heroImage, recipes } from "@/data/mock";

const snapRecipe = recipes[2];

export default function CameraRoute() {
  const router = useRouter();
  const { isPremium, openPaywall, showPremiumUI } = useAppAccess();
  const isLocked = showPremiumUI && !isPremium;

  useEffect(() => {
    if (isLocked) {
      openPaywall();
    }
  }, [isLocked, openPaywall]);

  const handleCapture = () => {
    if (isLocked) {
      openPaywall();
      return;
    }

    router.push({
      pathname: "/shop",
      params: { recipeId: snapRecipe.id },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.appShell}>
        <View style={styles.screenHeader}>
          <Pressable onPress={() => router.replace("/home")} style={styles.iconButton}>
            <AppIcon color={palette.primary} name="chevron-back" size={24} />
          </Pressable>
          <Text style={styles.screenTitle}>Food Snap</Text>
          <View style={styles.iconButton}>
            <AppIcon
              color={isLocked ? palette.textMuted : palette.primary}
              name={isLocked ? "lock-closed" : "sparkles"}
              size={22}
            />
          </View>
        </View>

        <View style={styles.cameraPreview}>
          <Image
            contentFit="cover"
            source={{ uri: heroImage }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.previewOverlay} />
          <View style={styles.scanFrame}>
            <View style={[styles.scanCorner, styles.topLeft]} />
            <View style={[styles.scanCorner, styles.topRight]} />
            <View style={[styles.scanCorner, styles.bottomLeft]} />
            <View style={[styles.scanCorner, styles.bottomRight]} />
          </View>
        </View>

        <SurfaceCard style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultIcon}>
              <AppIcon color="#684000" name="camera" size={22} />
            </View>
            <View style={styles.resultCopy}>
              <Text style={styles.resultTitle}>
                {isLocked ? "Premium scanner locked" : "Ready to scan"}
              </Text>
              <Text style={styles.resultBody}>
                {isLocked
                  ? "Unlock Food Snap to identify dishes from photos."
                  : "Capture a dish photo to create the ingredient plan."}
              </Text>
            </View>
          </View>
        </SurfaceCard>

        <View style={styles.cameraActions}>
          <GhostButton icon="images" label="Upload" onPress={handleCapture} />
          <Pressable
            accessibilityLabel="Snap food photo"
            accessibilityRole="button"
            onPress={handleCapture}
            style={({ pressed }) => [
              styles.captureButton,
              pressed && styles.capturePressed,
            ]}
          >
            <View style={styles.captureInner} />
          </Pressable>
          <GhostButton icon="flash" label="Flash" onPress={handleCapture} />
        </View>

        <PrimaryButton
          icon={isLocked ? "lock-closed" : "sparkles"}
          label={isLocked ? "Unlock Snap" : "Use Demo Scan"}
          onPress={handleCapture}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
  appShell: {
    backgroundColor: palette.background,
    flex: 1,
    gap: spacing.lg,
    paddingBottom: 128,
    paddingHorizontal: spacing.gutter,
    paddingTop: spacing.md,
  },
  screenHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: palette.primarySoft,
    borderRadius: radius.full,
    height: 42,
    justifyContent: "center",
    minWidth: 42,
    paddingHorizontal: spacing.sm,
  },
  screenTitle: {
    ...typography.title,
    color: palette.text,
  },
  cameraPreview: {
    backgroundColor: palette.dark,
    borderRadius: radius.xl,
    flex: 1,
    minHeight: 360,
    overflow: "hidden",
    ...(shadow.card ?? {}),
  },
  previewOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(24, 33, 28, 0.28)",
  },
  scanFrame: {
    borderColor: "rgba(248, 250, 247, 0.38)",
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    bottom: "18%",
    left: spacing.lg,
    position: "absolute",
    right: spacing.lg,
    top: "18%",
  },
  scanCorner: {
    borderColor: palette.inverse,
    height: 44,
    position: "absolute",
    width: 44,
  },
  topLeft: {
    borderLeftWidth: 4,
    borderTopWidth: 4,
    left: -2,
    top: -2,
  },
  topRight: {
    borderRightWidth: 4,
    borderTopWidth: 4,
    right: -2,
    top: -2,
  },
  bottomLeft: {
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    bottom: -2,
    left: -2,
  },
  bottomRight: {
    borderBottomWidth: 4,
    borderRightWidth: 4,
    bottom: -2,
    right: -2,
  },
  resultCard: {
    gap: spacing.md,
  },
  resultHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
  },
  resultIcon: {
    alignItems: "center",
    backgroundColor: palette.amberSoft,
    borderRadius: radius.md,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  resultCopy: {
    flex: 1,
    gap: spacing.xs,
    minWidth: 0,
  },
  resultTitle: {
    ...typography.body,
    color: palette.text,
    fontWeight: "800",
  },
  resultBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  cameraActions: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "space-between",
  },
  captureButton: {
    alignItems: "center",
    backgroundColor: palette.surface,
    borderColor: palette.primaryBright,
    borderRadius: radius.full,
    borderWidth: 5,
    height: 74,
    justifyContent: "center",
    width: 74,
    ...(shadow.float ?? {}),
  },
  captureInner: {
    backgroundColor: palette.primaryBright,
    borderRadius: radius.full,
    height: 48,
    width: 48,
  },
  capturePressed: {
    opacity: 0.86,
    transform: [{ scale: 0.97 }],
  },
});
