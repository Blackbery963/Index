// components/InviteSystem.jsx
import React, { useState } from 'react';
import { useInviteSystem } from './useInviteSystem';
import {
  Users,
  Gift,
  Share2,
  Copy,
  Mail,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  Zap,
  Crown,
  Star,
  Clock,
  CheckCircle,
  X,
  Plus,
  Trash2,
  ExternalLink
} from 'lucide-react';

const InviteSystem = () => {
  const {
    invites,
    loading,
    stats,
    createInvite,
    revokeInvite,
    shareInvite,
    copyToClipboard
  } = useInviteSystem();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [email, setEmail] = useState('');
  const [maxUses, setMaxUses] = useState(1);
  const [expiresInDays, setExpiresInDays] = useState(7);
  const [copiedCode, setCopiedCode] = useState('');

  const handleCreateInvite = async (e) => {
    e.preventDefault();
    try {
      await createInvite(email, maxUses, expiresInDays);
      setShowCreateModal(false);
      setEmail('');
      setMaxUses(1);
      setExpiresInDays(7);
    } catch (error) {
      console.error('Failed to create invite:', error);
    }
  };

  const handleCopyCode = async (code) => {
    const success = await copyToClipboard(code);
    if (success) {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(''), 2000);
    }
  };

  const handleRevoke = async (inviteId) => {
    if (window.confirm('Are you sure you want to revoke this invite?')) {
      await revokeInvite(inviteId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'accepted': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'pending': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      case 'expired': return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
      case 'revoked': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getRewardIcon = (rewardType) => {
    switch (rewardType) {
      case 'premium_days':
      case 'premium_trial':
        return <Crown className="w-4 h-4" />;
      case 'storage_space':
        return <Zap className="w-4 h-4" />;
      case 'exclusive_content':
        return <Star className="w-4 h-4" />;
      case 'welcome_bonus':
        return <Gift className="w-4 h-4" />;
      case 'early_access':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Gift className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Invites</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalInvites}</p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Accepted</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.acceptedInvites}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.pendingInvites}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rewards Earned</p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.rewardsEarned}</p>
            </div>
            <Gift className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Create Invite Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Invite Friends</h2>
            <p className="text-gray-600 dark:text-gray-400">Share ArtVision and earn rewards together</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            Create Invite
          </button>
        </div>

        {/* Rewards Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Your Rewards</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Crown className="w-4 h-4 text-purple-500" />
                1 friend = Exclusive content pack
              </li>
              <li className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" />
                3 friends = +5GB storage
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                5 friends = 7 days premium
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Friend's Rewards</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <Gift className="w-4 h-4 text-green-500" />
                14 days premium trial
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                Early access to features
              </li>
              <li className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                100 welcome points
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Active Invites List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Invites</h3>
        
        {invites.length === 0 ? (
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No invites created yet</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Create your first invite to start sharing ArtVision
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {invites.map((invite) => (
              <div
                key={invite.id}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(invite.status)}`}>
                    {invite.status}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <code className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                        {invite.code}
                      </code>
                      {copiedCode === invite.code && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Uses: {invite.usedCount}/{invite.maxUses}</span>
                      <span>Expires: {new Date(invite.expiresAt).toLocaleDateString()}</span>
                      {invite.inviteeEmail && (
                        <span>Email: {invite.inviteeEmail}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Rewards */}
                  <div className="flex items-center gap-1 mr-4">
                    {getRewardIcon(invite.rewards.inviter)}
                    {getRewardIcon(invite.rewards.invitee)}
                  </div>

                  {/* Actions */}
                  <button
                    onClick={() => handleCopyCode(invite.code)}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    title="Copy code"
                  >
                    <Copy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>

                  <div className="relative group">
                    <button
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                      title="Share invite"
                    >
                      <Share2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    
                    {/* Share Dropdown */}
                    <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="grid grid-cols-2 gap-1">
                        <button
                          onClick={() => shareInvite(invite, 'twitter')}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded flex items-center gap-2 text-xs"
                        >
                          <Twitter className="w-3 h-3 text-blue-500" />
                          Twitter
                        </button>
                        <button
                          onClick={() => shareInvite(invite, 'facebook')}
                          className="p-2 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded flex items-center gap-2 text-xs"
                        >
                          <Facebook className="w-3 h-3 text-blue-600" />
                          Facebook
                        </button>
                        <button
                          onClick={() => shareInvite(invite, 'whatsapp')}
                          className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded flex items-center gap-2 text-xs"
                        >
                          <MessageCircle className="w-3 h-3 text-green-500" />
                          WhatsApp
                        </button>
                        <button
                          onClick={() => shareInvite(invite, 'email')}
                          className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded flex items-center gap-2 text-xs"
                        >
                          <Mail className="w-3 h-3 text-gray-500" />
                          Email
                        </button>
                      </div>
                    </div>
                  </div>

                  {invite.status === 'pending' && (
                    <button
                      onClick={() => handleRevoke(invite.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors text-red-600 dark:text-red-400"
                      title="Revoke invite"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Invite Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Create New Invite</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <form onSubmit={handleCreateInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Friend's Email (Optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="friend@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Maximum Uses
                </label>
                <select
                  value={maxUses}
                  onChange={(e) => setMaxUses(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={1}>Single use</option>
                  <option value={5}>5 uses</option>
                  <option value={10}>10 uses</option>
                  <option value={25}>25 uses</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Expires In
                </label>
                <select
                  value={expiresInDays}
                  onChange={(e) => setExpiresInDays(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value={1}>1 day</option>
                  <option value={7}>7 days</option>
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg font-medium transition-all disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Invite'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteSystem;