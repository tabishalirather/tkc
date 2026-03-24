import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getUserStats(userId: string) {
  const [recentOrders, orderCount, wishlistCount] = await Promise.all([
    prisma.order.findMany({
      where: { userId },
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                images: true
              }
            }
          }
        }
      }
    }),
    prisma.order.count({ where: { userId } }),
    prisma.wishlist.count({ where: { userId } })
  ])

  return {
    recentOrders,
    orderCount,
    wishlistCount
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'CONFIRMED':
      return 'bg-blue-100 text-blue-800'
    case 'PROCESSING':
      return 'bg-purple-100 text-purple-800'
    case 'SHIPPED':
      return 'bg-indigo-100 text-indigo-800'
    case 'DELIVERED':
      return 'bg-green-100 text-green-800'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800'
    case 'REFUNDED':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default async function AccountDashboard() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.id) {
    return null
  }

  const stats = await getUserStats(session.user.id)

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user.name}!
        </h1>
        <p className="mt-1 text-sm text-gray-600">
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/account/orders" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-orange-500 rounded-md p-3">
                <span className="text-white text-2xl">📦</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.orderCount}</p>
            </div>
          </div>
        </Link>

        <Link href="/account/wishlist" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-red-500 rounded-md p-3">
                <span className="text-white text-2xl">❤️</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Wishlist Items</p>
              <p className="text-2xl font-bold text-gray-900">{stats.wishlistCount}</p>
            </div>
          </div>
        </Link>

        <Link href="/account/profile" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="bg-green-500 rounded-md p-3">
                <span className="text-white text-2xl">👤</span>
              </div>
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500">Profile</p>
              <p className="text-lg font-medium text-gray-900">Complete</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
          <Link href="/account/orders" className="text-orange-600 hover:text-orange-500 text-sm font-medium">
            View all
          </Link>
        </div>
        <div className="p-6">
          {stats.recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-6xl">📦</span>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start shopping to see your orders here.</p>
              <div className="mt-6">
                <Link href="/shop">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                    Start Shopping
                  </button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Order #{order.id.slice(-8)}
                      </p>
                      <p className="text-sm text-gray-500">
                        {order.orderItems.length} items • ₹{order.total.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadgeColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  {order.orderItems.length > 0 && (
                    <div className="mt-3 flex space-x-2">
                      {order.orderItems.slice(0, 3).map((item) => (
                        <div key={item.id} className="flex-shrink-0">
                          {item.product.images.length > 0 && (
                            <img
                              className="h-12 w-12 rounded-lg object-cover"
                              src={item.product.images[0]}
                              alt={item.product.name}
                            />
                          )}
                        </div>
                      ))}
                      {order.orderItems.length > 3 && (
                        <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-500">
                            +{order.orderItems.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}