'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { useWishlistStore } from '@/store/wishlistStore'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'

export default function AccountWishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading since wishlist is from localStorage
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    // Optionally remove from wishlist after adding to cart
    // removeItem(product.id)
  }

  const handleRemoveFromWishlist = (productId: string) => {
    if (confirm('Remove this item from your wishlist?')) {
      removeItem(productId)
    }
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
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <p className="mt-1 text-sm text-gray-600">
          Items you've saved for later ({items.length} items)
        </p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <span className="text-6xl">❤️</span>
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="mt-1 text-sm text-gray-500">
            Save items you love to your wishlist and they'll appear here.
          </p>
          <div className="mt-6">
            <Link href="/shop">
              <Button>
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {items.map((item) => (
              <div key={item.id} className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 w-full bg-gray-200 group-hover:opacity-75 transition-opacity">
                  {item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-48 object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">
                    <Link href={`/product/${item.product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {item.product.name}
                    </Link>
                  </h3>
                  
                  {item.product.shortDescription && (
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {item.product.shortDescription}
                    </p>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {item.product.discountPrice ? (
                        <>
                          <span className="text-lg font-medium text-gray-900">
                            ₹{item.product.discountPrice.toLocaleString()}
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.product.price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-medium text-gray-900">
                          ₹{item.product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {item.product.badges && item.product.badges.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.product.badges.slice(0, 2).map((badge, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault()
                        handleAddToCart(item.product)
                      }}
                      className="flex-1"
                      disabled={item.product.stock === 0}
                    >
                      {item.product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                    
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleRemoveFromWishlist(item.productId)
                      }}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from wishlist"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="absolute top-2 right-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemoveFromWishlist(item.productId)
                    }}
                    className="p-1.5 rounded-full bg-white shadow-md text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}