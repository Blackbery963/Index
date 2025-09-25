// services/headerService.js
import { databases, account, Query } from '../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
const COMMERCIAL_DB_ID = import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID;
const ORDERS_COLLECTION = import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID;

export class HeaderService {
  static async fetchUserProfile() {
    try {
      const userSession = await account.get();
      const userId = userSession.$id;

      const userDoc = await databases.getDocument(
        DATABASE_ID,
        USER_COLLECTION_ID,
        userId
      );

      return {
        username: userDoc.username || 'Guest',
        email: userDoc.email || 'No email',
        profileImage: userDoc.profileImageUrl || null,
        isLoggedIn: true
      };
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return {
        username: 'Guest',
        email: 'No email',
        profileImage: null,
        isLoggedIn: false
      };
    }
  }

  static async fetchCartCount() {
    try {
      const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      return storedCart.reduce((total, item) => total + item.quantity, 0);
    } catch (error) {
      console.error('Error fetching cart count:', error);
      return 0;
    }
  }

  static async fetchOrderCount() {
    try {
      const user = await account.get();
      const res = await databases.listDocuments(COMMERCIAL_DB_ID, ORDERS_COLLECTION, [
        Query.equal('sellerId', user.$id)
      ]);
      return res.total || 0;
    } catch (error) {
      console.error('Error fetching order count:', error);
      return 0;
    }
  }

  static getNavigationRoutes(isLoggedIn) {
    const baseRoutes = {
      Home: { path: "/", icon: "🏠" },
      Gallery: { path: "/gallery", icon: "🖼️" },
      Community: { path: "/community", icon: "👥" },
      Blog: { path: "/blog", icon: "📝" },
      ArtStore: { path: "/Arteva/Artstore", icon: "🛍️" },
      Profile: { path: "/account", icon: "👤" },
      Diary: { path: "/journal", icon: "📓" },
      Favorites: { path: "/Favourite", icon: "❤️" },
      Cart: { path: "/settings/cart", icon: "🛒" },
      Orders: { path: "/Settings/Order", icon: "📦" },
      Notifications: { path: "/Settings/Notification", icon: "🔔" }
    };

    // Filter routes based on login status
    const filteredRoutes = { ...baseRoutes };
    if (!isLoggedIn) {
      delete filteredRoutes.Diary;
      delete filteredRoutes.Profile;
    }

    return filteredRoutes;
  }
}