export type Category = 
  | 'all' 
  | 'burgers' 
  | 'chicken' 
  | 'fries' 
  | 'wraps' 
  | 'shakes' 
  | 'combos';

export interface SizeOption {
  name: string;
  priceModifier: number;
  description?: string;
}

export interface AddonOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  price: number;
  originalPrice?: number;
  description: string;
  longDescription: string;
  image: string;
  isFeatured: boolean; // Exactly 6 items for the home page!
  isBestSeller?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
  calories: number;
  prepTime: string;
  rating: number;
  reviewsCount: number;
  ingredients: string[];
  allergens?: string[];
  sizes: SizeOption[];
  addons: AddonOption[];
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedSize: SizeOption;
  selectedAddons: AddonOption[];
  specialInstructions: string;
  quantity: number;
  itemTotal: number;
}

export type Page = 'home' | 'menu' | 'about' | 'contact' | 'checkout' | 'order-status';

export interface CustomerInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  landmark?: string;
  deliveryNotes?: string;
  pickupBranch?: string;
}

export type DeliveryType = 'delivery' | 'pickup';
export type PaymentMethod = 'cod' | 'card' | 'wallet';

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  customerInfo: CustomerInfo;
  deliveryType: DeliveryType;
  paymentMethod: PaymentMethod;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  tax: number;
  total: number;
  promoCodeApplied?: string;
  timestamp: string;
  status: 'confirmed' | 'kitchen' | 'on_the_way' | 'delivered';
  estimatedMinutes: number;
}

export interface BranchLocation {
  id: string;
  name: string;
  tag: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  mapEmbedUrl: string;
  isOpenNow: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
  favoriteItem: string;
  date: string;
}
