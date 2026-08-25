import { Image } from "expo-image";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

import { AppIcon, PrimaryButton } from "@/components/AppPrimitives";
import { heroImage } from "@/data/mock";
import { palette, radius, spacing, typography } from "@/constants/theme";

export function PaywallModal({
  visible,
  onClose,
  onUpgrade,
}: {
  visible: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}) {
  const [plan, setPlan] = useState<"monthly" | "annual">("annual");

  return (
    <Modal animationType="slide" onRequestClose={onClose} transparent visible={visible}>
      <View style={styles.modalScrim}>
        <View style={styles.paywall}>
          <Pressable onPress={onClose} style={styles.closeButton}>
            <AppIcon color={palette.textMuted} name="close" size={24} />
          </Pressable>

          <View style={styles.paywallHero}>
            <Image
              contentFit="cover"
              source={{ uri: heroImage }}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.paywallHeroOverlay} />
            <AppIcon color={palette.inverse} name="sparkles" size={44} />
          </View>

          <Text style={styles.paywallTitle}>
            Unlock Food Snap and hands-free voice cooking
          </Text>
          <Text style={styles.paywallBody}>
            Premium opens the camera scanner, voice mode, unlimited recipe
            conversions, and pantry sync.
          </Text>

          <View style={styles.featureList}>
            {[
              "Snap any dish to extract a recipe instantly",
              "Hands-free streaming voice assistant while cooking",
              "Unlimited recipe conversions and pantry sync",
            ].map((feature) => (
              <View key={feature} style={styles.featureRow}>
                <View style={styles.checkIcon}>
                  <AppIcon color={palette.inverse} name="checkmark" size={14} />
                </View>
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>

          <View style={styles.planRow}>
            <Pressable
              onPress={() => setPlan("monthly")}
              style={[
                styles.planCard,
                plan === "monthly" && styles.planCardActive,
              ]}
            >
              <Text style={styles.planLabel}>Monthly</Text>
              <Text style={styles.planPrice}>$4.99/mo</Text>
            </Pressable>
            <Pressable
              onPress={() => setPlan("annual")}
              style={[styles.planCard, plan === "annual" && styles.planCardActive]}
            >
              <Text style={styles.savePill}>Save 33%</Text>
              <Text style={styles.planLabel}>Annual</Text>
              <Text style={styles.planPrice}>$39.99/yr</Text>
            </Pressable>
          </View>

          <PrimaryButton
            icon="arrow-forward"
            label="Start 7-Day Free Trial"
            onPress={onUpgrade}
          />
          <Text style={styles.paywallFooter}>
            Restore Purchases | Terms of Service | Privacy Policy
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalScrim: {
    backgroundColor: "rgba(24, 33, 28, 0.44)",
    flex: 1,
    justifyContent: "flex-end",
  },
  paywall: {
    backgroundColor: palette.background,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    gap: spacing.md,
    maxHeight: "94%",
    padding: spacing.gutter,
  },
  closeButton: {
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: palette.surfaceLow,
    borderRadius: radius.full,
    height: 40,
    justifyContent: "center",
    width: 40,
  },
  paywallHero: {
    alignItems: "center",
    borderRadius: radius.xl,
    height: 156,
    justifyContent: "center",
    overflow: "hidden",
  },
  paywallHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 108, 73, 0.46)",
  },
  paywallTitle: {
    ...typography.headline,
    color: palette.primary,
    textAlign: "center",
  },
  paywallBody: {
    ...typography.bodySmall,
    color: palette.textMuted,
    textAlign: "center",
  },
  featureList: {
    gap: spacing.sm,
  },
  featureRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  checkIcon: {
    alignItems: "center",
    backgroundColor: palette.primaryBright,
    borderRadius: radius.full,
    height: 24,
    justifyContent: "center",
    width: 24,
  },
  featureText: {
    ...typography.bodySmall,
    color: palette.text,
    flex: 1,
  },
  planRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  planCard: {
    backgroundColor: palette.surface,
    borderColor: "rgba(187, 202, 191, 0.6)",
    borderRadius: radius.lg,
    borderWidth: 1,
    flex: 1,
    gap: spacing.xs,
    minHeight: 94,
    padding: spacing.md,
  },
  planCardActive: {
    backgroundColor: palette.primarySoft,
    borderColor: palette.primaryBright,
  },
  savePill: {
    ...typography.label,
    alignSelf: "flex-start",
    backgroundColor: palette.amberSoft,
    borderRadius: radius.full,
    color: "#684000",
    marginBottom: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  planLabel: {
    ...typography.bodySmall,
    color: palette.textMuted,
    fontWeight: "700",
  },
  planPrice: {
    ...typography.title,
    color: palette.primary,
  },
  paywallFooter: {
    ...typography.label,
    color: palette.textMuted,
    textAlign: "center",
  },
});
