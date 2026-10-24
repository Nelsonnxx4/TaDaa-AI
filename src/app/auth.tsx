import { Image } from "@/components/StyledImage";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	Pressable,
	SafeAreaView,
	ScrollView,
	Text,
	TextInput,
	View,
	useWindowDimensions,
} from "react-native";

import { AppIcon } from "@/components/AppPrimitives";
import { palette, spacing } from "@/constants/theme";
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
		<SafeAreaView className="flex-1 bg-onboardingBg">
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				className="flex-1"
			>
				<ScrollView
					contentContainerClassName="flex-grow justify-center px-5 py-8"
					keyboardShouldPersistTaps="handled"
					showsVerticalScrollIndicator={false}
				>
					<View className="gap-8 self-center" style={{ width: contentWidth }}>
						<View className="h-[208px] overflow-hidden rounded-3xl bg-surface shadow-sm">
							<Image
								contentFit="cover"
								source={{ uri: heroImage }}
								className="absolute inset-0"
							/>
							<View className="absolute inset-0 bg-[rgba(245,245,245,0.24)]" />
							<View className="absolute bottom-0 left-0 right-0 items-center gap-1 bg-overlay-soft p-4">
								<Text className="text-center text-display text-text">Ta-Daa AI</Text>
								<Text className="text-center text-body-sm text-textMuted">Snap, Shop & Cook</Text>
							</View>
						</View>

						<View className="gap-6 rounded-3xl border border-[rgba(5,5,5,0.05)] bg-surface p-6 shadow-sm">
							<Text className="text-center text-headline text-text">
								{isSignUp ? "Create Account" : "Welcome Back"}
							</Text>

							<View className="gap-4">
								{isSignUp ? (
									<TextInput
										autoCapitalize="words"
										onChangeText={setName}
										placeholder="Full Name"
										placeholderTextColor={palette.textMuted}
										returnKeyType="next"
										className="min-h-[52px] rounded-2xl border border-outline bg-surface-low px-4 py-2 text-body text-text"
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
									className="min-h-[52px] rounded-2xl border border-outline bg-surface-low px-4 py-2 text-body text-text"
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
										className="min-h-[52px] rounded-2xl border border-outline bg-surface-low px-4 py-2 text-body text-text"
										textContentType={isSignUp ? "newPassword" : "password"}
										value={password}
									/>
									{!isSignUp ? (
										<Pressable
											accessibilityRole="button"
											onPress={() => router.push("/forgot-password")}
											className="self-end pt-1"
										>
											<Text className="text-label text-accent200">Forgot Password?</Text>
										</Pressable>
									) : null}
								</View>

								<Pressable
									onPress={continueToApp}
									className="min-h-12 items-center justify-center rounded-full bg-accent200 px-6 shadow-sm active:scale-[0.98] active:opacity-[0.86]"
								>
									<Text className="text-body-sm font-extrabold text-inverse">
										{isSignUp ? "Sign Up" : "Sign In"}
									</Text>
								</Pressable>
							</View>

							<View className="flex-row items-center gap-2">
								<View className="h-px flex-1 bg-surface-muted" />
								<Text className="text-body-sm text-textMuted">Or continue with</Text>
								<View className="h-px flex-1 bg-surface-muted" />
							</View>

							<View className="gap-2">
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

						<View className="flex-row flex-wrap items-center justify-center gap-1 pb-6">
							<Text className="text-body-sm text-textMuted">
								{isSignUp
									? "Already have an account?"
									: "Don't have an account?"}
							</Text>
							<Pressable
								onPress={() => setMode(isSignUp ? "sign-in" : "sign-up")}
								className="p-1"
							>
								<Text className="text-body-sm font-extrabold text-accent200">
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
			className={`min-h-12 flex-row items-center justify-center gap-2 rounded-full border px-6 active:scale-[0.98] active:opacity-[0.86] ${
				dark ? "border-text bg-text" : "border-outline bg-surface"
			}`}
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
			<Text className={`text-body-sm font-extrabold ${dark ? "text-surface" : "text-text"}`}>
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
