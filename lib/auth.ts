import { auth, currentUser } from "@clerk/nextjs/server"
import prisma from "./prisma"

/**
 * Get current logged in user from database
 */
export async function getCurrentUser() {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return null
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id },
    })

    return user
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

/**
 * Require user to be authenticated (logged in)
 * Throws error if not authenticated
 */
export async function requireAuth() {
  const user = await getCurrentUser()
  
  if (!user) {
    throw new Error("Unauthorized - Please login")
  }

  return user
}

/**
 * Check if user is active
 */
export async function isUserActive() {
  const user = await getCurrentUser()
  
  if (!user) {
    return false
  }

  return user.isActive
}

/**
 * Get user ID from Clerk
 */
export async function getUserId() {
  const { userId } = await auth()
  return userId
}