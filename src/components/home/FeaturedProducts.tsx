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
      <section className="bg-[#efefed] py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured products...</p>
          </div>
        </div>
      </section>
    )
  }

  const showcaseProducts = products.slice(0, 4)

  return (
    <section className="bg-[#efefed] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-walnut-500">Best sellers</p>
            <h2 className="text-3xl font-serif font-semibold text-walnut-900 md:text-4xl">
              You will love these
            </h2>
            <p className="mt-3 text-walnut-700">
              A focused edit of customer favorites with premium sourcing and consistent repeat orders.
            </p>
          </div>

          <Link href="/shop" className="inline-flex items-center text-sm font-medium text-walnut-900 hover:text-saffron-700">
            View all products
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-walnut-600">No featured products available at the moment.</p>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {showcaseProducts.map((product) => (
                <article key={product.id} className="group overflow-hidden border border-black/10 bg-white transition hover:border-black/25">
                  <Link href={`/product/${product.slug}`}>
                    <div className="relative aspect-[5/4] bg-[#e7e7e4]">
                      <Image
                        src={product.images[0] || 'https://images.unsplash.com/photo-1615485737651-8f1f653bb9f6?auto=format&fit=crop&w=1000&q=80'}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />

                      {product.badges.length > 0 && (
                        <span className="absolute left-3 top-3 bg-white px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-walnut-700">
                          {product.badges[0]}
                        </span>
                      )}

                      {product.discountPrice && (
                        <div className="absolute right-3 top-3">
                          <span className="bg-walnut-900 px-2 py-1 text-[11px] font-semibold text-white">
                            {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="space-y-2 p-4">
                    <Link href={`/product/${product.slug}`}>
                      <h3 className="line-clamp-2 font-medium text-walnut-900 group-hover:text-saffron-700">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-semibold text-walnut-900">
                          ₹{product.discountPrice || product.price}
                        </span>
                        {product.discountPrice && (
                          <span className="text-xs text-walnut-500 line-through">
                            ₹{product.price}
                          </span>
                        )}
                      </div>

                      {product.averageRating && (
                        <div className="flex items-center">
                          <svg className="mr-1 h-4 w-4 text-saffron-500" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-walnut-600">
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
                      {product.stock === 0 ? 'Out of stock' : 'Add to cart'}
                    </Button>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Link href="/shop">
                <Button variant="outline" size="lg" className="border-walnut-400 text-walnut-900 hover:bg-white">
                  View full catalog
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
