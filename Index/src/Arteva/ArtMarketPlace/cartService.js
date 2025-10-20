import { toast } from 'react-toastify';

export class CartService {
  static getCartItems() {
    if (typeof window === 'undefined') return [];
    const storedCart = localStorage.getItem('artverse_cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  static saveCartItems(cartItems) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('artverse_cart', JSON.stringify(cartItems));
  }

  static addToCart(art, cartItems, setCartItems) {
    try {
      if (!art?.$id) {
        throw new Error('Artwork is missing required information');
      }

      setCartItems(prev => {
        const existingItem = prev.find(item => item.$id === art.$id);
        
        const baseCartItem = {
          ...art,
          cartId: `${art.$id}_${Date.now()}`,
          quantity: 1,
          addedAt: new Date().toISOString()
        };

        if (existingItem) {
          const updatedCart = prev.map(item => 
            item.$id === art.$id 
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          CartService.saveCartItems(updatedCart);
          return updatedCart;
        }

        const newCart = [...prev, baseCartItem];
        CartService.saveCartItems(newCart);
        return newCart;
      });
      
      toast.success('Added to cart! 🎨');
      return true;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast.error('Could not add item to cart. Please try again.');
      return false;
    }
  }

  static removeFromCart(cartId, cartItems, setCartItems) {
    setCartItems(prev => {
      const updatedCart = prev.filter(item => item.cartId !== cartId);
      CartService.saveCartItems(updatedCart);
      return updatedCart;
    });
    toast.info('Item removed from cart');
  }

  static updateCartItemQuantity(cartId, newQuantity, cartItems, setCartItems) {
    if (newQuantity < 1) {
      this.removeFromCart(cartId, cartItems, setCartItems);
      return;
    }
    
    setCartItems(prev => {
      const updatedCart = prev.map(item => 
        item.cartId === cartId ? { ...item, quantity: newQuantity } : item
      );
      CartService.saveCartItems(updatedCart);
      return updatedCart;
    });
  }

  static clearCart(setCartItems) {
    setCartItems([]);
    localStorage.removeItem('artverse_cart');
    toast.info('Cart cleared');
  }

  static getCartSummary(cartItems) {
    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const total = cartItems.reduce((total, item) => total + ((item.price || 0) * item.quantity), 0);
    
    return { itemCount, total };
  }
}