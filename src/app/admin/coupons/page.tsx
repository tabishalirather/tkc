'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { Coupon } from '@/types'

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    code: '',
    type: 'PERCENTAGE',
    value: '',
    minOrder: '',
    maxUses: '',
    expiresAt: '',
    isActive: true,
  })

  const fetchCoupons = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/coupons')
      const data = await response.json()

      if (data.success) {
        setCoupons(data.data)
      }
    } catch (error) {
      console.error('Error fetching coupons:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.success) {
        setShowForm(false)
        setFormData({
          code: '',
          type: 'PERCENTAGE',
          value: '',
          minOrder: '',
          maxUses: '',
          expiresAt: '',
          isActive: true,
        })
        fetchCoupons()
      } else {
        alert(data.error || 'Error creating coupon')
      }
    } catch (error) {
      console.error('Error creating coupon:', error)
      alert('Error creating coupon')
    }
  }

  const handleToggleActive = async (couponId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      })

      const data = await response.json()

      if (data.success) {
        fetchCoupons()
      } else {
        alert(data.error || 'Error updating coupon')
      }
    } catch (error) {
      console.error('Error updating coupon:', error)
      alert('Error updating coupon')
    }
  }

  const handleDelete = async (couponId: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/coupons/${couponId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        fetchCoupons()
      } else {
        alert(data.error || 'Error deleting coupon')
      }
    } catch (error) {
      console.error('Error deleting coupon:', error)
      alert('Error deleting coupon')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage discount coupons
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Coupon'}
          </Button>
        </div>
      </div>

      {/* Create Coupon Form */}
      {showForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Coupon</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Coupon Code *
              </label>
              <input
                type="text"
                id="code"
                name="code"
                required
                value={formData.code}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type *
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="PERCENTAGE">Percentage</option>
                <option value="FLAT">Flat Amount</option>
              </select>
            </div>

            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700">
                Value *
              </label>
              <input
                type="number"
                id="value"
                name="value"
                step="0.01"
                min="0"
                required
                value={formData.value}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="minOrder" className="block text-sm font-medium text-gray-700">
                Minimum Order
              </label>
              <input
                type="number"
                id="minOrder"
                name="minOrder"
                step="0.01"
                min="0"
                value={formData.minOrder}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="maxUses" className="block text-sm font-medium text-gray-700">
                Max Uses
              </label>
              <input
                type="number"
                id="maxUses"
                name="maxUses"
                min="1"
                value={formData.maxUses}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div>
              <label htmlFor="expiresAt" className="block text-sm font-medium text-gray-700">
                Expires At
              </label>
              <input
                type="datetime-local"
                id="expiresAt"
                name="expiresAt"
                value={formData.expiresAt}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>
            </div>

            <div className="md:col-span-2 lg:col-span-3">
              <Button type="submit">
                Create Coupon
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Coupons Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Expires
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    No coupons found
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr key={coupon.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {coupon.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {coupon.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {coupon.type === 'PERCENTAGE' ? `${coupon.value}%` : `₹${coupon.value}`}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {coupon.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleToggleActive(coupon.id, coupon.isActive)}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          {coupon.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => handleDelete(coupon.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}