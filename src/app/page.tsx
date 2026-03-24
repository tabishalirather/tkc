import HeroSection from '@/components/home/HeroSection'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeroSection />
      </Suspense>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our carefully curated selection of authentic Kashmiri products, 
              sourced directly from the valleys of Kashmir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: 'Saffron', slug: 'saffron', image: 'https://placehold.co/300x300/E8A838/ffffff?text=Saffron', color: 'bg-saffron-100' },
              { name: 'Shilajit', slug: 'shilajit', image: 'https://placehold.co/300x300/5C3A1E/ffffff?text=Shilajit', color: 'bg-walnut-100' },
              { name: 'Walnuts', slug: 'walnuts', image: 'https://placehold.co/300x300/C17B2A/ffffff?text=Walnuts', color: 'bg-amber-100' },
              { name: 'Honey', slug: 'honey', image: 'https://placehold.co/300x300/F4D673/ffffff?text=Honey', color: 'bg-yellow-100' },
              { name: 'Almonds', slug: 'almonds', image: 'https://placehold.co/300x300/9A6E1C/ffffff?text=Almonds', color: 'bg-orange-100' },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group block"
              >
                <div className={`${category.color} rounded-2xl p-6 text-center transition-transform hover:scale-105`}>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Handpicked premium products that showcase the best of Kashmir's natural bounty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample featured products */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={`https://placehold.co/400x400/E8A838/ffffff?text=Product+${i}`}
                    alt={`Featured Product ${i}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Featured Product {i}</h3>
                  <p className="text-gray-600 text-sm mb-4">Premium quality authentic Kashmiri product.</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-saffron-600">₹2,999</span>
                    <button className="bg-saffron-500 text-white px-4 py-2 rounded-lg hover:bg-saffron-600 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/shop"
              className="inline-block bg-saffron-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-saffron-600 transition-colors"
            >
              View All Products
            </a>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-forest-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100% Authentic</h3>
              <p className="text-gray-600">All products sourced directly from Kashmir farmers and artisans.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Shipping</h3>
              <p className="text-gray-600">Free shipping on orders above ₹1000 across India.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-saffron-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-saffron-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">Safe and secure payment processing with industry standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-saffron-500">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-saffron-100 mb-8">
              Subscribe to our newsletter and be the first to know about new products, exclusive offers, and Kashmir stories.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-cream"
                required
              />
              <button
                type="submit"
                className="bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-forest-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}