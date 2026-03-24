'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Order } from '@/types'
import Button from '@/components/ui/Button'

export default function OrderFailedPage() {
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

  const handleRetryPayment = async () => {
    if (!order) return

    try {
      // Redirect back to checkout with pre-filled data
      // You could also implement a retry payment flow here
      window.location.href = '/checkout'
    } catch (error) {
      console.error('Error retrying payment:', error)
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
          {/* Failed Message */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">
              Payment Failed
            </h1>
            
            <p className="text-gray-600 mb-6">
              We're sorry, but your payment could not be processed. Your order has not been confirmed.
            </p>

            {order && (
              <div className="bg-red-50 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-red-800 mb-2">Order Details</h2>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Order ID:</span> {order.id}</p>
                  <p><span className="font-medium">Amount:</span> ₹{order.total}</p>
                  <p><span className="font-medium">Status:</span> {order.status}</p>
                  <p><span className="font-medium">Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            )}
          </div>

          {/* Common Reasons */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Common Reasons for Payment Failure</h3>
            
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <span className="text-red-500">•</span>
                <span>Insufficient funds in your account</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">•</span>
                <span>Incorrect card details or expired card</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">•</span>
                <span>Bank restrictions on online transactions</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">•</span>
                <span>Network connectivity issues</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-red-500">•</span>
                <span>Transaction timeout</span>
              </div>
            </div>
          </div>

          {/* What to Do */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">What You Can Do</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-saffron-600 font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Check your payment details</h4>
                  <p className="text-gray-600 text-sm">Verify your card number, expiry date, CVV, and billing address</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-saffron-600 font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Contact your bank</h4>
                  <p className="text-gray-600 text-sm">Some banks block online transactions by default</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-saffron-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-saffron-600 font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Try a different payment method</h4>
                  <p className="text-gray-600 text-sm">Use a different card, UPI, or net banking</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {order && (
                <Button 
                  onClick={handleRetryPayment}
                  className="w-full"
                >
                  Retry Payment
                </Button>
              )}
              
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Still having issues?</p>
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