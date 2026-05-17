export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  role: string;
  active: boolean;
  addresses: Address[];
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  active: boolean;
  displayOrder: number;
  parentId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  price: number;
  discountPrice: number;
  currency: string;
  stock: number;
  brand: string;
  featured: boolean;
  active: boolean;
  tags: string[];
  variants: Variant[];
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
  salesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  id: string;
  name: string;
  value: string;
  sku: string;
  price: number;
  discountPrice: number;
  stock: number;
  image: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  transactionId: string;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  sku: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CategoryTree {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  parentId: string;
  active: boolean;
  displayOrder: number;
  children: CategoryTree[];
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  link: string;
  active: boolean;
  displayOrder: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface AuthResponse {
  token: string;
  userId: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
}
