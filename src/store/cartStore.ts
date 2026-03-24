import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, ProductVariant, CartItem, CartStore } from '@/types'

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, variant?: ProductVariant, quantity: number = 1) => {
        const { items } = get()
        const existingItemIndex = items.findIndex(
          item => item.productId === product.id && item.variantId === variant?.id
        )

        if (existingItemIndex > -1) {
          // Update quantity of existing item
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += quantity
          set({ items: updatedItems })
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}_${variant?.id || 'default'}_${Date.now()}`,
            productId: product.id,
            variantId: variant?.id,
            quantity,
            product,
            variant,
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (productId: string, variantId?: string) => {
        const { items } = get()
        const updatedItems = items.filter(
          item => !(item.productId === productId && item.variantId === variantId)
        )
        set({ items: updatedItems })
      },

      updateQuantity: (productId: string, quantity: number, variantId?: string) => {
        const { items } = get()
        const updatedItems = items.map(item => {
          if (item.productId === productId && item.variantId === variantId) {
            return { ...item, quantity: Math.max(0, quantity) }
          }
          return item
        }).filter(item => item.quantity > 0)
        set({ items: updatedItems })
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getTotal: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const price = item.variant?.discountPrice || item.variant?.price || item.product.discountPrice || item.product.price
          return total + (price * item.quantity)
        }, 0)
      },

      getItemCount: () => {
        const { items } = get()
        return items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)