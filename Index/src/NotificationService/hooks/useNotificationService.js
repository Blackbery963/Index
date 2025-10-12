import { useState, useEffect, useCallback } from 'react';
// import { account, databases, storage } from '../appwrite/config'; // Your Appwrite config
import { account, databases, storage } from '../../appwriteConfig';

const DATABASE_ID = import.meta.env.VITE_APPWRITE_NOTIFICATION_DATABASE_ID ;
const SUBSCRIPTIONS_COLLECTION = import.meta.env.VITE_APPWRITE_NOTIFICATION_SUBSCRIPTIONS_COLLECTION_ID;
const NOTIFICATIONS_COLLECTION = import.meta.env.VITE_APPWRITE_NOTIFICATION_MESSAGES_COLLECTION_ID;

export const useNotificationService = () => {
  const [permission, setPermission] = useState('default');
  const [subscription, setSubscription] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    checkUserAuth();
    checkExistingSubscription();
  }, []);

  const checkUserAuth = async () => {
    try {
      const user = await account.get();
      setUserId(user.$id);
    } catch (error) {
      console.log('User not logged in');
    }
  };

  const checkExistingSubscription = async () => {
    if (!('serviceWorker' in navigator)) return;
    
    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();
    setSubscription(sub);
    
    // Update permission status
    setPermission(Notification.permission);
  };

  const subscribeUser = async () => {
    if (!userId) {
      throw new Error('User must be logged in to enable notifications');
    }

    const reg = await navigator.serviceWorker.ready;
    const vapidPublicKey = process.env.REACT_APP_VAPID_PUBLIC_KEY;
    const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
    
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey
    });

    setSubscription(sub);

    // Save to Appwrite
    await saveSubscriptionToAppwrite(sub);

    return sub;
  };

  const saveSubscriptionToAppwrite = async (subscription) => {
    try {
      // Check if subscription already exists
      const existingSubs = await databases.listDocuments(
        DATABASE_ID,
        SUBSCRIPTIONS_COLLECTION,
        [
          `userId=${userId}`,
          `endpoint=${subscription.endpoint}`
        ]
      );

      if (existingSubs.total === 0) {
        await databases.createDocument(
          DATABASE_ID,
          SUBSCRIPTIONS_COLLECTION,
          'unique()',
          {
            userId,
            endpoint: subscription.endpoint,
            keys: JSON.stringify(subscription.keys),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            createdAt: new Date().toISOString(),
            isActive: true
          }
        );
        console.log('Subscription saved to Appwrite');
      }
    } catch (error) {
      console.error('Error saving subscription:', error);
    }
  };

  const unsubscribeUser = async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
      await removeSubscriptionFromAppwrite(subscription);
    }
  };

  const removeSubscriptionFromAppwrite = async (subscription) => {
    try {
      const subs = await databases.listDocuments(
        DATABASE_ID,
        SUBSCRIPTIONS_COLLECTION,
        [`endpoint=${subscription.endpoint}`]
      );

      if (subs.documents.length > 0) {
        await databases.deleteDocument(
          DATABASE_ID,
          SUBSCRIPTIONS_COLLECTION,
          subs.documents[0].$id
        );
      }
    } catch (error) {
      console.error('Error removing subscription:', error);
    }
  };

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    
    if (result === 'granted' && userId) {
      await subscribeUser();
    }
    
    return result;
  };

  return {
    permission,
    subscription,
    userId,
    requestPermission,
    unsubscribeUser,
    isSupported: 'Notification' in window && 'serviceWorker' in navigator
  };
};

// Helper function
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}