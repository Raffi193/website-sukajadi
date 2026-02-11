import { currentUser } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST() {
  try {
    const clerkUser = await currentUser()

    if (!clerkUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check apakah user sudah ada di database
    const existingUser = await prisma.user.findUnique({
      where: { clerkId: clerkUser.id }
    })

    if (existingUser) {
      return NextResponse.json({ 
        message: "User already exists", 
        user: existingUser 
      })
    }

    // Buat user baru di database
    const newUser = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || 'Admin',
        username: clerkUser.username || undefined,
        avatar: clerkUser.imageUrl,
      }
    })

    return NextResponse.json({ 
      message: "User synced successfully", 
      user: newUser 
    })
  } catch (error) {
    console.error("Sync user error:", error)
    return NextResponse.json({ error: "Failed to sync user" }, { status: 500 })
  }
}