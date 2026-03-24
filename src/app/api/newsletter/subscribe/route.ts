import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email address is required' },
        { status: 400 }
      )
    }

    // Check if email already exists
    const existingSubscription = await prisma.newsletter.findUnique({
      where: { email }
    })

    if (existingSubscription) {
      return NextResponse.json(
        { success: false, error: 'Email is already subscribed' },
        { status: 400 }
      )
    }

    // Create new subscription
    await prisma.newsletter.create({
      data: { email }
    })

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter'
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}