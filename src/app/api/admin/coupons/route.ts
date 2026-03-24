import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const coupons = await prisma.coupon.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      success: true,
      data: coupons,
    })
  } catch (error) {
    console.error('Error fetching coupons:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      code,
      type,
      value,
      minOrder,
      maxUses,
      expiresAt,
      isActive,
    } = body

    // Check if coupon code already exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    })

    if (existingCoupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon with this code already exists' },
        { status: 400 }
      )
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        type,
        value: parseFloat(value),
        minOrder: minOrder ? parseFloat(minOrder) : 0,
        maxUses: maxUses ? parseInt(maxUses) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isActive: Boolean(isActive),
      },
    })

    return NextResponse.json({
      success: true,
      data: coupon,
      message: 'Coupon created successfully',
    })
  } catch (error) {
    console.error('Error creating coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}