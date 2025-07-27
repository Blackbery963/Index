
import { toast } from 'react-toastify';
import { ID, account, databases } from '../../appwriteConfig';

export const proceedToCheckout = async (onSuccess, onError) => {
  try {
    // 1. Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || []);
    
    if (cartItems.length === 0) {
      throw new Error('Your cart is empty');
    }

    // 2. Verify user is authenticated
    const user = await account.get();
    if (!user || !user.$id) throw new Error('User not authenticated');

    // 3. Verify environment variables
    if (!import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID || 
        !import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID) {
      throw new Error('Missing required environment variables');
    }

    // 4. Create orders and validate sellerIds
    const orderPromises = cartItems.map(async (item) => {
      if (!item.sellerId) {
        throw new Error(`Missing seller information for ${item.title}`);
      }

      return await databases.createDocument(
        import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID,
        ID.unique(),
        {
          productId: item.$id,
          productName: item.title,
          buyerId: user.$id,
          sellerId: item.sellerId,
          quantity: item.quantity,
          price: item.price,
          status: 'pending',
          createdAt: new Date().toISOString(),
          // Include image reference if needed
          imageId: item.fileId 
        }
      );
    });

    // 5. Execute all order creations
    await Promise.all(orderPromises);
    
    // 6. Clear cart after successful checkout
    localStorage.removeItem('cartItems');
    
    // 7. Handle success
    toast.success('Order placed successfully!');
    onSuccess?.();

  } catch (error) {
    console.error('Checkout failed:', error);
    toast.error(error.message);
    onError?.(error);
  }
};