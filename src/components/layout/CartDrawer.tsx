'use client'

import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCartStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeCart} />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b p-4">
            <h2 className="text-lg font-semibold">Shopping Cart ({items.length})</h2>
            <button
              onClick={closeCart}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                </svg>
                <p className="text-gray-500">Your cart is empty</p>
                <Button className="mt-4" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => {
                  const price = item.variant?.discountPrice || item.variant?.price || item.product.discountPrice || item.product.price
                  
                  return (
                    <div key={`${item.productId}-${item.variantId || 'default'}`} className="flex items-center space-x-3 border-b pb-4">
                      <img
                        src={item.product.images[0] || 'https://placehold.co/80x80'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-gray-500">{item.variant.name}</p>
                        )}
                        <p className="text-saffron-600 font-semibold">₹{price.toFixed(2)}</p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)}
                            className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)}
                            className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.productId, item.variantId)}
                            className="text-red-500 hover:text-red-700 ml-4"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-bold text-lg text-saffron-600">₹{getTotal().toFixed(2)}</span>
              </div>
              <div className="space-y-2">
                <Link href="/cart" onClick={closeCart}>
                  <Button variant="outline" className="w-full">View Cart</Button>
                </Link>
                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full">Checkout</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}