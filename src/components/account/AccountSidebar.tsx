'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { signOut } from 'next-auth/react'

const navigation = [
  { name: 'Dashboard', href: '/account', icon: '🏠' },
  { name: 'Orders', href: '/account/orders', icon: '📦' },
  { name: 'Profile', href: '/account/profile', icon: '👤' },
  { name: 'Wishlist', href: '/account/wishlist', icon: '❤️' },
]

interface AccountSidebarProps {
  user: {
    id?: string
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export default function AccountSidebar({ user }: AccountSidebarProps) {
  const pathname = usePathname()

  return (
    <div className="space-y-5">
      {/* User Info */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            {user.image ? (
              <img className="h-12 w-12 rounded-full" src={user.image} alt={user.name || ''} />
            ) : (
              <div className="h-12 w-12 rounded-full bg-orange-500 flex items-center justify-center">
                <span className="text-white font-medium text-lg">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow">
        <nav className="space-y-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  isActive
                    ? 'bg-orange-100 border-r-4 border-orange-500 text-orange-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                  'group flex items-center px-3 py-2 text-sm font-medium rounded-md'
                )}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
            )
          })}
          
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            <span className="mr-3 text-lg">🚪</span>
            Sign Out
          </button>
        </nav>
      </div>
    </div>
  )
}