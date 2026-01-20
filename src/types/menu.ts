// src/types/menu.ts or @/types/menu.ts

// export interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
//   category: string;
//   image: string;
//   isVegetarian: boolean;
//   spiceLevel: number;
//   rating: string | null;
//   isAvailable: boolean;
//   dietaryInfo: string[] | null;
//   discountPercent: number; // Add this field
//   customize?: boolean;
// }

// export interface User {
//   id: string;
//   username: string;
//   email: string;
//   fullName?: string;
//   phone?: string;
// }

// export interface Address {
//   id: string;
//   userId: string;
//   label: string;
//   street: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   isDefault: boolean;
// }

// export interface Order {
//   id: string;
//   userId: string;
//   addressId: string;
//   items: string;
//   subtotal: string;
//   deliveryFee: string;
//   discount: string;
//   total: string;
//   status: string;
//   createdAt: string;
//   estimatedDelivery?: string;
// }

// export interface Coupon {
//   id: string;
//   code: string;
//   discountType: string;
//   discountValue: string;
//   minOrderValue?: string;
//   expiryDate?: string;
//   isActive: boolean;
// }


// Defines a single customization option (e.g., "Extra Cheese")

// --- API & DATA INTERFACES ---


// A single customization option (e.g., "Extra Cheese")
export interface Addon {
  id: number;
  name: string;
  price: string;
}


// A group of options (e.g., "Select Your Toppings")
export interface AddonGroup {
  id: number;
  name: string;
  addons: Addon[];
}


// A menu item as it comes from the backend API
export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  discount_percent: number;
  category: string;
  image: string | null; // Can be null from the backend
  is_vegetarian: boolean;
  spice_level: number;
  rating: string | null;
  is_available: boolean;
  dietary_info: string[];
  customize: boolean;
  addon_groups: AddonGroup[];
}


// --- FILTERING INTERFACES ---


export interface Category {
  id: number;
  name: string;
  slug: string;
}


export interface DietaryInfo {
  name: string;
}


// --- ZUSTAND STORE & CART INTERFACE ---


// Represents an item once it is inside the shopping cart
export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string; // Must be a string
  customizations?: { // This makes the property optional and known
    groupName: string;
    selection: string;
  }[];
}

