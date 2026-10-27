/** @type {import('tailwindcss').Config} */
const colors = require("./src/components/ui/colors");

const designTokens = {
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
		extend: {
			...designTokens,
			colors,
		},
	},
	plugins: [],
};
