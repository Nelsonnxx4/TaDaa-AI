/** @type {import('tailwindcss').Config} */
const designTokens = {
	colors: {
		// Primary
		accent200: "#006C49",
		accent100: "#10B981",
		primarySoft: "#DDF8EA",
		green: "#10B981",
		amber: "#F59E0B",
		amberSoft: "#FFF1D6",
		red: "#A43A3A",
		redSoft: "#FFE2DF",
		onboardingBg: "#FAF9F6",

		surface: {
			DEFAULT: "#FFFFFF",
			low: "#F4F3F1",
			muted: "#E9E8E5",
		},

		// Texts
		text: "#1A1C1A",
		textMuted: "#3C4A42",
		inverse: "#F8FAF7",

		outline: "#BBCABF",
		dark: "#18211C",
		overlay: {
			hero: "rgba(24, 33, 28, 0.44)",
			light: "rgba(255, 255, 255, 0.18)",
			muted: "rgba(255, 255, 255, 0.35)",
			soft: "rgba(255, 255, 255, 0.72)",
		},
	},
	spacing: {
		xs: "4px",
		sm: "8px",
		md: "16px",
		lg: "24px",
		xl: "32px",
		gutter: "20px",
	},
	borderRadius: {
		sm: "8px",
		md: "12px",
		lg: "16px",
		xl: "24px",
	},
	fontSize: {
		display: ["46px", { lineHeight: "52px", fontWeight: "900" }],
		headline: ["30px", { lineHeight: "36px", fontWeight: "800" }],
		title: ["22px", { lineHeight: "28px", fontWeight: "800" }],
		body: ["16px", { lineHeight: "24px", fontWeight: "400" }],
		"body-sm": ["13px", { lineHeight: "18px", fontWeight: "400" }],
		label: ["11px", { lineHeight: "14px", fontWeight: "700" }],
	},
};

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: designTokens,
	},
	plugins: [],
};
