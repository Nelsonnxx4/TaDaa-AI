import { useRouter } from "expo-router";
import { useState } from "react";

import {
	PasswordResetInput,
	PasswordResetScaffold,
	PasswordResetTextButton,
} from "@/components/PasswordResetScaffold";

export default function ForgotPasswordRoute() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const normalizedEmail = email.trim();
	const canSubmit = normalizedEmail.length > 3 && normalizedEmail.includes("@");

	return (
		<PasswordResetScaffold
			icon="mail-outline"
			onBack={() => router.replace("/auth")}
			onPrimaryPress={() =>
				router.push({
					pathname: "/verify-reset-code",
					params: { email: normalizedEmail },
				})
			}
			primaryDisabled={!canSubmit}
			primaryLabel="Reset Password"
			stepLabel="Step 1 of 3"
			subtitle="Enter the email linked to your Ta-Daa account."
			title="Reset Password"
			footer={
				<PasswordResetTextButton
					label="Back to Sign In"
					onPress={() => router.replace("/auth")}
				/>
			}
		>
			<PasswordResetInput
				autoCapitalize="none"
				autoComplete="email"
				autoFocus
				keyboardType="email-address"
				onChangeText={setEmail}
				placeholder="Email Address"
				returnKeyType="done"
				textContentType="emailAddress"
				value={email}
			/>
		</PasswordResetScaffold>
	);
}
