import { notFound } from 'next/navigation'
import ProductDetail from '@/components/product/ProductDetail'
import { Product } from '@/types'

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products/${slug}`, {
      next: { revalidate: 60 }
    })

    if (!response.ok) {
      return null
    }

    const result = await response.json()
    return result.success ? result.data : null
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

async function getRelatedProducts(categoryId: string, currentProductId: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/products?category=${categoryId}&limit=4&exclude=${currentProductId}`,
      {
        next: { revalidate: 300 }
      }
    )

    if (!response.ok) {
      return []
    }

    const result = await response.json()
    return result.success ? result.data : []
  } catch (error) {
    console.error('Error fetching related products:', error)
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.categoryId, product.id)

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
            <a href="/" className="hover:text-saffron-600">Home</a>
            <span>/</span>
            <a href="/shop" className="hover:text-saffron-600">Shop</a>
            <span>/</span>
            <a href={`/category/${product.category?.slug}`} className="hover:text-saffron-600">
              {product.category?.name}
            </a>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>

          {/* Product Detail */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <ProductDetail product={product} />
          </div>

          {/* Product Description */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Description</h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>

          {/* Customer Reviews */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Customer Reviews</h2>
              <div className="space-y-6">
                {product.reviews.slice(0, 5).map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.title}</h4>
                        <p className="text-sm text-gray-600">by {review.user.name}</p>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                              }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    {review.body && (
                      <p className="text-gray-600 text-sm">{review.body}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(review.createdAt).toLocaleDateString()}
                      {review.isVerified && <span className="text-green-600 ml-2">✓ Verified Purchase</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <div key={relatedProduct.id} className="group">
                    <a href={`/product/${relatedProduct.slug}`}>
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-3">
                        <img
                          src={relatedProduct.images[0] || 'https://images.unsplash.com/photo-1615485737651-8f1f653bb9f6?auto=format&fit=crop&w=900&q=80'}
                          alt={relatedProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 group-hover:text-saffron-600 transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-saffron-600 font-semibold mt-1">
                        ₹{relatedProduct.discountPrice || relatedProduct.price}
                      </p>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  if (!product) {
    return {
      title: 'Product Not Found'
    }
  }

  return {
    title: `${product.name} - The Kashmir Co.`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      images: [product.images[0] || 'https://images.unsplash.com/photo-1615485737651-8f1f653bb9f6?auto=format&fit=crop&w=1200&q=80'],
    },
  }
}
