import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import AdminStatsCard from '@/components/admin/AdminStatsCard'
import RecentOrders from '@/components/admin/RecentOrders'

async function getAdminStats() {
  // Get total revenue
  const ordersRevenue = await prisma.order.aggregate({
    _sum: {
      total: true,
    },
    where: {
      status: {
        in: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED']
      }
    }
  })

  // Get total orders count
  const totalOrders = await prisma.order.count()

  // Get total products count
  const totalProducts = await prisma.product.count()

  // Get total customers count
  const totalCustomers = await prisma.user.count({
    where: {
      role: 'CUSTOMER'
    }
  })

  // Get recent orders
  const recentOrders = await prisma.order.findMany({
    take: 10,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true
        }
      },
      shippingAddress: true
    }
  })

  return {
    totalRevenue: ordersRevenue._sum.total || 0,
    totalOrders,
    totalProducts,
    totalCustomers,
    recentOrders
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  const stats = await getAdminStats()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, {session?.user?.name}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AdminStatsCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon="💰"
          bgColor="bg-green-500"
        />
        <AdminStatsCard
          title="Total Orders"
          value={stats.totalOrders.toString()}
          icon="📦"
          bgColor="bg-blue-500"
        />
        <AdminStatsCard
          title="Total Products"
          value={stats.totalProducts.toString()}
          icon="🛍️"
          bgColor="bg-purple-500"
        />
        <AdminStatsCard
          title="Total Customers"
          value={stats.totalCustomers.toString()}
          icon="👥"
          bgColor="bg-orange-500"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
        </div>
        <RecentOrders orders={stats.recentOrders} />
      </div>
    </div>
  )
}