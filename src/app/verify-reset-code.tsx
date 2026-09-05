import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Fragment } from "react";

import {
	PasswordResetInlineMessage,
	PasswordResetInput,
	PasswordResetScaffold,
	PasswordResetTextButton,
} from "@/components/PasswordResetScaffold";

export default function VerifyResetCodeRoute() {
	const router = useRouter();
	const { email: emailParam } = useLocalSearchParams<{ email?: string }>();
	const [code, setCode] = useState("");
	const email = Array.isArray(emailParam) ? emailParam[0] : emailParam;
	const canSubmit = code.length === 6;

	const handleCodeChange = (value: string) => {
		setCode(value.replace(/\D/g, "").slice(0, 6));
	};

	return (
		<PasswordResetScaffold
			icon="shield-checkmark-outline"
			onBack={() => router.replace("/forgot-password")}
			onPrimaryPress={() =>
				router.push({
					pathname: "/new-password",
					params: email ? { email } : undefined,
				})
			}
			primaryDisabled={!canSubmit}
			primaryLabel="Verify Code"
			stepLabel="Step 2 of 3"
			subtitle={
				email
					? `Enter the code sent to ${email}.`
					: "Enter the code sent to your email."
			}
			title="Verify Email"
			footer={
				<Fragment>
					<PasswordResetTextButton label="Resend Code" onPress={() => setCode("")} />
					<PasswordResetTextButton
						label="Use a Different Email"
						onPress={() => router.replace("/forgot-password")}
					/>
				</Fragment>
			}
		>
			<PasswordResetInput
				autoFocus
				keyboardType="number-pad"
				maxLength={6}
				onChangeText={handleCodeChange}
				placeholder="Verification Code"
				returnKeyType="done"
				textContentType="oneTimeCode"
				value={code}
			/>
			<PasswordResetInlineMessage>
				{code.length > 0 && code.length < 6 ? "Code must be 6 digits." : ""}
			</PasswordResetInlineMessage>
		</PasswordResetScaffold>
	);
}
