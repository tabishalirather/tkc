export interface User {
  id: string
  email: string
  name: string
  image?: string
  role: 'CUSTOMER' | 'ADMIN'
}

export interface Address {
  id: string
  userId: string
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  phone: string
  isDefault: boolean
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
}

export interface ProductVariant {
  id: string
  productId: string
  name: string
  weight: string
  price: number
  discountPrice?: number
  stock: number
  sku: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  shortDescription?: string
  price: number
  discountPrice?: number
  stock: number
  categoryId: string
  category?: Category
  images: string[]
  badges: string[]
  origin?: string
  benefits?: string
  usage?: string
  ingredients?: string
  sku: string
  isFeatured: boolean
  isBestseller: boolean
  variants?: ProductVariant[]
  reviews?: Review[]
  _count?: {
    reviews: number
  }
  averageRating?: number
}

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  quantity: number
  product: Product
  variant?: ProductVariant
}

export interface Cart {
  id: string
  userId: string
  items: CartItem[]
}

export interface OrderItem {
  id: string
  productId: string
  variantId?: string
  quantity: number
  price: number
  product: Product
  variant?: ProductVariant
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  subtotal: number
  discount: number
  shipping: number
  tax: number
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED'
  paymentId?: string
  couponId?: string
  shippingAddressId: string
  shippingAddress: Address
  payment?: Payment
  coupon?: Coupon
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: string
  razorpayOrderId?: string
  razorpayPaymentId?: string
  razorpaySignature?: string
  amount: number
  currency: string
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'REFUNDED'
  method?: string
  createdAt: string
}

export interface Coupon {
  id: string
  code: string
  type: 'PERCENTAGE' | 'FLAT'
  value: number
  minOrder: number
  maxUses?: number
  usedCount: number
  expiresAt?: string
  isActive: boolean
}

export interface Review {
  id: string
  userId: string
  productId: string
  user: User
  rating: number
  title: string
  body?: string
  isVerified: boolean
  createdAt: string
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
}

export interface Testimonial {
  id: string
  name: string
  location: string
  avatar?: string
  text: string
  rating: number
  isActive: boolean
  createdAt: string
}

export interface Newsletter {
  id: string
  email: string
  createdAt: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export interface AddressForm {
  name: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  phone: string
  isDefault: boolean
}

export interface CheckoutForm {
  shippingAddressId: string
  couponCode?: string
}

// Store types
export interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, variant?: ProductVariant, quantity?: number) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export interface WishlistStore {
  items: WishlistItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
}

// Filter types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  sort?: 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc' | 'newest' | 'rating'
  search?: string
  badges?: string[]
}

export interface CategoryWithCount {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  _count: {
    products: number
  }
}

// Payment types
export interface RazorpayOptions {
  key: string
  amount: number
  currency: string
  name: string
  description: string
  order_id: string
  handler: (response: RazorpayResponse) => void
  prefill?: {
    name?: string
    email?: string
    contact?: string
  }
  theme?: {
    color: string
  }
}

export interface RazorpayResponse {
  razorpay_payment_id: string
  razorpay_order_id: string
  razorpay_signature: string
}

declare global {
  interface Window {
    Razorpay: any
  }
}