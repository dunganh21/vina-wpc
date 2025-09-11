export interface CartItem {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  dimensions: string;
  quantity: number;
  imageUrl: string;
  slug?: string;
}

export interface CartState {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
}

export interface CartActions {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

export interface CartContextType extends CartState, CartActions {}