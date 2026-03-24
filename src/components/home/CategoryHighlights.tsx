'use client'

import { useState, useEffect } from 'react'
import { CategoryWithCount } from '@/types'
import Link from 'next/link'
import Image from 'next/image'

export default function CategoryHighlights() {
  const [categories, setCategories] = useState<CategoryWithCount[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?limit=6')
      if (response.ok) {
        const result = await response.json()
        setCategories(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-cream-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-cream-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of authentic Kashmiri products, 
            each category offering unique treasures from the paradise of Kashmir.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                <div className="aspect-[4/3] relative bg-gradient-to-br from-saffron-100 to-amber-100">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-saffron-200 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-200"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-xl font-serif font-bold mb-1 group-hover:text-saffron-100 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-white text-sm opacity-90">
                      {category._count?.products || 0} products
                    </p>
                  </div>
                </div>
                
                {category.description && (
                  <div className="p-4">
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Categories */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Saffron Highlight */}
            <div className="bg-gradient-to-br from-saffron-500 to-amber-500 rounded-lg p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🌺</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Kashmir Saffron</h3>
              </div>
              <p className="text-saffron-100 mb-4">
                World's finest saffron with the highest crocin content, sourced from the fields of Pampore.
              </p>
              <Link 
                href="/category/saffron"
                className="inline-flex items-center text-white font-medium hover:text-saffron-100 transition-colors"
              >
                Shop Saffron
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Shilajit Highlight */}
            <div className="bg-gradient-to-br from-forest-600 to-forest-800 rounded-lg p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">⛰️</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Pure Shilajit</h3>
              </div>
              <p className="text-green-100 mb-4">
                Authentic Himalayan Shilajit, nature's most powerful adaptogen for vitality and wellness.
              </p>
              <Link 
                href="/category/shilajit"
                className="inline-flex items-center text-white font-medium hover:text-green-100 transition-colors"
              >
                Shop Shilajit
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Walnuts Highlight */}
            <div className="bg-gradient-to-br from-walnut-500 to-walnut-700 rounded-lg p-8 text-white">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🌰</span>
                </div>
                <h3 className="text-xl font-serif font-bold">Kashmiri Walnuts</h3>
              </div>
              <p className="text-amber-100 mb-4">
                Premium quality walnuts from Kashmir, known for their rich taste and nutritional value.
              </p>
              <Link 
                href="/category/walnuts"
                className="inline-flex items-center text-white font-medium hover:text-amber-100 transition-colors"
              >
                Shop Walnuts
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}