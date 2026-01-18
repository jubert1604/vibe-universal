import React from "react"
import { Pressable, Text, ActivityIndicator, type PressableProps } from "react-native"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const buttonVariants = cva(
  "flex-row items-center justify-center rounded-lg transition-colors active:opacity-80",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        secondary: "bg-secondary",
        outline: "border border-border bg-transparent",
        ghost: "bg-transparent",
        destructive: "bg-destructive",
      },
      size: {
        sm: "px-3 py-2",
        md: "px-4 py-3",
        lg: "px-6 py-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

const textVariants = cva("font-medium text-center", {
  variants: {
    variant: {
      primary: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      outline: "text-foreground",
      ghost: "text-foreground",
      destructive: "text-destructive-foreground",
    },
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
})

export interface ButtonProps extends PressableProps, VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  loading?: boolean
  className?: string
  textClassName?: string
}

export function Button({
  children,
  variant,
  size,
  loading = false,
  disabled,
  className,
  textClassName,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <Pressable
      className={cn(buttonVariants({ variant, size }), isDisabled && "opacity-50", className)}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" || variant === "ghost" ? "#000" : "#fff"}
          size="small"
        />
      ) : typeof children === "string" ? (
        <Text className={cn(textVariants({ variant, size }), textClassName)}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  )
}
