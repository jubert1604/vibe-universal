import React from "react"
import { View, Text, type ViewProps } from "react-native"
import { cn } from "./utils"

export interface CardProps extends ViewProps {
  className?: string
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <View
      className={cn("bg-card rounded-lg border border-border p-4 shadow-sm", className)}
      {...props}
    >
      {children}
    </View>
  )
}

export interface CardHeaderProps extends ViewProps {
  className?: string
}

export function CardHeader({ className, children, ...props }: CardHeaderProps) {
  return (
    <View className={cn("pb-4", className)} {...props}>
      {children}
    </View>
  )
}

export interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

export function CardTitle({ children, className }: CardTitleProps) {
  return <Text className={cn("text-lg font-semibold text-foreground", className)}>{children}</Text>
}

export interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export function CardDescription({ children, className }: CardDescriptionProps) {
  return <Text className={cn("text-sm text-muted-foreground", className)}>{children}</Text>
}

export interface CardContentProps extends ViewProps {
  className?: string
}

export function CardContent({ className, children, ...props }: CardContentProps) {
  return (
    <View className={cn("", className)} {...props}>
      {children}
    </View>
  )
}

export interface CardFooterProps extends ViewProps {
  className?: string
}

export function CardFooter({ className, children, ...props }: CardFooterProps) {
  return (
    <View className={cn("pt-4 flex-row items-center", className)} {...props}>
      {children}
    </View>
  )
}
