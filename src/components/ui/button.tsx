import * as React from "react";
import type { PressableProps } from "react-native";
import { ActivityIndicator, Pressable, Text } from "react-native";
import type { VariantProps } from "tailwind-variants";
import { tv } from "tailwind-variants";

const button = tv({
	slots: {
		container: "my-2 flex flex-row items-center justify-center rounded-md px-4",
		label: "font-inter text-base font-semibold",
		indicator: "h-6 text-white",
	},

	variants: {
		variant: {
			default: {
				container: "bg-accent200 dark:bg-accent200",
				label: "text-white dark:text-white/80",
				indicator: "text-white dark:text-white/80",
			},
			secondary: {
				container: "bg-muted",
				label: "text-black dark:text-neutral-100",
				indicator: "text-black dark:text-neutral-100",
			},
			outline: {
				container: "border border-neutral-400",
				label: "text-black dark:text-neutral-100",
				indicator: "text-black dark:text-neutral-100",
			},
			destructive: {
				container: "bg-danger-600",
				label: "text-white",
				indicator: "text-white",
			},
			ghost: {
				container: "bg-transparent",
				label: "text-black underline dark:text-white",
				indicator: "text-black dark:text-white",
			},
			link: {
				container: "bg-transparent",
				label: "text-black",
				indicator: "text-black",
			},
		},

		// size
		size: {
			default: {
				container: "h-10 px-4",
				label: "text-base",
			},
			lg: {
				container: "h-12 px-8",
				label: "text-xl",
			},
			sm: {
				container: "h-8 px-3",
				label: "text-sm",
				indicator: "h-2",
			},
			icon: { container: "size-9" },
		},

		disabled: {
			true: {
				container: "bg-accent200/70 dark:bg-accent100/70",
				label: "text-white/70 dark:text-white/70",
				indicator: "text-neutral-400 dark:text-neutral-400",
			},
		},
		fullWidth: {
			true: {
				container: "",
			},
			false: {
				container: "self-center",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		disabled: false,
		fullWidth: true,
		size: "default",
	},
});

type ButtonVariants = VariantProps<typeof button>;
type Props = {
	label?: string;
	loading?: boolean;
	className?: string;
	textClassName?: string;
} & ButtonVariants &
	Omit<PressableProps, "disabled">;

export function Button({
	ref,
	label: text,
	loading = false,
	variant = "default",
	disabled = false,
	size = "default",
	className = "",
	testID,
	textClassName = "",
	...props
}: Props & { ref?: React.Ref<React.ComponentRef<typeof Pressable>> }) {
	const styles = React.useMemo(
		() => button({ variant, disabled, size }),
		[variant, disabled, size],
	);

	return (
		<Pressable
			disabled={disabled || loading}
			className={styles.container({ className })}
			{...props}
			ref={ref}
			testID={testID}
		>
			{props.children ? (
				props.children
			) : (
				<>
					{loading ? (
						<ActivityIndicator
							size="small"
							className={styles.indicator()}
							testID={testID ? `${testID}-activity-indicator` : undefined}
						/>
					) : (
						<Text
							testID={testID ? `${testID}-label` : undefined}
							className={styles.label({ className: textClassName })}
						>
							{text}
						</Text>
					)}
				</>
			)}
		</Pressable>
	);
}
