
// TemporaryShareView component
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { databases } from '../appwriteConfig';

const TemporaryShareView = () => {
  const { token } = useParams();
  const [isValid, setIsValid] = useState(null);
  const [artworkId, setArtworkId] = useState(null);

  useEffect(() => {
    const validateToken = async () => {
      try {
        const shareDoc = await databases.getDocument('main', 'temporaryShares', token);
        const now = new Date();
        const expiresAt = new Date(shareDoc.expiresAt);
        
        if (now < expiresAt) {
          setIsValid(true);
          setArtworkId(shareDoc.artworkId);
        } else {
          setIsValid(false);
          // Delete expired share
          await databases.deleteDocument('main', 'temporaryShares', token);
        }
      } catch (err) {
        console.error('Error validating share token:', err);
        setIsValid(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <div>This share link has expired or is invalid.</div>;
  }

  return <Navigate to={`/artwork/${artworkId}`} replace />;
};

export default TemporaryShareView;