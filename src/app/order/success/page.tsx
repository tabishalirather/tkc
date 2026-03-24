'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Order } from '@/types'
import Button from '@/components/ui/Button'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setOrder(result.data)
        }
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed and we'll start processing it right away.
            </p>

            {order && (
              <div className="bg-saffron-50 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-saffron-800 mb-2">Order Details</h2>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Order ID:</span> {order.id}</p>
                  <p><span className="font-medium">Total:</span> ₹{order.total}</p>
                  <p><span className="font-medium">Status:</span> {order.status}</p>
                  <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                📧 Order confirmation has been sent to your email
              </p>
              <p className="text-sm text-gray-600">
                📦 We'll notify you when your order is shipped
              </p>
            </div>
          </div>

          {/* Order Items */}
          {order?.items && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-4">
                {(JSON.parse(order.items as any) as any[]).map((item: any, index: number) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0">
                    <div>
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
              
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{order.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{order.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{order.total}</span>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What's Next?</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/account/orders">
                <Button variant="outline" className="w-full">
                  Track Your Orders
                </Button>
              </Link>
              
              <Link href="/">
                <Button className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">Need help?</p>
              <Link href="/contact" className="text-saffron-600 hover:text-saffron-700 text-sm font-medium">
                Contact our support team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}