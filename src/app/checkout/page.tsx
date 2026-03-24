'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { Address, ApiResponse } from '@/types'
import Button from '@/components/ui/Button'
import Image from 'next/image'

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function CheckoutPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { items, getTotal, clearCart } = useCartStore()

  const [addresses, setAddresses] = useState<Address[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [couponId, setCouponId] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [couponLoading, setCouponLoading] = useState(false)

  const subtotal = getTotal()
  const shipping = subtotal > 1000 ? 0 : 50
  const tax = 0
  const total = subtotal + shipping + tax - couponDiscount

  useEffect(() => {
    if (status === 'loading') return

    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=/checkout')
      return
    }

    if (items.length === 0) {
      router.push('/')
      return
    }

    fetchAddresses()
  }, [status, items.length, router])

  useEffect(() => {
    // Load Razorpay script
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      document.body.appendChild(script)
    }
  }, [])

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/addresses')
      if (response.ok) {
        const result: ApiResponse<Address[]> = await response.json()
        if (result.success && result.data) {
          setAddresses(result.data)
          // Select default address if available
          const defaultAddress = result.data.find(addr => addr.isDefault)
          if (defaultAddress) {
            setSelectedAddressId(defaultAddress.id)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error)
    }
  }

  const validateCoupon = async () => {
    if (!couponCode.trim()) return

    setCouponLoading(true)
    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: couponCode,
          subtotal
        })
      })

      const result = await response.json()

      if (result.success) {
        setCouponDiscount(result.data.discount)
        setCouponId(result.data.couponId)
        alert('Coupon applied successfully!')
      } else {
        alert(result.error || 'Invalid coupon code')
        setCouponDiscount(0)
        setCouponId('')
      }
    } catch (error) {
      console.error('Error validating coupon:', error)
      alert('Error validating coupon')
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    setCouponCode('')
    setCouponDiscount(0)
    setCouponId('')
  }

  const handlePayment = async () => {
    if (!selectedAddressId) {
      alert('Please select a shipping address')
      return
    }

    setLoading(true)
    try {
      // Create order
      const orderResponse = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          shippingAddressId: selectedAddressId,
          couponId: couponId || undefined,
          subtotal,
          shipping,
          tax,
          discount: couponDiscount,
          total
        })
      })

      const orderResult = await orderResponse.json()

      if (!orderResult.success) {
        throw new Error(orderResult.error || 'Failed to create order')
      }

      // Initialize Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResult.data.amount,
        currency: orderResult.data.currency,
        name: 'The Kashmir Co.',
        description: 'Authentic Kashmiri Products',
        order_id: orderResult.data.razorpayOrderId,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderId: orderResult.data.orderId
              })
            })

            const verifyResult = await verifyResponse.json()

            if (verifyResult.success) {
              clearCart()
              router.push(`/order/success?orderId=${orderResult.data.orderId}`)
            } else {
              throw new Error(verifyResult.error || 'Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            router.push(`/order/failed?orderId=${orderResult.data.orderId}`)
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          }
        },
        prefill: {
          name: session?.user?.name,
          email: session?.user?.email,
        },
        theme: {
          color: '#E8A838'
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Address</h2>

                {addresses.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">No addresses found</p>
                    <Button onClick={() => router.push('/account/addresses')}>
                      Add Address
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {addresses.map((address) => (
                      <label
                        key={address.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === address.id
                            ? 'border-saffron-500 bg-saffron-50'
                            : 'border-gray-300 hover:border-saffron-300'
                          }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddressId === address.id}
                          onChange={(e) => setSelectedAddressId(e.target.value)}
                          className="sr-only"
                        />
                        <div>
                          <div className="font-semibold text-gray-900">
                            {address.name}
                            {address.isDefault && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-gray-600 text-sm mt-1">
                            {address.line1}
                            {address.line2 && `, ${address.line2}`}
                            <br />
                            {address.city}, {address.state} {address.pincode}
                            <br />
                            Phone: {address.phone}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Coupon Code */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Coupon Code</h2>

                {couponDiscount > 0 ? (
                  <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div>
                      <span className="text-green-800 font-semibold">
                        Coupon "{couponCode}" applied
                      </span>
                      <p className="text-green-600 text-sm">
                        You saved ₹{couponDiscount}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500"
                    />
                    <Button
                      onClick={validateCoupon}
                      disabled={!couponCode.trim() || couponLoading}
                      variant="outline"
                    >
                      {couponLoading ? 'Validating...' : 'Apply'}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.images[0] || 'https://images.unsplash.com/photo-1615485737651-8f1f653bb9f6?auto=format&fit=crop&w=200&q=80'}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                      {item.variant && (
                        <p className="text-sm text-gray-600">{item.variant.name}</p>
                      )}
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{(item.variant?.discountPrice || item.variant?.price || item.product.discountPrice || item.product.price) * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{couponDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

              {/* Payment Button */}
              <Button
                onClick={handlePayment}
                disabled={!selectedAddressId || loading || items.length === 0}
                className="w-full mt-6"
                size="lg"
              >
                {loading ? 'Processing...' : `Pay ₹${total}`}
              </Button>

              {/* Security Notice */}
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>🔒 Secure payment powered by Razorpay</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
