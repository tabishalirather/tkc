'use client'

import Button from '@/components/ui/Button'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="hero-bg min-h-screen flex items-center justify-center text-white relative overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-forest-800/80 to-saffron-600/80"></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-saffron-400/20 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-cream/20 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-walnut-400/20 rounded-full animate-bounce" style={{ animationDelay: '4s' }}></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 animate-slide-up">
            Authentic
            <span className="block text-saffron-300">Kashmir</span>
            <span className="block">Products</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-cream-100 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            From the pristine valleys of Kashmir to your doorstep. Discover premium saffron, pure shilajit, and nature's finest treasures.
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-saffron-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>100% Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-saffron-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <span>Free Shipping ₹1000+</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-saffron-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Secure Payment</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Link href="/shop">
              <Button size="lg" className="px-8 py-4 text-lg font-semibold bg-saffron-500 hover:bg-saffron-600">
                Shop Now
              </Button>
            </Link>
            <Link href="/about">
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-semibold border-2 border-cream text-cream hover:bg-cream hover:text-forest-800"
              >
                Our Story
              </Button>
            </Link>
          </div>

          {/* Featured product preview */}
          <div className="mt-16 animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <p className="text-saffron-200 mb-4">Featured Product</p>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
              <div className="flex items-center gap-4">
                <img
                  src="https://placehold.co/80x80/E8A838/ffffff?text=Saffron"
                  alt="Premium Saffron"
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-lg">Premium Kashmiri Saffron</h3>
                  <p className="text-cream-200 text-sm">Starting from ₹2,699</p>
                  <div className="flex items-center mt-1">
                    <div className="flex text-saffron-300">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-cream-200 ml-2">(150+ reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}