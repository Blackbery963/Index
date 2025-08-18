
// Appwrite service code for creating a user account and saving profile data in Appwrite database.

// import sdk from 'node-appwrite';
// import { config } from 'dotenv';
// import { ImOffice } from 'react-icons/im';

// config();

// const {
//   Client,
//   Users,
//   Databases,
//   ID,
//   Permission,
//   Role,
//   Query
// } = sdk;

// const client = new Client()
//   .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
//   .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)
//   .setKey(import.meta.env.VITE_APPWRITE_API_KEY);

// const users = new Users(client);
// const databases = new Databases(client);

// const validateUserData = ({ email, username, phone, password }) => {
//   if (!email || !username || !password) {
//     return { isValid: false, error: 'Email, username and password are required.' };
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     return { isValid: false, error: 'Invalid email format.' };
//   }

//   if (username.length < 3 || username.length > 30) {
//     return { isValid: false, error: 'Username must be 3-30 characters long.' };
//   }

//   if (password.length < 8) {
//     return { isValid: false, error: 'Password must be at least 8 characters long.' };
//   }

//   if (phone && !/^\+?[1-9]\d{1,14}$/.test(phone)) {
//     return { isValid: false, error: 'Invalid phone number format.' };
//   }

//   return { isValid: true };
// };

// export default async function createUser(req, res) {
//   try {
//     const {
//       VITE_APPWRITE_DATABASE_ID,
//       VITE_APPWRITE_USERS_COLLECTION_ID
//     } = process.env;

//     if (!VITE_APPWRITE_DATABASE_ID || !VITE_APPWRITE_USERS_COLLECTION_ID) {
//       console.error('Missing database environment config.');
//       return res.status(500).json({
//         success: false,
//         error: 'Server misconfiguration.'
//       });
//     }

//     if (!req.payload) {
//       return res.status(400).json({
//         success: false,
//         error: 'Missing request payload.'
//       });
//     }

//     let payload;
//     try {
//       payload = JSON.parse(req.payload);
//     } catch (e) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid JSON payload.'
//       });
//     }

//     const {
//       email,
//       username,
//       phone,
//       password,
//       gender,
//       dateOfBirth,
//       country,
//       city,
//       theme = 'light'
//     } = payload;

//     // Validate input
//     const validation = validateUserData({ email, username, phone, password });
//     if (!validation.isValid) {
//       return res.status(400).json({ success: false, error: validation.error });
//     }

//     // Check for existing email
//     try {
//       const existingUsers = await users.list([Query.equal('email', email)]);
//       if (existingUsers.total > 0) {
//         return res.status(409).json({
//           success: false,
//           error: 'User with this email already exists.'
//         });
//       }
//     } catch (listErr) {
//       console.error('Error listing users:', listErr);
//       return res.status(500).json({
//         success: false,
//         error: 'Error checking existing users.'
//       });
//     }

//     // Create user
//     let user;
//     try {
//       user = await users.create(
//         ID.unique(),
//         email,
//         phone || undefined,
//         password,
//         username
//       );
//       console.log('Created user:', user.$id);
//     } catch (createErr) {
//       console.error('User creation failed:', createErr);
//       return res.status(500).json({
//         success: false,
//         error: 'Failed to create user account.'
//       });
//     }

//     // Create user profile in DB
//     try {
//       await databases.createDocument(
//         VITE_APPWRITE_DATABASE_ID,
//         VITE_APPWRITE_USERS_COLLECTION_ID,
//         user.$id,
//         {
//           username: username.trim(),
//           email: email.trim().toLowerCase(),
//           phone: phone?.trim() || null,
//           gender: gender || null,
//           dateOfBirth: dateOfBirth || null,
//           country: country || null,
//           city: city || null,
//           theme,
//           createdAt: new Date().toISOString(),
//           updatedAt: new Date().toISOString()
//         },
//         [
//           Permission.read(Role.user(user.$id)),
//           Permission.update(Role.user(user.$id)),
//           Permission.delete(Role.user(user.$id))
//         ]
//       );
//     } catch (docErr) {
//       console.error('Document creation failed:', docErr);

//       // Cleanup: delete the user if profile creation fails
//       try {
//         await users.delete(user.$id);
//         console.log(`Deleted user ${user.$id} after profile failure.`);
//       } catch (delErr) {
//         console.error('Cleanup failed:', delErr);
//       }

//       return res.status(500).json({
//         success: false,
//         error: 'Account created but profile setup failed.'
//       });
//     }

//     return res.status(201).json({
//       success: true,
//       userId: user.$id,
//       email: user.email,
//       message: 'User created and profile saved successfully.'
//     });

//   } catch (err) {
//     console.error('Unexpected server error:', err);
//     return res.status(500).json({
//       success: false,
//       error: 'Internal server error.',
//       details: err.message
//     });
//   }
// // }



// import { account, databases, ID, Permission, Role, config } from '/home/swarnadip/Documents/Index/Index/Index/src/appwriteConfig.js';

// export async function signUpUser({
//   username,
//   email,
//   password,
//   gender,
//   dateOfBirth,
//   country,
//   city,
//   number, // E.164 format (+1234567890)
//   theme = 'light',
//   Title = username,
//   Tag = username,
//   Description = 'New artist account',
//   Medium = '',
// }) {
//   try {
//     // 1. Create Auth account
//     const user = await account.create(
//       ID.unique(),
//       email,
//       password,
//       username
//     );

//     // 2. Create session (auto-login)
//     await account.createEmailPasswordSession(email, password);

//     // 3. Save preferences
//     await account.updatePrefs({ theme });

//     // 4. Save to database
//     await databases.createDocument(
//       config.databaseId,
//       config.usersCollectionId,
//       ID.unique(),
//       {
//         accountId: user.$id,
//         username,
//         email,
//         number,
//         gender,
//         dateOfBirth,
//         country,
//         city,
//         Title,
//         Tag,
//         Description,
//         Medium,
//       },
//       [
//         Permission.read(Role.user(user.$id)),
//         Permission.write(Role.user(user.$id)),
//       ]
//     );

//     return user;
//   } catch (error) {
//     console.error('Signup error:', {
//       message: error.message,
//       code: error.code,
//       type: error.type,
//     });
    
//     // Handle specific Appwrite errors
//     if (error.type === 'user_already_exists') {
//       throw new Error('Email already registered');
//     }
    
//     throw new Error(error.message || 'Account creation failed');
//   }
// }













// the sign up form page 

// import React, { useState, useEffect } from 'react';
// import bgImage from './Image/4267109.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { signUpUser } from '../appwriteService/auth';

// function Signup() {
//   const navigate = useNavigate();
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [countryError, setCountryError] = useState(null);
//   const [configError, setConfigError] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     gender: '',
//     dateOfBirth: '',
//     country: '',
//     callingCode: '',
//     phoneNumber: '',
//     email: '',
//     password: '',
//     city: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Check environment variables
//   useEffect(() => {
//     const requiredEnvVars = [
//       'VITE_APPWRITE_ENDPOINT',
//       'VITE_APPWRITE_FUNCTION_ID',
//       'VITE_APPWRITE_PROJECT_ID',
//       'VITE_APPWRITE_API_KEY',
//     ];

//     const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);

//     if (missingVars.length > 0) {
//       const errorMessage = `Missing environment variables: ${missingVars.join(', ')}`;
//       console.error(errorMessage);
//       setConfigError(errorMessage);
//       toast.error('Application configuration error. Please contact support.');
//     }
//   }, []);

//   // Handle screen size
//   useEffect(() => {
//     const handleResize = () => {
//       setIsSmallScreen(window.innerWidth <= 1024);
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch countries with calling codes
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,idd');
//         if (!response.ok) {
//           throw new Error('Failed to fetch countries');
//         }
//         const data = await response.json();
//         const sortedData = data
//           .map((country) => ({
//             ...country,
//             callingCode: country.idd?.root
//               ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}`
//               : '',
//           }))
//           .filter((country) => country.callingCode)
//           .sort((a, b) => a.name.common.localeCompare(b.name.common));
//         setCountries(sortedData);
//         setLoading(false);
//       } catch (err) {
//         setCountryError(err.message);
//         setLoading(false);
//         toast.error(`Failed to load countries: ${err.message}`);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
    
//     if (name === 'country') {
//       const selectedCountry = countries.find((c) => c.name.common === value);
//       const callingCode = selectedCountry ? selectedCountry.callingCode : '';
      
//       setFormData(prev => ({
//         ...prev,
//         country: value,
//         callingCode,
//         // Keep existing phoneNumber but prepend the new calling code
//         phoneNumber: callingCode + (prev.phoneNumber.replace(prev.callingCode, '') || ''),
//       }));
//     } 
//     else if (name === 'phoneNumber') {
//       // Ensure the calling code stays at the start
//       const digitsOnly = value.replace(/\D/g, ''); // Remove non-digits
//       const phoneWithoutCallingCode = digitsOnly.replace(new RegExp(`^${formData.callingCode.replace('+', '\\+')}`), '');
//       const newPhoneNumber = formData.callingCode + phoneWithoutCallingCode;
      
//       setFormData(prev => ({
//         ...prev,
//         phoneNumber: newPhoneNumber,
//       }));
//     } 
//     else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };


//   // Sign up user API call
//   const signUpUser = async (userData) => {
//     try {
//       if (
//         !import.meta.env.VITE_APPWRITE_ENDPOINT ||
//         !import.meta.env.VITE_APPWRITE_FUNCTION_ID ||
//         !import.meta.env.VITE_APPWRITE_PROJECT_ID ||
//         !import.meta.env.VITE_APPWRITE_API_KEY
//       ) {
//         throw new Error('Missing environment configuration');
//       }

//       console.log('Attempting to sign up user with data:', {
//         ...userData,
//         password: '[REDACTED]',
//       }
//     );

//       const response = await fetch(
//         `${import.meta.env.VITE_APPWRITE_ENDPOINT}/functions/${import.meta.env.VITE_APPWRITE_FUNCTION_ID}/executions`,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'X-Appwrite-Project': import.meta.env.VITE_APPWRITE_PROJECT_ID,
//             'X-Appwrite-Key': import.meta.env.VITE_APPWRITE_API_KEY,
//           },
//           body: JSON.stringify({
//             data: JSON.stringify(userData),
//           }),
//         }
//       );

//       const data = await response.json();
//       console.log('API response:', data);

//       if (!response.ok) {
//         const errorMessage =
//           data.message ||
//           data.error ||
//           data.response?.message ||
//           `Failed to sign up (Status: ${response.status})`;
//         throw new Error(errorMessage);
//       }

//       return data;
//     } catch (error) {
//       console.error('Signup API error:', error);
//       throw error;
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Validate required fields
//       const requiredFields = ['username', 'gender', 'dateOfBirth', 'country', 'phoneNumber', 'email', 'password', 'city'];
//       const missingFields = requiredFields.filter(field => !formData[field]?.trim());
      
//       if (missingFields.length > 0) {
//         throw new Error(`Please fill in all required fields: ${missingFields.map(f => 
//           f.replace(/([A-Z])/g, ' $1').toLowerCase()).join(', ')}`);
//       }

//       // Validate date of birth
//       const dob = new Date(formData.dateOfBirth);
//       const today = new Date();
//       const minAge = 13;
//       const age = today.getFullYear() - dob.getFullYear();
//       const monthDiff = today.getMonth() - dob.getMonth();
//       const dayDiff = today.getDate() - dob.getDate();

//       if (dob > today) {
//         throw new Error('Date of birth cannot be in the future.');
//       }
//       if (age < minAge || (age === minAge && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
//         throw new Error(`You must be at least ${minAge} years old to sign up.`);
//       }

//       // Validate password length
//       if (formData.password.length < 8) {
//         throw new Error('Password must be at least 8 characters long.');
//       }

//       // Validate phone number
//       if (!formData.phoneNumber) {
//         throw new Error(`Phone number is required.`);
//       }

//       // Validate email format
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(formData.email)) {
//         throw new Error('Please enter a valid email address.');
//       }

//       // Proceed with signup
//       const result = await signUpUser({
//         username: formData.username.trim(),
//         email: formData.email.trim().toLowerCase(),
//         phone: `${formData.callingCode}${formData.phoneNumber}`.trim(),
//         password: formData.password,
//         gender: formData.gender,
//         dateOfBirth: formData.dateOfBirth,
//         country: formData.country,
//         city: formData.city,
//         theme: 'light',
//       });

//       // Clear form data on success
//       setFormData({
//         username: '',
//         gender: '',
//         dateOfBirth: '',
//         country: '',
//         callingCode: '',
//         phoneNumber: '',
//         email: '',
//         password: '',
//         city: '',
//       });

//       toast.success('Signup successful! You are now logged in.', {
//         onClose: () => navigate('/Account'),
//       });
//     } catch (error) {
//       console.error('Signup error:', error);
//       toast.error(error.message || 'Failed to sign up. Please try again.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Render configuration error if present
//   if (configError) {
//     return (
//       <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tl from-[#4A00E0] to-[#8E2DE2]">
//         <p className="text-white text-lg">Configuration error. Please contact support.</p>
//       </div>
//     );
//   }

//   return (
    
//     <div className="h-screen w-screen overflow-auto bg-gradient-to-tl from-[#4b00e0a9] to-[#8E2DE2] lg:bg-gradient-to-b lg:from-red-400 lg:to-red-700 flex items-center justify-center">
//       <div
//         id="background"
//         className="relative h-[95%] sm:h-[92vh] w-[95vw] rounded-[1vw] flex flex-col lg:hover:shadow-md lg:hover:shadow-slate-900 pb-6"
//         style={{
//           backgroundImage: isSmallScreen ? 'none' : `url(${bgImage})`,
//           backgroundColor: isSmallScreen ? 'transparent' : 'transparent',
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//         }}
//       >
//         <div className="flex lg:justify-around flex-col flex-wrap items-start">
//           <div className="sm:mx-auto items-start">
//             <h1 className="font-eagle sm:text-[40px] text-[25px] font-bold text-white lg:text-rose-700">
//               Painters' Diary
//             </h1>
//             <h6 className="font-cookie text-[20px] sm:text-[25px] sm:ml-16 ml-7 mt-[-10px] text-white lg:text-rose-800">
//               The Diary of Every Artist
//             </h6>
//           </div>
//           <div className="flex lg:absolute lg:top-4 lg:right-4 flex-col items-center justify-center ml-[60%] lg:mt-0 mt-2 sm:mx-auto">
//             <p className="text-white lg:text-gray-800">Already Signed up?</p>
//             <Link to="/Login">
//               <button className="font-playfair font-semibold sm:px-2 px-1 rounded-md hover:underline hover:border-green-600 hover:text-green-600 text-white lg:text-gray-800">
//                 Log-in
//               </button>
//             </Link>
//           </div>
//         </div>

//         <form
//           id="signup-form"
//           onSubmit={handleSubmit}
//           className="w-full lg:bg-none bg-gradient-to-br mt-4 from-[#ffffff8a] to-[#f0f0f57c] lg:backdrop-blur-0 backdrop-blur-lg lg:from-transparent lg:to-transparent flex flex-col lg:flex-row lg:justify-between items-center lg:px-[10%] lg:gap-0 gap-4 shadow-lg lg:shadow-none px-2 pb-4 rounded-md"
//         >
//           <div className="w-full lg:w-auto flex flex-col items-center lg:ml-0 sm:ml-[50%]">
//             <div className="w-full flex flex-col items-start">
//               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Full Name</h1>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 id="username"
//                 placeholder="Full Name"
//                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
//                 aria-label="Full Name"
//                 required />
//             </div>
//             <div className="w-full flex flex-col items-start">
//               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Gender</h1>
//               <select
//                 name="gender"
//                 id="gender"
//                 value={formData.gender}
//                 onChange={handleChange}
//                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-800 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
//                 aria-label="Gender"
//                 required
//               >
//                 <option className='text-gray-900' value="" disabled>Select gender</option>
//                 <option className='text-gray-900' value="Male">Male</option>
//                 <option className='text-gray-900' value="Female">Female</option>
//                 <option className='text-gray-900' value="Other">Other</option>
//               </select>
//             </div>
//             <div className="w-full flex flex-col items-start">
//               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Date of Birth</h1>
//               <input
//                 type="date"
//                 name="dateOfBirth"
//                 id="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
//                 aria-label="Date of Birth"
//                 required />
//             </div>
//             <div className="w-full flex flex-col items-start">
//               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Country</h1>
//               {loading ? (
//                 <p className="text-gray-600 lg:text-white">Loading countries...</p>
//               ) : countryError ? (
//                 <p className="text-red-500">{countryError}</p>
//               ) : (
//                 <select
//                   name="country"
//                   id="country"
//                   value={formData.country}
//                   onChange={handleChange}
//                   className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
//                   aria-label="Country"
//                   required
//                 >
//                   <option value="" disabled>Select a country</option>
//                   {countries.map((country) => (
//                     <option key={country.cca3} value={country.name.common}>
//                       {country.name.common}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           </div>
//           <div>
//           {/* <div className="w-full flex flex-col items-start">
//             <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Phone Number</h1>
//             <input
//               type="tel"
//               name="phoneNumber"
//               id="phone"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               placeholder={formData.country && countries.find((c) => c.name.common === formData.country)
//                 ? `${formData.callingCode} 1234567890`
//                 : 'Phone Number'}
//               className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
//               aria-label="Phone Number"
//               required />
//           </div> */}
//           <div className="w-full flex flex-col items-start">
//   <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Phone Number</h1>
//   <input
//     type="tel"
//     name="phoneNumber"
//     id="phone"
//     value={formData.phoneNumber}
//     onChange={handleChange}
//     placeholder={formData.callingCode ? `${formData.callingCode} 123456789` : "Phone Number"}
//     className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
//     aria-label="Phone Number"
//     required
//   />
// </div>
//           <div className="w-full flex flex-col items-start">
//             <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Email</h1>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               id="email"
//               placeholder="Email"
//               className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
//               aria-label="Email"
//               required />
//           </div>
//           <div className="w-full flex flex-col items-start">
//             <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Password</h1>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               id="password"
//               placeholder="Password"
//               className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
//               aria-label="Password"
//               required />
//           </div>
//           <div className="w-full flex flex-col items-start">
//             <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">City</h1>
//             <input
//               type="text"
//               name="city"
//               id="city"
//               value={formData.city}
//               onChange={handleChange}
//               placeholder="City"
//               className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
//               aria-label="City"
//               required />
//           </div>
//           </div>
//          </form>
   
//         <button
//           type="submit"
//           form='signup-form'
//           disabled={isSubmitting}
//           className="mx-auto mt-[7.5%] relative h-[45px] w-[80%] sm:w-[60%] md:w-[45%] lg:w-[30%] px-4 py-2 font-GreatVibes font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#DB2777] rounded-xl shadow-lg border border-white/30 backdrop-blur-md hover:from-[#6D28D9] hover:to-[#BE185D] hover:scale-105 transition-all duration-300 ease-in-out flex items-center justify-center"
//         >
//           {isSubmitting ? (
//             <>
//               <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
//                 <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                 <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//               </svg>
//               Creating Account...
//             </>
//           ) : (
//             'Create Account'
//           )}
//         </button>
//       <p className="mx-auto items-center justify-center mt-3 text-white text-[16px] text-center font-GreatVibes">
//         By Signing up you agree to our{' '}
//         <Link to="/Legal/Terms">
//           <span className="hover:text-blue-400 hover:underline text-purple-200 cursor-pointer">
//             Terms & Condition
//           </span>{' '}
//         </Link>
//         and{' '}
//         <Link to="/Legal/Privacy_Policy">
//           <span className="hover:text-blue-400 hover:underline text-purple-200 cursor-pointer">
//             Privacy Policy
//           </span>
//         </Link>
//       </p>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000} // Increased from 3000 to 5000
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//         style={{ zIndex: 9999 }} // Ensure it's above other elements
//       /> 
 
//   </div>
//    </div>
//   )
// }
// export default Signup;












import React, { useState, useEffect } from 'react';
import bgImage from './Image/4267109.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Client, Account } from 'appwrite';

function Signup() {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countryError, setCountryError] = useState(null);
  const [configError, setConfigError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    gender: '',
    dateOfBirth: '',
    country: '',
    callingCode: '',
    phoneNumber: '',
    email: '',
    password: '',
    city: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize Appwrite client for session management
  const client = new Client()
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
  const account = new Account(client);

  // Check environment variables
  useEffect(() => {
    const requiredEnvVars = [
      'VITE_APPWRITE_ENDPOINT',
      'VITE_APPWRITE_PROJECT_ID',
      'VITE_APPWRITE_API_KEY', // URL of the backend endpoint
    ];

    const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
    if (missingVars.length > 0) {
      setConfigError(`Missing environment variables: ${missingVars.join(', ')}`);
      toast.error('Configuration error. Contact support.');
    }
  }, []);

  // Handle screen size
  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,idd');
        if (!response.ok) throw new Error('Failed to fetch countries');

        const data = await response.json();
        const sortedData = data
          .map(country => ({
            ...country,
            callingCode: country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : '',
          }))
          .filter(country => country.callingCode)
          .sort((a, b) => a.name.common.localeCompare(b.name.common));

        setCountries(sortedData);
      } catch (err) {
        setCountryError(err.message);
        toast.error(`Failed to load countries: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'country') {
      const selectedCountry = countries.find(c => c.name.common === value);
      const callingCode = selectedCountry?.callingCode || '';
      
      setFormData(prev => ({
        ...prev,
        country: value,
        callingCode,
        phoneNumber: prev.phoneNumber,
      }));
    } else if (name === 'phoneNumber') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 15);
      setFormData(prev => ({ ...prev, phoneNumber: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = ['username', 'gender', 'dateOfBirth', 'country', 'phoneNumber', 'email', 'password', 'city'];
      const missingFields = requiredFields.filter(field => !formData[field]?.trim());
      if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate email
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        throw new Error('Invalid email address.');
      }

      // Validate username (3-30 characters)
      if (formData.username.length < 3 || formData.username.length > 30) {
        throw new Error('Username must be 3-30 characters long.');
      }

      // Validate password (8+ characters)
      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }

      // Validate phone number (7+ digits)
      if (formData.phoneNumber.length < 7) {
        throw new Error('Phone number is too short.');
      }

      // Combine calling code and phone number
      const fullPhoneNumber = `${formData.callingCode}${formData.phoneNumber}`;

      // Prepare payload for backend
      const payload = {
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: fullPhoneNumber,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        country: formData.country,
        city: formData.city,
        theme: 'light',
        Title: formData.username,
        Tag: formData.username,
        Description: 'New artist account',
        Medium: '',
      };

      // Send request to backend
      const response = await fetch(import.meta.env.VITE_APPWRITE_API_KEY, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Signup failed.');
      }

      // Set session using Appwrite client SDK
      await account.setSession(result.sessionId);

      // Success
      toast.success('Account created! Redirecting...', {
        onClose: () => navigate('/Account'),
      });
    } catch (error) {
      toast.error(error.message || 'Signup failed. Try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (configError) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tl from-[#4A00E0] to-[#8E2DE2]">
        <p className="text-white text-lg">Configuration error. Contact support.</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-auto bg-gradient-to-tl from-[#4b00e0a9] to-[#8E2DE2] flex items-center justify-center">
      <div
        className="relative h-[95%] w-[95vw] rounded-[1vw] flex flex-col pb-6"
        style={{
          backgroundImage: isSmallScreen ? 'none' : `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-4">
          <div>
            <h1 className="font-eagle text-[25px] sm:text-[40px] font-bold text-white">
              Painters' Diary
            </h1>
            <h6 className="font-cookie text-[20px] sm:text-[25px] ml-7 sm:ml-16 mt-[-10px] text-white">
              The Diary of Every Artist
            </h6>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-white">Already signed up?</p>
            <Link to="/Login" className="text-white hover:underline">Log in</Link>
          </div>
        </div>

        {/* Signup Form */}
        <form
          id="signup-form"
          onSubmit={handleSubmit}
          className="w-full lg:bg-none bg-gradient-to-br mt-4 from-[#ffffff8a] to-[#f0f0f57c] lg:backdrop-blur-0 backdrop-blur-lg lg:from-transparent lg:to-transparent flex flex-col lg:flex-row lg:justify-between items-center lg:px-[10%] lg:gap-0 gap-4 shadow-lg lg:shadow-none px-2 pb-4 rounded-md"
        >
          <div className="w-full lg:w-auto flex flex-col items-center lg:ml-0 sm:ml-[50%]">
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Full Name</h1>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                id="username"
                placeholder="Full Name"
                className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
                aria-label="Full Name"
                required
              />
            </div>
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Email</h1>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                id="email"
                placeholder="Email"
                className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
                aria-label="Email"
                required
              />
            </div>
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Password</h1>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                id="password"
                placeholder="Password"
                className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
                aria-label="Password"
                required
              />
            </div>
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Date of Birth</h1>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
                aria-label="Date of Birth"
                required
              />
            </div>
          </div>
          <div>
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Gender</h1>
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-800 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
                aria-label="Gender"
                required
              >
                <option className="text-gray-900" value="" disabled>Select gender</option>
                <option className="text-gray-900" value="Male">Male</option>
                <option className="text-gray-900" value="Female">Female</option>
                <option className="text-gray-900" value="Other">Other</option>
              </select>
            </div>
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Country</h1>
              {loading ? (
                <p className="text-gray-600 lg:text-white">Loading countries...</p>
              ) : countryError ? (
                <p className="text-red-500">{countryError}</p>
              ) : (
                <select
                  name="country"
                  id="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
                  aria-label="Country"
                  required
                >
                  <option value="" disabled>Select a country</option>
                  {countries.map((country) => (
                    <option key={country.cca3} value={country.name.common}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">City</h1>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
                aria-label="City"
                required
              />
            </div>
            <div className="w-full flex flex-col items-start">
              <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Phone Number</h1>
              <div className="flex w-full items-center justify-center gap-2">
                <input
                  type="text"
                  value={formData.callingCode}
                  readOnly
                  className="w-[50px] h-[4.5vh] mt-2 bg-gray-200 lg:bg-gray-100/30 text-gray-800 border-gray-300 lg:border-white/50 rounded-md px-2"
                  aria-label="Calling Code"
                />
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phone"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="input flex-1 bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 rounded-r-md"
                  aria-label="Phone Number"
                  required
                />
              </div>
            </div>
          </div>
          </form>

          {/* Submit Button */}
          <button
            type="submit"
            form='signup-form'
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mx-auto mt-[7.5%] w-[80%] lg:w-[30%] py-2 font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#DB2777] rounded-xl hover:opacity-90 transition-all"
          >
            {isSubmitting ? 'Creating account...' : 'Create Account'}
          </button>
   

        {/* Footer Links */}
        <p className="text-white text-center mt-4 font-GreatVibes">
          By signing up, you agree to our <Link to="/Legal/Terms" className="underline">Terms&Conditions</Link> and <Link to="/Legal/Privacy_Policy" className="underline">Privacy Policy</Link>
        </p>

        <ToastContainer position="top-right" autoClose={5000} />
      </div>
    </div>
  );
}

export default Signup;


// // import React, { useState, useEffect } from 'react';
// // import bgImage from './Image/4267109.jpg';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { toast, ToastContainer } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // // import { signUpUser } from '../appwriteService/auth';

// // function Signup() {
// //   const navigate = useNavigate();
// //   const [isSmallScreen, setIsSmallScreen] = useState(false);
// //   const [countries, setCountries] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [countryError, setCountryError] = useState(null);
// //   const [configError, setConfigError] = useState(null);
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     gender: '',
// //     dateOfBirth: '',
// //     country: '',
// //     callingCode: '',
// //     phoneNumber: '', // Stores only the digits (without calling code)
// //     email: '',
// //     password: '',
// //     city: '',
// //   });
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   // Check environment variables
// //   useEffect(() => {
// //     const requiredEnvVars = [
// //       'VITE_APPWRITE_ENDPOINT',
// //       'VITE_APPWRITE_PROJECT_ID',
// //       'VITE_APPWRITE_API_KEY',
// //     ];

// //     const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
// //     if (missingVars.length > 0) {
// //       setConfigError(`Missing environment variables: ${missingVars.join(', ')}`);
// //       toast.error('Configuration error. Contact support.');
// //     }
// //   }, []);

// //   // Handle screen size
// //   useEffect(() => {
// //     const handleResize = () => setIsSmallScreen(window.innerWidth <= 1024);
// //     handleResize();
// //     window.addEventListener('resize', handleResize);
// //     return () => window.removeEventListener('resize', handleResize);
// //   }, []);

// //   // Fetch countries
// //   useEffect(() => {
// //     const fetchCountries = async () => {
// //       try {
// //         const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,idd');
// //         if (!response.ok) throw new Error('Failed to fetch countries');
        
// //         const data = await response.json();
// //         const sortedData = data
// //           .map(country => ({
// //             ...country,
// //             callingCode: country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : '',
// //           }))
// //           .filter(country => country.callingCode)
// //           .sort((a, b) => a.name.common.localeCompare(b.name.common));
        
// //         setCountries(sortedData);
// //       } catch (err) {
// //         setCountryError(err.message);
// //         toast.error(`Failed to load countries: ${err.message}`);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchCountries();
// //   }, []);

// //   // Handle form changes
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;

// //     if (name === 'country') {
// //       const selectedCountry = countries.find(c => c.name.common === value);
// //       const callingCode = selectedCountry?.callingCode || '';
      
// //       setFormData(prev => ({
// //         ...prev,
// //         country: value,
// //         callingCode,
// //         phoneNumber: prev.phoneNumber, // Preserve existing phone number digits
// //       }));
// //     } else if (name === 'phoneNumber') {
// //       // Allow only digits and enforce a reasonable length (e.g., up to 15 digits)
// //       const digitsOnly = value.replace(/\D/g, '').slice(0, 15);
// //       setFormData(prev => ({ ...prev, phoneNumber: digitsOnly }));
// //     } else {
// //       setFormData(prev => ({ ...prev, [name]: value }));
// //     }
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setIsSubmitting(true);

// //     try {
// //       // Validate required fields
// //       const requiredFields = ['username', 'gender', 'dateOfBirth', 'country', 'phoneNumber', 'email', 'password', 'city'];
// //       const missingFields = requiredFields.filter(field => !formData[field]?.trim());
// //       if (missingFields.length > 0) {
// //         throw new Error(`Missing: ${missingFields.join(', ')}`);
// //       }

// //       // Validate age (13+)
// //       const dob = new Date(formData.dateOfBirth);
// //       const today = new Date();
// //       const age = today.getFullYear() - dob.getFullYear();
// //       if (dob > today || age < 13) throw new Error('You must be at least 13 years old.');

// //       // Validate password
// //       if (formData.password.length < 8) throw new Error('Password must be 8+ characters.');

// //       // Validate email
// //       if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
// //         throw new Error('Invalid email address.');
// //       }

// //       // Validate phone number (e.g., at least 7 digits)
// //       if (formData.phoneNumber.length < 7) {
// //         throw new Error('Phone number is too short.');
// //       }

// //       // Combine calling code and phone number for submission
// //       const fullPhoneNumber = `${formData.callingCode}${formData.phoneNumber}`;

// //       // Submit to backend
// //       await signUpUser({
// //         username: formData.username.trim(),
// //         email: formData.email.trim().toLowerCase(),
// //         password: formData.password,
// //         gender: formData.gender,
// //         dateOfBirth: formData.dateOfBirth,
// //         country: formData.country,
// //         city: formData.city,
// //         number: fullPhoneNumber, // Send combined phone number
// //         theme: 'light',
// //         Title: formData.username,
// //         Tag: formData.username,
// //         Description: 'New artist account',
// //         Medium: '',
// //       });

// //       // Success
// //       toast.success('Account created! Redirecting...', {
// //         onClose: () => navigate('/Account'),
// //       });
// //     } catch (error) {
// //       toast.error(error.message || 'Signup failed. Try again.');
// //     } finally {
// //       setIsSubmitting(false);
// //     }
// //   };

// //   if (configError) {
// //     return (
// //       <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-tl from-[#4A00E0] to-[#8E2DE2]">
// //         <p className="text-white text-lg">Configuration error. Contact support.</p>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="h-screen w-screen overflow-auto bg-gradient-to-tl from-[#4b00e0a9] to-[#8E2DE2] flex items-center justify-center">
// //       <div
// //         className="relative h-[95%] w-[95vw] rounded-[1vw] flex flex-col pb-6"
// //         style={{
// //           backgroundImage: isSmallScreen ? 'none' : `url(${bgImage})`,
// //           backgroundSize: 'cover',
// //           backgroundPosition: 'center',
// //         }}
// //       >
// //         {/* Header */}
// //         <div className="flex justify-between items-start p-4">
// //           <div>
// //             <h1 className="font-eagle text-[25px] sm:text-[40px] font-bold text-white">
// //               Painters' Diary
// //             </h1>
// //             <h6 className="font-cookie text-[20px] sm:text-[25px] ml-7 sm:ml-16 mt-[-10px] text-white">
// //               The Diary of Every Artist
// //             </h6>
// //           </div>
// //           <div className="flex flex-col items-end">
// //             <p className="text-white">Already signed up?</p>
// //             <Link to="/Login" className="text-white hover:underline">Log in</Link>
// //           </div>
// //         </div>

// //         {/* Signup Form */}
// //         <form
// //           id="signup-form"
// //           onSubmit={handleSubmit}
// //           className="w-full lg:bg-none bg-gradient-to-br mt-4 from-[#ffffff8a] to-[#f0f0f57c] lg:backdrop-blur-0 backdrop-blur-lg lg:from-transparent lg:to-transparent flex flex-col lg:flex-row lg:justify-between items-center lg:px-[10%] lg:gap-0 gap-4 shadow-lg lg:shadow-none px-2 pb-4 rounded-md"
// //         >
// //           <div className="w-full lg:w-auto flex flex-col items-center lg:ml-0 sm:ml-[50%]">
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Full Name</h1>
// //               <input
// //                 type="text"
// //                 name="username"
// //                 value={formData.username}
// //                 onChange={handleChange}
// //                 id="username"
// //                 placeholder="Full Name"
// //                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
// //                 aria-label="Full Name"
// //                 required
// //               />
// //             </div>
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Email</h1>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 id="email"
// //                 placeholder="Email"
// //                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
// //                 aria-label="Email"
// //                 required
// //               />
// //             </div>
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Password</h1>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 id="password"
// //                 placeholder="Password"
// //                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
// //                 aria-label="Password"
// //                 required
// //               />
// //             </div>
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Date of Birth</h1>
// //               <input
// //                 type="date"
// //                 name="dateOfBirth"
// //                 id="dateOfBirth"
// //                 value={formData.dateOfBirth}
// //                 onChange={handleChange}
// //                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
// //                 aria-label="Date of Birth"
// //                 required
// //               />
// //             </div>
// //           </div>
// //           <div>
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Gender</h1>
// //               <select
// //                 name="gender"
// //                 id="gender"
// //                 value={formData.gender}
// //                 onChange={handleChange}
// //                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-800 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
// //                 aria-label="Gender"
// //                 required
// //               >
// //                 <option className="text-gray-900" value="" disabled>Select gender</option>
// //                 <option className="text-gray-900" value="Male">Male</option>
// //                 <option className="text-gray-900" value="Female">Female</option>
// //                 <option className="text-gray-900" value="Other">Other</option>
// //               </select>
// //             </div>
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Country</h1>
// //               {loading ? (
// //                 <p className="text-gray-600 lg:text-white">Loading countries...</p>
// //               ) : countryError ? (
// //                 <p className="text-red-500">{countryError}</p>
// //               ) : (
// //                 <select
// //                   name="country"
// //                   id="country"
// //                   value={formData.country}
// //                   onChange={handleChange}
// //                   className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 font-Playfair"
// //                   aria-label="Country"
// //                   required
// //                 >
// //                   <option value="" disabled>Select a country</option>
// //                   {countries.map((country) => (
// //                     <option key={country.cca3} value={country.name.common}>
// //                       {country.name.common}
// //                     </option>
// //                   ))}
// //                 </select>
// //               )}
// //             </div>
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">City</h1>
// //               <input
// //                 type="text"
// //                 name="city"
// //                 id="city"
// //                 value={formData.city}
// //                 onChange={handleChange}
// //                 placeholder="City"
// //                 className="input w-full bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500"
// //                 aria-label="City"
// //                 required
// //               />
// //             </div>
// //             <div className="w-full flex flex-col items-start">
// //               <h1 className="heading text-left w-full text-gray-800 lg:text-white font-Playfair">Phone Number</h1>
// //               <div className="flex w-full items-center justify-center gap-2">
// //                 <input
// //                   type="text"
// //                   value={formData.callingCode}
// //                   readOnly
// //                   className="w-[50px] h-[4.5vh] mt-2 bg-gray-200 lg:bg-gray-100/30 text-gray-800 border-gray-300 lg:border-white/50 rounded-md px-2"
// //                   aria-label="Calling Code"
// //                 />
// //                 <input
// //                   type="tel"
// //                   name="phoneNumber"
// //                   id="phone"
// //                   value={formData.phoneNumber}
// //                   onChange={handleChange}
// //                   placeholder="1234567890"
// //                   className="input flex-1 bg-white lg:bg-gray-100/30 text-gray-800 placeholder-gray-500 lg:placeholder-gray-300 border-gray-300 lg:border-white/50 focus:ring-2 focus:ring-teal-500 rounded-r-md"
// //                   aria-label="Phone Number"
// //                   required
// //                 />
// //               </div>
// //             </div>
// //           </div>

// //           {/* Submit Button */}
         
// //         </form>
// //         <button
// //             type="submit"
// //             form="signup-form"
// //             onClick={handleSubmit}
// //             disabled={isSubmitting}
// //             className="mx-auto mt-[7.5%] w-[80%] lg:w-[30%] py-2 font-semibold text-white bg-gradient-to-r from-[#7C3AED] to-[#DB2777] rounded-xl hover:opacity-90 transition-all"
// //           >
// //             {isSubmitting ? 'Creating account...' : 'Create Account'}
// //           </button>

// //         {/* Footer Links */}
// //         <p className="text-white text-center mt-4 font-GreatVibes">
// //           By signing up, you agree to our <Link to="/Legal/Terms" className="underline">Terms&Conditions</Link> and <Link to="/Legal/Privacy_Policy" className="underline">Privacy Policy</Link>
// //         </p>

// //         <ToastContainer position="top-right" autoClose={5000} />
// //       </div>
// //     </div>
// //   );
// // }

// // export default Signup;


// import React, { useState, useEffect } from 'react';
// import bgImage from './Image/4267109.jpg';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function Signup() {
//   const navigate = useNavigate();
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [countryError, setCountryError] = useState(null);
//   const [configError, setConfigError] = useState(null);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     phone: '', // Will store complete E.164 number
//     gender: '',
//     dateOfBirth: '',
//     country: '',
//     city: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Check environment variables
//   useEffect(() => {
//     const requiredEnvVars = [
//       'VITE_APPWRITE_ENDPOINT',
//       'VITE_APPWRITE_PROJECT_ID',
//       'VITE_APPWRITE_API_KEY',
//     ];

//     const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
//     if (missingVars.length > 0) {
//       setConfigError(`Missing environment variables: ${missingVars.join(', ')}`);
//       toast.error('Configuration error. Contact support.');
//     }
//   }, []);

//   // Handle screen size
//   useEffect(() => {
//     const handleResize = () => setIsSmallScreen(window.innerWidth <= 1024);
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Fetch countries
//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch('https://restcountries.com/v3.1/all?fields=name,cca3,idd');
//         if (!response.ok) throw new Error('Failed to fetch countries');
        
//         const data = await response.json();
//         const sortedData = data
//           .map(country => ({
//             name: country.name.common,
//             code: country.cca3,
//             callingCode: country.idd?.root ? `${country.idd.root}${country.idd.suffixes?.[0] || ''}` : '',
//           }))
//           .filter(country => country.callingCode)
//           .sort((a, b) => a.name.localeCompare(b.name));
        
//         setCountries(sortedData);
//       } catch (err) {
//         setCountryError(err.message);
//         toast.error('Failed to load countries. Using default list.');
        
//         // Fallback basic country list
//         setCountries([
//           { name: 'United States', code: 'USA', callingCode: '+1' },
//           { name: 'United Kingdom', code: 'GBR', callingCode: '+44' },
//           // Add more fallback countries as needed
//         ]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCountries();
//   }, []);

//   // Handle form changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === 'country') {
//       const selectedCountry = countries.find(c => c.name === value);
//       setFormData(prev => ({
//         ...prev,
//         country: value,
//         phone: selectedCountry?.callingCode || ''
//       }));
//     } else if (name === 'phone') {
//       // Allow only digits and maintain calling code
//       const digitsOnly = value.replace(/\D/g, '');
//       const callingCode = formData.phone.match(/^\+\d+/)?.[0] || '';
//       const numberPart = digitsOnly.slice(callingCode.replace(/\D/g, '').length);
      
//       setFormData(prev => ({
//         ...prev,
//         phone: callingCode + numberPart
//       }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // Validate required fields
//       const requiredFields = ['username', 'email', 'password', 'country', 'city'];
//       const missingFields = requiredFields.filter(field => !formData[field]?.trim());
//       if (missingFields.length > 0) {
//         throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`);
//       }

//       // Email validation
//       if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email)) {
//         throw new Error('Please enter a valid email address');
//       }

//       // Password validation (min 8 chars, at least 1 number, 1 letter)
//       if (!/^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(formData.password)) {
//         throw new Error('Password must be at least 8 characters with letters and numbers');
//       }

//       // Age validation (13+ years)
//       if (formData.dateOfBirth) {
//         const dob = new Date(formData.dateOfBirth);
//         const ageDiff = Date.now() - dob.getTime();
//         const ageDate = new Date(ageDiff);
//         const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        
//         if (age < 13) {
//           throw new Error('You must be at least 13 years old to register');
//         }
//       }

//       // Prepare the data for API
//       const userData = {
//         username: formData.username.trim(),
//         email: formData.email.trim().toLowerCase(),
//         password: formData.password,
//         phone: formData.phone || undefined,
//         gender: formData.gender || undefined,
//         dateOfBirth: formData.dateOfBirth || undefined,
//         country: formData.country,
//         city: formData.city
//       };

//       // Call your backend API
//       const response = await fetch('/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData)
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || 'Registration failed. Please try again.');
//       }

//       // On successful registration
//       toast.success('Account created successfully! Redirecting...');
//       setTimeout(() => navigate('/login'), 2000);
      
//     } catch (error) {
//       toast.error(error.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (configError) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-tl from-[#4A00E0] to-[#8E2DE2]">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
//           <p className="text-gray-700 mb-4">{configError}</p>
//           <p className="text-gray-600">Please contact support for assistance.</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full overflow-auto bg-gradient-to-tl from-[#4b00e0a9] to-[#8E2DE2] flex items-center justify-center p-4">
//       <div
//         className="relative w-full max-w-6xl rounded-xl flex flex-col pb-6"
//         style={{
//           backgroundImage: isSmallScreen ? 'none' : `url(${bgImage})`,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           minHeight: '90vh'
//         }}
//       >
//         {/* Header */}
//         <div className="flex justify-between items-start p-4 md:p-6">
//           <div>
//             <h1 className="font-eagle text-2xl sm:text-4xl font-bold text-white">
//               Painters' Diary
//             </h1>
//             <h6 className="font-cookie text-xl sm:text-2xl ml-7 sm:ml-16 -mt-2 text-white">
//               The Diary of Every Artist
//             </h6>
//           </div>
//           <div className="flex flex-col items-end">
//             <p className="text-white text-sm sm:text-base">Already signed up?</p>
//             <Link 
//               to="/login" 
//               className="text-white hover:underline text-sm sm:text-base"
//             >
//               Log in
//             </Link>
//           </div>
//         </div>

//         {/* Signup Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="w-full max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mt-4"
//         >
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Left Column */}
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
//                   Full Name *
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   placeholder="Your full name"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                   Email Address *
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="your@email.com"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                   Password *
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="At least 8 characters"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   required
//                 />
//                 <p className="mt-1 text-xs text-gray-500">
//                   Must contain at least one letter and one number
//                 </p>
//               </div>

//               <div>
//                 <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
//                   Date of Birth
//                 </label>
//                 <input
//                   type="date"
//                   id="dateOfBirth"
//                   name="dateOfBirth"
//                   value={formData.dateOfBirth}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-4">
//               <div>
//                 <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
//                   Gender
//                 </label>
//                 <select
//                   id="gender"
//                   name="gender"
//                   value={formData.gender}
//                   onChange={handleChange}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 >
//                   <option value="">Select gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                   <option value="Prefer not to say">Prefer not to say</option>
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
//                   Country *
//                 </label>
//                 {loading ? (
//                   <div className="animate-pulse w-full h-10 bg-gray-200 rounded-md"></div>
//                 ) : (
//                   <select
//                     id="country"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                     required
//                   >
//                     <option value="">Select your country</option>
//                     {countries.map((country) => (
//                       <option key={country.code} value={country.name}>
//                         {country.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               </div>

//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
//                   City *
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   placeholder="Your city"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                   required
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   placeholder="+1 1234567890"
//                   className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//                 {formData.country && (
//                   <p className="mt-1 text-xs text-gray-500">
//                     Format: {formData.phone.match(/^\+\d+/)?.[0] || 'Country code'} followed by your number
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="mt-8 flex flex-col items-center">
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className={`w-full max-w-xs py-3 px-6 rounded-xl font-semibold text-white transition-all ${
//                 isSubmitting 
//                   ? 'bg-gray-400 cursor-not-allowed'
//                   : 'bg-gradient-to-r from-[#7C3AED] to-[#DB2777] hover:opacity-90'
//               }`}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center justify-center">
//                   <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Creating account...
//                 </span>
//               ) : 'Create Account'}
//             </button>

//             <p className="mt-4 text-sm text-gray-600 text-center">
//               By signing up, you agree to our {' '}
//               <Link to="/legal/terms" className="text-purple-600 hover:underline">Terms</Link> and {' '}
//               <Link to="/legal/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>
//             </p>
//           </div>
//         </form>

//         <ToastContainer 
//           position="top-center"
//           autoClose={5000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//           theme="colored"
//         />
//       </div>
//     </div>
//   );
// }

// export default Signup;



<div>
<div className="absolute inset-0 bg-black bg-opacity-50"></div>

{/* Signup Card */}
<div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden relative z-10">
  {/* Header with logo */}
  <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-center">
    <div className="flex justify-center mb-4">
      {/* <img src={logo} alt="Painters' Diary" className="h-16" /> */}
    <h1>Painters' Diary</h1>
    </div>
    <h1 className="text-3xl font-bold text-white mb-2">Give ART a Voice</h1>
    <p className="text-blue-100">
      Join our creative community and share your artistic journey with like-minded painters.
    </p>
  </div>

  {/* Signup Form */}
  <form onSubmit={handleSubmit} className="p-6 space-y-5 bg-white bg-opacity-90">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
        Name *
      </label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your full name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      />
    </div>

    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
        Email Address *
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="your@email.com"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      />
    </div>

    <div>
      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
        Phone Number
      </label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="+1 123 456 7890"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
    </div>

    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
        Password *
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      />
      <p className="mt-1 text-xs text-gray-500">
        Must be at least 8 characters
      </p>
    </div>

    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="agreeToTerms"
          name="agreeToTerms"
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          required
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
          I've read and agree with{' '}
          <Link to="/terms" className="text-purple-600 hover:underline">
            terms of service
          </Link>{' '}
          and{' '}
          <Link to="/privacy" className="text-purple-600 hover:underline">
            privacy policy
          </Link>
        </label>
      </div>
    </div>

    <button
      type="submit"
      className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      SIGN UP
    </button>

    <div className="text-center text-sm text-gray-600 mt-4">
      Already a member?{' '}
      <Link to="/login" className="text-purple-600 font-medium hover:underline">
        Log in
      </Link>
    </div>
  </form>
</div>







{/* navbar */}
<motion.nav
        className={`fixed top-0 left-0 w-full z-[1000] backdrop-blur-md ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}
        initial="initial"
        animate={isScrolled ? "scrolled" : ["animate", "unscrolled"]}
        variants={navbarVariants}
      >
        <div className=" mx-auto w-[100vw] flex justify-between items-center h-full px-4 md:px-8">
          {/* Logo with enhanced animation */}
          

<motion.div
  initial={{ y: -20, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="flex items-center justify-center text-center"
>
  <Link
    to="/"
    className="flex flex-col items-center font-eagle"
  >
    {/* Title */}
    <div className="text-xl sm:text-2xl md:text-3xl font-bold tracking-wide leading-tight">
      <span className="text-yellow-500 drop-shadow-sm">Painters'</span>
      <span className="ml-1 text-gray-800">Diary</span>
    </div>

    {/* Subtitle */}
    <p className="text-base md:text-xl text-red-700 font-cookie italic tracking-wide">
      The Diary of Every Artist
    </p>
  </Link>
</motion.div>


          {/* Right Side: Desktop Menu + Buttons */}
          <div className="flex items-center gap-3">
            {/* Enhanced Search with better UX */}
            <motion.div
              ref={searchRef}
              className="relative md:h-8 md:w-8 h-6 w-6"
              initial={false}
              animate={isSearchExpanded ? "expanded" : "collapsed"}
              variants={searchVariants}
            >
              <motion.div
                className={`absolute right-0 h-full ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-md rounded-lg flex items-center overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                whileHover={{ backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.8)' }}
              >
                {isSearchExpanded && (
                  <motion.input
                    type="text"
                    placeholder="Search artworks..."
                    className="w-full h-full px-2 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 text-sm outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    autoFocus
                  />
                )}
                <motion.button
                  className={`p-1 ${isSearchExpanded ? 'pr-3' : 'px-3'}`}
                  onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                  whileTap={{ scale: 0.9 }}
                  title="Search"
                >
                  <FaSearch className="text-lg" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Desktop Buttons - Enhanced */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/signup">
                <motion.button
                  className={`px-2 py-1 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <FaUserPlus className="text-base" />
                  <span className="text-[16px] font-Playfair">Sign up</span>
                </motion.button>
              </Link>
              <Link to="/account">
                <motion.button
                  className={`px-2 py-1 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-md rounded-lg flex items-center gap-2 text-sm font-medium border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                >
                  <FaUser className="text-base" />
                  <span className="text-[16px] font-Playfair">Profile</span>
                </motion.button>
              </Link>
            </div>

            {/* Enhanced Menu Button */}
            <motion.button
              className={`p-1 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-md rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              onClick={() => setIsMenuOpen(true)}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: darkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.8)'
              }}
              whileTap={{ scale: 0.95 }}
              title="Menu"
            >
              <CiMenuFries className="text-lg" />
            </motion.button>
          </div>
        </div>
      </motion.nav>




































         {/* <section ref={contentRef} className=' py-12 bg-gray-100 dark:bg-gray-900 w-full'>
      
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 p-4">
            Error loading images: {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {landscapeImages.map((image) => (
              <motion.div 
                key={image.$id}
                className="overflow-hidden rounded-lg shadow-lg bg-white"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <img 
                  src={image.url}
                  key={image.$id}
                  alt={image.title || 'Landscape image'} 
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                <div className="p-4">
                  <h3 className=" text-gray-800 truncate font-Quicksand font-semibold">{image.title}</h3>
                  {image.description && (
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section> 
     */}


     {/* slider section */}






<div className="w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[52vw] h-[250px] sm:h-[350px] flex items-center gap-4 sm:gap-6 px-4 mt-4 mx-auto border border-gray-800 overflow-x-scroll overflow-y-hidden scrollbar-hide">
            {/* part 1 */}
            <div
              className="h-[200px] sm:h-[250px] md:h-[300px] w-[200px] sm:w-[250px] md:w-[300px] bg-black flex-shrink-0 bg-center bg-cover flex items-center px-6"
              style={{ backgroundImage: `url(${bg_1})` }}
            >
              <div>
                <p className="text-center font-Playfair text-sm sm:text-lg md:text-xl text-gray-800 leading-snug">
                  Painting is just another way of keeping a diary.
                </p>
                <p className="text-right font-Carattere text-xs sm:text-base md:text-lg text-gray-600">
                  —Pablo Picasso
                </p>
              </div>
            </div>
            {/* part 2 */}
            <div
              className="h-[200px] sm:h-[250px] md:h-[300px] w-[200px] sm:w-[250px] md:w-[300px] bg-black flex-shrink-0 bg-center bg-cover flex items-center px-4"
              style={{ backgroundImage: `url(${bg_2})` }}
            >
              <div className="backdrop-blur-md px-2 sm:px-4 py-1 border border-gray-400">
                <p className="text-left font-Lora text-sm sm:text-lg md:text-base lg:text-lg text-gray-800 leading-snug">
                  If I could say it in words, there would be no reason to paint.
                </p>
                <p className="text-right font-Poppins text-xs sm:text-base md:text-lg text-gray-300">
                  —Edward Hopper
                </p>
              </div>
            </div>
            {/* part 3 */}
            <div
              className="h-[200px] sm:h-[250px] md:h-[300px] w-[200px] sm:w-[250px] md:w-[300px] bg-black flex-shrink-0 bg-center bg-cover flex items-center px-4"
              style={{ backgroundImage: `url(${bg_3})` }}
            >
              <div className="bg-white/60 px-2 sm:px-3 rounded-md shadow-md backdrop-blur-sm">
                <p className="font-Quintessential text-sm sm:text-base lg:text-lg text-[#a56a6a] leading-relaxed text-left">
                  The only time I feel alive is when I’m painting.
                </p>
                <p className="font-Poppins text-xs sm:text-sm md:text-base text-[#4B5563] text-right mt-2">
                  — Vincent van Gogh
                </p>
              </div>
            </div>
            {/* part 4 */}
            <div
              className="h-[200px] sm:h-[250px] md:h-[300px] w-[200px] sm:w-[250px] md:w-[300px] bg-black flex-shrink-0 bg-center bg-cover flex items-center px-4"
              style={{ backgroundImage: `url(${bg_4})` }}
            >
              <div>
                <p className="font-Protest text-sm sm:text-lg lg:text-xl text-[#2C3E50] leading-relaxed text-left font-bold">
                  Painting is self-discovery. Every good artist paints what he is.
                </p>
                <p className="font-Montserrat text-xs sm:text-sm md:text-base text-[#074044] text-right mt-2 font-semibold">
                  — Jackson Pollock
                </p>
              </div>
            </div>
            {/* part 5 */}
            <div
              className="h-[200px] sm:h-[250px] md:h-[300px] w-[200px] sm:w-[250px] md:w-[300px] bg-black flex-shrink-0 bg-center bg-cover flex items-center px-4"
              style={{ backgroundImage: `url(${bg_5})` }}
            >
              <div>
                <p className="font-Lora text-sm sm:text-base lg:text-lg text-white leading-relaxed text-left">
                  <span className="bg-black px-2">
                    If I could say it in words, there would be no reason to paint.
                  </span>
                </p>
                <p className="font-Quicksand text-xs sm:text-sm md:text-base text-[#ffffff8a] text-right mt-2 font-semibold">
                  <span className="bg-black px-2 py-1">— Edward Hopper</span>
                </p>
              </div>
            </div>
            {/* part 6 */}
            <div
              className="h-[200px] sm:h-[250px] md:h-[300px] w-[200px] sm:w-[250px] md:w-[300px] bg-black flex-shrink-0 bg-center bg-cover flex items-center px-4"
              style={{ backgroundImage: `url(${bg_6})` }}
            >
              <div>
                <p className="font-Tapestary text-sm sm:text-lg md:text-base lg:text-lg text-[#041d18] leading-relaxed text-left">
                  I dream of painting, and then I paint my dream.
                </p>
                <p className="font-Carattere font-bold text-xs sm:text-sm md:text-base lg:text-[18px] text-[#444546] text-right mt-2">
                  — Vincent van Gogh
                </p>
              </div>
            </div>












<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {uploads.map((upload, index) => (
              <motion.div
                key={upload.$id}
                className="relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image/Video Container */}
                <div
                  className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  {upload.mediaUrl && upload.isImage ? (
                    <AppwriteImage
                      fileId={upload.fileId}
                      bucketId={config.bucketId}
                      alt={upload.title || "Uploaded image"}
                      className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : upload.mediaUrl && upload.isVideo ? (
                    <video
                      src={upload.mediaUrl}
                      className="w-full h-full object-cover rounded-t-xl"
                      onError={(e) => console.warn(`Failed to load video ${upload.fileId}:`, e)}
                    />
                  ) : (
                    <ImagePlaceholder type="error" />
                  )}
                  {/* Tag Badge */}
                  {upload.tag && (
                    <span className="absolute top-3 right-3 bg-violet-600 dark:bg-violet-500 text-white text-xs font-Quicksand px-2 py-1 rounded-full capitalize">
                      {upload.tag}
                    </span>
                  )}
                </div>
                {/* Metadata Container */}
                <div className="p-4 flex flex-col gap-2 bg-white dark:bg-gray-800">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        {/* For views functionality */}
                        <motion.button
                        className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                        onClick={() => toast.info("Like functionality coming soon!")}
                        aria-label="Like"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaRegEye size={16} />
                       <span className=" text-gray-500 dark:text-gray-400 font-Quicksand">0</span>
                      </motion.button>
                        {/* For Like */}
                      <motion.button
                        className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                        onClick={() => toast.info("Like functionality coming soon!")}
                        aria-label="Like"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaRegThumbsUp size={16} />
                        <span className=" text-gray-500 dark:text-gray-400 font-Quicksand">0</span>
                      </motion.button>
                      {/* For Comment section */}
                      <motion.button
                      className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                        onClick={() => toast.info("Comment functionality coming soon!")}
                        aria-label="Like"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaRegComment size={16} />
                        <span className=" text-gray-500 dark:text-gray-400 font-Quicksand">0</span>
                      </motion.button>
                      
                      {/* FOr Download section */}
                      <motion.button
                      className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                        onClick={() => toast.info("Comment functionality coming soon!")}
                        aria-label="Like"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiDownload size={16} />
                        <span className=" text-gray-500 dark:text-gray-400 font-Quicksand">0</span>
                      </motion.button>
                      
                      {/* For Favourite Section */}
                       <motion.button
                      className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                        onClick={() => toast.info("Comment functionality coming soon!")}
                        aria-label="Like"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaRegHeart size={16} />
                        <span className=" text-gray-500 dark:text-gray-400 font-Quicksand">0</span>
                      </motion.button>
                      {/* For Share Functionality */}
                      <motion.button
                      className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-2"
                        onClick={() => toast.info("Comment functionality coming soon!")}
                        aria-label="Like"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <PiShareFatLight size={16} />
                        <span className=" text-gray-500 dark:text-gray-400 font-Quicksand">0</span>
                      </motion.button>
                    </div>
                   
                  </div>

                  <hr className="w-full mt-2" />
                   <h3 className="text-lg font-semibold font-Quicksand text-gray-900 dark:text-gray-100 line-clamp-1">
                      {upload.title || "Untitled"}
                    </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-Quicksand line-clamp-2">
                    {upload.description || "No description provided"}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-Quicksand">
                      {upload.formattedDate}
                    </span>
                  </div>
                   <motion.button
                      className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors absolute bottom-2 right-2"
                      aria-label="More options"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaEllipsisV size={16} />
                    </motion.button>
                </div>
              </motion.div>
            ))}
          </div>












          // import React, { useState, useEffect } from "react";
          // import { FaThumbsUp, FaRegThumbsUp, FaEllipsisV } from "react-icons/fa";
          // import { MdPhoto, MdVideocam, MdBook, MdErrorOutline } from "react-icons/md";
          // import { useNavigate } from "react-router-dom";
          // import { toast, ToastContainer } from "react-toastify";
          // import "react-toastify/dist/ReactToastify.css";
          // import { motion, AnimatePresence } from "framer-motion";
          // import { databases, storage, account, Query, config } from "/home/swarnadip/Documents/Index/Index/Index/src/appwriteConfig.js";
          
          // // Custom image component for Appwrite storage
          // function AppwriteImage({ fileId, bucketId, alt, className, ...props }) {
          //   const [error, setError] = useState(false);
          
          //   if (error || !fileId) {
          //     return (
          //       <div className={`${className} bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg`}>
          //         <MdErrorOutline className="text-gray-400 dark:text-gray-500 text-3xl" />
          //         <span className="sr-only">Error loading image</span>
          //       </div>
          //     );
          //   }
          
          //   const src = `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${bucketId}/files/${fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`;
          
          //   return (
          //     <img
          //       src={src}
          //       alt={alt}
          //       className={className}
          //       loading="lazy"
          //       onError={(e) => {
          //         console.error(`Failed to load image ${fileId}:`, e);
          //         setError(true);
          //       }}
          //       {...props}
          //     />
          //   );
          // }
          
          // function Your_Collections() {
          //   const navigate = useNavigate();
          //   const [activeButton, setActiveButton] = useState("Photos");
          //   const [uploads, setUploads] = useState([]);
          //   const [loading, setLoading] = useState(true);
          //   const [error, setError] = useState(null);
          
          //   const handleButtonClick = (buttonName) => {
          //     setActiveButton(buttonName);
          //   };
          
          //   useEffect(() => {
          //     const fetchUploads = async () => {
          //       try {
          //         setLoading(true);
          //         setError(null);
          
          //         const user = await account.get();
          //         const userId = user.$id;
          
          //         const mediumFilters = {
          //           Photos: [
          //             "Oil Painting", "Acrylic Painting", "Watercolor Painting", "Ink", "Charcoal", "Pastel",
          //             "Pencil Drawing", "Graphite Drawing", "Tempera", "Fresco Painting", "Mosaic Art",
          //             "Glass Art", "Fiber Art", "Sand Art", "Digital Art", "Digital Painting", "Vector Art",
          //             "Pixel Art", "3D Modeling", "Photography", "Mixed Media", "Collage", "Printmaking",
          //             "AI-Generated Art", "Augmented Reality Art", "Virtual Reality Art", "NFT Art",
          //             "Data Visualization Art", "Calligraphy", "Typography Design", "Sculpture", "Ceramic",
          //             "Installation Art", "Kinetic Art", "Light Art", "Performance Art", "Sound Art", "Bio Art",
          //             "Graphic Design", "Industrial Design", "Fashion Design", "Interior Design",
          //             "Architectural Drawing", "Game Design", "Other"
          //           ],
          //           Videos: ["Video"],
          //           Diary: ["Other"],
          //         };
          
          //         const response = await databases.listDocuments(
          //           config.databaseId,
          //           config.collectionId,
          //           [
          //             Query.equal("userId", userId),
          //             Query.orderDesc("uploadDate"),
          //             Query.limit(20),
          //             Query.select(["$id", "title", "description", "fileId", "medium", "tag", "userId", "uploadDate"]),
          //             ...(mediumFilters[activeButton] ? [Query.equal("medium", mediumFilters[activeButton])] : []),
          //           ]
          //         );
          
          //         console.log("Fetched documents:", response.documents);
          
          //         const uploadsWithMedia = response.documents.map((doc) => {
          //           if (!doc.fileId) {
          //             console.warn(`Document ${doc.$id} missing fileId`);
          //           }
          //           return {
          //             ...doc,
          //             mediaUrl: doc.fileId
          //               ? `${import.meta.env.VITE_APPWRITE_ENDPOINT}/storage/buckets/${config.bucketId}/files/${doc.fileId}/view?project=${import.meta.env.VITE_APPWRITE_PROJECT_ID}&width=800&quality=85`
          //               : null,
          //             isImage: ["Photos", "Diary"].includes(activeButton),
          //             isVideo: activeButton === "Videos",
          //             formattedDate: new Date(doc.uploadDate).toLocaleDateString("en-US", {
          //               year: "numeric",
          //               month: "short",
          //               day: "numeric",
          //             }),
          //           };
          //         });
          
          //         setUploads(uploadsWithMedia);
          //       } catch (err) {
          //         console.error("Fetch error:", {
          //           message: err.message,
          //           code: err.code,
          //           type: err.type,
          //         });
          //         if (err.code === 401) {
          //           toast.error("Please log in to view your collections.");
          //           navigate("/login");
          //         } else if (err.code === 404) {
          //           setError("Collection or bucket not found. Check Appwrite configuration.");
          //           toast.error("Collection or bucket not found.");
          //         } else if (err.code === 403) {
          //           setError("Permission denied. Ensure you have access to the collection.");
          //           toast.error("Permission denied.");
          //         } else {
          //           setError(`Failed to load collections: ${err.message}`);
          //           toast.error("Failed to load your collections.");
          //         }
          //       } finally {
          //         setLoading(false);
          //       }
          //     };
          
          //     fetchUploads();
          //   }, [activeButton, navigate]);
          
          //   const ImagePlaceholder = ({ type }) => (
          //     <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 p-4 rounded-lg">
          //       {type === "error" ? (
          //         <>
          //           <MdErrorOutline className="text-4xl mb-2" />
          //           <p className="text-center text-sm">Media unavailable</p>
          //         </>
          //       ) : (
          //         <>
          //           {activeButton === "Photos" && <MdPhoto className="text-4xl mb-2" />}
          //           {activeButton === "Videos" && <MdVideocam className="text-4xl mb-2" />}
          //           {activeButton === "Diary" && <MdBook className="text-4xl mb-2" />}
          //           <p className="text-center text-sm">No media available</p>
          //         </>
          //       )}
          //     </div>
          //   );
          
          //   return (
          //     <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          //       <ToastContainer position="top-right" autoClose={5000} theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'} />
          
          //       {/* Navigation Tabs */}
          //       <nav className="w-full max-w-7xl mx-auto px-4 py-4 bg-white dark:bg-gray-800 shadow-sm">
          //         <div className="flex gap-4">
          //           {["Photos", "Videos", "Diary"].map((buttonName) => (
          //             <motion.button
          //               key={buttonName}
          //               className={`relative px-4 py-2 flex items-center gap-2 text-sm font-medium font-Quicksand rounded-md transition-colors duration-200 ${
          //                 activeButton === buttonName
          //                   ? "bg-violet-100 dark:bg-violet-900 text-violet-600 dark:text-violet-300"
          //                   : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          //               }`}
          //               onClick={() => handleButtonClick(buttonName)}
          //               whileHover={{ scale: 1.05 }}
          //               whileTap={{ scale: 0.95 }}
          //             >
          //               {buttonName === "Photos" && <MdPhoto className="text-lg" />}
          //               {buttonName === "Videos" && <MdVideocam className="text-lg" />}
          //               {buttonName === "Diary" && <MdBook className="text-lg" />}
          //               <span>{buttonName}</span>
          //               {activeButton === buttonName && (
          //                 <motion.span
          //                   className="absolute bottom-0 left-0 w-full h-0.5 bg-violet-600 dark:bg-violet-400"
          //                   layoutId="underline"
          //                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
          //                 />
          //               )}
          //             </motion.button>
          //           ))}
          //         </div>
          //       </nav>
          
          //       {/* Main Content */}
          //       <div className="w-full max-w-7xl mx-auto px-4 py-8">
          //         {loading ? (
          //           <div className="flex justify-center items-center h-64">
          //             <motion.div
          //               className="rounded-full h-12 w-12 border-t-2 border-b-2 border-violet-500"
          //               animate={{ rotate: 360 }}
          //               transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          //             />
          //           </div>
          //         ) : error ? (
          //           <div className="text-center py-12">
          //             <p className="text-red-500 dark:text-red-400 text-lg font-Quicksand mb-4">{error}</p>
          //             <motion.button
          //               onClick={() => window.location.reload()}
          //               className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
          //               whileHover={{ scale: 1.05 }}
          //               whileTap={{ scale: 0.95 }}
          //             >
          //               Retry
          //             </motion.button>
          //           </div>
          //         ) : uploads.length === 0 ? (
          //           <div className="text-center py-12">
          //             <p className="text-gray-600 dark:text-gray-400 text-lg font-Quicksand mb-4">
          //               No {activeButton.toLowerCase()} found in your collection.
          //             </p>
          //             <motion.button
          //               onClick={() => navigate("/Account/Upload")}
          //               className="px-6 py-2 bg-violet-600 text-white rounded-full font-Quicksand hover:bg-violet-700 transition-colors"
          //               whileHover={{ scale: 1.05 }}
          //               whileTap={{ scale: 0.95 }}
          //             >
          //               Upload Your First {activeButton.slice(0, -1)}
          //             </motion.button>
          //           </div>
          //         ) : (
          //           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          //             {uploads.map((upload) => (
          //               <motion.div
          //                 key={upload.$id}
          //                 className="relative flex flex-col rounded-xl overflow-hidden bg-white dark:bg-gray-800 shadow-sm hover:shadow-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
          //                 initial={{ opacity: 0, y: 20 }}
          //                 animate={{ opacity: 1, y: 0 }}
          //                 transition={{ duration: 0.3 }}
          //               >
          //                 {/* Image/Video Container */}
          //                 <div className="relative w-full aspect-[4/3] overflow-hidden">
          //                   {upload.mediaUrl && upload.isImage ? (
          //                     <AppwriteImage
          //                       fileId={upload.fileId}
          //                       bucketId={config.bucketId}
          //                       alt={upload.title || "Uploaded image"}
          //                       className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
          //                     />
          //                   ) : upload.mediaUrl && upload.isVideo ? (
          //                     <video
          //                       src={upload.mediaUrl}
          //                       controls
          //                       className="w-full h-full object-cover rounded-t-xl"
          //                       onError={(e) => console.warn(`Failed to load video ${upload.fileId}:`, e)}
          //                     />
          //                   ) : (
          //                     <ImagePlaceholder type="error" />
          //                   )}
          //                   {/* Tag Badge */}
          //                   {upload.tag && (
          //                     <span className="absolute top-3 right-3 bg-violet-600 dark:bg-violet-500 text-white text-xs font-Quicksand px-2 py-1 rounded-full capitalize">
          //                       {upload.tag}
          //                     </span>
          //                   )}
          //                 </div>
          //                 {/* Metadata Container */}
          //                 <div className="p-4 flex flex-col gap-2 bg-white dark:bg-gray-800">
          //                   <div className="flex justify-between items-center">
          //                     <h3 className="text-lg font-semibold font-Quicksand text-gray-900 dark:text-gray-100 line-clamp-1">
          //                       {upload.title || "Untitled"}
          //                     </h3>
          //                     <motion.button
          //                       className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          //                       aria-label="More options"
          //                       whileHover={{ scale: 1.1 }}
          //                       whileTap={{ scale: 0.9 }}
          //                     >
          //                       <FaEllipsisV size={16} />
          //                     </motion.button>
          //                   </div>
          //                   <p className="text-sm text-gray-600 dark:text-gray-400 font-Quicksand line-clamp-2">
          //                     {upload.description || "No description provided"}
          //                   </p>
          //                   <div className="flex justify-between items-center mt-2">
          //                     <span className="text-xs text-gray-500 dark:text-gray-400 font-Quicksand">
          //                       {upload.formattedDate}
          //                     </span>
          //                     <div className="flex items-center gap-3">
          //                       <motion.button
          //                         className="text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          //                         onClick={() => toast.info("Like functionality coming soon!")}
          //                         aria-label="Like"
          //                         whileHover={{ scale: 1.1 }}
          //                         whileTap={{ scale: 0.9 }}
          //                       >
          //                         <FaRegThumbsUp size={16} />
          //                       </motion.button>
          //                       <span className="text-xs text-gray-500 dark:text-gray-400 font-Quicksand">0</span>
          //                     </div>
          //                   </div>
          //                 </div>
          //               </motion.div>
          //             ))}
          //           </div>
          //         )}
          //       </div>
          //     </div>
          //   );
          // }
          
          // export default Your_Collections;
          
          

















          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.$id}
                className="relative overflow-hidden rounded-xl shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                whileHover={{ scale: 1.00, shadow: '0 10px 20px rgba(0,0,0,0.2)' }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* Profile Section */}
              <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
               <Link 
               to={`/Account/${image.userId}`}
               className="flex items-center group flex-1 min-w-0"
               >
               {userProfiles[image.userId]?.profileImage ? (
               <img
               src={userProfiles[image.userId].profileImage}
               className="h-10 w-10 rounded-full object-cover"
               alt={userProfiles[image.userId].name}
               onError={(e) => {
               e.target.onerror = null;
               e.target.src = '';
               e.target.className = 'h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white';
               e.target.textContent = userProfiles[image.userId]?.name?.charAt(0) || 'U';
               }}
               />
               ) : (
               <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
               {userProfiles[image.userId]?.name?.charAt(0) || 'U'}
               </div>
               )}
               <div className="ml-3 min-w-0">
               <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:underline">
               {userProfiles[image.userId]?.name || 'Unknown Artist'}
               </p>
                {userProfiles[image.userId]?.title && (
               <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
               {userProfiles[image.userId].title}
               </p>
                )}
               </div>
               </Link>
               <FollowButton targetUserId={image.userId} />
              </div>
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title || 'Landscape image'}
                  className="w-full h-64 object-cover cursor-pointer"
                  loading="lazy"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                  onClick={() => openLightbox(index)}
                />
                {/* Actions */}
                <div className="flex justify-between items-center p-4">
                  <div className="flex space-x-4">
                  <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <FaRegEye className='text-[20px]'/>
                      <span className="text-sm font-Quicksand">{image.viewCount || 0}</span>
                    </div>
                    <LikeButton targetId={image.$id}/>
                    <button
                      onClick={() => setShowComments(showComments === image.$id ? null : image.$id)}
                      className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <FaRegComment />
                      <span className="text-sm font-Quicksand">0</span>
                    </button>
                    <div>
                      <DownloadService artwork={image} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <ShareButton artwork={image} />
                    </div>
                  </div>
                </div>
                {/* Comment Section */}
                <AnimatePresence>
                  {showComments === image.$id && (
                    <motion.div
                      className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={(e) => handleCommentSubmit(image.$id, e)} className="flex flex-col">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none"
                          rows={3}
                        />
                        <button
                          type="submit"
                          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-Quicksand"
                        >
                          Post
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
                {/* Image Details */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-Quicksand truncate">
                    {image.title || 'Untitled'}
                  </h3>
                  {image.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

































<motion.div
                key={image.$id}
                className="relative overflow-hidden rounded-xl shadow-lg"
                // whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                {/* User Profile Header */}
                <div className="flex items-center p-4 border-gray-200 dark:border-gray-700">
                  <Link 
                    to={`/Account/${image.userId}`}
                    className="flex items-center group flex-1 min-w-0"
                  >
                    {userProfiles[image.userId]?.profileImage ? (
                      <img
                        src={userProfiles[image.userId].profileImage}
                        className="h-10 w-10 rounded-full object-cover"
                        alt={userProfiles[image.userId].name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '';
                          e.target.className = 'h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white';
                          e.target.textContent = userProfiles[image.userId]?.name?.charAt(0) || 'U';
                        }}
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                        {userProfiles[image.userId]?.name?.charAt(0) || 'U'}
                      </div>
                    )}
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate group-hover:underline">
                        {userProfiles[image.userId]?.name || 'Unknown Artist'}
                      </p>
                      {userProfiles[image.userId]?.title && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {userProfiles[image.userId].title}
                        </p>
                      )}
                    </div>
                  </Link>
                  <FollowButton targetUserId={image.userId} />
                </div>

                {/* Artwork Image */}
                <img
                  src={image.url}
                  alt={image.title || 'Artwork'}
                  className="w-full h-64 object-cover cursor-pointer"
                  loading="lazy"
                  onClick={() => openLightbox(index)}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />

                {/* Artwork Actions */}
                <div className="flex justify-between items-center p-4">
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <FaRegEye className="text-[20px]" />
                      <span className="text-sm font-Quicksand">{image.viewCount || 0}</span>
                    </div>
                    <LikeButton targetId={image.$id} />
                    <button
                      onClick={() => setShowComments(showComments === image.$id ? null : image.$id)}
                      className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <FaRegComment />
                      <span className="text-sm font-Quicksand">0</span>
                    </button>
                  </div>
                  <div className="flex space-x-2">
                    <DownloadService artwork={image} />
                    <ShareButton artwork={image} />
                  </div>
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {showComments === image.$id && (
                    <motion.div
                      className="p-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <form onSubmit={(e) => handleCommentSubmit(image.$id, e)} className="flex flex-col">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="w-full p-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 resize-none"
                          rows={3}
                        />
                        <button
                          type="submit"
                          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-Quicksand"
                        >
                          Post
                        </button>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Artwork Info */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 font-Quicksand truncate">
                    {image.title || 'Untitled'}
                  </h3>
                  {image.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                      {image.description}
                    </p>
                  )}
                </div>
              </motion.div>



