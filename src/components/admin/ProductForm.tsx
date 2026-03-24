'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { Product, Category } from '@/types'

interface ProductFormProps {
  product?: {
    id: string
    name: string
    slug: string
    description: string
    shortDescription?: string | null
    price: number
    discountPrice?: number | null
    stock: number
    categoryId: string
    images: string[]
    badges: string[]
    origin?: string | null
    benefits?: string | null
    usage?: string | null
    ingredients?: string | null
    sku: string
    isFeatured: boolean
    isBestseller: boolean
    category: {
      id: string
      name: string
      slug: string
      description?: string | null
      image?: string | null
    }
  }
  isEdit?: boolean
}

export default function ProductForm({ product, isEdit = false }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const [images, setImages] = useState<string[]>(product?.images || [''])
  const [badges, setBadges] = useState<string[]>(product?.badges || [''])

  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    shortDescription: product?.shortDescription || '',
    price: product?.price?.toString() || '',
    discountPrice: product?.discountPrice?.toString() || '',
    stock: product?.stock?.toString() || '',
    categoryId: product?.categoryId || '',
    origin: product?.origin || '',
    benefits: product?.benefits || '',
    usage: product?.usage || '',
    ingredients: product?.ingredients || '',
    sku: product?.sku || '',
    isFeatured: product?.isFeatured || false,
    isBestseller: product?.isBestseller || false,
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleImageChange = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  const addImageField = () => {
    setImages([...images, ''])
  }

  const removeImageField = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  const handleBadgeChange = (index: number, value: string) => {
    const newBadges = [...badges]
    newBadges[index] = value
    setBadges(newBadges)
  }

  const addBadgeField = () => {
    setBadges([...badges, ''])
  }

  const removeBadgeField = (index: number) => {
    const newBadges = badges.filter((_, i) => i !== index)
    setBadges(newBadges)
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.slug || generateSlug(name)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const submitData = {
        ...formData,
        images: images.filter(img => img.trim() !== ''),
        badges: badges.filter(badge => badge.trim() !== ''),
      }

      const url = isEdit ? `/api/admin/products/${product?.id}` : '/api/admin/products'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin/products')
        router.refresh()
      } else {
        alert(data.error || 'Error saving product')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow px-6 py-8 rounded-lg">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleNameChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
              Slug *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              required
              value={formData.slug}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU *
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              required
              value={formData.sku}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">
              Category *
            </label>
            <select
              id="categoryId"
              name="categoryId"
              required
              value={formData.categoryId}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              name="shortDescription"
              rows={3}
              value={formData.shortDescription}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Pricing and Inventory */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Pricing & Inventory</h3>
          
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price *
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              min="0"
              required
              value={formData.price}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="discountPrice" className="block text-sm font-medium text-gray-700">
              Discount Price
            </label>
            <input
              type="number"
              id="discountPrice"
              name="discountPrice"
              step="0.01"
              min="0"
              value={formData.discountPrice}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock Quantity *
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              min="0"
              required
              value={formData.stock}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="isFeatured" className="ml-2 block text-sm text-gray-700">
                Featured Product
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isBestseller"
                name="isBestseller"
                checked={formData.isBestseller}
                onChange={handleInputChange}
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="isBestseller" className="ml-2 block text-sm text-gray-700">
                Bestseller
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={6}
          required
          value={formData.description}
          onChange={handleInputChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700">
            Origin
          </label>
          <input
            type="text"
            id="origin"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="benefits" className="block text-sm font-medium text-gray-700">
            Benefits
          </label>
          <textarea
            id="benefits"
            name="benefits"
            rows={3}
            value={formData.benefits}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="usage" className="block text-sm font-medium text-gray-700">
            Usage Instructions
          </label>
          <textarea
            id="usage"
            name="usage"
            rows={3}
            value={formData.usage}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div>
          <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700">
            Ingredients
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows={3}
            value={formData.ingredients}
            onChange={handleInputChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        {images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="url"
              placeholder="Image URL"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              type="button"
              onClick={() => removeImageField(index)}
              className="text-red-600 hover:text-red-900"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addImageField}
          className="text-orange-600 hover:text-orange-900 text-sm"
        >
          + Add Image
        </button>
      </div>

      {/* Badges */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Badges
        </label>
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              placeholder="Badge text (e.g., New, Organic, etc.)"
              value={badge}
              onChange={(e) => handleBadgeChange(index, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              type="button"
              onClick={() => removeBadgeField(index)}
              className="text-red-600 hover:text-red-900"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addBadgeField}
          className="text-orange-600 hover:text-orange-900 text-sm"
        >
          + Add Badge
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
        >
          {isEdit ? 'Update Product' : 'Create Product'}
        </Button>
      </div>
    </form>
  )
}