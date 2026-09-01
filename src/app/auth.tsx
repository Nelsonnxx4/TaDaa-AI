import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { AppIcon } from "@/components/AppPrimitives";
import { palette, radius, shadow, spacing, typography } from "@/constants/theme";
import { heroImage } from "@/data/mock";

type AuthMode = "sign-in" | "sign-up";

export default function AuthRoute() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isSignUp = mode === "sign-up";
  const contentWidth = Math.min(Math.max(width - spacing.gutter * 2, 280), 420);

  const continueToApp = () => {
    router.replace("/home");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardShell}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, { width: contentWidth }]}>
            <View style={styles.heroCard}>
              <Image
                contentFit="cover"
                source={{ uri: heroImage }}
                style={StyleSheet.absoluteFill}
              />
              <View style={styles.heroScrim} />
              <View style={styles.heroCopy}>
                <Text style={styles.logo}>Ta-Daa AI</Text>
                <Text style={styles.tagline}>Snap, Shop & Cook</Text>
              </View>
            </View>

            <View style={styles.authCard}>
              <Text style={styles.heading}>
                {isSignUp ? "Create Account" : "Welcome Back"}
              </Text>

              <View style={styles.form}>
                {isSignUp ? (
                  <TextInput
                    autoCapitalize="words"
                    onChangeText={setName}
                    placeholder="Full Name"
                    placeholderTextColor={palette.textMuted}
                    returnKeyType="next"
                    style={styles.input}
                    textContentType="name"
                    value={name}
                  />
                ) : null}
                <TextInput
                  autoCapitalize="none"
                  autoComplete="email"
                  keyboardType="email-address"
                  onChangeText={setEmail}
                  placeholder="Email Address"
                  placeholderTextColor={palette.textMuted}
                  returnKeyType="next"
                  style={styles.input}
                  textContentType="emailAddress"
                  value={email}
                />
                <View>
                  <TextInput
                    autoComplete={isSignUp ? "new-password" : "password"}
                    onChangeText={setPassword}
                    placeholder="Password"
                    placeholderTextColor={palette.textMuted}
                    returnKeyType="done"
                    secureTextEntry
                    style={styles.input}
                    textContentType={isSignUp ? "newPassword" : "password"}
                    value={password}
                  />
                  {!isSignUp ? (
                    <Pressable style={styles.forgotButton}>
                      <Text style={styles.forgotText}>Forgot Password?</Text>
                    </Pressable>
                  ) : null}
                </View>

                <Pressable
                  onPress={continueToApp}
                  style={({ pressed }) => [
                    styles.primaryAction,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.primaryActionText}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>Or continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialStack}>
                <SocialButton
                  icon="logo-google"
                  label="Continue with Google"
                  onPress={continueToApp}
                />
                <SocialButton
                  dark
                  icon="logo-apple"
                  label="Continue with Apple"
                  onPress={continueToApp}
                />
              </View>
            </View>

            <View style={styles.switchRow}>
              <Text style={styles.switchText}>
                {isSignUp
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </Text>
              <Pressable
                onPress={() => setMode(isSignUp ? "sign-in" : "sign-up")}
                style={styles.switchButton}
              >
                <Text style={styles.switchButtonText}>
                  {isSignUp ? "Sign In" : "Sign Up"}
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SocialButton({
  dark = false,
  icon,
  label,
  onPress,
}: {
  dark?: boolean;
  icon: "logo-google" | "logo-apple";
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.socialButton,
        dark && styles.socialButtonDark,
        pressed && styles.pressed,
      ]}
    >
      <AppIcon
        color={dark ? palette.surface : palette.text}
        name={icon}
        size={18}
      />
      <Text style={[styles.socialText, dark && styles.socialTextDark]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: palette.background,
    flex: 1,
  },
  keyboardShell: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.xl,
  },
  content: {
    alignSelf: "center",
    gap: spacing.xl,
  },
  heroCard: {
    backgroundColor: palette.surface,
    borderRadius: radius.xl,
    height: 208,
    overflow: "hidden",
    ...(shadow.card ?? {}),
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(250, 249, 246, 0.32)",
  },
  heroCopy: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.78)",
    bottom: 0,
    gap: spacing.xs,
    left: 0,
    padding: spacing.md,
    position: "absolute",
    right: 0,
  },
  logo: {
    ...typography.display,
    color: palette.primary,
    textAlign: "center",
  },
  tagline: {
    ...typography.bodySmall,
    color: palette.textMuted,
    textAlign: "center",
  },
  authCard: {
    backgroundColor: palette.surface,
    borderColor: "rgba(187, 202, 191, 0.45)",
    borderRadius: radius.xl,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.lg,
    padding: spacing.lg,
    ...(shadow.card ?? {}),
  },
  heading: {
    ...typography.headline,
    color: palette.text,
    textAlign: "center",
  },
  form: {
    gap: spacing.md,
  },
  input: {
    ...typography.body,
    backgroundColor: palette.surface,
    borderColor: palette.outline,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    color: palette.text,
    minHeight: 52,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  forgotButton: {
    alignSelf: "flex-end",
    paddingTop: spacing.xs,
  },
  forgotText: {
    ...typography.label,
    color: palette.primary,
  },
  primaryAction: {
    alignItems: "center",
    backgroundColor: palette.primaryBright,
    borderRadius: radius.full,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg,
    ...(shadow.float ?? {}),
  },
  primaryActionText: {
    ...typography.bodySmall,
    color: "#00422B",
    fontWeight: "800",
  },
  dividerRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: spacing.sm,
  },
  dividerLine: {
    backgroundColor: palette.surfaceMuted,
    flex: 1,
    height: StyleSheet.hairlineWidth,
  },
  dividerText: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  socialStack: {
    gap: spacing.sm,
  },
  socialButton: {
    alignItems: "center",
    backgroundColor: palette.surface,
    borderColor: palette.outline,
    borderRadius: radius.full,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    gap: spacing.sm,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: spacing.lg,
  },
  socialButtonDark: {
    backgroundColor: palette.text,
    borderColor: palette.text,
  },
  socialText: {
    ...typography.bodySmall,
    color: palette.text,
    fontWeight: "800",
  },
  socialTextDark: {
    color: palette.surface,
  },
  switchRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    justifyContent: "center",
    paddingBottom: spacing.lg,
  },
  switchText: {
    ...typography.bodySmall,
    color: palette.textMuted,
  },
  switchButton: {
    padding: spacing.xs,
  },
  switchButtonText: {
    ...typography.bodySmall,
    color: palette.primary,
    fontWeight: "800",
  },
  pressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
});
