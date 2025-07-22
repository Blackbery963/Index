import { databases, Query, Realtime } from '../appwriteConfig';
import { useEffect, useState } from 'react';

function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current seller ID (from auth)
    const getSellerId = async () => {
      const user = await account.get();
      return user.$id;
    };

    // Fetch seller's orders
    const fetchOrders = async () => {
      try {
        const sellerId = await getSellerId();
        const response = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID,
          [Query.equal('sellerId', sellerId)]
        );
        setOrders(response.documents);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    // Real-time updates
    const unsubscribe = client.subscribe('documents.orders', response => {
      if (response.events.includes('databases.orders.documents.*.create')) {
        fetchOrders(); // Refresh when new orders come in
      }
    });

    return () => unsubscribe();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await databases.updateDocument(
        'orders_db',
        'orders',
        orderId,
        { status }
      );
      setOrders(orders.map(order => 
        order.$id === orderId ? { ...order, status } : order
      ));
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.$id} className="border p-4 rounded-lg">
              <h3 className="font-bold">{order.productName}</h3>
              <p>Quantity: {order.quantity}</p>
              <p>Total: ₹{(order.price * order.quantity).toLocaleString()}</p>
              <p>Status: {order.status}</p>
              
              {order.status === 'pending' && (
                <div className="mt-2 space-x-2">
                  <button 
                    onClick={() => updateOrderStatus(order.$id, 'accepted')}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => updateOrderStatus(order.$id, 'rejected')}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}