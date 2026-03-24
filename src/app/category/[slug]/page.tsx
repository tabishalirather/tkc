'use client'

import { useState, useEffect } from 'react'
import { Product, Category, ProductFilters } from '@/types'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import Button from '@/components/ui/Button'

interface CategoryPageProps {
  params: { slug: string }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState<ProductFilters>({
    category: params.slug,
    sort: 'newest'
  })
  const { addItem } = useCartStore()

  useEffect(() => {
    fetchCategoryData()
  }, [params.slug, filters])

  const fetchCategoryData = async () => {
    try {
      setLoading(true)

      // Fetch category info
      const categoryResponse = await fetch(`/api/categories/${params.slug}`)
      if (categoryResponse.ok) {
        const categoryResult = await categoryResponse.json()
        setCategory(categoryResult.data)
      }

      // Fetch products
      const searchParams = new URLSearchParams()
      searchParams.set('category', params.slug)
      if (filters.sort) searchParams.set('sort', filters.sort)
      if (filters.minPrice) searchParams.set('minPrice', filters.minPrice.toString())
      if (filters.maxPrice) searchParams.set('maxPrice', filters.maxPrice.toString())

      const productsResponse = await fetch(`/api/products?${searchParams.toString()}`)
      if (productsResponse.ok) {
        const productsResult = await productsResponse.json()
        setProducts(productsResult.data || [])
      }
    } catch (error) {
      console.error('Error fetching category data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = (product: Product) => {
    addItem(product)
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'rating', label: 'Highest Rated' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-saffron-600">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-saffron-600">Shop</Link>
          <span>/</span>
          <span className="text-gray-900">{category?.name || 'Category'}</span>
        </nav>

        {/* Category Header */}
        {category && (
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="text-center max-w-2xl mx-auto">
              {category.image && (
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Filters and Sort */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">
                {products.length} Products
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Sort */}
              <div className="flex items-center space-x-2">
                <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={filters.sort || 'newest'}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value as any })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.minPrice || ''}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500"
                />
                <span className="text-gray-500">to</span>
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.maxPrice || ''}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24 focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="max-w-md mx-auto">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m8-8V9"></path>
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-200">
                <Link href={`/product/${product.slug}`}>
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={product.images[0] || 'https://images.unsplash.com/photo-1615485737651-8f1f653bb9f6?auto=format&fit=crop&w=900&q=80'}
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
        )}
      </div>
    </div>
  )
}
