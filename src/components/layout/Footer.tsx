'use client'

import Link from 'next/link'

export default function Footer() {
  const footerGroups = [
    {
      title: 'Help',
      links: [
        { label: 'Customer Care', href: '/contact' },
        { label: 'Shipping & Returns', href: '/faq' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms & Conditions', href: '#' },
      ],
    },
    {
      title: 'Shop',
      links: [
        { label: 'All Products', href: '/shop' },
        { label: 'Saffron', href: '/category/saffron' },
        { label: 'Shilajit', href: '/category/shilajit' },
        { label: 'Walnuts', href: '/category/walnuts' },
        { label: 'Honey', href: '/category/honey' },
        { label: 'Almonds', href: '/category/almonds' },
        { label: 'Gift Sets', href: '/shop' },
      ],
    },
    {
      title: 'Explore',
      links: [
        { label: 'Best Sellers', href: '/shop' },
        { label: 'New Arrivals', href: '/shop' },
        { label: 'Gift Guide', href: '/shop' },
        { label: 'Collections', href: '/shop' },
        { label: 'Journal', href: '/about' },
      ],
    },
    {
      title: 'About',
      links: [
        { label: 'Our Story', href: '/about' },
        { label: 'Sourcing', href: '/about' },
        { label: 'Purity & Testing', href: '/about' },
        { label: 'Sustainability', href: '/about' },
        { label: 'Wholesale', href: '/contact' },
        { label: 'Collaborations', href: '/contact' },
      ],
    },
  ]

  return (
    <footer className="bg-[#1f1f1d] text-[#d8d5cf]">
      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-[1.5fr_3fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-xs font-semibold uppercase tracking-wide text-white">
                TKC
              </div>
              <div className="font-serif text-2xl font-medium text-white">The Kashmir Co.</div>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#a6a39d]">
              Premium natural goods from Kashmir, thoughtfully sourced and shipped with care.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-[#8f8b84]">
              Follow us
            </p>
            <div className="mt-3 flex items-center gap-4 text-[#c9c5bd]">
              <a href="#" aria-label="Instagram" className="hover:text-saffron-300">IG</a>
              <a href="#" aria-label="Facebook" className="hover:text-saffron-300">FB</a>
              <a href="#" aria-label="YouTube" className="hover:text-saffron-300">YT</a>
              <a href="#" aria-label="LinkedIn" className="hover:text-saffron-300">IN</a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">{group.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm text-[#b9b5ae] transition-colors hover:text-saffron-300">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col items-start justify-between gap-4 text-sm text-[#9e9a92] md:flex-row md:items-center">
            <p>© 2026 The Kashmir Co. All rights reserved.</p>
            <p>Crafted with respect for origin, quality, and everyday ritual.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}