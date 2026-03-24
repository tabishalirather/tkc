'use client'

import { Product, ProductVariant } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import StarRating from '@/components/ui/StarRating'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const handleAddToCart = () => {
    addItem(product)
  }

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discountPercentage = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null

  return (
    <div className="product-card group bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/product/${product.slug}`}>
          <img
            src={product.images[0] || 'https://placehold.co/400x400'}
            alt={product.name}
            className="product-image w-full h-full object-cover"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isFeatured && (
            <Badge variant="warning">Featured</Badge>
          )}
          {product.isBestseller && (
            <Badge variant="success">Bestseller</Badge>
          )}
          {discountPercentage && (
            <Badge variant="danger">{discountPercentage}% OFF</Badge>
          )}
          {product.badges.map((badge, index) => (
            <Badge key={index}>{badge}</Badge>
          ))}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInWishlist(product.id)
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
          }`}
        >
          <svg className="w-4 h-4" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick view overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link href={`/product/${product.slug}`}>
            <Button variant="secondary">Quick View</Button>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <Link href={`/product/${product.slug}`} className="hover:text-saffron-600 transition-colors">
            <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          </Link>
          {product.shortDescription && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.shortDescription}</p>
          )}
        </div>

        {/* Rating */}
        {product.averageRating && (
          <div className="flex items-center gap-2 mb-2">
            <StarRating rating={product.averageRating} size="sm" readOnly />
            <span className="text-sm text-gray-500">({product._count?.reviews || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-saffron-600">
            ₹{product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
          </span>
          {product.discountPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock status */}
        {product.stock > 0 ? (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">In Stock ({product.stock} left)</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <span className="text-sm text-red-600">Out of Stock</span>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
          <Link href={`/product/${product.slug}`}>
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}