import { Platform } from "react-native";

export const palette = {
  background: "#FAF9F6",
  surface: "#FFFFFF",
  surfaceLow: "#F4F3F1",
  surfaceMuted: "#E9E8E5",
  primary: "#006C49",
  primaryBright: "#10B981",
  primarySoft: "#DDF8EA",
  amber: "#F59E0B",
  amberSoft: "#FFF1D6",
  red: "#A43A3A",
  redSoft: "#FFE2DF",
  text: "#1A1C1A",
  textMuted: "#3C4A42",
  outline: "#BBCABF",
  inverse: "#F8FAF7",
  dark: "#18211C",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 20,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

export const shadow = {
  card: Platform.select({
    ios: {
      shadowColor: "#005236",
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
    android: {
      elevation: 3,
    },
    default: {
      shadowColor: "#005236",
      shadowOpacity: 0.08,
      shadowRadius: 16,
      shadowOffset: { width: 0, height: 8 },
    },
  }),
  float: Platform.select({
    ios: {
      shadowColor: "#10B981",
      shadowOpacity: 0.26,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
    android: {
      elevation: 6,
    },
    default: {
      shadowColor: "#10B981",
      shadowOpacity: 0.26,
      shadowRadius: 18,
      shadowOffset: { width: 0, height: 10 },
    },
  }),
};

export const typography = {
  display: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "800" as const,
  },
  headline: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700" as const,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "700" as const,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700" as const,
  },
};
