
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   // Validate fields
//   const newErrors = {
//     name: validateField('name', formData.name, formData),
//     email: validateField('email', formData.email, formData),
//     phone: validateField('phone', formData.phone, formData),
//     password: validateField('password', formData.password, formData),
//     confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
//     agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
//   };

//   setErrors(newErrors);
//   if (Object.values(newErrors).some((error) => error)) {
//     toast.error('Please fix the errors in the form');
//     setIsLoading(false);
//     return;
//   }

//   try {
//     // 1. Create the user account
//     const user = await account.create(
//       ID.unique(),
//       formData.email,
//       formData.password,
//       formData.name
//     );

//     try {
//       // 2. Try to create session
//       await account.createEmailPasswordSession(formData.email, formData.password);

//       // 3. No MFA required, proceed to create document
//       await databases.createDocument(
//         DATABASE_ID,
//         USER_COLLECTION_ID,
//         user.$id,
//         {
//           userId: user.$id,
//           username: formData.name,
//           email: formData.email,
//           createdAt: new Date().toISOString(),
//         },
//         [
//           Permission.read(Role.user(user.$id)),
//           Permission.update(Role.user(user.$id)),
//           Permission.delete(Role.user(user.$id)),
//         ]
//       );

//       localStorage.setItem(
//         'userProfile',
//         JSON.stringify({
//           $id: user.$id,
//           username: formData.name,
//           email: formData.email,
//         })
//       );

//       toast.success('Account created successfully!');
//       navigate('/Account');
//     } catch (err) {
//       // 4. Check if MFA is required
//       if (
//         err.code === 401 &&
//         err.response &&
//         err.response.headers['x-appwrite-mfa']
//       ) {
//         // MFA is required, create challenge
//         const challenge = await account.createMfaChallenge();

//         // Redirect to MFA verification page
//         navigate('/Signup/Multi-Factor_Authentication', {
//           state: {
//             email: formData.email,
//             password: formData.password,
//             challengeId: challenge.challengeId,
//           },
//         });
//         return;
//       } else {
//         throw err;
//       }
//     }
//   } catch (err) {
//     console.error('Signup error:', err);
//     const errorMessage =
//       err.code === 409
//         ? 'Email already exists'
//         : err.message || 'Failed to create account';
//     toast.error(errorMessage);
//   } finally {
//     setIsLoading(false);
//   }
// };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // Validate all fields
  //   const newErrors = {
  //     name: validateField('name', formData.name, formData),
  //     email: validateField('email', formData.email, formData),
  //     phone: validateField('phone', formData.phone, formData),
  //     password: validateField('password', formData.password, formData),
  //     confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
  //     agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
  //   };

  //   setErrors(newErrors);
  //   if (Object.values(newErrors).some((error) => error)) {
  //     toast.error('Please fix the errors in the form');
  //     setIsLoading(false);
  //     return;
  //   }
  //     try {
  //       await databases.createDocument(
  //         DATABASE_ID,
  //         USER_COLLECTION_ID,
  //         user.$id,// Using user ID as document ID
  //         {
  //         userId: user.$id,
  //         username: formData.name,
  //         email: formData.email,
  //         createdAt: new Date().toISOString()
  //         },
  //         // userData,
  //         [
  //           Permission.read(Role.user(user.$id)),
  //           Permission.update(Role.user(user.$id)),
  //           Permission.delete(Role.user(user.$id))
  //         ]
  // );

  //   // } catch (dbErr) {
  //   //   console.error('Database error:', dbErr);
  //   //   toast.error('Account created but failed to store profile.');
  //   // }

  //   } catch (err) {
  //     console.error('Appwrite error:', err);
  //     const errorMessage =
  //       err.code === 409 ? 'Email already exists' : err.message || 'Failed to create account';
  //     toast.error(errorMessage, { autoClose: 3000 });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   // Validate all fields
  // const newErrors = {
  //   name: validateField('name', formData.name, formData),
  //   email: validateField('email', formData.email, formData),
  //   phone: validateField('phone', formData.phone, formData),
  //   password: validateField('password', formData.password, formData),
  //   confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
  //   agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
  // };

  // setErrors(newErrors);
  // if (Object.values(newErrors).some((error) => error)) {
  //   toast.error('Please fix the errors in the form');
  //   setIsLoading(false);
  //   return;
  // }

//   try {
//     // Step 1: Create the user account
//     const user = await account.create(
//       ID.unique(),
//       formData.email,
//       formData.password,
//       formData.name
//     );

//     console.log('Created user:', user);

//     // Step 2: Create a session (so user is logged in immediately)
//     await account.createEmailPasswordSession(formData.email, formData.password);

//     // Step 3: Create the user profile document
//     await databases.createDocument(
//       DATABASE_ID,
//       USER_COLLECTION_ID,
//       ID.unique(), // safer than using user.$id to avoid duplicates
//       {
//         userId: user.$id,
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone || '',
//         createdAt: new Date().toISOString(),
//       },
//       [
//         // Permissions:
//         // Only this user can read/update/delete their profile
//         Permission.read(Role.user(user.$id)),
//         Permission.update(Role.user(user.$id)),
//         Permission.delete(Role.user(user.$id))
//         // Remove Permission.read(Role.any()) if you don't want it public
//       ]
//     );

//     // Optional: Store user in localStorage
//     localStorage.setItem('user', JSON.stringify({
//       userId: user.$id,
//       username: formData.name,
//       email: formData.email
//     }));

//     toast.success('Account created successfully! Redirecting...');
//     navigate('/Account'); // Or wherever you want to go after signup

//   } catch (err) {
//     console.error('Signup error:', err);

//     let errorMessage = 'Failed to create account';
//     if (err.code === 409) {
//       errorMessage = 'Email already exists';
//     } else if (err.code === 400) {
//       errorMessage = 'Invalid email or password format';
//     } else if (err.code === 500) {
//       errorMessage = 'Server error, please try again later';
//     } else if (err.message?.toLowerCase().includes('permission')) {
//       errorMessage = 'Permission configuration error: check your roles.';
//     }

//     toast.error(errorMessage, { autoClose: 5000 });
//   } finally {
//     setIsLoading(false);
//   }
// };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   // ... (keep existing validation code)
//     const newErrors = {
//     name: validateField('name', formData.name, formData),
//     email: validateField('email', formData.email, formData),
//     phone: validateField('phone', formData.phone, formData),
//     password: validateField('password', formData.password, formData),
//     confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
//     agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
//   };

//   setErrors(newErrors);
//   if (Object.values(newErrors).some((error) => error)) {
//     toast.error('Please fix the errors in the form');
//     setIsLoading(false);
//     return;
//   }


//   try {
//     // 1. First create the account
//     const user = await account.create(
//       ID.unique(),
//       formData.email,
//       formData.password,
//       formData.name
//     );

//     // 2. Create session IMMEDIATELY after account creation
//     const session = await account.createEmailPasswordSession(
//       formData.email,
//       formData.password
//     );
//     console.log('Session created:', session);

//     // 3. Now create the profile document with a UNIQUE ID
//     const profile = await databases.createDocument(
//       DATABASE_ID,
//       USER_COLLECTION_ID,
//       ID.unique(), // Use a new unique ID here
//       {
//         userId: user.$id, // Reference to the auth user
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone || '',
//         createdAt: new Date().toISOString()
//       },
//       [
//         // Set permissions properly
//         Permission.read(Role.user(user.$id)),
//         Permission.write(Role.user(user.$id)),
//         Permission.delete(Role.user(user.$id))
//       ]
//     );
//     console.log('Profile created:', profile);

//     // 4. Store minimal user data
//     localStorage.setItem('user', JSON.stringify({
//       userId: user.$id,
//       username: formData.name,
//       email: formData.email
//     }));

//     toast.success('Account created successfully!');
//     navigate('/account');
    
//   } catch (err) {
//     console.error('Full error:', err);
//     let errorMessage = 'Failed to create account';
    
//     if (err.code === 409) {
//       errorMessage = 'Email already exists';
//     } else if (err.code === 401) {
//       errorMessage = 'Authentication failed - please try again';
//     } else if (err.message.includes('permission')) {
//       errorMessage = 'Permission error - try refreshing or contact support';
//     }
    
//     toast.error(errorMessage, { autoClose: 5000 });
//   } finally {
//     setIsLoading(false);
//   }
// };


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   // Validate fields
//   const newErrors = {
//     name: validateField('name', formData.name, formData),
//     email: validateField('email', formData.email, formData),
//     phone: validateField('phone', formData.phone, formData),
//     password: validateField('password', formData.password, formData),
//     confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
//     agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
//   };

//   setErrors(newErrors);
//   if (Object.values(newErrors).some((error) => error)) {
//     toast.error('Please fix the errors in the form');
//     setIsLoading(false);
//     return;
//   }

//   try {
//     // Create the account
//     const user = await account.create(
//       ID.unique(),
//       formData.email,
//       formData.password,
//       formData.name
//     );

//     // Create session
//     await account.createEmailPasswordSession(
//       formData.email,
//       formData.password
//     );

//     // Force SDK to refresh session
//     const current = await account.get();
//     console.log('Authenticated as:', current);

//     // Create the profile document
//     await databases.createDocument(
//       DATABASE_ID,
//       USER_COLLECTION_ID,
//       ID.unique(),
//       {
//         userId: user.$id,
//         username: formData.name,
//         email: formData.email,
//         phone: formData.phone || '',
//         createdAt: new Date().toISOString(),
//       },
//       [
//         Permission.read(Role.user(user.$id)),
//         Permission.update(Role.user(user.$id)),
//         Permission.delete(Role.user(user.$id))
//       ]
//     );

//     localStorage.setItem('user', JSON.stringify({
//       userId: user.$id,
//       username: formData.name,
//       email: formData.email
//     }));

//     toast.success('Account created successfully!');
//     navigate('/account');

//   } catch (err) {
//     console.error('Full error:', err);
//     let errorMessage = 'Failed to create account';

//     if (err.code === 409) {
//       errorMessage = 'Email already exists';
//     } else if (err.code === 401) {
//       errorMessage = 'Authentication failed - please try again';
//     } else if (err.message?.includes('permission')) {
//       errorMessage = 'Permission error - check your rules';
//     }

//     toast.error(errorMessage, { autoClose: 5000 });
//   } finally {
//     setIsLoading(false);
//   }
//};

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsLoading(true);

//   const newErrors = {
//     name: validateField('name', formData.name, formData),
//     email: validateField('email', formData.email, formData),
//     password: validateField('password', formData.password, formData),
//     confirmPassword: validateField('confirmPassword', formData.confirmPassword, formData),
//     agreeToTerms: validateField('agreeToTerms', formData.agreeToTerms, formData),
//   };

//   setErrors(newErrors);
//   if (Object.values(newErrors).some((error) => error)) {
//     toast.error('Please fix the errors in the form');
//     setIsLoading(false);
//     return;
//   }

//   try {
//     // Create account
//     const user = await account.create(
//       ID.unique(),
//       formData.email,
//       formData.password,
//       formData.name
//     );

//     // Create session
//     await account.createEmailPasswordSession(
//       formData.email,
//       formData.password
//     );

//     // Store user reference (optional)
//     localStorage.setItem('user', JSON.stringify({
//       userId: user.$id,
//       username: formData.name,
//       email: formData.email
//     }));

//     toast.success('Account created successfully!');
//     navigate('/account');

//   } catch (err) {
//     console.error('Signup error:', err);
//     let errorMessage = 'Failed to create account';
//     if (err.code === 409) {
//       errorMessage = 'Email already exists';
//     }
//     toast.error(errorMessage, { autoClose: 5000 });
//   } finally {
//     setIsLoading(false);
//   }
// };





















































































                  <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
                    <Link 
                      to={`/account/${image.userId}`}
                      className="flex items-center hover:opacity-80 transition-opacity"
                    >
                      {userProfiles[image.userId]?.profileImage ? (
                        <img
                          src={userProfiles[image.userId].profileImage}
                          alt="Profile"
                          className="h-10 w-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '';
                          }}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
                          <FaUser />
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-Quicksand">
                          {userProfiles[image.userId]?.name || 'Unknown Artist'}
                        </p>
                        {userProfiles[image.userId]?.title && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {userProfiles[image.userId].title}
                          </p>
                        )}
                      </div>
                    </Link>
                    <div className="ml-auto">
                      <FollowButton targetUserId={image.userId} />
                    </div>
                  </div>
                        {/* <div className="flex items-center p-4">
        <Link 
          to={`/account/${image.userId}`}
          className="flex items-center group"
        >
          {userProfiles[image.userId]?.profileImage ? (
            <img
              src={userProfiles[image.userId].profileImage}
              className="h-10 w-10 rounded-full object-cover"
              alt={userProfiles[image.userId].name}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {userProfiles[image.userId]?.name?.charAt(0) || 'U'}
              </span>
            </div>
          )}
          <div className="ml-3">
            <p className="text-sm font-medium group-hover:underline">
              {userProfiles[image.userId]?.name || 'Unknown Artist'}
            </p>
            {userProfiles[image.userId]?.title && (
              <p className="text-xs text-gray-500">
                {userProfiles[image.userId].title}
              </p>
            )}
          </div>
        </Link>
        <FollowButton userId={image.userId} />
      </div>
 */}






























 // import React, { useState, useEffect, useRef } from 'react';
// import { Link } from 'react-router-dom';
// import { FaUserEdit, FaFacebook, FaInstagram, FaLinkedin, FaPalette, FaGlobe } from 'react-icons/fa';
// import Your_Collections from './Your_Collection/Your_Collections';
// import { MdClose, MdOutlineDashboardCustomize, MdOutlinePhotoCameraBack, MdSettings, MdHistory, MdLocationOn } from "react-icons/md";
// import { FiUpload, FiEdit } from 'react-icons/fi';
// import { IoIosLogOut } from 'react-icons/io';
// import { CiEdit, CiMenuFries } from 'react-icons/ci';
// import { FaXTwitter } from 'react-icons/fa6';
// import { ImBlog } from 'react-icons/im';
// import { BiCategoryAlt } from 'react-icons/bi';
// import { IoMdHelpCircleOutline } from 'react-icons/io';
// import { MdOutlineFeedback } from 'react-icons/md';
// import { FaHome, FaUsers, FaUser, FaImages, FaHandsHelping } from "react-icons/fa";
// import { motion } from 'framer-motion';
// import { Query } from 'appwrite';
// import { account, databases } from '../../appwriteConfig';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// function Account() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [image, setImage] = useState(null);
//   const [showButton, setShowButton] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [followerCount, setFollowerCount] = useState(null);
//   const [profileUserId, setProfileUserId] = useState('');
//   const [user, setUser] = useState(null);
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
//   const [profile, setProfile] = useState({
//     username: '',
//     email: '',
//     bio: '',
//     location: '',
//     artStyle: '',
//     portfolio: '',
//     facebook: '',
//     instagram: '',
//     twitter: '',
//     linkedin: '',
//   });
//   const dropdownRef = useRef(null);
//   const timeoutRef = useRef(null);

//   // Art styles for display
//   const artStyles = [
//     'Abstract', 'Realism', 'Impressionism', 'Expressionism', 
//     'Surrealism', 'Cubism', 'Pop Art', 'Minimalism', 
//     'Contemporary', 'Digital Art', 'Watercolor', 'Oil Painting'
//   ];

//     useEffect(() => {
//     const loadProfileData = async () => {
//       setIsLoading(true);
//       try {
//         // 1. Get current user session
//         const currentUser = await account.get();
//         setUser(currentUser);
//         setProfileUserId(currentUser.$id);
        
//         // 2. Try to fetch from database first
//         const dbProfile = await databases.getDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           currentUser.$id
//         );

//         // 3. Update state with database data
//         setProfile({
//           nickname: dbProfile.nickname || currentUser.name || '',
//           username: dbProfile.username || currentUser.name || '',
//           email: dbProfile.email || currentUser.email || '',
//           bio: dbProfile.bio || '',
//           location: dbProfile.location || '',
//           artStyle: dbProfile.artStyle || '',
//           portfolio: dbProfile.portfolio || '',
//           facebook: dbProfile.facebook || '',
//           instagram: dbProfile.instagram || '',
//           twitter: dbProfile.twitter || '',
//           linkedin: dbProfile.linkedin || ''
//         });

//         // 4. Load images from localStorage (cache)
//         const savedProfileImage = localStorage.getItem('profileImage');
//         const savedCoverImage = localStorage.getItem('coverImage');
//         if (savedProfileImage) setProfileImage(savedProfileImage);
//         if (savedCoverImage) {
//           setImage(savedCoverImage);
//           setShowButton(false);
//         }

//       } catch (error) {
//         console.error("Error loading profile:", error);
        
//         // Fallback to localStorage if database fails
//         const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
//         setProfile(prev => ({
//           ...prev,
//           ...savedProfile
//         }));
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     loadProfileData();
//   }, []);

//   // Enhanced logout function
//   const handleLogout = async () => {
//     if (window.confirm('Are you sure you want to log out? Your session will be cleared but your account will remain.')) {
//       try {
//         // 1. Clear session
//         await account.deleteSession('current');
        
//         // 2. Reset sensitive data in database (keep only essential fields)
//         await databases.updateDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           profileUserId,
//           {
//             nickname:'',
//             bio: '',
//             location: '',
//             artStyle: '',
//             portfolio: '',
//             facebook: '',
//             instagram: '',
//             twitter: '',
//             linkedin: '',
//             lastLogout: new Date().toISOString()
//           }
//         );
        
//         // 3. Clear local storage
//         localStorage.removeItem('userProfile');
//         localStorage.removeItem('profileImage');
//         localStorage.removeItem('coverImage');
        
//         // 4. Reset state
//         setProfile({
//           nickname:'',
//           username: '',
//           email: '',
//           bio: '',
//           location: '',
//           artStyle: '',
//           portfolio: '',
//           facebook: '',
//           instagram: '',
//           twitter: '',
//           linkedin: ''
//         });
//         setImage(null);
//         setProfileImage(null);
//         setShowButton(true);
        
//         // 5. Redirect to login
//         window.location.href = '/login';
//         toast.success('Logged out successfully');
//       } catch (error) {
//         console.error('Logout error:', error);
//         toast.error('Failed to complete logout');
//       }
//     }
//   };

//   // Load profile data, profile image, and cover image from localStorage on mount
//   useEffect(() => {
//     const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
//     const savedProfileImage = localStorage.getItem('profileImage');
//     const savedCoverImage = localStorage.getItem('coverImage');
    
//     setProfile((prev) => ({
//       ...prev,
//       ...savedProfile
//     }));
    
//     if (savedProfile?.$id) {
//       setProfileUserId(savedProfile.$id);
//     }
    
//     if (savedProfileImage) {
//       setProfileImage(savedProfileImage);
//     }
//     if (savedCoverImage) {
//       setImage(savedCoverImage);
//       setShowButton(false);
//     }
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isLargeScreen) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('click', handleOutsideClick);
//     return () => document.removeEventListener('click', handleOutsideClick);
//   }, [isLargeScreen]);

//   const handleMouseEnter = () => {
//     if (isLargeScreen) {
//       clearTimeout(timeoutRef.current);
//       setIsDropdownOpen(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isLargeScreen) {
//       timeoutRef.current = setTimeout(() => {
//         setIsDropdownOpen(false);
//       }, 300);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   const routes = {
//     Home: "/",
//     Gallery: "/gallery",
//     Category: "/category",
//     "My Account": "/account",
//     History: "/History",
//     Community: "/community",
//     Blog: "/blog",
//     FAQs: "/FAQs",
//     Help: "/Resources/Help",
//     Feedback: "/Resources/Feedback",
//   };

//   const routeIcons = {
//     Home: <FaHome />,
//     Gallery: <FaImages />,
//     Category: <BiCategoryAlt />,
//     "My Account": <FaUser />,
//     History: <MdHistory/>,
//     Community: <FaUsers />,
//     Blog: <ImBlog />,
//     FAQs: <IoMdHelpCircleOutline />,
//     Help: <FaHandsHelping />,
//     Feedback: <MdOutlineFeedback />,
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size >= 5 * 1024 * 1024) {
//         toast.error('File size must be less than 5MB');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         try {
//           setImage(base64String);
//           localStorage.setItem('coverImage', base64String);
//           setShowButton(false);
//           toast.success('Cover image updated!');
//         } catch (error) {
//           console.error('Error saving cover image:', error);
//           toast.error('Failed to save the image');
//         }
//       };
//       reader.onerror = () => {
//         toast.error('Failed to process the image');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size >= 5 * 1024 * 1024) {
//         toast.error('File size must be less than 5MB');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         try {
//           setProfileImage(base64String);
//           localStorage.setItem('profileImage', base64String);
//           toast.success('Profile picture updated!');
//         } catch (error) {
//           console.error('Error saving profile image:', error);
//           toast.error('Failed to save the image');
//         }
//       };
//       reader.onerror = () => {
//         toast.error('Failed to process the image');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

  // const menuVariants = {
  //   open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  //   closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
  // };

//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.2 } },
//     tap: { scale: 0.95 },
//   };

//   const coverVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8 } },
//   };

//   // getting followers
//   const getFollowerCount = async () => {
//     if (!profileUserId) return;
    
//     try {
//       const res = await databases.listDocuments(
//         DATABASE_ID, 
//         USER_COLLECTION_ID, 
//         [Query.equal("followingId", profileUserId)]
//       );
//       setFollowerCount(res.total);
//     } catch (error) {
//       console.error("Error fetching followers:", error);
//       setFollowerCount(0);
//     }
//   };

//   useEffect(() => {
//     if (profileUserId) {
//       getFollowerCount();
//     }
//   }, [profileUserId]);

//   // Animation variants for buttons and cards
// const cardVariants = {
//   hover: { scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)' },
//   tap: { scale: 0.95 },
// };

// const buttonVariants1 = {
//   hover: { scale: 1.05, background: 'linear-gradient(to right, #2563eb, #1e40af)' },
//   tap: { scale: 0.95 },
// };

// // function ProfileStatsSection({ followerCount }) {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate fetching follower count
//     const timer = setTimeout(() => setIsLoading(false), 1000);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//      <div className="w-full min-h-screen flex flex-col pb-6 overflow-x-hidden bg-gray-100 dark:bg-[#040d12]">
//       <ToastContainer position="top-center" autoClose={3000} />
      
//       {/* Header */}
//       <header className="w-full h-[80px] bg-gradient-to-l from-[#0f172acc] via-[#1e293bcc] to-[#334155cc] dark:from-[#020617cc] dark:via-[#0f172acc] dark:to-[#1e293bcc] flex items-center justify-between px-6 z-50 fixed">
//         <div
//           className="sm:py-2 sm:px-2 px-1 py-1 bg-slate-700/60 hover:bg-slate-600/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 rounded-md flex items-center justify-center cursor-pointer border border-slate-300 dark:border-slate-600 transition-all hover:rotate-180 duration-300"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <button className="h-full w-full flex items-center justify-center">
//             <CiMenuFries className="text-xl block text-white" />
//           </button>
//         </div>

//         <div
//           className="relative group"
//           ref={dropdownRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button
//             className="sm:px-2 px-1 md:px-3 sm:py-2 py-1 border border-gray-400 dark:border-gray-600 rounded-md flex items-center gap-2 transition-all duration-200 bg-slate-700/60 hover:bg-slate-600/80 dark:bg-slate-800/60 dark:hover:bg-slate-700/80 text-slate-100"
//             onClick={toggleDropdown}
//           >
//             <span className="text-sm md:text-base md:block hidden text-white font-Playfair">Settings</span>
//             <MdSettings className="text-xl md:text-2xl block text-white" />
//           </button>

//           <div
//             className={`absolute top-full right-0 mt-2 w-[180px] bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md shadow-lg transition-all duration-200 z-50 sm:p-2 font-Playfair
//               ${isDropdownOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'}`}
//           >
//             <Link to={'/Account/Edit_Profile'}>
//               <button
//                 className="w-full px-4 py-3 text-left hover:bg-violet-100 dark:hover:bg-violet-900 text-gray-800 dark:text-gray-100 flex items-center gap-2 text-sm"
//                 onClick={() => setIsDropdownOpen(false)}
//               >
//                 <CiEdit className="text-lg" />
//                 Edit Profile
//               </button>
//             </Link>

//             <Link to={'/Account/Dashboard'}>
//               <button
//                 className="w-full px-4 py-3 text-left hover:bg-violet-100 dark:hover:bg-violet-900 text-gray-800 dark:text-gray-100 flex items-center gap-2 text-sm"
//                 onClick={() => setIsDropdownOpen(false)}
//               >
//                 <MdOutlineDashboardCustomize className="text-lg" />
//                 Dashboard
//               </button>
//             </Link>

//             <button
//               className="w-full px-4 py-3 text-left hover:bg-violet-100 dark:hover:bg-violet-900 text-gray-800 dark:text-gray-100 flex items-center gap-2 text-sm"
//               onClick={handleLogout}
//             >
//               <IoIosLogOut className="text-lg" />
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Sliding Menu */}
//       <motion.div
//         className="fixed top-0 left-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
//         variants={menuVariants}
//         initial="closed"
//         animate={isMenuOpen ? 'open' : 'closed'}
//       >
//         {/* Profile section */}
//         <div className="h-48 bg-slate-700 dark:bg-gray-800 p-4 flex items-center justify-between">
          // <div className="h-24 w-24 sm:h-28 sm:w-28 bg-white dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
          //   {profileImage ? (
          //     <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          //   ) : (
          //     <FaUser className="text-4xl text-gray-400 dark:text-gray-300" />
          //   )}
          // </div>
//           <div className="flex-1 ml-4">
//             <h1 className="text-white dark:text-gray-200 font-playfair text-lg sm:text-xl">{profile.nickname || 'Username'}</h1>
//             <p className="text-white dark:text-gray-300 font-Playfair text-sm">{profile.email || 'xyz123@email.com'}</p>
//             <p className="text-white dark:text-gray-300 font-newsreader text-sm">Followers: {followerCount !== null ? followerCount : 'Loading...'}</p>
//           </div>
//           <motion.button
//             className="absolute top-4 right-4 text-white dark:text-gray-200 text-xl font-Playfair"
//             onClick={() => setIsMenuOpen(false)}
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//           >
//             <MdClose />
//           </motion.button>
//         </div>
        
//         {/* Menu items section */}
//         <div className="p-4 bg-gray-100 dark:bg-gray-950 h-[calc(100%-12rem)]">
//           {Object.keys(routes).map((item) => (
//             <Link
//               to={routes[item]}
//               key={item}
//               className="flex items-center gap-3 px-4 py-3 text-gray-800 dark:text-gray-200 font-newsreader text-base hover:bg-slate-200 dark:hover:bg-gray-800 rounded-md font-Playfair"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {routeIcons[item]}
//               <span>{item}</span>
//             </Link>
//           ))}
//         </div>
//       </motion.div>

//       {/* Cover Image Section */}
//       <motion.div
//         className="lg:w-[80%] w-[98%] mx-auto h-[400px] md:h-[500px] relative mt-[85px] overflow-hidden rounded-b-xl"
//         variants={coverVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {showButton ? (
//           <label
//             htmlFor="file-upload"
//             className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-t from-slate-200 to-slate-700 dark:from-slate-700 dark:to-gray-800 text-lg font-playfair font-semibold hover:bg-rose-500 transition"
//           >
//             Add a Cover Image
//             <input
//               type="file"
//               id="file-upload"
//               accept="image/*"
//               className="hidden"
//               onChange={handleImage}
//             />
//           </label>
//         ) : (
//           <div className="relative w-full h-full">
//             <img className="h-full w-full object-cover" src={image} alt="Cover" loading="lazy" />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
//             <motion.button
//               className="absolute bottom-4 right-4 bg-white/80 text-rose-700 p-2 rounded-full shadow hover:bg-white"
//               onClick={() => {
//                 setImage(null);
//                 localStorage.removeItem('coverImage');
//                 setShowButton(true);
//               }}
//               variants={buttonVariants}
//               whileHover="hover"
//               whileTap="tap"
//             >
//               <FiEdit className="text-lg" />
//             </motion.button>
//           </div>
//         )}
//       </motion.div>
      
//       {/* Profile Section */}
//       <div className="relative w-full flex flex-col items-center justify-center mt-[100px] px-4">
//         {/* Profile Picture */}
//         <div
//           className="absolute flex items-start justify-center"
//           style={{
//             width: "clamp(180px, 250px, 280px)",
//             height: "clamp(180px, 250px, 280px)",
//             top: "-90%",
//             left: "50%",
//             transform: "translateX(-50%)",
//           }}
//         >
//           <div className="rounded-full border-[5px] dark:border-white border-gray-900 flex items-center justify-center bg-black overflow-hidden w-full h-full">
//             {profileImage ? (
//               <img
//                 src={profileImage}
//                 alt="Uploaded"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <span className="text-white font-serif">No Image</span>
//             )}
//           </div>
//           <label
//             htmlFor="upload"
//             className="absolute bottom-1 right-12 bg-[#0c080a70] text-white hover:text-[#ffffff] rounded-2xl cursor-pointer hover:bg-[#74626859] px-2 py-2"
//             style={{ backdropFilter: "blur(5px)", opacity: 1 }}
//           >
//             {profileImage ? <FaUserEdit size={22} /> : <MdOutlinePhotoCameraBack size={22} />}
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleProfileImageUpload}
//             className="hidden"
//             id="upload"
//           />
//         </div>
        
//         {/* User Info */}
//         <div className="flex flex-col items-center mt-[110px] w-full max-w-3xl">
//           <h1 className="text-3xl md:text-4xl font-bold font-Quicksand text-gray-800 dark:text-white">
//             {profile.username || 'Username'}
//           </h1>
//           <h3 className="text-sm md:text-lg font-bold font-Quicksand text-gray-800 dark:text-white">
//             {profile.nickname || 'Nickname'}
//           </h3>
           
          
//           {profile.artStyle && (
//             <div className="mt-2 px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
//               {profile.artStyle}
//             </div>
//           )}
          
//           <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-4 text-center max-w-2xl">
//             {profile.bio || 'No bio yet. Add one in your profile settings!'}
//           </p>
          
//           {/* Additional Info */}
//           <div className="flex flex-wrap justify-center gap-4 mt-6">
//             {profile.location && (
//               <div className="flex items-center text-gray-700 dark:text-gray-300">
//                 <MdLocationOn className="mr-2 text-xl" />
//                 <span>{profile.location}</span>
//               </div>
//             )}
            
//             {profile.portfolio && (
//               <a 
//                 href={profile.portfolio} 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
//               >
//                 <FaGlobe className="mr-2 text-xl" />
//                 <span>Portfolio</span>
//               </a>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Social Media Buttons */}
//       <div className="flex gap-4 mx-auto mt-6">
//         {[
//           {
//             platform: 'facebook',
//             icon: <FaFacebook className="hover:text-blue-600" />,
//             url: profile.facebook ? `https://www.facebook.com/${profile.facebook}` : null
//           },
//           {
//             platform: 'instagram',
//             icon: <FaInstagram className="hover:text-pink-900" />,
//             url: profile.instagram ? `https://www.instagram.com/${profile.instagram}` : null
//           },
//           {
//             platform: 'twitter',
//             icon: <FaXTwitter className="hover:text-blue-400" />,
//             url: profile.twitter ? `https://twitter.com/${profile.twitter}` : null
//           },
//           {
//             platform: 'linkedin',
//             icon: <FaLinkedin className="hover:text-blue-300" />,
//             url: profile.linkedin ? `https://www.linkedin.com/${profile.linkedin}` : null
//           }
//         ].map((social) => (
//           <a
//             key={social.platform}
//             href={social.url || '#'}
//             target={social.url ? "_blank" : "_self"}
//             rel={social.url ? "noopener noreferrer" : ""}
//             className={`w-8 h-8 flex items-center justify-center rounded-lg text-white bg-gray-700 hover:bg-gray-900 transition ${!social.url ? 'opacity-50 cursor-not-allowed' : ''}`}
//             title={social.url ? `${social.platform}` : `No ${social.platform} linked`}
//           >
//             {social.icon}
//           </a>
//         ))}
//       </div>

//       {/* Stats and Actions */}
//       <div className="flex flex-wrap justify-center gap-4 px-4 mt-8">
//         <div className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
//           <span className="text-gray-600 dark:text-gray-300 font-medium font-Quicksand">Followers:</span>
//           <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
//             {followerCount !== null ? followerCount : '--'}
//           </span>
//         </div>
        
//         <div className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all flex items-center gap-1">
//           <span className="text-gray-600 dark:text-gray-300 font-medium font-Quicksand">Following:</span>
//           <span className="text-lg font-bold text-blue-600 dark:text-blue-400">1.2K</span>
//         </div>
        
//         <div className="px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all flex items-center gap-2">
//           <span className="text-gray-600 dark:text-gray-300 font-medium font-Quicksand">Artworks:</span>
//           <span className="text-lg font-bold text-blue-600 dark:text-blue-400">48</span>
//         </div>
        
//         <Link to={'/Account/Upload'}>
//           <motion.button
//             className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//           >
//             <span className='font-medium font-Quicksand'>Upload Art</span>
//             <FiUpload className="" />
//           </motion.button>
//         </Link>
//       </div>
//         {/* Followers Card */}
        
      
//       {/* Collections Section */}
//       <div className="mt-12 px-4 w-full max-w-7xl mx-auto">
//         <h2 className="text-2xl font-bold font-Eagle text-gray-800 dark:text-white mb-6">
//           Your Collections
//         </h2>
//         <Your_Collections />
//       </div>
//     </div>
//   );
// }

// export default Account;






// import React, { useState, useEffect, useRef, } from 'react';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { FaUserEdit, FaFacebook, FaInstagram, FaPalette, FaGlobe,  } from 'react-icons/fa';
// import { FaLinkedin } from 'react-icons/fa';
// import {CiEdit} from 'react-icons/ci'
// import { FiUpload, FiEdit } from 'react-icons/fi';
// import { IoIosLogOut } from 'react-icons/io';
// import { FiMenu } from 'react-icons/fi';
// import { FaXTwitter } from 'react-icons/fa6';
// import { ImBlog } from 'react-icons/im';
// import { BiCategoryAlt } from 'react-icons/bi';
// import { IoMdHelpCircleOutline } from 'react-icons/io';
// import { MdOutlineFeedback, MdHistory, MdOutlinePhotoCameraBack,MdLocationOn,MdClose, MdOutlineDashboardCustomize } from 'react-icons/md';
// import { FaHome, FaUsers, FaUser, FaImages, FaHandsHelping } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Query } from 'appwrite';
// import { account, databases } from '../../appwriteConfig';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Your_Collections from './Your_Collection/Your_Collections';
// import { followService } from '../../Follow/FollowService';
// import FollowButton from '../../Follow/FollowButton';
// import { getCollectionCount } from './getUploadArt';





// const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
// const USER_COLLECTION_ID = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;

// function Account({isOwnProfile= true}) {
//   const { userId: viewedUserId } = useParams();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [image, setImage] = useState(null);
//   const [showButton, setShowButton] = useState(true);
//   const [profileImage, setProfileImage] = useState(null);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   // const [followerCount, setFollowerCount] = useState(null);
//   const [profileUserId, setProfileUserId] = useState('');
//   const [user, setUser] = useState(null);
//   const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024);
//   const [profile, setProfile] = useState({
//     username: '',
//     email: '',
//     bio: '',
//     location: '',
//     artStyle: '',
//     portfolio: '',
//     facebook: '',
//     instagram: '',
//     twitter: '',
//     linkedin: '',
//   });
//   const dropdownRef = useRef(null);
//   const timeoutRef = useRef(null);
//   const [activeTab, setActiveTab] = useState('collections');

//   // Art styles for display
//   const artStyles = [
//     'Abstract', 'Realism', 'Impressionism', 'Expressionism',
//     'Surrealism', 'Cubism', 'Pop Art', 'Minimalism',
//     'Contemporary', 'Digital Art', 'Watercolor', 'Oil Painting'
//   ];

//   useEffect(() => {
//     const loadProfileData = async () => {
//       try {
//         const currentUser = await account.get();
//         setUser(currentUser);
//         setProfileUserId(currentUser.$id);

//         const dbProfile = await databases.getDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           currentUser.$id
//         );

//         setProfile({
//           nickname: dbProfile.nickname || currentUser.name || '',
//           username: dbProfile.username || currentUser.name || '',
//           email: dbProfile.email || currentUser.email || '',
//           bio: dbProfile.bio || '',
//           location: dbProfile.location || '',
//           artStyle: dbProfile.artStyle || '',
//           portfolio: dbProfile.portfolio || '',
//           facebook: dbProfile.facebook || '',
//           instagram: dbProfile.instagram || '',
//           twitter: dbProfile.twitter || '',
//           linkedin: dbProfile.linkedin || ''
//         });

//         const savedProfileImage = localStorage.getItem('profileImage');
//         const savedCoverImage = localStorage.getItem('coverImage');
//         if (savedProfileImage) setProfileImage(savedProfileImage);
//         if (savedCoverImage) {
//           setImage(savedCoverImage);
//           setShowButton(false);
//         }
//       } catch (error) {
//         console.error("Error loading profile:", error);
//         const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
//         setProfile(prev => ({
//           ...prev,
//           ...savedProfile
//         }));
//       }
//     };

//     loadProfileData();
//   }, []);

//   const handleLogout = async () => {
//     if (window.confirm('Are you sure you want to log out? Your session will be cleared but your account will remain.')) {
//       try {
//         await account.deleteSession('current');
//         await databases.updateDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           profileUserId,
//           {
//             nickname: '',
//             bio: '',
//             location: '',
//             artStyle: '',
//             portfolio: '',
//             facebook: '',
//             instagram: '',
//             twitter: '',
//             linkedin: '',
//             lastLogout: new Date().toISOString()
//           }
//         );

//         localStorage.removeItem('userProfile');
//         localStorage.removeItem('profileImage');
//         localStorage.removeItem('coverImage');

//         setProfile({
//           nickname: '',
//           username: '',
//           email: '',
//           bio: '',
//           location: '',
//           artStyle: '',
//           portfolio: '',
//           facebook: '',
//           instagram: '',
//           twitter: '',
//           linkedin: ''
//         });
//         setImage(null);
//         setProfileImage(null);
//         setShowButton(true);

//         window.location.href = '/login';
//         toast.success('Logged out successfully');
//       } catch (error) {
//         console.error('Logout error:', error);
//         toast.error('Failed to complete logout');
//       }
//     }
//   };

//   useEffect(() => {
//     const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
//     const savedProfileImage = localStorage.getItem('profileImage');
//     const savedCoverImage = localStorage.getItem('coverImage');

//     setProfile((prev) => ({
//       ...prev,
//       ...savedProfile
//     }));

//     if (savedProfile?.$id) {
//       setProfileUserId(savedProfile.$id);
//     }

//     if (savedProfileImage) {
//       setProfileImage(savedProfileImage);
//     }
//     if (savedCoverImage) {
//       setImage(savedCoverImage);
//       setShowButton(false);
//     }
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !isLargeScreen) {
//         setIsDropdownOpen(false);
//       }
//     };
//     document.addEventListener('click', handleOutsideClick);
//     return () => document.removeEventListener('click', handleOutsideClick);
//   }, [isLargeScreen]);

//   const handleMouseEnter = () => {
//     if (isLargeScreen) {
//       clearTimeout(timeoutRef.current);
//       setIsDropdownOpen(true);
//     }
//   };

//   const handleMouseLeave = () => {
//     if (isLargeScreen) {
//       timeoutRef.current = setTimeout(() => {
//         setIsDropdownOpen(false);
//       }, 300);
//     }
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   const routes = {
//     Home: "/",
//     Gallery: "/gallery",
//     Category: "/category",
//     "My Account": "/account",
//     History: "/History",
//     Community: "/community",
//     Blog: "/blog",
//     FAQs: "/FAQs",
//     Help: "/Resources/Help",
//     Feedback: "/Resources/Feedback",
//   };

//   const routeIcons = {
//     Home: <FaHome />,
//     Gallery: <FaImages />,
//     Category: <BiCategoryAlt />,
//     "My Account": <FaUser />,
//     History: <MdHistory />,
//     Community: <FaUsers />,
//     Blog: <ImBlog />,
//     FAQs: <IoMdHelpCircleOutline />,
//     Help: <FaHandsHelping />,
//     Feedback: <MdOutlineFeedback />,
//   };

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size >= 5 * 1024 * 1024) {
//         toast.error('File size must be less than 5MB');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         try {
//           setImage(base64String);
//           localStorage.setItem('coverImage', base64String);
//           setShowButton(false);
//           toast.success('Cover image updated!');
//         } catch (error) {
//           console.error('Error saving cover image:', error);
//           toast.error('Failed to save the image');
//         }
//       };
//       reader.onerror = () => {
//         toast.error('Failed to process the image');
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleProfileImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       if (file.size >= 5 * 1024 * 1024) {
//         toast.error('File size must be less than 5MB');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64String = reader.result;
//         try {
//           setProfileImage(base64String);
//           localStorage.setItem('profileImage', base64String);
//           toast.success('Profile picture updated!');
//         } catch (error) {
//           console.error('Error saving profile image:', error);
//           toast.error('Failed to save the image');
//         }
//       };
//       reader.onerror = () => {
//         toast.error('Failed to process the image');
//       };
//       reader.readAsDataURL(file);
//     }
//   };


//   // bchbhbfhrbfhdchdvgfbjcdfhc
//   const { userId } = useParams();
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Determine which user to fetch
//         const targetUserId = isOwnProfile ? 
//           (await account.get()).$id : // Get current user's ID if viewing own profile
//           userId; // Use URL parameter if viewing someone else's profile

//         // Fetch user data
//         const user = await databases.getDocument(
//           import.meta.env.VITE_APPWRITE_DATABASE_ID,
//           import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
//           targetUserId
//         );
        
//         setUserData(user);
        
//         // If viewing own profile, you might want to fetch additional private data
//         if (isOwnProfile) {
//           // Fetch private account data here
//         }

//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [isOwnProfile, userId]);

//   const menuVariants = {
//     open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
//     closed: { x: '-100%', opacity: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
//   };

//   const buttonVariants = {
//     hover: { scale: 1.05, transition: { duration: 0.2 } },
//     tap: { scale: 0.95 },
//   };

//   const coverVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { duration: 0.8 } },
//   };

//   const tabVariants = {
//     hidden: { opacity: 0, y: 10 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
//   };

// const [followerCount, setFollowerCount] = useState(0);
// const [followingCount, setFollowingCount] = useState(0);
// const [currentUserId, setCurrentUserId] = useState(null);

// // Add this useEffect to load counts
// useEffect(() => {
//   const loadCounts = async () => {
//     try {
//       const userId = await followService.getCurrentUserId();
//       setCurrentUserId(userId);
      
//       // Get counts for the profile being viewed (profileUserId)
//       if (profileUserId) {
//         const followers = await followService.getFollowerCount(profileUserId);
//         const following = await followService.getFollowingCount(profileUserId);
//         setFollowerCount(followers);
//         setFollowingCount(following);
//       }
//     } catch (error) {
//       console.error("Error loading counts:", error);
//     }
//   };
  
//   loadCounts();
// }, [profileUserId]); // Add profileUserId as dependency


// // getting Uploaded Collection
// const [collectionCount, setCollectionCount] = useState('');

// useEffect(() => {
//   const fetchCollections = async () => {
//     try {
//       const user = await account.get();
//       const count = await getCollectionCount(user.$id);
//       setCollectionCount(count);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   fetchCollections();
// }, []);


//   return (
//     <div className="w-full min-h-screen flex flex-col pb-6 overflow-x-hidden bg-gray-50 dark:bg-gray-900">
//       <ToastContainer position="top-center" autoClose={3000} />

//       {/* Floating Header */}
//       <header className="w-full h-[80px] bg-white/40 dark:bg-gray-800/80 backdrop-blur-md flex items-center justify-between px-6 z-50 fixed border-b border-gray-200 dark:border-gray-700">
//         <div className="flex items-center gap-4">
//           <button
//             className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//           >
//             <FiMenu className="text-xl text-gray-800 dark:text-gray-200" />
//           </button>
//         <h1 className="font-Eagle font-bold lg:text-[32px] md:text-[28px] sm:text-[22px] text-[18px] text-[#001F3F]">
//           Painters' Diary
//         </h1>        
//         </div>

//         <div
//           className="relative group"
//           ref={dropdownRef}
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           <button
//             className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//             onClick={toggleDropdown}
//           >
//             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white">
//               {profile.username?.charAt(0) || 'U'}
//             </div>
//             <span className="hidden md:inline text-gray-800 dark:text-gray-200 font-medium font-Playfair">{profile.username || 'User'}</span>
//           </button>

//           <AnimatePresence>
//             {isDropdownOpen && (
//               <motion.div
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: 10 }}
//                 className="absolute top-full right-0 mt-6 w-48 bg-white/60 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
//               >
//                 <Link to={'/Account/Edit_Profile'}>
//                   <button
//                     className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
//                     onClick={() => setIsDropdownOpen(false)}
//                   >
//                     <CiEdit className="text-lg" />
//                     Edit Profile
//                   </button>
//                 </Link>

//                 <Link to={'/Account/Dashboard'}>
//                   <button
//                     className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
//                     onClick={() => setIsDropdownOpen(false)}
//                   >
//                     <MdOutlineDashboardCustomize className="text-lg" />
//                     Dashboard
//                   </button>
//                 </Link>

//                 <button
//                   className="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center gap-2 text-sm transition-colors"
//                   onClick={handleLogout}
//                 >
//                   <IoIosLogOut className="text-lg" />
//                   Logout
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       {/* Sliding Menu */}
//       <AnimatePresence>
//         {isMenuOpen && (
//           <motion.div
//             className="fixed top-0 left-0 w-80 sm:w-96 h-full bg-white dark:bg-gray-900 shadow-2xl z-[9999] overflow-y-auto"
//             variants={menuVariants}
//             initial="closed"
//             animate="open"
//             exit="closed"
//           >
//             <div className="h-48 bg-slate-700 dark:bg-gray-800 p-6 flex items-start justify-between">
//               <div className="flex items-center gap-4 w-full">
//                 <div className="h-24 w-24 sm:h-28 sm:w-28 bg-white dark:bg-gray-700 rounded-full overflow-hidden flex items-center justify-center">
//                   {profileImage ? (
//               <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
//             ) : (
//               <FaUser className="text-4xl text-gray-400 dark:text-gray-300" />
//             )}
//           </div>
//                 <div>
//                   <h1 className="text-white font-medium">{profile.nickname || 'Username'}</h1>
//                   <p className="text-white/80 text-sm">{profile.email || 'xyz123@email.com'}</p>
//                   {/* <p className="text-white/80 text-sm mt-1">Followers: {followerCount !== null ? followerCount : '--'}</p> */}
//                    {/* <p>Followers: {followerCount}</p>
//                    {currentUserId && user !== currentUserId && (
//                    <FollowButton targetUserId={user} />
//                    )} */}

//                 </div>
//               </div>
//               <button
//                 className="text-white/80 hover:text-white transition-colors"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <MdClose className="text-xl" />
//               </button>
//             </div>

//             <div className="p-4 bg-gray-50 dark:bg-gray-950 h-[calc(100%-12rem)]">
//               {Object.keys(routes).map((item) => (
//                 <Link
//                   to={routes[item]}
//                   key={item}
//                   className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors mb-1 font-Playfair"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   <span className="text-lg">{routeIcons[item]}</span>
//                   <span className="font-medium">{item}</span>
//                 </Link>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Main Content */}
//       <div className="pt-[80px] w-full">
//         {/* Cover Image Section */}
//         <motion.div
//           className="w-full md:w-[80%] mx-auto h-80 md:h-96 relative overflow-hidden rounded-b-md"
//           variants={coverVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {showButton ? (
//             <label
//               htmlFor="file-upload"
//               className="w-full h-full flex items-center justify-center cursor-pointer bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:opacity-90 transition-opacity"
//             >
//               <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg shadow-sm">
//                 <MdOutlinePhotoCameraBack className="mx-auto text-3xl text-gray-600 dark:text-gray-300" />
//                 <p className="mt-2 text-gray-700 dark:text-gray-200 font-medium">Add a Cover Image</p>
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Click to upload (max 5MB)</p>
//               </div>
//               <input
//                 type="file"
//                 id="file-upload"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImage}
//               />
//             </label>
//           ) : (
//             <div className="relative w-full h-full">
//               <img
//                 className="h-full w-full object-cover"
//                 src={image}
//                 alt="Cover"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
//               <div className="absolute bottom-4 right-4 flex gap-2">
//                 <label
//                   htmlFor="file-upload"
//                   className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md cursor-pointer transition-all"
//                 >
//                   <FiEdit className="text-lg" />
//                   <input
//                     type="file"
//                     id="file-upload"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={handleImage}
//                   />
//                 </label>
//                 <button
//                   className="p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-md transition-all"
//                   onClick={() => {
//                     setImage(null);
//                     localStorage.removeItem('coverImage');
//                     setShowButton(true);
//                   }}
//                 >
//                   <MdClose className="text-lg" />
//                 </button>
//               </div>
//             </div>
//           )}
//         </motion.div>

//         {/* Profile Section */}
//         <div className="px-4 md:px-6 max-w-6xl mx-auto">
//           <div className="flex flex-col md:flex-row gap-6 -mt-16 relative">
//             {/* Profile Picture */}
//             <div className="relative">
//               <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-800 shadow-lg overflow-hidden">
//                 {profileImage ? (
//                   <img
//                     src={profileImage}
//                     alt="Profile"
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white">
//                     <FaUser className="text-4xl" />
//                   </div>
//                 )}
//               </div>
//               <label
//                 htmlFor="upload"
//                 className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-700 p-2 rounded-full shadow-md border border-gray-200 dark:border-gray-600 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
//               >
//                 <FiEdit className="text-gray-700 dark:text-gray-300" />
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleProfileImageUpload}
//                 className="hidden"
//                 id="upload"
//               />
//             </div>

//             {/* User Info */}
//             <div className="flex-1 pt-4 md:pt-16">
//               <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//                 <div>
//                   <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white font-Quicksand">
//                     {profile.username || 'Username'}
//                   </h1>
//                   <h3 className="text-lg text-gray-600 dark:text-gray-300 font-Playfair">
//                     {profile.nickname || 'Nickname'}
//                   </h3>
//                 </div>

//                 <div className="flex gap-3">
//                   {currentUserId && profileUserId && currentUserId !== profileUserId && (
//                     <FollowButton
//                       targetUserId={profileUserId}
//                       onFollowChange={(isFollowing) => {
//                         // Update counts when follow status changes
//                         const change = isFollowing ? 1 : -1;
//                         setFollowerCount(prev => prev + change);
//                       }}
//                     />
//                   )}
                  
//                   <Link to={'/Account/Upload'}>
//                     <motion.button
//                       className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm hover:shadow-md transition-all flex items-center gap-2"
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <span className='font-medium font-Playfair'>Upload Art</span>
//                       <FiUpload />
//                     </motion.button>
//                   </Link>

//                   <Link to={'/Account/Edit_Profile'}>
//                     <motion.button
//                       className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 shadow-sm hover:shadow-md transition-all flex items-center gap-2"
//                       whileHover={{ scale: 1.03 }}
//                       whileTap={{ scale: 0.98 }}
//                     >
//                       <span className='font-medium font-Playfair'>Edit Profile</span>
//                       <FiEdit />
//                     </motion.button>
//                   </Link>
//                 </div>
//               </div>

//               {profile.artStyle && (
//                 <div className="mt-2 inline-flex items-center px-3 py-1 bg-purple-100 dark:bg-purple-800/30 text-purple-800 dark:text-purple-200 rounded-full text-sm font-medium border border-purple-200 dark:border-purple-700">
//                   <FaPalette className="mr-2" />
//                   {profile.artStyle}
//                 </div>
//               )}

//               <p className="mt-2 text-gray-600 dark:text-gray-400 font-dmserif">
//                 {profile.bio || 'No bio yet. Add one in your profile settings!'}
//               </p>

//               {/* Additional Info */}
//               <div className="flex flex-wrap gap-3 mt-3">
//                 {profile.location && (
//                   <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
//                     <MdLocationOn className="mr-1 text-sm text-purple-600 dark:text-purple-400" />
//                     <span>{profile.location}</span>
//                   </div>
//                 )}
//                 {profile.portfolio && (
//                   <a
//                     href={profile.portfolio}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center text-sm text-purple-600 dark:text-purple-400 hover:underline"
//                   >
//                     <FaGlobe className="mr-1 text-sm" />
//                     <span>Portfolio</span>
//                   </a>
//                 )}
//               </div>

//               {/* Social Media Links */}
//               <div className="flex gap-2 mt-3 font-Playfair">
//                 {[
//                   {
//                     platform: 'facebook',
//                     icon: <FaFacebook className="text-lg" />,
//                     url: profile.facebook ? `https://www.facebook.com/${profile.facebook}` : null
//                   },
//                   {
//                     platform: 'instagram',
//                     icon: <FaInstagram className="text-lg" />,
//                     url: profile.instagram ? `https://www.instagram.com/${profile.instagram}` : null
//                   },
//                   {
//                     platform: 'twitter',
//                     icon: <FaXTwitter className="text-lg" />,
//                     url: profile.twitter ? `https://twitter.com/${profile.twitter}` : null
//                   },
//                   {
//                     platform: 'linkedin',
//                     icon: <FaLinkedin className="text-lg" />,
//                     url: profile.linkedin ? `https://www.linkedin.com/${profile.linkedin}` : null
//                   }
//                 ].map((social) => (
//                   <a
//                     key={social.platform}
//                     href={social.url || '#'}
//                     target={social.url ? "_blank" : "_self"}
//                     rel={social.url ? "noopener" : ""}
//                     className="flex w-8 h-8 items-center justify-center rounded-md ${social.url ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' transition-colors}"
//                     title={social.url ? `${social.platform}` : `No ${social.platform} linked`}
//                   >
//                     {social.icon}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Stats Section */}
//           <div className="mt-4 flex flex-wrap items-center gap-3 font-Playfair">
//             {[
//                   { label: 'Followers', value: followerCount },
//                   { label: 'Following', value: followingCount },
//                   { label: 'Artworks', value: '48' },
//                   { label: 'Collections', value: collectionCount }
//             ].map((stat) => (
//               <motion.div
//                 key={stat.label}
//                 className="flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 gap-1"
//                 whileHover={{ y: 1-2 }}
//                 whileTransition={{ duration: 0.2 }}
//               >
//                 <span className="text-[16px] text-gray-600 dark:text-gray-400">{stat.label}:</span>
//                 <span className="ml-auto text-sm font-semibold text-purple-600 dark:text-purple-400">{stat.value}</span>
//               </motion.div>
//             ))}
//           </div>

//           {/* Tabs */}
//           <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
//             <div className="flex space-x-6">
//               <button
//                 onClick={() => setActiveTab('collections')}
//                 className={`pb-4 text-sm font-semibold ${activeTab === 'collections' ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 font-Quicksand'}`}
//               >
//                 Collections
//               </button>
//               <button
//                 onClick={() => setActiveTab('about')}
//                 className={`pb-4 text-sm font-semibold ${activeTab === 'about' ? 'border-b-2 border-purple-600 text-purple-600 dark:text-purple-400 dark:border-purple-400' : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-400 font-Quicksand'}`}
//               >
//                 About
//               </button>
//             </div>
//           </div>

//           {/* Tab Content */}
//           <div className="mt-6">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeTab}
//                 variants={tabVariants}
//                 initial="hidden"
//                 animate="visible"
//                 exit="hidden"
//               >
//                 {activeTab === 'collections' && (
//                   <div>
//                     <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 font-Eagle">
//                       Your Collections
//                     </h3>
//                     <Your_Collections />
//                   </div>
//                 )}

//                 {activeTab === 'about' && (
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white font-Quicksand">About</h3>
//                       <p className="text-gray-600 dark:text-gray-400 font-Playfair text-[17px]">
//                         {profile.bio || 'No bio information available.'}
//                       </p>
//                     </div>

//                     <div>
//                       <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white font-Quicksand">Details</h3>
//                       <div className="space-y-2">
//                         <div className="flex items-center">
//                           <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold ">Location:</span>
//                           <span className="text-sm text-gray-700 dark:text-gray-300">
//                             {profile.location || 'Not specified'}
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Art Style:</span>
//                           <span className="text-sm text-gray-700 dark:text-gray-300">
//                             {profile.artStyle || 'Not specified'}
//                           </span>
//                         </div>
//                         <div className="flex items-center">
//                           <span className="w-24 text-sm text-gray-500 dark:text-gray-400 font-semibold">Portfolio:</span>
//                           {profile.portfolio ? (
//                             <a
//                               href={profile.portfolio}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
//                             >
//                               View Portfolio
//                             </a>
//                           ) : (
//                             <span className="text-sm text-gray-700 dark:text-gray-300">Not specified</span>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Account;




































//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Get current user session
//         const userSession = await account.get();
//         setCurrentUser(userSession);
        
//         // Determine which profile to load
//         const targetUserId = isOwnProfile ? userSession.$id : viewedUserId;
        
//         if (!targetUserId) {
//           throw new Error('User not found');
//         }
        
//         // Fetch profile data
//         const userDoc = await databases.getDocument(
//           DATABASE_ID,
//           USER_COLLECTION_ID,
//           targetUserId
//         );
        
//         setProfileData({
//           ...userDoc,
//           nickname: userDoc.nickname || userDoc.name || '',
//           username: userDoc.username || userDoc.name || '',
//           bio: userDoc.bio || '',
//           artStyle: userDoc.artStyle || '',
//           location: userDoc.location || '',
//           portfolio: userDoc.portfolio || '',
//           facebook: userDoc.facebook || '',
//           instagram: userDoc.instagram || '',
//           twitter: userDoc.twitter || '',
//           linkedin: userDoc.linkedin || ''
//         });

//         // Load images from localStorage for own profile
//         // if (isOwnProfile) {
//         //   const savedProfileImage = localStorage.getItem('profileImage');
//         //   const savedCoverImage = localStorage.getItem('coverImage');
//         //   if (savedProfileImage) setProfileImage(savedProfileImage);
//         //   if (savedCoverImage) {
//         //     setCoverImage(savedCoverImage);
//         //     setShowCoverButton(false);
//         //   }
//         // }
//       //   if (isOwnProfile) {
//       //   const savedProfileImage = localStorage.getItem('profileImage');
//       //   const savedCoverImage = localStorage.getItem('coverImage');
//       //   if (savedProfileImage) setProfileImage(savedProfileImage);
//       //   if (savedCoverImage) {
//       //     setCoverImage(savedCoverImage);
//       //     setShowCoverButton(false);
//       //   }
//       // } else {
//       //   // For other users, load images from their profile data
//       //   if (userDoc.profileImageUrl) setProfileImage(userDoc.profileImageUrl);
//       //   if (userDoc.coverImageUrl) {
//       //     setCoverImage(userDoc.coverImageUrl);
//       //     setShowCoverButton(false);
//       //   }
//       // }

//       // for all users
//       if (userDoc.profileImageUrl) setProfileImage(userDoc.profileImageUrl);
//       if (userDoc.coverImageUrl) {
//       setCoverImage(userDoc.coverImageUrl);
//       setShowCoverButton(false);
//       }

        
//         // Load social stats
//         const followers = await followService.getFollowerCount(targetUserId);
//         const following = await followService.getFollowingCount(targetUserId);
//         setFollowerCount(followers);
//         setFollowingCount(following);
        
//         // Load collections count
//         const collections = await getCollectionCount(targetUserId);
//         setCollectionCount(collections);
        
//       } catch (err) {
//         setError(err.message);
//         console.error("Error loading profile:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchData();
//   }, [isOwnProfile, viewedUserId]);

//   const handleLogout = async () => {
//     if (window.confirm('Are you sure you want to log out?')) {
//       try {
//         await account.deleteSession('current');
//         localStorage.clear();
//         window.location.href = '/login';
//         toast.success('Logged out successfully');
//       } catch (error) {
//         toast.error('Logout failed');
//         console.error('Logout error:', error);
//       }
//     }
//   };

//   // const handleCoverImage = (e) => {
//   //   const file = e.target.files[0];
//   //   if (!file) return;
    
//   //   if (file.size >= 5 * 1024 * 1024) {
//   //     toast.error('File size must be less than 5MB');
//   //     return;
//   //   }

//   //   const reader = new FileReader();
//   //   reader.onloadend = () => {
//   //     const base64String = reader.result;
//   //     setCoverImage(base64String);
//   //     if (isOwnProfile) {
//   //       localStorage.setItem('coverImage', base64String);
//   //     }
//   //     setShowCoverButton(false);
//   //     toast.success('Cover image updated!');
//   //   };
//   //   reader.onerror = () => toast.error('Failed to process the image');
//   //   reader.readAsDataURL(file);
//   // };
// //   const handleCoverImage = async (e) => {
// //   const file = e.target.files[0];
// //   if (!file) return;

// //   if (file.size >= 5 * 1024 * 1024) {
// //     toast.error('File size must be less than 5MB');
// //     return;
// //   }

// //   try {
// //     // // 1. Upload to Appwrite Storage
// //     // const coverImageUrl = await uploadImage(file, COVER_BUCKET);

// //     // // 2. Update user document
// //     // await updateUserImages(currentUser.$id, { coverImageUrl });
// // //     const coverUrl = await uploadImage(file, COVER_BUCKET);
// // // await updateUserImages(userId, { coverImageUrl: coverUrl });

// //     const coverUrl = await uploadImage(file, COVER_BUCKET);
// // await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });
// // setCoverImage(coverUrl);

// //     // 3. Update local state
// //     setCoverImage(coverImage);
// //     setShowCoverButton(false);
// //     toast.success('Cover image updated!');

// //   } catch (error) {
// //     toast.error('Failed to update cover image');
// //     console.error(error);
// //   }
// // };

//   // const handleProfileImageUpload = (event) => {
//   //   const file = event.target.files[0];
//   //   if (!file) return;
    
//   //   if (file.size >= 5 * 1024 * 1024) {
//   //     toast.error('File size must be less than 5MB');
//   //     return;
//   //   }

//   //   const reader = new FileReader();
//   //   reader.onloadend = () => {
//   //     const base64String = reader.result;
//   //     setProfileImage(base64String);
//   //     if (isOwnProfile) {
//   //       localStorage.setItem('profileImage', base64String);
//   //     }
//   //     toast.success('Profile picture updated!');
//   //   };
//   //   reader.onerror = () => toast.error('Failed to process the image');
//   //   reader.readAsDataURL(file);
//   // };
// // const handleProfileImageUpload = async (event) => {
// //   if (!currentUser?.$id) {
// //     toast.error('You must be logged in!');
// //     return;
// //   }

// //   try {
// //     const file = event.target.files[0];
// //     if (!file) return;

// //     if (file.size >= 5 * 1024 * 1024) {
// //       toast.error('File size must be less than 5MB');
// //       return;
// //     }

// //     toast.info('Uploading image...');
// //     // const profileImageUrl = await uploadImage(file, PROFILE_BUCKET);
// //     // await updateUserImages(currentUser.$id, { profileImageUrl });
// //     // const profileUrl = await uploadImage(file, PROFILE_BUCKET);
// //     // await updateUserImages(userId, { profileImageUrl: profileUrl });   
// // const profileUrl = await uploadImage(file, PROFILE_BUCKET);
// // await updateUserImages(currentUser.$id, { profileImageUrl: profileUrl });
// // setProfileImage(profileUrl);
    
// //     setProfileImage(profileUrl);
// //     toast.success('Profile picture updated!');
// //   } catch (error) {
// //     console.error('Upload error:', error);
// //     toast.error(error.message || 'Failed to update profile picture');
// //   }
// // };

// const handleCoverImage = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   if (!file.type.startsWith('image/')) {
//     toast.error('Only image files are allowed');
//     return;
//   }

//   if (file.size >= 5 * 1024 * 1024) {
//     toast.error('File size must be less than 5MB');
//     return;
//   }

//   try {
//     const coverUrl = await uploadImage(file, COVER_BUCKET);
//     await updateUserImages(currentUser.$id, { coverImageUrl: coverUrl });
//     setCoverImage(coverUrl);
//     setShowCoverButton(false);
//     toast.success('Cover image updated!');
//   } catch (error) {
//     toast.error(error.message || 'Failed to update cover image');
//   }
// };

// const handleProfileImageUpload = async (event) => {
//   const file = event.target.files[0];
//   if (!file) return;

//   if (!file.type.startsWith('image/')) {
//     toast.error('Only image files are allowed');
//     return;
//   }

//   if (file.size >= 5 * 1024 * 1024) {
//     toast.error('File size must be less than 5MB');
//     return;
//   }

//   try {
//     const profileUrl = await uploadImage(file, PROFILE_BUCKET);
//     await updateUserImages(currentUser.$id, { profileImageUrl: profileUrl });
//     setProfileImage(profileUrl);
//     toast.success('Profile picture updated!');
//   } catch (error) {
//     toast.error(error.message || 'Failed to update profile picture');
//   }
// };
