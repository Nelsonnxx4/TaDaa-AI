import { useRouter } from "expo-router";
import { useState } from "react";

import {
	PasswordResetInlineMessage,
	PasswordResetInput,
	PasswordResetScaffold,
} from "@/components/PasswordResetScaffold";

export default function NewPasswordRoute() {
	const router = useRouter();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const passwordIsShort = password.length > 0 && password.length < 8;
	const passwordsDoNotMatch =
		confirmPassword.length > 0 && password !== confirmPassword;
	const canSubmit =
		password.length >= 8 && confirmPassword.length >= 8 && !passwordsDoNotMatch;

	return (
		<PasswordResetScaffold
			icon="key-outline"
			onBack={() => router.replace("/verify-reset-code")}
			onPrimaryPress={() => router.replace("/auth")}
			primaryDisabled={!canSubmit}
			primaryLabel="Done"
			stepLabel="Step 3 of 3"
			subtitle="Create a new password for your Ta-Daa account."
			title="New Password"
		>
			<PasswordResetInput
				autoCapitalize="none"
				autoComplete="new-password"
				autoFocus
				onChangeText={setPassword}
				placeholder="New Password"
				returnKeyType="next"
				secureTextEntry
				textContentType="newPassword"
				value={password}
			/>
			<PasswordResetInput
				autoCapitalize="none"
				autoComplete="new-password"
				onChangeText={setConfirmPassword}
				placeholder="Confirm Password"
				returnKeyType="done"
				secureTextEntry
				textContentType="newPassword"
				value={confirmPassword}
			/>
			<PasswordResetInlineMessage
				tone={passwordIsShort || passwordsDoNotMatch ? "error" : "neutral"}
			>
				{passwordIsShort
					? "Password must be at least 8 characters."
					: passwordsDoNotMatch
						? "Passwords do not match."
						: ""}
			</PasswordResetInlineMessage>
		</PasswordResetScaffold>
	);
}
