'use client'

import { useState, useEffect } from 'react'
import { Product } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import { useCartStore } from '@/store/cartStore'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=8')
      if (response.ok) {
        const result = await response.json()
        setProducts(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching featured products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured products...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of authentic Kashmiri products, 
            sourced directly from the valleys of Kashmir.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No featured products available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                  <Link href={`/product/${product.slug}`}>
                    <div className="aspect-square relative bg-gray-100">
                      <Image
                        src={product.images[0] || `https://placehold.co/300x300?text=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      {product.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                          {product.badges.slice(0, 2).map((badge) => (
                            <span
                              key={badge}
                              className="bg-saffron-500 text-white px-2 py-1 text-xs font-semibold rounded"
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                      {product.discountPrice && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  
                  <div className="p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-saffron-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {product.shortDescription && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.shortDescription}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-gray-900">
                          ₹{product.discountPrice || product.price}
                        </span>
                        {product.discountPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        )}
                      </div>
                      
                      {product.averageRating && (
                        <div className="flex items-center">
                          <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm text-gray-600">
                            {product.averageRating}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full"
                      size="sm"
                      disabled={product.stock === 0}
                    >
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/shop">
                <Button variant="outline" size="lg">
                  View All Products
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}