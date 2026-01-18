import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Clean Convex error messages by extracting the actual error from stack traces
 */
export function cleanConvexError(errorMessage: string): string {
  if (!errorMessage) return "An unexpected error occurred"

  const uncaughtIndex = errorMessage.indexOf("Uncaught Error: ")
  const handlerIndex = errorMessage.indexOf(" at handler")

  if (uncaughtIndex !== -1 && handlerIndex !== -1) {
    return errorMessage.substring(uncaughtIndex + "Uncaught Error: ".length, handlerIndex)
  }

  if (errorMessage.includes("Uncaught Error: ")) {
    return errorMessage.split("Uncaught Error: ")[1]?.split(" at ")[0] || errorMessage
  }

  return errorMessage
}
