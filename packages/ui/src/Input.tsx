import React from "react"
import { TextInput, type TextInputProps } from "react-native"
import { cn } from "./utils"

export interface InputProps extends TextInputProps {
  className?: string
  error?: boolean
}

export function Input({ className, error, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        "border rounded-lg px-4 py-3 text-foreground bg-card",
        error ? "border-destructive" : "border-border",
        "focus:border-primary focus:ring-1 focus:ring-primary",
        className
      )}
      placeholderTextColor="#8E8E93"
      {...props}
    />
  )
}
