// hooks/useInviteSystem.js
import { useState, useCallback, useEffect } from 'react';

export const useInviteSystem = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalInvites: 0,
    acceptedInvites: 0,
    pendingInvites: 0,
    rewardsEarned: 0
  });

  // Generate unique invite code
  const generateInviteCode = useCallback(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }, []);

  // Create new invite
  const createInvite = useCallback(async (email = '', maxUses = 1, expiresInDays = 7) => {
    setLoading(true);
    try {
      const inviteCode = generateInviteCode();
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + expiresInDays);

      const newInvite = {
        id: Date.now().toString(),
        code: inviteCode,
        inviterId: 'current-user-id', // Replace with actual user ID
        inviteeEmail: email,
        status: 'pending',
        maxUses,
        usedCount: 0,
        expiresAt: expiresAt.toISOString(),
        createdAt: new Date().toISOString(),
        rewards: {
          inviter: getInviterReward(maxUses),
          invitee: getInviteeReward()
        },
        shareUrl: `${window.location.origin}/invite/${inviteCode}`,
        shortUrl: await generateShortUrl(inviteCode) // Optional
      };

      // Save to localStorage (replace with API call in production)
      const savedInvites = JSON.parse(localStorage.getItem('artvision_invites') || '[]');
      savedInvites.push(newInvite);
      localStorage.setItem('artvision_invites', JSON.stringify(savedInvites));

      setInvites(prev => [newInvite, ...prev]);
      updateStats();

      return newInvite;
    } catch (error) {
      console.error('Error creating invite:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [generateInviteCode]);

  // Get inviter reward based on invite type
  const getInviterReward = (maxUses) => {
    if (maxUses > 5) return 'premium_days';
    if (maxUses > 1) return 'storage_space';
    return 'exclusive_content';
  };

  // Get invitee reward
  const getInviteeReward = () => {
    const rewards = ['premium_trial', 'welcome_bonus', 'early_access'];
    return rewards[Math.floor(Math.random() * rewards.length)];
  };

  // Generate short URL (mock implementation)
  const generateShortUrl = async (code) => {
    // In production, integrate with URL shortener service
    return `${window.location.origin}/i/${code}`;
  };

  // Validate invite code
  const validateInvite = useCallback(async (code) => {
    try {
      // Check localStorage (replace with API call in production)
      const savedInvites = JSON.parse(localStorage.getItem('artvision_invites') || '[]');
      const invite = savedInvites.find(inv => inv.code === code);

      if (!invite) {
        return { valid: false, error: 'Invalid invite code' };
      }

      if (invite.status !== 'pending') {
        return { valid: false, error: 'Invite already used or expired' };
      }

      if (new Date(invite.expiresAt) < new Date()) {
        return { valid: false, error: 'Invite has expired' };
      }

      if (invite.usedCount >= invite.maxUses) {
        return { valid: false, error: 'Invite has reached maximum uses' };
      }

      return { valid: true, invite };
    } catch (error) {
      console.error('Error validating invite:', error);
      return { valid: false, error: 'Validation failed' };
    }
  }, []);

  // Accept invite
  const acceptInvite = useCallback(async (code, userData) => {
    setLoading(true);
    try {
      const validation = await validateInvite(code);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      const { invite } = validation;

      // Update invite status (replace with API call in production)
      const savedInvites = JSON.parse(localStorage.getItem('artvision_invites') || '[]');
      const updatedInvites = savedInvites.map(inv => {
        if (inv.code === code) {
          return {
            ...inv,
            status: 'accepted',
            usedCount: inv.usedCount + 1,
            acceptedAt: new Date().toISOString(),
            acceptedBy: userData
          };
        }
        return inv;
      });

      localStorage.setItem('artvision_invites', JSON.stringify(updatedInvites));

      // Apply rewards
      await applyRewards(invite, userData);

      setInvites(updatedInvites);
      updateStats();

      return { success: true, rewards: invite.rewards };
    } catch (error) {
      console.error('Error accepting invite:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [validateInvite]);

  // Apply rewards to users
  const applyRewards = async (invite, userData) => {
    const rewards = {
      inviter: {},
      invitee: {}
    };

    // Apply inviter rewards
    switch (invite.rewards.inviter) {
      case 'premium_days':
        rewards.inviter = { type: 'premium', value: '7 days' };
        break;
      case 'storage_space':
        rewards.inviter = { type: 'storage', value: '5GB' };
        break;
      case 'exclusive_content':
        rewards.inviter = { type: 'content', value: 'premium_art_pack' };
        break;
    }

    // Apply invitee rewards
    switch (invite.rewards.invitee) {
      case 'premium_trial':
        rewards.invitee = { type: 'premium', value: '14 days trial' };
        break;
      case 'welcome_bonus':
        rewards.invitee = { type: 'bonus', value: '100 points' };
        break;
      case 'early_access':
        rewards.invitee = { type: 'access', value: 'beta_features' };
        break;
    }

    // Save rewards to user profile (replace with API call)
    const userRewards = JSON.parse(localStorage.getItem('artvision_rewards') || '{}');
    userRewards[userData.id] = rewards.invitee;
    localStorage.setItem('artvision_rewards', JSON.stringify(userRewards));

    return rewards;
  };

  // Revoke invite
  const revokeInvite = useCallback(async (inviteId) => {
    setLoading(true);
    try {
      const savedInvites = JSON.parse(localStorage.getItem('artvision_invites') || '[]');
      const updatedInvites = savedInvites.map(inv => {
        if (inv.id === inviteId) {
          return { ...inv, status: 'revoked' };
        }
        return inv;
      });

      localStorage.setItem('artvision_invites', JSON.stringify(updatedInvites));
      setInvites(updatedInvites);
      updateStats();
    } catch (error) {
      console.error('Error revoking invite:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // Load invites on component mount
  const loadInvites = useCallback(() => {
    try {
      const savedInvites = JSON.parse(localStorage.getItem('artvision_invites') || '[]');
      setInvites(savedInvites);
      updateStats();
    } catch (error) {
      console.error('Error loading invites:', error);
    }
  }, []);

  // Update statistics
  const updateStats = useCallback(() => {
    const savedInvites = JSON.parse(localStorage.getItem('artvision_invites') || '[]');
    const stats = {
      totalInvites: savedInvites.length,
      acceptedInvites: savedInvites.filter(inv => inv.status === 'accepted').length,
      pendingInvites: savedInvites.filter(inv => inv.status === 'pending').length,
      rewardsEarned: savedInvites.filter(inv => inv.status === 'accepted').length * 10 // Example calculation
    };
    setStats(stats);
  }, []);

  // Share invite via different platforms
  const shareInvite = useCallback((invite, platform) => {
    const shareText = `Join me on ArtVision! Use my invite code ${invite.code} to get exclusive rewards and discover amazing artwork. ${invite.shareUrl}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(invite.shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(invite.shareUrl)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText)}`,
      email: `mailto:?subject=Join me on ArtVision&body=${encodeURIComponent(shareText)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(invite.shareUrl)}&text=${encodeURIComponent(shareText)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else if (navigator.share) {
      // Web Share API for mobile
      navigator.share({
        title: 'Join ArtVision',
        text: shareText,
        url: invite.shareUrl
      });
    }
  }, []);

  // Copy invite link to clipboard
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    }
  }, []);

  useEffect(() => {
    loadInvites();
  }, [loadInvites]);

  return {
    invites,
    loading,
    stats,
    createInvite,
    validateInvite,
    acceptInvite,
    revokeInvite,
    shareInvite,
    copyToClipboard,
    loadInvites
  };
};