// import React, { useState, useEffect } from 'react';
// import { client, databases, Query, account } from '../appwriteConfig';
// import './Order.css'; // Create this CSS file

// function Order() {
//   const [mode, setMode] = useState("buyer");
//   const [productId, setProductId] = useState("");
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   // Clear messages after 3 seconds
//   useEffect(() => {
//     if (error || success) {
//       const timer = setTimeout(() => {
//         setError(null);
//         setSuccess(null);
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [error, success]);

//   const BuyerSection = () => {
//     const placeOrder = async () => {
//       if (!productId.trim()) {
//         setError("Please enter a product ID");
//         return;
//       }

//       setLoading(true);
//       try {
//         const user = await account.get();
//         await databases.createDocument(
//           "orders_db",
//           "orders",
//           "unique()",
//           {
//             userId: user.$id,
//             productId,
//             status: "pending",
//             createdAt: new Date().toISOString(),
//           }
//         );
//         setSuccess("Order placed successfully!");
//         setProductId("");
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     return (
//       <div className="section-container">
//         <h2 className="section-title">Place New Order</h2>
//         <div className="form-group">
//           <label htmlFor="productId">Product ID</label>
//           <input
//             id="productId"
//             type="text"
//             placeholder="Enter product ID"
//             value={productId}
//             onChange={(e) => setProductId(e.target.value)}
//             disabled={loading}
//           />
//         </div>
//         <button 
//           onClick={placeOrder} 
//           disabled={loading}
//           className="primary-button"
//         >
//           {loading ? 'Placing Order...' : 'Place Order'}
//         </button>
//       </div>
//     );
//   };

//   const SellerSection = () => {
//     useEffect(() => {
//       fetchOrders();
//     }, []);

//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const orders = await databases.listDocuments(
//           "orders_db",
//           "orders",
//           [Query.equal("status", "pending")]
//         );
//         setOrders(orders.documents);
//       } catch (error) {
//         setError("Failed to fetch orders: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const updateOrder = async (orderId, status) => {
//       setLoading(true);
//       try {
//         await databases.updateDocument(
//           "orders_db",
//           "orders",
//           orderId,
//           { status }
//         );
//         setSuccess(`Order ${status}!`);
//         fetchOrders();
//       } catch (error) {
//         setError("Failed to update order: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     return (
//       <div className="section-container">
//         <h2 className="section-title">Manage Orders</h2>
//         <button 
//           onClick={fetchOrders} 
//           disabled={loading}
//           className="secondary-button"
//         >
//           {loading ? 'Refreshing...' : 'Refresh Orders'}
//         </button>
        
//         {orders.length === 0 ? (
//           <p className="no-orders">No pending orders found</p>
//         ) : (
//           <div className="orders-list">
//             {orders.map((order) => (
//               <div key={order.$id} className="order-card">
//                 <div className="order-info">
//                   <span className="order-id">Order #{order.$id.slice(0, 8)}</span>
//                   <span className="product-id">Product: {order.productId}</span>
//                   <span className="order-date">
//                     {new Date(order.createdAt).toLocaleString()}
//                   </span>
//                 </div>
//                 <div className="order-actions">
//                   <button 
//                     onClick={() => updateOrder(order.$id, "accepted")}
//                     className="accept-button"
//                     disabled={loading}
//                   >
//                     Accept
//                   </button>
//                   <button 
//                     onClick={() => updateOrder(order.$id, "rejected")}
//                     className="reject-button"
//                     disabled={loading}
//                   >
//                     Reject
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="order-page">
//       <h1 className="page-title">Order Management</h1>
      
//       <div className="mode-toggle">
//         <button 
//           onClick={() => setMode("buyer")} 
//           className={`toggle-button ${mode === "buyer" ? "active" : ""}`}
//         >
//           Buyer Mode
//         </button>
//         <button 
//           onClick={() => setMode("seller")} 
//           className={`toggle-button ${mode === "seller" ? "active" : ""}`}
//         >
//           Seller Mode
//         </button>
//       </div>

//       {/* Status messages */}
//       {error && <div className="alert error">{error}</div>}
//       {success && <div className="alert success">{success}</div>}

//       {mode === "buyer" ? <BuyerSection /> : <SellerSection />}
//     </div>
//   );
// }

// export default Order;



import { databases, Query,account, client } from '../appwriteConfig';
import { useEffect, useState } from 'react';

export default function SellerDashboard() {
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
          import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
          import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID,
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