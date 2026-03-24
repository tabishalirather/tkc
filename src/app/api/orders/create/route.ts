import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { createRazorpayOrder } from '@/lib/razorpay'

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
      items, 
      shippingAddressId, 
      couponId,
      subtotal,
      shipping = 50,
      tax = 0,
      discount = 0,
      total 
    } = await request.json()

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Order items are required' },
        { status: 400 }
      )
    }

    if (!shippingAddressId) {
      return NextResponse.json(
        { success: false, error: 'Shipping address is required' },
        { status: 400 }
      )
    }

    // Verify shipping address belongs to user
    const address = await prisma.address.findFirst({
      where: {
        id: shippingAddressId,
        userId: session.user.id
      }
    })

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Invalid shipping address' },
        { status: 400 }
      )
    }

    // Verify stock availability for all items
    for (const item of items) {
      if (item.variantId) {
        const variant = await prisma.productVariant.findUnique({
          where: { id: item.variantId }
        })
        if (!variant || variant.stock < item.quantity) {
          return NextResponse.json(
            { success: false, error: `Insufficient stock for ${item.product.name}` },
            { status: 400 }
          )
        }
      } else {
        const product = await prisma.product.findUnique({
          where: { id: item.productId }
        })
        if (!product || product.stock < item.quantity) {
          return NextResponse.json(
            { success: false, error: `Insufficient stock for ${item.product.name}` },
            { status: 400 }
          )
        }
      }
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(total)

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        razorpayOrderId: razorpayOrder.id,
        amount: total,
        currency: 'INR',
        status: 'PENDING'
      }
    })

    // Create order record
    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        items: JSON.stringify(items),
        subtotal,
        shipping,
        tax,
        discount,
        total,
        status: 'PENDING',
        paymentId: payment.id,
        couponId,
        shippingAddressId
      },
      include: {
        shippingAddress: true,
        payment: true
      }
    })

    // Create order items
    await Promise.all(
      items.map((item: any) =>
        prisma.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            variantId: item.variantId,
            quantity: item.quantity,
            price: item.variant?.discountPrice || item.variant?.price || item.product.discountPrice || item.product.price
          }
        })
      )
    )

    return NextResponse.json({
      success: true,
      data: {
        orderId: order.id,
        razorpayOrderId: razorpayOrder.id,
        amount: total * 100, // Razorpay expects amount in paise
        currency: 'INR'
      }
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}