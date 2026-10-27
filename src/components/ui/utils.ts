import { Alert, Dimensions, Platform } from "react-native";

export const IS_IOS = Platform.OS === "ios";
const { width, height } = Dimensions.get("screen");

export const WIDTH = width;
export const HEIGHT = height;

type ErrorWithResponse = {
	response?: {
		data?: unknown;
	};
};

function hasResponseData(error: unknown): error is ErrorWithResponse {
	return typeof error === "object" && error !== null && "response" in error;
}

export function showError(error: unknown) {
	const data = hasResponseData(error) ? error.response?.data : error;
	Alert.alert("Error", extractError(data).trimEnd());
}

export function showErrorMessage(message = "Something went wrong") {
	Alert.alert("Error", message);
}

export function extractError(data: unknown): string {
	if (typeof data === "string") {
		return data;
	}
	if (Array.isArray(data)) {
		const messages = data.map((item) => {
			return `  ${extractError(item)}`;
		});

		return `${messages.join("")}`;
	}

	if (typeof data === "object" && data !== null) {
		const messages = Object.entries(data).map((item) => {
			const [key, value] = item;
			const separator = Array.isArray(value) ? ":\n " : ": ";

			return `- ${key}${separator}${extractError(value)} \n `;
		});
		return `${messages.join("")} `;
	}
	return "Something went wrong ";
}
