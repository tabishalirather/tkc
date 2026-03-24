import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Product, WishlistItem, WishlistStore } from '@/types'

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product) => {
        const { items } = get()
        const existingItem = items.find(item => item.productId === product.id)

        if (!existingItem) {
          const newItem: WishlistItem = {
            id: `wishlist_${product.id}_${Date.now()}`,
            userId: '', // Will be set when user is logged in
            productId: product.id,
            product,
          }
          set({ items: [...items, newItem] })
        }
      },

      removeItem: (productId: string) => {
        const { items } = get()
        const updatedItems = items.filter(item => item.productId !== productId)
        set({ items: updatedItems })
      },

      clearWishlist: () => {
        set({ items: [] })
      },

      isInWishlist: (productId: string) => {
        const { items } = get()
        return items.some(item => item.productId === productId)
      },
    }),
    {
      name: 'wishlist-storage',
    }
  )
)