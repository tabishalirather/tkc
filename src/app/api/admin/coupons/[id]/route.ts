import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { isActive } = body

    // Check if coupon exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: params.id }
    })

    if (!existingCoupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      )
    }

    const updatedCoupon = await prisma.coupon.update({
      where: { id: params.id },
      data: { isActive: Boolean(isActive) },
    })

    return NextResponse.json({
      success: true,
      data: updatedCoupon,
      message: 'Coupon updated successfully',
    })
  } catch (error) {
    console.error('Error updating coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Check if coupon exists
    const existingCoupon = await prisma.coupon.findUnique({
      where: { id: params.id }
    })

    if (!existingCoupon) {
      return NextResponse.json(
        { success: false, error: 'Coupon not found' },
        { status: 404 }
      )
    }

    // Delete the coupon
    await prisma.coupon.delete({
      where: { id: params.id }
    })

    return NextResponse.json({
      success: true,
      message: 'Coupon deleted successfully',
    })
  } catch (error) {
    console.error('Error deleting coupon:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}