'use client'

import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'
import { useWishlistStore } from '@/store/wishlistStore'
import Button from '@/components/ui/Button'
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
      return
    }
    addToWishlist(product)
  }

  const discountPercentage = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : null

  return (
    <article className="group overflow-hidden rounded-sm border border-black/10 bg-white transition duration-200 hover:border-black/25">
      <div className="relative aspect-[5/4] overflow-hidden bg-[#eceae6]">
        <Link href={`/product/${product.slug}`}>
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1615485737651-8f1f653bb9f6?auto=format&fit=crop&w=900&q=80'}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        <div className="absolute left-3 top-3 flex items-center gap-2">
          {product.badges.length > 0 && (
            <span className="bg-white/95 px-2 py-1 text-[11px] font-medium uppercase tracking-wide text-walnut-700">
              {product.badges[0]}
            </span>
          )}
          {discountPercentage && (
            <span className="bg-walnut-900 px-2 py-1 text-[11px] font-semibold text-white">
              {discountPercentage}% OFF
            </span>
          )}
        </div>

        <button
          onClick={handleWishlistToggle}
          className={`absolute right-3 top-3 rounded-full p-2 transition-colors ${isInWishlist(product.id)
              ? 'bg-red-500 text-white'
              : 'bg-white/80 text-walnut-700 hover:bg-white hover:text-red-500'
            }`}
          aria-label="Toggle wishlist"
        >
          <svg className="w-4 h-4" fill={isInWishlist(product.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <Link href={`/product/${product.slug}`} className="transition-colors hover:text-saffron-700">
            <h3 className="line-clamp-2 font-medium text-walnut-900">{product.name}</h3>
          </Link>
          {product.shortDescription && (
            <p className="mt-1 line-clamp-2 text-sm text-walnut-600">{product.shortDescription}</p>
          )}
        </div>

        {product.averageRating && (
          <div className="mb-2 flex items-center gap-1 text-xs text-walnut-600">
            <svg className="h-4 w-4 text-saffron-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{product.averageRating}</span>
            <span>({product._count?.reviews || 0})</span>
          </div>
        )}

        <div className="mb-3 flex items-center gap-2">
          <span className="text-base font-semibold text-walnut-900">
            ₹{product.discountPrice ? product.discountPrice.toFixed(2) : product.price.toFixed(2)}
          </span>
          {product.discountPrice && (
            <span className="text-xs text-walnut-500 line-through">
              ₹{product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to cart' : 'Out of stock'}
          </Button>
          <Link href={`/product/${product.slug}`}>
            <Button variant="ghost" className="w-full">
              View details
            </Button>
          </Link>
        </div>
      </div>
    </article>
  )
}
