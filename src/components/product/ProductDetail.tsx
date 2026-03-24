'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Product, ProductVariant } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import Button from '@/components/ui/Button'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  )
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  
  const isProductInWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addItem(product, selectedVariant || undefined, quantity)
  }

  const handleAddToWishlist = () => {
    if (isProductInWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const currentPrice = selectedVariant?.discountPrice || selectedVariant?.price || product.discountPrice || product.price
  const originalPrice = selectedVariant?.price || product.price
  const hasDiscount = currentPrice < originalPrice

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Images */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={product.images[selectedImageIndex] || `https://placehold.co/600x600?text=${encodeURIComponent(product.name)}`}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.badges.length > 0 && (
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <span
                  key={badge}
                  className="bg-saffron-500 text-white px-2 py-1 text-xs font-semibold rounded"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Thumbnail Images */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square relative rounded-lg overflow-hidden bg-gray-100 border-2 transition-colors ${
                  selectedImageIndex === index ? 'border-saffron-500' : 'border-transparent'
                }`}
              >
                <Image
                  src={image || `https://placehold.co/150x150?text=${encodeURIComponent(product.name)}`}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">{product.name}</h1>
          {product.shortDescription && (
            <p className="text-gray-600 mt-2">{product.shortDescription}</p>
          )}
          {product.origin && (
            <p className="text-sm text-saffron-600 mt-1">Origin: {product.origin}</p>
          )}
        </div>

        {/* Rating */}
        {product.averageRating && product._count?.reviews ? (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.averageRating!)
                      ? 'text-yellow-400'
                      : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              {product.averageRating} ({product._count.reviews} reviews)
            </span>
          </div>
        ) : null}

        {/* Price */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-3xl font-bold text-gray-900">₹{currentPrice}</span>
            {hasDiscount && (
              <span className="text-xl text-gray-500 line-through">₹{originalPrice}</span>
            )}
            {hasDiscount && (
              <span className="bg-red-100 text-red-800 px-2 py-1 text-sm font-semibold rounded">
                {Math.round(((originalPrice - currentPrice) / originalPrice) * 100)}% OFF
              </span>
            )}
          </div>
          {selectedVariant?.stock !== undefined ? (
            <p className="text-sm text-gray-600">
              {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : 'Out of stock'}
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </p>
          )}
        </div>

        {/* Variants */}
        {product.variants && product.variants.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Weight Options:</h3>
            <div className="grid grid-cols-2 gap-2">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`p-3 border rounded-lg text-center transition-colors ${
                    selectedVariant?.id === variant.id
                      ? 'border-saffron-500 bg-saffron-50'
                      : 'border-gray-300 hover:border-saffron-300'
                  }`}
                >
                  <div className="font-medium">{variant.name}</div>
                  <div className="text-sm text-gray-600">{variant.weight}</div>
                  <div className="text-sm font-semibold">₹{variant.discountPrice || variant.price}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div className="space-y-3">
          <h3 className="font-semibold">Quantity:</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-saffron-300"
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-saffron-300"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={handleAddToCart}
            className="w-full"
            disabled={
              (selectedVariant?.stock !== undefined ? selectedVariant.stock : product.stock) === 0
            }
          >
            Add to Cart
          </Button>
          <Button
            onClick={handleAddToWishlist}
            variant="outline"
            className="w-full"
          >
            {isProductInWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}
          </Button>
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          {product.benefits && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Benefits</h3>
              <p className="text-gray-600 text-sm">{product.benefits}</p>
            </div>
          )}
          
          {product.ingredients && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Ingredients</h3>
              <p className="text-gray-600 text-sm">{product.ingredients}</p>
            </div>
          )}
          
          {product.usage && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Usage</h3>
              <p className="text-gray-600 text-sm">{product.usage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}