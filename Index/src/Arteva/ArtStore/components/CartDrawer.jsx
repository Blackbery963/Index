import React from 'react';
import { motion } from 'framer-motion';
import { FiX, FiTrash2 } from 'react-icons/fi';
import { MdCurrencyRupee } from 'react-icons/md';
import { proceedToCheckout } from '../../Commercial/PlaceOrder';

const CartDrawer = ({ isOpen, onClose, cartItems, total, removeFromCart }) => (
  <>
    {/* Backdrop */}
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[60]"
    />

    {/* Drawer */}
    <motion.div 
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white dark:bg-zinc-900 z-[70] shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
        <h2 className="font-serif text-xl text-zinc-900 dark:text-white">Your Selection</h2>
        <button onClick={onClose} className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-900 dark:text-white">
          <FiX className="text-xl" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {cartItems.length === 0 ? (
          <div className="text-center text-zinc-400 mt-20">
            <p>Your collection is empty.</p>
          </div>
        ) : (
          cartItems.map(item => (
            <div key={item.$id} className="flex gap-4">
              <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover bg-zinc-100 dark:bg-zinc-800" />
              <div className="flex-1">
                <h4 className="font-serif text-zinc-900 dark:text-white">{item.title}</h4>
                <p className="text-xs text-zinc-500 mb-2">{item.artist}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium flex items-center text-zinc-900 dark:text-white">
                    <MdCurrencyRupee /> {item.price} x {item.quantity}
                  </span>
                  <button 
                    onClick={() => removeFromCart(item.$id)}
                    className="text-zinc-400 hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-6 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex justify-between mb-4 text-zinc-900 dark:text-white font-medium">
          <span>Subtotal</span>
          <span className="flex items-center">
            <MdCurrencyRupee /> 
            {/* FIXED LINE BELOW */}
            {(total || 0).toLocaleString()} 
          </span>
        </div>
        <button 
          onClick={() => {
            proceedToCheckout(cartItems);
            onClose();
          }}
          disabled={cartItems.length === 0}
          className="w-full bg-zinc-900 dark:bg-white text-white dark:text-black py-4 text-xs uppercase tracking-widest font-bold hover:bg-black dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
        >
          Proceed to Checkout
        </button>
      </div>
    </motion.div>
  </>
);

export default CartDrawer;