'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Order, OrderItem, Product, Address } from '@/types'

interface OrderWithDetails extends Order {
  shippingAddress: Address
  orderItems: (OrderItem & { 
    product: Pick<Product, 'id' | 'name' | 'images' | 'slug'>
  })[]
}

export default function AccountOrdersPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/orders')
      const data = await response.json()

      if (data.success) {
        setOrders(data.data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  function getStatusBadgeColor(status: string) {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'CONFIRMED':
        return 'bg-blue-100 text-blue-800'
      case 'PROCESSING':
        return 'bg-purple-100 text-purple-800'
      case 'SHIPPED':
        return 'bg-indigo-100 text-indigo-800'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      case 'REFUNDED':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
        <p className="mt-1 text-sm text-gray-600">
          Track and manage your orders
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <span className="text-6xl">📦</span>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500">
            When you place orders, they will appear here.
          </p>
          <div className="mt-6">
            <Link href="/shop">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50"
                onClick={() => toggleOrderExpansion(order.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <p className="text-lg font-semibold text-gray-900">
                        Order #{order.id.slice(-8)}
                      </p>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{order.orderItems.length} items</span>
                      <span>•</span>
                      <span>₹{order.total.toLocaleString()}</span>
                      <span>•</span>
                      <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>

                    {order.orderItems.length > 0 && (
                      <div className="flex space-x-2 mt-3">
                        {order.orderItems.slice(0, 4).map((item) => (
                          <div key={item.id} className="flex-shrink-0">
                            {item.product.images.length > 0 && (
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={item.product.images[0]}
                                alt={item.product.name}
                              />
                            )}
                          </div>
                        ))}
                        {order.orderItems.length > 4 && (
                          <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-500">
                              +{order.orderItems.length - 4}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <button className="text-orange-600 hover:text-orange-700">
                      {expandedOrder === order.id ? '↑' : '↓'}
                    </button>
                  </div>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 px-6 py-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Order Items</h4>
                    <div className="space-y-3">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                          {item.product.images.length > 0 && (
                            <img
                              className="h-16 w-16 rounded-lg object-cover"
                              src={item.product.images[0]}
                              alt={item.product.name}
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="text-sm font-medium text-gray-900 hover:text-orange-600"
                            >
                              {item.product.name}
                            </Link>
                            <div className="text-sm text-gray-600 mt-1">
                              Quantity: {item.quantity} • ₹{item.price.toLocaleString()} each
                            </div>
                          </div>
                          <div className="text-sm font-medium text-gray-900">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mt-4">
                      <h5 className="font-medium text-gray-900 mb-2">Order Summary</h5>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>₹{order.subtotal.toLocaleString()}</span>
                        </div>
                        {order.discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount:</span>
                            <span>-₹{order.discount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>₹{order.shipping.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>₹{order.tax.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between font-medium text-gray-900 border-t border-gray-200 pt-1">
                          <span>Total:</span>
                          <span>₹{order.total.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h5 className="font-medium text-gray-900 mb-2">Shipping Address</h5>
                      <div className="text-sm text-gray-600">
                        <p>{order.shippingAddress.name}</p>
                        <p>{order.shippingAddress.line1}</p>
                        {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                        <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                        <p>{order.shippingAddress.pincode}</p>
                        <p>{order.shippingAddress.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}