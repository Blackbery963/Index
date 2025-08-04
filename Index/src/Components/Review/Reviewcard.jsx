// import React from 'react'

// function Reviewcard() {
//   return (
//     <div className='w-full overflow-auto'>
//       {/* card container */}
//       <div className=' w-fit  border '>
//         {/* profile image box */}
//         <div className=' h-36 w-36 rounded-full border-2 mt-[-25%] bg-black'>
//         </div>
//         {/*  Name and description */}
//       </div>

//     </div>
//   )
// }

// export default Reviewcard


// import React from 'react';
// import { FaStar } from "react-icons/fa";

// export default function ReviewCard({ Profileimg, Username, Userdescription, Review }) {
//   return (
//     <div className="w-full flex justify-center items-center py-10 px-4">
//       <div className="relative max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
//         {/* Profile Image */}
//         <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-md overflow-hidden">
//           <img src={Profileimg} alt="User" className="w-full h-full object-cover" />
//         </div>

//         {/* Content */}
//         <div className="mt-16 text-center px-2">
//           <h3 className="text-lg font-semibold text-teal-600 dark:text-teal-400">{Username}</h3>
//           <p className="text-sm text-gray-500 dark:text-gray-400">{Userdescription}</p>

//           <div className="flex justify-center mt-4">
//             <svg className="w-6 h-6 text-teal-400" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M9 11.75C9 14.0972 7.09721 16 4.75 16H4V14.5H4.75C5.7165 14.5 6.5 13.7165 6.5 12.75V6H3V4H9V11.75ZM21 11.75C21 14.0972 19.0972 16 16.75 16H16V14.5H16.75C17.7165 14.5 18.5 13.7165 18.5 12.75V6H15V4H21V11.75Z" />
//             </svg>
//           </div>

//           <p className="mt-4 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
//             {Review}
//           </p>

//           {/* Stars */}
//           <div className="mt-6 flex justify-center gap-1 absolute -bottom-2">
//             {[...Array(5)].map((_, i) => (
//               <FaStar key={i} className="text-teal-500" />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
