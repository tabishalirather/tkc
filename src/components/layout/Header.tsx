'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/store/cartStore'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showPromo, setShowPromo] = useState(true)
  const { data: session } = useSession()
  const { getItemCount, openCart } = useCartStore()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = window.localStorage.getItem('tkc_promo_dismissed')
      if (dismissed === '1') {
        setShowPromo(false)
      }
    }
  }, [])

  const dismissPromo = () => {
    setShowPromo(false)
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('tkc_promo_dismissed', '1')
    }
  }

  const navigation = [
    { name: 'Featured', href: '/' },
    { name: 'Saffron', href: '/category/saffron' },
    { name: 'Shilajit', href: '/category/shilajit' },
    { name: 'Nuts', href: '/category/walnuts' },
    { name: 'Honey', href: '/category/honey' },
    { name: 'Gift Sets', href: '/shop' },
    { name: 'About Us', href: '/about' },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-[#f8f7f2]/95 backdrop-blur">
      {showPromo && (
        <div className="relative bg-saffron-700 px-10 py-2 text-center text-xs font-medium tracking-wide text-white md:text-sm">
          Free shipping on premium Kashmiri orders over Rs 1000
          <button
            onClick={dismissPromo}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-white"
            aria-label="Dismiss promotion"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between lg:h-[74px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-walnut-300 text-xs font-semibold uppercase tracking-wide text-walnut-800">
              TKC
            </div>
            <div>
              <p className="font-serif text-xl font-semibold leading-none text-walnut-900">The Kashmir Co.</p>
              <p className="hidden text-[10px] uppercase tracking-[0.18em] text-walnut-500 sm:block">Premium Kashmiri goods</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-walnut-700 transition-colors hover:text-saffron-700"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-1 sm:gap-3">
            <Link href="/contact" className="hidden text-sm text-walnut-600 hover:text-saffron-700 md:inline">
              Need help?
            </Link>

            {/* Search */}
            <button className="rounded-full p-2 text-walnut-600 hover:bg-white hover:text-saffron-700" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* User menu */}
            <Link href={session ? '/account' : '/auth/login'} className="rounded-full p-2 text-walnut-600 hover:bg-white hover:text-saffron-700" aria-label="Account">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>

            {/* Wishlist */}
            <Link href="/account/wishlist" className="hidden rounded-full p-2 text-walnut-600 hover:bg-white hover:text-saffron-700 md:block" aria-label="Wishlist">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative rounded-full p-2 text-walnut-600 hover:bg-white hover:text-saffron-700"
              aria-label="Cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              {getItemCount() > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-saffron-700 text-xs text-white">
                  {getItemCount()}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              className="rounded-full p-2 text-walnut-700 hover:bg-white lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-black/10 py-4 lg:hidden">
            <nav className="grid gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="rounded-md px-2 py-2 text-sm font-medium text-walnut-700 hover:bg-white hover:text-saffron-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link href="/contact" className="rounded-md px-2 py-2 text-sm font-medium text-walnut-700 hover:bg-white hover:text-saffron-700" onClick={() => setIsMenuOpen(false)}>
                Need help?
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}