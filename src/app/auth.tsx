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
import {
	palette,
	radius,
	shadow,
	spacing,
	typography,
} from "@/constants/theme";
import { heroImage } from "@/data/mock";

type AuthMode = "sign-in" | "sign-up";

const googleBrandIconSource = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
  <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
  <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
  <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
</svg>
`)}`;

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
										<Pressable
											accessibilityRole="button"
											onPress={() => router.push("/forgot-password")}
											style={styles.forgotButton}
										>
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
			{icon === "logo-google" ? (
				<GoogleBrandIcon size={18} />
			) : (
				<AppIcon
					color={dark ? palette.surface : palette.text}
					name={icon}
					size={18}
				/>
			)}
			<Text style={[styles.socialText, dark && styles.socialTextDark]}>
				{label}
			</Text>
		</Pressable>
	);
}

function GoogleBrandIcon({ size }: { size: number }) {
	return (
		<Image
			accessibilityLabel=""
			contentFit="contain"
			source={googleBrandIconSource}
			style={{ height: size, width: size }}
		/>
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
		backgroundColor: "rgba(245, 245, 245, 0.24)",
		bottom: 0,
		left: 0,
		position: "absolute",
		right: 0,
		top: 0,
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
		color: palette.text,
		textAlign: "center",
	},
	tagline: {
		...typography.bodySmall,
		color: palette.textMuted,
		textAlign: "center",
	},
	authCard: {
		backgroundColor: palette.surface,
		borderColor: "rgba(5, 5, 5, 0.05)",
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
		backgroundColor: palette.surfaceLow,
		borderColor: palette.outline,
		borderRadius: radius.lg,
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
		backgroundColor: palette.primary,
		borderRadius: radius.full,
		justifyContent: "center",
		minHeight: 48,
		paddingHorizontal: spacing.lg,
		...(shadow.card ?? {}),
	},
	primaryActionText: {
		...typography.bodySmall,
		color: palette.inverse,
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
