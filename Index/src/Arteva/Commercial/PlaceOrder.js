
// import { toast } from 'react-toastify';
// import { ID, account, databases } from '../../appwriteConfig';

// export const proceedToCheckout = async (onSuccess, onError) => {
//   try {
//     // 1. Get cart items from localStorage
//     const cartItems = JSON.parse(localStorage.getItem('cartItems') || []);
    
//     if (cartItems.length === 0) {
//       throw new Error('Your cart is empty');
//     }

//     // 2. Verify user is authenticated
//     const user = await account.get();
//     if (!user || !user.$id) throw new Error('User not authenticated');

//     // 3. Verify environment variables
//     if (!import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID || 
//         !import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID) {
//       throw new Error('Missing required environment variables');
//     }

//     // 4. Create orders and validate sellerIds
//     const orderPromises = cartItems.map(async (item) => {
//       if (!item.sellerId) {
//         throw new Error(`Missing seller information for ${item.title}`);
//       }

//       return await databases.createDocument(
//         import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
//         import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID,
//         ID.unique(),
//         {
//           productId: item.$id,
//           productName: item.title,
//           buyerId: user.$id,
//           sellerId: item.sellerId,
//           quantity: item.quantity,
//           price: item.price,
//           status: 'pending',
//           createdAt: new Date().toISOString(),
//           // Include image reference if needed
//           imageId: item.fileId 
//         }
//       );
//     });

//     // 5. Execute all order creations
//     await Promise.all(orderPromises);
    
//     // 6. Clear cart after successful checkout
//     localStorage.removeItem('cartItems');
    
//     // 7. Handle success
//     toast.success('Order placed successfully!');
//     // onSuccess?.();

//   } catch (error) {
//     console.error('Checkout failed:', error);
//     toast.error(error.message);
//     onError?.(error);
//   }
// };


// import { toast } from 'react-toastify';
// import { ID, account, databases } from '../../appwriteConfig';

// export const proceedToCheckout = async (onSuccess, onError) => {
//   try {
//     // 1. Get cart items
//     const cartItems = JSON.parse(localStorage.getItem('cartItems') || []);
//     if (cartItems.length === 0) throw new Error('Your cart is empty');

//     // 2. Get user
//     const user = await account.get(); 
//     if (!user || !user.$id) throw new Error('User not authenticated');

//     // 3. Validate env variables
//     const dbId = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
//     const sellerCollection = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;
//     const buyerCollection = import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID;

//     if (!dbId || !sellerCollection || !buyerCollection) {
//       throw new Error('Missing Appwrite environment variables');
//     }

//     // 4. Generate shared order ID
//     const orderId = ID.unique();

//     // 5. Create master order for buyer
//     await databases.createDocument(
//       dbId,
//       buyerCollection,
//       orderId,
//       {
//         userId: user.$id,
//         // items: JSON.stringify(cartItems),
//         total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
//         orderDate: new Date().toISOString(),
//         status: 'pending'
//       }
//     );

//     // 6. Create seller-specific order documents
//     const sellerOrderPromises = cartItems.map((item) => {
//       if (!item.sellerId) {
//         throw new Error(`Missing seller info for item: ${item.title}`);
//       }

//       return databases.createDocument(
//         dbId,
//         sellerCollection,
//         ID.unique(),
//         {
//           // orderId, // Link to master order
//           productId: item.$id,
//           productName: item.title,
//           buyerId: user.$id,
//           sellerId: item.sellerId,
//           quantity: item.quantity,
//           price: item.price,
//           status: 'pending',
//           createdAt: new Date().toISOString(),
//           imageId: item.fileId
//         }
//       );
//     });

//     await Promise.all(sellerOrderPromises);

//     // 7. Clear cart
//     localStorage.removeItem('cartItems');

//     // 8. Success toast
//     toast.success('Order placed successfully!');
//     // onSuccess?.();

//   } catch (error) {
//     console.error('Checkout failed:', error);
//     toast.error(error.message);
//     onError?.(error);
//   }
// };





import { toast } from 'react-toastify';
import { ID, account, databases } from '../../appwriteConfig';

export const proceedToCheckout = async (onSuccess, onError) => {
  try {
    // 1. Get cart items
    const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    if (cartItems.length === 0) throw new Error('Your cart is empty');

    // 2. Get user
    const user = await account.get(); 
    if (!user || !user.$id) throw new Error('User not authenticated');

    // 3. Validate env variables
    const dbId = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
    const sellerCollection = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;
    const buyerCollection = import.meta.env.VITE_APPWRITE_ORDERS_COLLECTION_ID;

    if (!dbId || !sellerCollection || !buyerCollection) {
      throw new Error('Missing Appwrite environment variables');
    }

    // 4. Generate shared order ID
    const orderId = ID.unique();
    const orderDate = new Date().toISOString();
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // 5. Prepare items data for storage
    const orderItems = cartItems.map(item => ({
      productId: item.$id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      sellerId: item.sellerId,
      imageId: item.fileId,
      // Add any other relevant item details
    }));

    // 6. Create master order for buyer with all items
    await databases.createDocument(
      dbId,
      buyerCollection,
      orderId,
      {
        userId: user.$id,
        items: JSON.stringify(orderItems), // Store complete items array
        total: totalAmount,
        orderDate,
        status: 'pending',
        // Additional useful fields
        itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        
      }
    );

    // 7. Create seller-specific order documents with reference to main order
    const sellerOrderPromises = cartItems.map((item) => {
      if (!item.sellerId) {
        throw new Error(`Missing seller info for item: ${item.title}`);
      }

      return databases.createDocument(
        dbId,
        sellerCollection,
        ID.unique(),
        {
          // orderId, // Link to master order
          productId: item.$id,
          productName: item.title,
          buyerId: user.$id,
          sellerId: item.sellerId,
          quantity: item.quantity,
          price: item.price,
          status: 'pending',
          createdAt: orderDate,
          imageId: item.fileId,
          total: item.price * item.quantity,
          // Add buyer info if sellers need it
          buyerName: user.name || user.email
        }
      );
    });

    await Promise.all(sellerOrderPromises);

    // 8. Clear cart
    localStorage.removeItem('cartItems');

    // 9. Success handling
    toast.success('Order placed successfully!');
    // onSuccess?.(orderId); // Pass the order ID to success callback

  } catch (error) {
    console.error('Checkout failed:', error);
    toast.error(error.message || 'Checkout failed. Please try again.');
    onError?.(error);
  }
};
