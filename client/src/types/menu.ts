// src/types/menu.ts or @/types/menu.ts

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isVegetarian: boolean;
  spiceLevel: number;
  rating: string | null;
  isAvailable: boolean;
  dietaryInfo: string[] | null;
  discountPercent: number; // Add this field
}

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
}

export interface Address {
  id: string;
  userId: string;
  label: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  addressId: string;
  items: string;
  subtotal: string;
  deliveryFee: string;
  discount: string;
  total: string;
  status: string;
  createdAt: string;
  estimatedDelivery?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: string;
  discountValue: string;
  minOrderValue?: string;
  expiryDate?: string;
  isActive: boolean;
}
