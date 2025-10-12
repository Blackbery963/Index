// components/InviteAcceptance.jsx
import React, { useState, useEffect } from 'react';
import { useInviteSystem } from './useInviteSystem';
import { Crown, Gift, CheckCircle, X, AlertCircle } from 'lucide-react';

const InviteAcceptance = ({ inviteCode, onSuccess, onClose }) => {
  const { validateInvite, acceptInvite, loading } = useInviteSystem();
  const [invite, setInvite] = useState(null);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (inviteCode) {
      validateInviteCode();
    }
  }, [inviteCode]);

  const validateInviteCode = async () => {
    const validation = await validateInvite(inviteCode);
    if (validation.valid) {
      setInvite(validation.invite);
      setError('');
    } else {
      setError(validation.error);
    }
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    try {
      const result = await acceptInvite(inviteCode, userData);
      if (onSuccess) {
        onSuccess(result);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (error && !invite) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Invalid Invite</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!invite) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl p-6 text-white text-center">
          <Gift className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">You're Invited!</h2>
          <p className="opacity-90">Join ArtVision and claim your welcome rewards</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Rewards Display */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Your Welcome Rewards
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              {invite.rewards.invitee === 'premium_trial' && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  14 days premium trial
                </li>
              )}
              {invite.rewards.invitee === 'welcome_bonus' && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  100 welcome points
                </li>
              )}
              {invite.rewards.invitee === 'early_access' && (
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Early access to new features
                </li>
              )}
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Unlimited art discovery
              </li>
            </ul>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleAccept} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={userData.name}
                onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={userData.email}
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
              >
                {loading ? 'Accepting...' : 'Accept Invite & Join'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InviteAcceptance;