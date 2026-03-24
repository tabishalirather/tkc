import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

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

    const stats = {
      totalRevenue: ordersRevenue._sum.total || 0,
      totalOrders,
      totalProducts,
      totalCustomers,
      recentOrders
    }

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}