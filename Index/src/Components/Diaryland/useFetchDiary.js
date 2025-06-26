// // useFetchDiaries.js
// import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import {extractDiary} from './ExractDiaries'


// export const useFetchDiaries = () => {
//   const [diaries, setDiaries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [hasMore, setHasMore] = useState(true);
//   const [page, setPage] = useState(0);

//   const fetchDiaries = async (page = 0, reset = false) => {
//     try {
//       setError(null);
//       setLoading(true);
      
//       const limit = 9;
//       const response = await extractDiary.fetchDiaries({
//         limit,
//         offset: page * limit
//       });

//       const entries = Array.isArray(response) ? response : response?.documents || [];
      
//       setDiaries(prev => reset ? entries : [...prev, ...entries]);
//       setHasMore(entries.length === limit);
//       setPage(page);
//     } catch (err) {
//       setError(err.message || 'Failed to load diaries');
//       toast.error('Failed to load diaries');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDiaries(0, true);
//   }, []);

//   return {
//     diaries,
//     loading,
//     error,
//     hasMore,
//     fetchDiaries,
//     page
//   };
// };


// useFetchDiaries.js
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { extractDiary } from './ExractDiaries';

export const useFetchDiaries = () => {
  const [diaries, setDiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const fetchDiaries = async (page = 0, reset = false) => {
    try {
      setError(null);
      setLoading(true);
      
      const limit = 9;
      const response = await extractDiary.loadEntries({ // Changed from fetchDiaries to loadEntries
        limit,
        offset: page * limit
      });

      // Debugging log - remove in production
      console.log('API Response:', response);

      if (!response) {
        throw new Error('No response received from server');
      }

      const entries = response.documents || []; // Access .documents property
      
      setDiaries(prev => reset ? entries : [...prev, ...entries]);
      setHasMore(entries.length === limit);
      setPage(page);
    } catch (err) {
      console.error('Fetch error details:', err); // More detailed error logging
      setError(err.message || 'Failed to load diaries');
      toast.error(err.message || 'Failed to load diaries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiaries(0, true);
  }, []);

  return {
    diaries,
    loading,
    error,
    hasMore,
    fetchDiaries,
    page
  };
};