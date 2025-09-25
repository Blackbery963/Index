// services/cartService.js
import { toast } from 'react-toastify';

export class CartService {
  static getCartItems() {
    const storedCart = localStorage.getItem('cartItems');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  static saveCartItems(cartItems) {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }

  static addToCart(art, cartItems, setCartItems) {
    try {
      if (!art?.$id || !art?.userId) {
        throw new Error('Artwork is missing required information');
      }

      setCartItems(prev => {
        const existingItem = prev.find(item => item.$id === art.$id);
        
        const baseCartItem = {
          ...art,
          sellerId: art.userId,
          quantity: 1
        };

        if (existingItem) {
          return prev.map(item => 
            item.$id === art.$id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        return [...prev, baseCartItem];
      });
      
      toast.success('Added to cart!');
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Could not add item to cart. Please try again.');
      return false;
    }
  }

  static removeFromCart(id, cartItems, setCartItems) {
    setCartItems(prev => prev.filter(item => item.$id !== id));
    toast.info('Item removed from cart');
  }

  static updateCartItemQuantity(id, newQuantity, cartItems, setCartItems) {
    if (newQuantity < 1) {
      this.removeFromCart(id, cartItems, setCartItems);
      return;
    }
    
    setCartItems(prev => 
      prev.map(item => 
        item.$id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  }

  static clearCart(setCartItems) {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    toast.info('Cart cleared');
  }

  static getCartSummary(cartItems) {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    return { itemCount, total };
  }
}