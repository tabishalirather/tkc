'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import { User, Address } from '@/types'

interface UserProfile extends Pick<User, 'id' | 'name' | 'email' | 'image'> {
  addresses: Address[]
}

export default function AccountProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/user/profile')
      const data = await response.json()

      if (data.success) {
        setUser(data.data)
        setProfileForm({
          name: data.data.name || '',
          email: data.data.email || '',
        })
      }
    } catch (error) {
      console.error('Error fetching user profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileForm),
      })

      const data = await response.json()

      if (data.success) {
        setUser(data.data)
        alert('Profile updated successfully!')
      } else {
        alert(data.error || 'Error updating profile')
      }
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Error updating profile')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match')
      return
    }

    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long')
      return
    }

    setSaving(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profileForm.name,
          email: profileForm.email,
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        })
        setShowPasswordForm(false)
        alert('Password updated successfully!')
      } else {
        alert(data.error || 'Error updating password')
      }
    } catch (error) {
      console.error('Error updating password:', error)
      alert('Error updating password')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAddress = async (addressId: string) => {
    if (!confirm('Are you sure you want to delete this address?')) {
      return
    }

    try {
      const response = await fetch(`/api/addresses/${addressId}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (data.success) {
        fetchUserProfile() // Refresh user data
      } else {
        alert(data.error || 'Error deleting address')
      }
    } catch (error) {
      console.error('Error deleting address:', error)
      alert('Error deleting address')
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">Error loading profile</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your personal information and account settings
        </p>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={profileForm.name}
                onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" loading={saving}>
              Update Profile
            </Button>
          </div>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Change Password</h2>
          <Button
            variant="outline"
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Cancel' : 'Change Password'}
          </Button>
        </div>

        {showPasswordForm && (
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                id="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" loading={saving}>
                Update Password
              </Button>
            </div>
          </form>
        )}
      </div>

      {/* Saved Addresses */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Saved Addresses</h2>
          <Button variant="outline">
            Add New Address
          </Button>
        </div>

        {user.addresses.length === 0 ? (
          <div className="text-center py-8">
            <span className="text-6xl">🏠</span>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No addresses saved</h3>
            <p className="mt-1 text-sm text-gray-500">
              Add an address to make checkout faster.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {user.addresses.map((address) => (
              <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{address.name}</p>
                    <div className="mt-1 text-sm text-gray-600">
                      <p>{address.line1}</p>
                      {address.line2 && <p>{address.line2}</p>}
                      <p>{address.city}, {address.state} {address.pincode}</p>
                      <p>{address.phone}</p>
                    </div>
                    {address.isDefault && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mt-2">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-orange-600 hover:text-orange-900 text-sm">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="text-red-600 hover:text-red-900 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}