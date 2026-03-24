import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-razorpay-signature')
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      )
    }

    // Verify webhook signature
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex')

    if (expectedSignature !== signature) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const event = JSON.parse(body)
    const { event: eventType, payload } = event

    switch (eventType) {
      case 'payment.captured': {
        const { payment } = payload
        
        // Find payment by razorpay order id
        const dbPayment = await prisma.payment.findFirst({
          where: {
            razorpayOrderId: payment.entity.order_id
          },
          include: {
            orders: {
              include: {
                orderItems: {
                  include: {
                    product: true,
                    variant: true
                  }
                }
              }
            }
          }
        })

        if (dbPayment) {
          // Update payment status
          await prisma.payment.update({
            where: { id: dbPayment.id },
            data: {
              razorpayPaymentId: payment.entity.id,
              status: 'SUCCESS',
              method: payment.entity.method
            }
          })

          // Update order status
          for (const order of dbPayment.orders) {
            await prisma.order.update({
              where: { id: order.id },
              data: { status: 'CONFIRMED' }
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
          }
        }
        break
      }

      case 'payment.failed': {
        const { payment } = payload
        
        const dbPayment = await prisma.payment.findFirst({
          where: {
            razorpayOrderId: payment.entity.order_id
          }
        })

        if (dbPayment) {
          await prisma.payment.update({
            where: { id: dbPayment.id },
            data: {
              razorpayPaymentId: payment.entity.id,
              status: 'FAILED'
            }
          })

          // Update order status
          await prisma.order.updateMany({
            where: { paymentId: dbPayment.id },
            data: { status: 'CANCELLED' }
          })
        }
        break
      }

      default:
        console.log(`Unhandled event type: ${eventType}`)
    }

    return NextResponse.json({ status: 'ok' })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}