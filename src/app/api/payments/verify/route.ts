import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { verifyRazorpaySignature } from '@/lib/razorpay'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { 
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId 
    } = await request.json()

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing payment details' },
        { status: 400 }
      )
    }

    // Verify payment signature
    const isValidSignature = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    )

    if (!isValidSignature) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment signature' },
        { status: 400 }
      )
    }

    // Find the order
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id
      },
      include: {
        payment: true,
        orderItems: {
          include: {
            product: true,
            variant: true
          }
        },
        coupon: true
      }
    })

    if (!order) {
      return NextResponse.json(
        { success: false, error: 'Order not found' },
        { status: 404 }
      )
    }

    // Update payment and order status
    await prisma.payment.update({
      where: { id: order.paymentId! },
      data: {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'SUCCESS'
      }
    })

    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'CONFIRMED'
      }
    })

    // Deduct stock
    for (const item of order.orderItems) {
      if (item.variantId) {
        await prisma.productVariant.update({
          where: { id: item.variantId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      } else {
        await prisma.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        })
      }
    }

    // Update coupon usage count
    if (order.couponId) {
      await prisma.coupon.update({
        where: { id: order.couponId },
        data: {
          usedCount: {
            increment: 1
          }
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        status: 'CONFIRMED'
      }
    })
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}