import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaInfoCircle, FaPalette } from 'react-icons/fa';
import { FiMenu, FiImage } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { storage, databases, ID, account } from '../appwriteConfig'
import { proceedToCheckout } from '../Arteva/Commercial/PlaceOrder';


const bucketId = import.meta.env.VITE_APPWRITE_BUCKET_ID

function Cart() {
    const [activeButton, setActiveButton] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const stored = localStorage.getItem('cartItems');
                if (stored) {
                    const parsed = JSON.parse(stored);
                    
                    const itemsWithImages = await Promise.all(
                        parsed.map(async (item) => {
                            try {
                                let imageUrl = null;
                                if (item.fileId) {
                                    imageUrl = storage.getFilePreview(
                                        bucketId, 
                                        item.fileId
                                    );
                                }
                                return {
                                    ...item,
                                    imageUrl
                                };
                            } catch (error) {
                                console.error('Error processing item:', item.title, error);
                                return {
                                    ...item,
                                    imageUrl: null
                                };
                            }
                        })
                    );
                    
                    setCartItems(itemsWithImages);
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const removeFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.$id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(id);
            return;
        }
        
        const updatedCart = cartItems.map(item => 
            item.$id === id ? { ...item, quantity: newQuantity } : item
        );
        
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + (item.price * item.quantity), 
        0
    );

    // const proceedToCheckout = async () => {
    //     try {
    //         // Verify user is logged in
    //         const user = await account.get();
    //         if (!user || !user.$id) {
    //             throw new Error('User not authenticated');
    //         }

    //         // Verify environment variables
    //         if (!import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID || 
    //             !import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID) {
    //             throw new Error('Missing required environment variables');
    //         }

    //         // Create orders
    //         const orderPromises = cartItems.map(async (item) => {
    //             if (!item.sellerId) {
    //                 throw new Error(`Missing sellerId for product ${item.title}`);
    //             }

    //             return await databases.createDocument(
    //                 import.meta.env.VITE_APPWRITE_COMMERCIAL_DATABASE_ID,
    //                 import.meta.env.VITE_APPWRITE_SELLER_COLLECTION_ID,
    //                 ID.unique(),
    //                 {
    //                     productId: item.$id,
    //                     productName: item.title,
    //                     buyerId: user.$id,
    //                     sellerId: item.sellerId,
    //                     quantity: item.quantity,
    //                     price: item.price,
    //                     status: 'pending',
    //                     createdAt: new Date().toISOString()
    //                 }
    //             );
    //         });

    //         await Promise.all(orderPromises);
            
    //         // Clear cart
    //         setCartItems([]);
    //         localStorage.removeItem('cartItems');
            
    //         toast.success('Order placed successfully! Sellers have been notified.');
            
    //     } catch (error) {
    //         console.error('Checkout failed:', error);
    //         toast.error(`Failed to complete checkout: ${error.message}`);
    //     }
    // };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const dropdownVariants = {
        hidden: {
            opacity: 0,
            y: -10,
            transition: { duration: 0.2 }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.2 }
        }
    };

    if (loading) {
        return (
            <div className='w-full min-h-screen bg-gray-100 dark:bg-gray-950 flex items-center justify-center'>
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className='w-full min-h-screen bg-gradient-to-tr from-slate-100 via-red-50 to-blue-100 font-Playfair dark:bg-gray-950 flex flex-col items-center justify-center'>
          <ToastContainer/>
            <header className='fixed top-0 h-[80px] w-full bg-white/20 backdrop-blur-sm flex items-center justify-between px-4 md:px-6 shadow-md z-50'>
                <Link to={'/'}>
                    <div className='flex items-center'>
                        <h1 className='lg:text-[35px] md:text-[30px] sm:text-[25px] text-[21px] font-bold font-Eagle text-black'>Painters' Diary</h1>
                    </div>
                </Link>
                <div className='flex items-center gap-x-2 sm:gap-x-4'>
                    <nav className='hidden md:flex gap-x-4 text-black font-Playfair font-bold'>
                        <Link to='/'>
                            <button 
                                className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'home' ? 'bg-gray-600/50' : ''}`}
                                onClick={() => setActiveButton('home')}
                            >
                                <FaHome />
                                <span className="ml-1">Home</span>
                            </button>
                        </Link>
                        <Link to='/About'> 
                            <button 
                                className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'about' ? 'bg-gray-600/50' : ''}`}
                                onClick={() => setActiveButton('about')}
                            >
                                <FaInfoCircle />
                                <span className="ml-1">About</span>
                            </button>
                        </Link>
                        <Link to='/Account'>
                            <button 
                                className={`px-2 py-1 rounded-md transition-all border-gray-400 border hover:bg-gray-600/50 flex items-center justify-center gap-1 ${activeButton === 'account' ? 'bg-gray-600/50' : ''}`}
                                onClick={() => setActiveButton('account')}
                            >
                                <FaUser />
                                <span className="ml-1">Account</span>
                            </button>
                        </Link>
                        <Link to='/Arteva/Artstore'>
                            <button 
                                className={`px-2 py-1 rounded-md transition-all bg-blue-500 text-white flex items-center justify-center gap-1 ${activeButton === 'landscape' ? 'bg-blue-600' : ''}`}
                                onClick={() => setActiveButton('landscape')}
                            >
                                <FaPalette />
                                <span className="ml-1">Artstore</span>
                            </button>
                        </Link>
                    </nav>
                    <button 
                        className="md:hidden p-2 text-black hover:text-gray-800 transition-all duration-300"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <MdClose size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </header>
            
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.nav
                        className="md:hidden fixed top-[85px] right-2 w-36 bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-md z-40 rounded-lg"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <div className="flex flex-col items-center py-4 gap-y-3 font-Playfair font-bold text-black dark:text-gray-100">
                            <Link to='/' onClick={() => { setActiveButton('home'); toggleMenu(); }}>
                                <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                                    <FaHome />
                                    Home
                                </button>
                            </Link>
                            <Link to='/About' onClick={() => { setActiveButton('about'); toggleMenu(); }}>
                                <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                                    <FaInfoCircle />
                                    About
                                </button>
                            </Link>
                            <Link to='/Account' onClick={() => { setActiveButton('account'); toggleMenu(); }}>
                                <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg`}>
                                    <FaUser />
                                    Account
                                </button>
                            </Link>
                            <Link to='/Arteva/Artstore' onClick={() => { setActiveButton('landscape'); toggleMenu(); }}>
                                <button className={`w-full py-2 px-4 flex items-center justify-center gap-2 bg-blue-500 text-white hover:bg-blue-600 rounded-lg`}>
                                    <FaPalette />
                                    Artstore
                                </button>
                            </Link>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
            
            <main className='flex flex-col items-center justify-center mt-[100px] w-full max-w-4xl px-4'>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white font-Quicksand">Your Cart</h2>
                
                {cartItems.length === 0 ? (
                    <div className="text-center">
                        <FiImage className="mx-auto text-5xl text-gray-400 mb-4" />
                        <p className="text-xl text-gray-600 dark:text-gray-300">Your cart is empty</p>
                        <Link 
                            to="/Arteva/Artstore" 
                            className="mt-4 inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Browse Gallery
                        </Link>
                    </div>
                ) : (
                    <div className="w-fit">
                        <ul className="space-y-4">
                            {cartItems.map((item) => (
                                <motion.li 
                                    key={item.$id} 
                                    className="flex items-start flex-col gap-4 border p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {item.imageUrl ? (
                                        <img 
                                            src={item.imageUrl} 
                                            alt={item.title} 
                                            className="w-[40vh] h-[40vh] object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = '';
                                            }}
                                        />
                                    ) : (
                                        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg">
                                            <FiImage className="text-gray-500 dark:text-gray-400 text-2xl" />
                                        </div>
                                    )}
                                    
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white font-Quicksand">{item.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Artist: {item.artist || 'Unknown'}</p>
                                        
                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-2">
                                                <button 
                                                    onClick={() => updateQuantity(item.$id, item.quantity - 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center">{item.quantity}</span>
                                                <button 
                                                    onClick={() => updateQuantity(item.$id, item.quantity + 1)}
                                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            
                                            <div className="text-right pl-6">
                                                <p className="text-gray-800 dark:text-gray-200 font-medium">
                                                    ₹{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                <button 
                                                    onClick={() => removeFromCart(item.$id)}
                                                    className="text-sm text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold font-Playfair"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                        
                        <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border font-Playfair">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                                <span className="font-bold text-gray-900 dark:text-white">
                                    ₹{cartTotal.toLocaleString()}
                                </span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                                <span className="font-bold text-gray-900 dark:text-white">
                                    Free
                                </span>
                            </div>
                            <div className="border-t pt-4 flex justify-between items-center">
                                <span className="font-bold text-lg text-gray-900 dark:text-white">Total</span>
                                <span className="font-bold text-lg text-gray-900 dark:text-white">
                                    ₹{cartTotal.toLocaleString()}
                                </span>
                            </div>
                            
                            <button
                             onClick={() => proceedToCheckout(cartItems, () => {
                             setCartItems([]);
                             localStorage.removeItem('cartItems');
                             })}
                             className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition-colors"
                             >
                             Proceed to Checkout
                            </button>

                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}

export default Cart;