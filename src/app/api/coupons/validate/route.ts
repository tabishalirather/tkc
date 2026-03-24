import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json()

    if (!code || !subtotal) {
      return NextResponse.json(
        { success: false, error: 'Code and subtotal are required' },
        { status: 400 }
      )
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        code: code.toUpperCase(),
      }
    })

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: 'Invalid coupon code' },
        { status: 400 }
      )
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { success: false, error: 'Coupon is not active' },
        { status: 400 }
      )
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'Coupon has expired' },
        { status: 400 }
      )
    }

    if (subtotal < coupon.minOrder) {
      return NextResponse.json(
        { success: false, error: `Minimum order value is ₹${coupon.minOrder}` },
        { status: 400 }
      )
    }

    if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
      return NextResponse.json(
        { success: false, error: 'Coupon usage limit reached' },
        { status: 400 }
      )
    }

    // Calculate discount
    let discount = 0
    if (coupon.type === 'PERCENTAGE') {
      discount = (subtotal * coupon.value) / 100
    } else {
      discount = coupon.value
    }

    // Make sure discount doesn't exceed subtotal
    discount = Math.min(discount, subtotal)

    return NextResponse.json({
      success: true,
      data: {
        couponId: coupon.id,
        discount: Math.round(discount * 100) / 100,
        type: coupon.type,
        value: coupon.value
      }
    })
  } catch (error) {
    console.error('Error validating coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}