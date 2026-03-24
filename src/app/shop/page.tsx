import ProductCard from '@/components/product/ProductCard'
import { Suspense } from 'react'

// This would normally fetch from API
const sampleProducts = [
  {
    id: '1',
    name: 'Kashmiri Kesar Premium Saffron',
    slug: 'kashmiri-kesar-premium-saffron',
    description: 'Premium saffron from Kashmir',
    shortDescription: 'Handpicked premium saffron threads',
    price: 2999,
    discountPrice: 2699,
    stock: 50,
    categoryId: '1',
    images: ['https://images.unsplash.com/photo-1611071536598-9b7d8f15189f?auto=format&fit=crop&w=800&q=80'],
    badges: ['Premium', 'Organic'],
    sku: 'TKC-SAFFRON-001',
    isFeatured: true,
    isBestseller: true,
    averageRating: 4.8,
    _count: { reviews: 150 }
  },
  {
    id: '2',
    name: 'Pure Kashmiri Shilajit Resin',
    slug: 'pure-kashmiri-shilajit-resin',
    description: 'Pure shilajit from Kashmir mountains',
    shortDescription: 'High-altitude Himalayan Shilajit resin',
    price: 4999,
    discountPrice: 4499,
    stock: 25,
    categoryId: '2',
    images: ['https://images.unsplash.com/photo-1603048719539-9ecb4f1f5f9a?auto=format&fit=crop&w=800&q=80'],
    badges: ['Pure', 'Lab Tested'],
    sku: 'TKC-SHILAJIT-001',
    isFeatured: true,
    isBestseller: false,
    averageRating: 4.6,
    _count: { reviews: 89 }
  },
  {
    id: '3',
    name: 'Kashmiri Walnut Kernels',
    slug: 'kashmiri-walnut-kernels',
    description: 'Fresh walnut kernels from Kashmir',
    shortDescription: 'Fresh premium walnut kernels',
    price: 899,
    discountPrice: 799,
    stock: 100,
    categoryId: '3',
    images: ['https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=800&q=80'],
    badges: ['Fresh', 'Premium'],
    sku: 'TKC-WALNUT-001',
    isFeatured: false,
    isBestseller: true,
    averageRating: 4.7,
    _count: { reviews: 203 }
  }
]

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-saffron-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Shop Authentic Kashmir
          </h1>
          <p className="text-xl text-saffron-100 max-w-2xl mx-auto">
            Discover our complete collection of premium Kashmiri products,
            sourced directly from the valleys of Kashmir.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="lg:flex lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 mb-8 lg:mb-0">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Filters</h2>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {['All Products', 'Saffron', 'Shilajit', 'Walnuts', 'Honey', 'Almonds'].map((category) => (
                    <label key={category} className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500" />
                      <span className="text-sm text-gray-600">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  {['Under ₹1,000', '₹1,000 - ₹3,000', '₹3,000 - ₹5,000', 'Over ₹5,000'].map((range) => (
                    <label key={range} className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500" />
                      <span className="text-sm text-gray-600">{range}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Product Type */}
              <div>
                <h3 className="font-medium mb-3">Product Type</h3>
                <div className="space-y-2">
                  {['Featured', 'Bestseller', 'New Arrivals', 'On Sale'].map((type) => (
                    <label key={type} className="flex items-center">
                      <input type="checkbox" className="mr-2 rounded border-gray-300 text-saffron-500 focus:ring-saffron-500" />
                      <span className="text-sm text-gray-600">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
                <p className="text-gray-600 mt-1">{sampleProducts.length} products found</p>
              </div>

              <div className="flex items-center gap-4">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-saffron-500 focus:border-saffron-500">
                  <option>Sort by: Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                  <option>Best Rated</option>
                </select>

                <div className="flex items-center gap-2">
                  <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 border border-gray-300 rounded hover:bg-gray-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            <Suspense fallback={<div>Loading products...</div>}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </Suspense>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-1">
                <button className="px-3 py-2 text-gray-500 hover:text-saffron-600 disabled:opacity-50" disabled>
                  Previous
                </button>
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`px-3 py-2 rounded ${page === 1
                        ? 'bg-saffron-500 text-white'
                        : 'text-gray-600 hover:text-saffron-600 hover:bg-saffron-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-3 py-2 text-gray-600 hover:text-saffron-600">
                  Next
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
