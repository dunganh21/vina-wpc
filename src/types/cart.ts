import { ProductSummary } from './product';

// Shopping cart item with product info and quantity
export interface CartItem extends ProductSummary {
  quantity: number; // Number of items in cart
}

// Current shopping cart state
export interface CartState {
  items: CartItem[]; // Array of items in cart
  itemCount: number; // Total number of items
  totalPrice: number; // Total cart value in VND
}

// Available cart management actions
export interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void; // Add item to cart
  removeItem: (id: string) => void; // Remove item completely
  updateQuantity: (id: string, quantity: number) => void; // Update item quantity
  clearCart: () => void; // Empty the cart
  getCartTotal: () => number; // Calculate total price
  getCartCount: () => number; // Get total item count
}

// Combined cart context type for React context provider
export interface CartContextType extends CartState, CartActions {}
