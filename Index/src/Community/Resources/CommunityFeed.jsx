// // ... (Imports same as before)
// import React, { useState, useEffect } from 'react';
// import { databases, account, Query } from '../../appwriteConfig'; 
// import { toast } from 'react-toastify';
// import CommunityCard from './CommunityCard';
// import { Loader2, SearchX } from 'lucide-react';

// const CommunityFeed = ({ viewMode, searchQuery }) => {
//   // ... (Logic from previous response: data fetching, useEffect, handleJoin)
//   // ... Copy logic exactly from previous turn
  
//   // -- MOCK LOGIC FOR PREVIEW (Replace with your actual logic above) --
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false); // Set true in real app
//   // ------------------------------------------------------------------

//   // NOTE: Ensure you include the full logic here from the previous response 
//   // regarding Appwrite fetching.

//   const filteredData = data.filter(item => 
//     item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     item.description?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return (
//         <div className="flex justify-center items-center py-20 text-zinc-400">
//             <Loader2 className="animate-spin" size={30} />
//         </div>
//     );
//   }

//   // If no data (using dummy check here, in real app use filteredData.length)
//   // Use this grid layout:
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
//       {/* We use 2 columns here because the main feed column is now 
//          narrower due to the sidebars. 3 columns would look squashed.
//       */}
//       {filteredData.length > 0 ? filteredData.map(community => (
//         <CommunityCard 
//           key={community.$id} 
//           community={community}
//           isMember={viewMode === 'my'}
//           // onJoin={handleJoin} // Uncomment in real app
//         />
//       )) : (
//          // Empty State
//          <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-500 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
//             <SearchX size={48} className="mb-4 opacity-30" />
//             <p className="text-sm">No communities found.</p>
//             {viewMode === 'explore' && <p className="text-xs opacity-50">Try searching for something else.</p>}
//          </div>
//       )}
//     </div>
//   );
// };

// export default CommunityFeed;


import React, { useState, useEffect } from 'react';
import { databases, account, Query } from '../../appwriteConfig'; // Adjust path
import { toast } from 'react-toastify';
import CommunityCard from './CommunityCard';
import { Loader2, SearchX } from 'lucide-react';

const CommunityFeed = ({ viewMode, searchQuery }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);

  // 1. Get User ID on mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await account.get();
        setCurrentUserId(user.$id);
      } catch (e) {
        console.log("User not logged in");
      }
    };
    getUser();
  }, []);

  // 2. Fetch Logic
  useEffect(() => {
    const fetchData = async () => {
      if (!currentUserId && viewMode === 'my') return;
      
      setLoading(true);
      try {
        let communities = [];

        if (viewMode === 'explore') {
          // Fetch All
          const response = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
            [Query.orderDesc('$createdAt'), Query.limit(50)]
          );
          communities = response.documents;
        } 
        else if (viewMode === 'my') {
          // Fetch Joined Communities
          // Step A: Get Membership docs
          const memberDocs = await databases.listDocuments(
            import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COMMUNITY_MEMBERS_COLLECTION_ID,
            [Query.equal('userId', currentUserId)]
          );

          if (memberDocs.documents.length > 0) {
             // Step B: Get the actual community docs
             const promises = memberDocs.documents.map(doc => 
                databases.getDocument(
                    import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
                    import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
                    doc.communityId
                ).catch(e => null) // Handle deleted communities gracefully
             );
             const results = await Promise.all(promises);
             communities = results.filter(Boolean);
          }
        }

        setData(communities);
      } catch (err) {
        console.error(err);
        toast.error("Could not load communities");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [viewMode, currentUserId]);

  // 3. Handle Join Request
  const handleJoin = async (communityId) => {
    if (!currentUserId) return toast.error("Please login first");
    
    try {
        // Fetch community details for the name/owner
        const communityDoc = await databases.getDocument(
            import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COMMUNITY_COLLECTION_ID,
            communityId
        );

        await databases.createDocument(
            import.meta.env.VITE_APPWRITE_COMMUNITY_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COMMUNITY_REQUEST_COLLECTION_ID,
            'unique()',
            {
                communityId,
                communityName: communityDoc.name,
                userId: currentUserId,
                ownerId: communityDoc.ownerId,
                status: 'pending',
                createdAt: new Date().toISOString(),
            }
        );
        toast.success("Request sent successfully");
    } catch (err) {
        toast.error("Already requested or error occurred");
    }
  };

  // 4. Filtering (Client side for instant feel)
  const filteredData = data.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
        <div className="flex justify-center items-center py-20 text-zinc-400">
            <Loader2 className="animate-spin" size={30} />
        </div>
    );
  }

  if (filteredData.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
            <SearchX size={48} className="mb-4 opacity-50" />
            <p>No communities found in this section.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {filteredData.map(community => (
        <CommunityCard 
          key={community.$id} 
          community={community}
          isMember={viewMode === 'my'} // Logic: if we are in 'my' tab, we are a member
          onJoin={handleJoin}
        />
      ))}
    </div>
  );
};

export default CommunityFeed;