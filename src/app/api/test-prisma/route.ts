import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Test query
    const userCount = await prisma.user.count()

    return NextResponse.json({
      success: true,
      message: 'Prisma connected successfully!',
      data: {
        users: userCount
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 })
  }
}