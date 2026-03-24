'use client'

import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="relative min-h-[70vh] overflow-hidden lg:min-h-[78vh]">
        <img
          src="https://images.unsplash.com/photo-1564894809611-1742fc40ed80?auto=format&fit=crop&w=2200&q=80"
          alt="Authentic Kashmiri produce"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-black/45" />

        <div className="relative z-10 flex min-h-[70vh] items-center justify-center px-4 text-center lg:min-h-[78vh]">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-cream">
              The Kashmir Co.
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white md:text-6xl">
              Pure ingredients,
              <br />
              sourced from Kashmir.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-cream-100 md:text-lg">
              Premium saffron, shilajit, honey, walnuts, and almonds selected for authenticity and freshness.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/shop">
                <Button size="lg" className="w-full bg-saffron-500 px-8 hover:bg-saffron-600 sm:w-auto">
                  Shop now
                </Button>
              </Link>
              <Link href="/about">
                <Button variant="outline" size="lg" className="w-full border-white text-white hover:bg-white hover:text-walnut-900 sm:w-auto">
                  Our sourcing
                </Button>
              </Link>
            </div>

            <div className="mx-auto mt-7 grid max-w-2xl grid-cols-1 gap-2 text-sm text-cream-100 sm:grid-cols-3">
              <p>Verified origin</p>
              <p>Lab-tested batches</p>
              <p>Free shipping Rs 1000+</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
