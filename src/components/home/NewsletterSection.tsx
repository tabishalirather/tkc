'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      setMessage('Please enter a valid email address')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email })
      })

      const result = await response.json()

      if (result.success) {
        setMessage('Thank you! You\'ve been subscribed to our newsletter.')
        setEmail('')
      } else {
        setMessage(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl rounded-sm border border-black/10 bg-[#f1efe9] px-6 py-10 text-center md:px-10 md:py-12">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-walnut-500">Newsletter</p>
          <h2 className="font-serif text-3xl font-medium text-walnut-900 md:text-4xl">
            Want early access to fresh harvest drops, gifts, and offers?
          </h2>

          <form onSubmit={handleSubmit} className="mx-auto mt-6 max-w-xl">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 rounded-sm border border-black/15 bg-white px-4 py-3 text-sm text-walnut-900 placeholder-walnut-400 focus:border-saffron-500 focus:outline-none focus:ring-1 focus:ring-saffron-500"
                required
              />
              <Button
                type="submit"
                disabled={loading}
                className="px-6 py-3 uppercase tracking-wide"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </div>
          </form>

          {message && (
            <p className={`mt-4 text-sm ${message.includes('Thank you') ? 'text-forest-700' : 'text-red-600'
              }`}>
              {message}
            </p>
          )}

          <p className="mt-4 text-xs text-walnut-500">
            By signing up, you agree to receive occasional product updates and offers.
          </p>
        </div>
      </div>
    </section>
  )
}
