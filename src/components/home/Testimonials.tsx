'use client'

import { useState, useEffect } from 'react'
import { Testimonial } from '@/types'

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const result = await response.json()
        setTestimonials(result.data || [])
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="bg-cream-50/60 py-14 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-saffron-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="bg-cream-50/60 py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-walnut-500">Social proof</p>
          <h2 className="font-serif text-3xl font-semibold text-walnut-900 md:text-4xl">
            Loved by customers across India
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-walnut-700">
            Real feedback from customers who return for consistent quality and authentic sourcing.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {testimonials.slice(0, 3).map((testimonial) => (
            <article key={testimonial.id} className="rounded-2xl border border-walnut-100 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h3 className="font-medium text-walnut-900">{testimonial.name}</h3>
                  <p className="text-sm text-walnut-600">{testimonial.location}</p>
                </div>

                <p className="text-sm font-medium text-saffron-700">{testimonial.rating}/5</p>
              </div>

              <blockquote className="line-clamp-6 text-sm leading-relaxed text-walnut-700">
                "{testimonial.text}"
              </blockquote>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
