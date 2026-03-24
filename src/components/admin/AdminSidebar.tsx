'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: '📊' },
  { name: 'Products', href: '/admin/products', icon: '📦' },
  { name: 'Orders', href: '/admin/orders', icon: '🛍️' },
  { name: 'Customers', href: '/admin/customers', icon: '👥' },
  { name: 'Coupons', href: '/admin/coupons', icon: '🎫' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col w-64">
      <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-gray-900">TKC Admin</h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    isActive
                      ? 'bg-orange-100 border-orange-500 text-orange-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center pl-3 pr-2 py-2 border-l-4 text-sm font-medium'
                  )}
                >
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}