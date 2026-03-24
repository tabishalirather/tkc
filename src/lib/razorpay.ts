import Razorpay from 'razorpay'
import crypto from 'crypto'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt: `order_${Date.now()}`,
    })
    return order
  } catch (error) {
    console.error('Razorpay order creation failed:', error)
    throw error
  }
}

export const verifyRazorpaySignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
) => {
  const secret = process.env.RAZORPAY_KEY_SECRET!
  
  const body = razorpayOrderId + '|' + razorpayPaymentId
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body.toString())
    .digest('hex')

  return expectedSignature === razorpaySignature
}