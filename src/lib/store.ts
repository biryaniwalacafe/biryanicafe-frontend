
import { create } from 'zustand';
import { persist } from 'zustand/middleware';


// --- UPDATED: CartItem interface now includes the optional customizations property ---
export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  customizations?: {
    groupName: string;
    selection: string;
  }[];
}


interface CartStore {
  items: CartItem[];
  favorites: string[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string, customizations?: CartItem['customizations']) => void;
  updateQuantity: (id: string, quantity: number, customizations?: CartItem['customizations']) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
}


export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      favorites: [],


      // --- UPDATED: addToCart logic now correctly handles items with different customizations ---
      addToCart: (item) =>
        set((state) => {
          // Find an existing item with the same ID AND the same customizations
          const existingItemIndex = state.items.findIndex(
            (i) =>
              i.id === item.id &&
              JSON.stringify(i.customizations) === JSON.stringify(item.customizations)
          );


          if (existingItemIndex !== -1) {
            // If it exists, create a new array and update the quantity of that specific item
            const updatedItems = [...state.items];
            updatedItems[existingItemIndex].quantity += item.quantity;
            return { items: updatedItems };
          } else {
            // If it's a new item or has different customizations, add it as a new entry in the cart
            return { items: [...state.items, { ...item, quantity: item.quantity || 1 }] };
          }
        }),


      // --- UPDATED: removeFromCart must now also check for customizations to be specific ---
      removeFromCart: (id, customizations) =>
        set((state) => ({
          items: state.items.filter(
            (item) =>
              item.id !== id ||
              JSON.stringify(item.customizations) !== JSON.stringify(customizations)
          ),
        })),


      // --- UPDATED: updateQuantity must also check for customizations ---
      updateQuantity: (id, quantity, customizations) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id &&
            JSON.stringify(item.customizations) === JSON.stringify(customizations)
              ? { ...item, quantity }
              : item
          ),
        })),


      clearCart: () => set({ items: [] }),


      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),
    }),
    {
      name: 'cart-storage',
    }
  )
);


// --- AuthStore remains unchanged ---
interface AuthStore {
  user: { id: string; email: string; name: string } | null;
  isAuthenticated: boolean;
  login: (user: { id: string; email: string; name: string }) => void;
  logout: () => void;
}


export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
