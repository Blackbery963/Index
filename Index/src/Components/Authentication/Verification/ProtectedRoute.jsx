// ProtectedRoute.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  
  useEffect(() => {
    if (!userProfile.userId) {
      navigate('/login');
    } else if (!userProfile.isVerified) {
      navigate('/Authentication/Verification/EmailVerification', { 
        state: { 
          email: userProfile.email, 
          userId: userProfile.$id 
        } 
      });
    }
  }, [userProfile, navigate]);
  
  if (!userProfile.userId || !userProfile.isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Checking authentication...</p>
        </div>
      </div>
    );
  }
  
  return children;
};

export default ProtectedRoute;