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
      <section className="bg-[#efefed] py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredTiles = categories.slice(0, 4)

  return (
    <section className="bg-[#efefed] py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-walnut-500">Categories</p>
            <h2 className="text-3xl font-serif font-semibold text-walnut-900 md:text-4xl">
              Explore our range
            </h2>
            <p className="mt-3 text-walnut-700">
              An editorial collection of essentials from Kashmir, curated for daily use and long-term quality.
            </p>
          </div>

          <Link href="/shop" className="inline-flex items-center text-sm font-medium text-walnut-900 hover:text-saffron-700">
            View all products
            <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {featuredTiles.map((category, index) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group"
            >
              <article className={`relative overflow-hidden rounded-sm bg-white ${index === 0 ? 'md:col-span-2' : ''}`}>
                <div className={`relative ${index === 0 ? 'aspect-[21/9]' : 'aspect-[6/5]'} bg-gradient-to-br from-cream to-saffron-100`}>
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="rounded-sm bg-white/90 px-4 py-2 text-sm text-walnut-700">
                        {category.name}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/50" />

                  <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                    <p className="text-xs uppercase tracking-[0.14em] text-cream-100">{category._count?.products || 0} items</p>
                    <h3 className="mt-1 font-serif text-2xl font-semibold text-white md:text-3xl">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="mt-1 line-clamp-2 max-w-lg text-sm text-cream-100/90">
                        {category.description}
                      </p>
                    )}
                    <p className="mt-2 text-sm font-medium text-saffron-200 group-hover:text-saffron-100">
                      Shop collection &gt;
                    </p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
