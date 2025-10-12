class PersonalizedRecommendationEngine {
  constructor() {
    this.userProfile = this.loadUserProfile();
    this.interactionWeights = {
      like: 4,
      save: 6,
      share: 5,
      view: 1,
      timeSpent: 2
    };
    
    // Configuration
    this.config = {
      maxInteractions: 1000,
      maxStorageSize: 4500000, // ~4.5MB (leaving buffer for 5MB limit)
      interactionDecayDays: 30,
      minTagLength: 2,
      maxTags: 100
    };
  }

  // Profile Management
  getDefaultProfile() {
    return {
      preferences: {},
      interactions: [],
      categories: [],
      colors: [],
      styles: [],
      artists: [],
      timeOfDay: {},
      sessionBehavior: [],
      tagPreferences: {},
      version: '1.0' // For future migrations
    };
  }

  loadUserProfile() {
    try {
      const saved = localStorage.getItem('artPersonalizationProfile');
      if (!saved) return this.getDefaultProfile();
      
      const parsed = JSON.parse(saved);
      
      // Validate and sanitize loaded data
      const profile = {
        preferences: this.validateObject(parsed.preferences),
        interactions: this.validateArray(parsed.interactions).slice(-this.config.maxInteractions),
        categories: this.validateArray(parsed.categories),
        colors: this.validateArray(parsed.colors),
        styles: this.validateArray(parsed.styles),
        artists: this.validateArray(parsed.artists),
        timeOfDay: this.validateObject(parsed.timeOfDay),
        sessionBehavior: this.validateArray(parsed.sessionBehavior),
        tagPreferences: this.validateObject(parsed.tagPreferences),
        version: parsed.version || '1.0'
      };

      // Clean old interactions
      profile.interactions = this.cleanOldInteractions(profile.interactions);
      
      return profile;
    } catch (err) {
      console.error('Error loading user profile, resetting:', err);
      return this.getDefaultProfile();
    }
  }

  saveUserProfile() {
    try {
      // Trim if necessary before saving
      this.trimProfileIfNeeded();
      
      const data = JSON.stringify(this.userProfile);
      
      // Check size
      if (data.length > this.config.maxStorageSize) {
        console.warn('Profile data too large, trimming...');
        this.trimProfile();
        return this.saveUserProfile(); // Retry after trimming
      }
      
      localStorage.setItem('artPersonalizationProfile', data);
      return true;
    } catch (err) {
      if (err.name === 'QuotaExceededError') {
        console.error('localStorage quota exceeded, aggressive trimming...');
        this.aggressiveTrim();
        
        // Final retry
        try {
          localStorage.setItem('artPersonalizationProfile', JSON.stringify(this.userProfile));
          return true;
        } catch (retryErr) {
          console.error('Failed to save profile even after aggressive trimming');
          return false;
        }
      } else {
        console.error('Error saving user profile:', err);
        return false;
      }
    }
  }

  // Validation Helpers
  validateArray(input) {
    return Array.isArray(input) ? input : [];
  }

  validateObject(input) {
    return input && typeof input === 'object' && !Array.isArray(input) ? input : {};
  }

  validateNumber(input, defaultValue = 0) {
    const num = Number(input);
    return isFinite(num) ? num : defaultValue;
  }

  // Tag Normalization
  normalizeTags(tagInput) {
    if (!tagInput) return [];
    
    let tags = [];
    
    if (Array.isArray(tagInput)) {
      tags = tagInput;
    } else if (typeof tagInput === 'string') {
      tags = tagInput.split(',');
    } else {
      return [];
    }
    
    return tags
      .filter(tag => tag && typeof tag === 'string')
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag.length >= this.config.minTagLength)
      .slice(0, 20); // Limit tags per item
  }

  // Interaction Recording
  recordInteraction(imageId, type, metadata = {}) {
    if (!imageId || !type) {
      console.warn('Invalid interaction: missing imageId or type');
      return;
    }

    const interaction = {
      imageId: String(imageId),
      type: String(type),
      timestamp: Date.now(),
      metadata: this.sanitizeMetadata(metadata)
    };
    
    this.userProfile.interactions.push(interaction);
    
    // Maintain size limit
    if (this.userProfile.interactions.length > this.config.maxInteractions) {
      this.userProfile.interactions = this.userProfile.interactions.slice(-this.config.maxInteractions);
    }
    
    this.updatePreferences(metadata, type);
    this.saveUserProfile();
  }

  sanitizeMetadata(metadata) {
    const sanitized = {};
    
    if (metadata.category && typeof metadata.category === 'string') {
      sanitized.category = metadata.category.toLowerCase().trim();
    }
    
    if (metadata.artist && typeof metadata.artist === 'string') {
      sanitized.artist = metadata.artist.trim();
    }
    
    if (metadata.tag || metadata.tags) {
      sanitized.tags = this.normalizeTags(metadata.tag || metadata.tags);
    }
    
    if (metadata.timestamp) {
      sanitized.timestamp = this.validateNumber(metadata.timestamp, Date.now());
    }
    
    return sanitized;
  }

  updatePreferences(metadata, interactionType) {
    const weight = this.interactionWeights[interactionType] || 1;
    const decayFactor = this.calculateDecayFactor(metadata.timestamp);
    const adjustedWeight = weight * decayFactor;
    
    // Update category preferences
    if (metadata.category) {
      const category = String(metadata.category).toLowerCase().trim();
      this.userProfile.preferences[category] = 
        (this.userProfile.preferences[category] || 0) + adjustedWeight;
    }

    // Update tag preferences with normalized tags
    const tags = this.normalizeTags(metadata.tag || metadata.tags);
    tags.forEach(tag => {
      if (tag) {
        this.userProfile.tagPreferences[tag] = 
          (this.userProfile.tagPreferences[tag] || 0) + adjustedWeight * 0.5;
      }
    });

    // Trim tag preferences if too many
    this.trimTagPreferences();

    // Update time-of-day preferences
    const hour = new Date().getHours();
    const timeSlot = this.getTimeSlot(hour);
    this.userProfile.timeOfDay[timeSlot] = 
      (this.userProfile.timeOfDay[timeSlot] || 0) + 1;
  }

  getTimeSlot(hour) {
    if (hour < 6) return 'night';
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  }

  calculateDecayFactor(timestamp) {
    if (!timestamp) return 1;
    
    const now = Date.now();
    const ageInDays = (now - timestamp) / (1000 * 60 * 60 * 24);
    
    // Exponential decay: newer interactions have more weight
    return Math.exp(-ageInDays / this.config.interactionDecayDays);
  }

  // Scoring Algorithm
  calculatePersonalizationScore(image) {
    if (!image) return 0;
    
    let score = 0;
    
    // Category preference score (35%)
    if (image.category) {
      const category = String(image.category).toLowerCase().trim();
      const categoryScore = this.userProfile.preferences[category] || 0;
      score += categoryScore * 0.35;
    }

    // Tag similarity score (25%)
    const tags = this.normalizeTags(image.tag || image.tags);
    if (tags.length > 0) {
      const tagScore = tags.reduce((acc, tag) => {
        return acc + (this.userProfile.tagPreferences[tag] || 0);
      }, 0);
      score += tagScore * 0.25;
    }

    // Time-of-day relevance (10%)
    const hour = new Date().getHours();
    const timeSlot = this.getTimeSlot(hour);
    const timeScore = this.userProfile.timeOfDay[timeSlot] || 0;
    score += timeScore * 0.1;

    // Diversity/novelty factor (5%)
    const categoryExposure = this.userProfile.interactions.filter(
      i => i.metadata && i.metadata.category === (image.category || '').toLowerCase()
    ).length;
    const noveltyScore = Math.max(0, 15 - categoryExposure);
    score += noveltyScore * 0.05;

    // Trending boost (15%)
    const trendingScore = this.validateNumber(image.trending, 0);
    score += trendingScore * 0.15;

    // Social proof (likes + views) (10%)
    const likes = this.validateNumber(image.likes, 0);
    const views = this.validateNumber(image.views, 0);
    score += likes * 0.002;
    score += views * 0.0002;

    // Ensure valid output
    const finalScore = this.validateNumber(score, 0);
    return Math.max(0, finalScore);
  }

  getPersonalizedFeed(images) {
    if (!Array.isArray(images)) {
      console.warn('getPersonalizedFeed: images must be an array');
      return [];
    }

    return images
      .map(image => {
        if (!image) return null;
        
        try {
          return {
            ...image,
            personalScore: this.calculatePersonalizationScore(image)
          };
        } catch (err) {
          console.error('Error scoring image:', err);
          return {
            ...image,
            personalScore: 0
          };
        }
      })
      .filter(Boolean)
      .sort((a, b) => b.personalScore - a.personalScore);
  }

  // Maintenance Methods
  cleanOldInteractions(interactions) {
    const cutoffDate = Date.now() - (this.config.interactionDecayDays * 24 * 60 * 60 * 1000);
    return interactions.filter(interaction => 
      interaction.timestamp && interaction.timestamp > cutoffDate
    );
  }

  trimTagPreferences() {
    const tags = Object.entries(this.userProfile.tagPreferences);
    
    if (tags.length > this.config.maxTags) {
      // Keep only top tags by score
      const sortedTags = tags.sort((a, b) => b[1] - a[1]);
      this.userProfile.tagPreferences = Object.fromEntries(
        sortedTags.slice(0, this.config.maxTags)
      );
    }
  }

  trimProfileIfNeeded() {
    // Trim interactions
    if (this.userProfile.interactions.length > this.config.maxInteractions) {
      this.userProfile.interactions = this.userProfile.interactions.slice(-this.config.maxInteractions);
    }
    
    // Trim tags
    this.trimTagPreferences();
  }

  trimProfile() {
    // Keep only 500 most recent interactions
    this.userProfile.interactions = this.userProfile.interactions.slice(-500);
    
    // Reduce tag preferences to top 50
    const tags = Object.entries(this.userProfile.tagPreferences);
    const sortedTags = tags.sort((a, b) => b[1] - a[1]);
    this.userProfile.tagPreferences = Object.fromEntries(sortedTags.slice(0, 50));
    
    // Decay time-of-day preferences
    const hour = new Date().getHours();
    const currentTimeSlot = this.getTimeSlot(hour);
    
    Object.keys(this.userProfile.timeOfDay).forEach(slot => {
      if (slot !== currentTimeSlot) {
        this.userProfile.timeOfDay[slot] = Math.floor(this.userProfile.timeOfDay[slot] * 0.9);
      }
    });
    
    // Clear unused arrays
    this.userProfile.sessionBehavior = [];
  }

  aggressiveTrim() {
    // Extreme trimming for quota issues
    this.userProfile.interactions = this.userProfile.interactions.slice(-200);
    
    const tags = Object.entries(this.userProfile.tagPreferences);
    const sortedTags = tags.sort((a, b) => b[1] - a[1]);
    this.userProfile.tagPreferences = Object.fromEntries(sortedTags.slice(0, 20));
    
    // Clear all optional data
    this.userProfile.sessionBehavior = [];
    this.userProfile.categories = [];
    this.userProfile.colors = [];
    this.userProfile.styles = [];
    this.userProfile.artists = [];
  }

  // Utility Methods
  clearProfile() {
    this.userProfile = this.getDefaultProfile();
    try {
      localStorage.removeItem('artPersonalizationProfile');
    } catch (err) {
      console.error('Error clearing profile:', err);
    }
  }

  getProfileStats() {
    return {
      totalInteractions: this.userProfile.interactions.length,
      topCategories: Object.entries(this.userProfile.preferences)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([cat, score]) => ({ category: cat, score })),
      topTags: Object.entries(this.userProfile.tagPreferences)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag, score]) => ({ tag, score })),
      favoriteTimeSlot: Object.entries(this.userProfile.timeOfDay)
        .sort((a, b) => b[1] - a[1])[0]?.[0] || 'none',
      profileAge: this.userProfile.interactions[0]?.timestamp 
        ? Math.floor((Date.now() - this.userProfile.interactions[0].timestamp) / (1000 * 60 * 60 * 24))
        : 0
    };
  }

  exportProfile() {
    return JSON.stringify(this.userProfile, null, 2);
  }

  importProfile(profileJson) {
    try {
      const parsed = JSON.parse(profileJson);
      this.userProfile = this.loadUserProfile(); // Reset
      
      // Merge imported data safely
      this.userProfile = {
        ...this.userProfile,
        ...parsed
      };
      
      this.saveUserProfile();
      return true;
    } catch (err) {
      console.error('Error importing profile:', err);
      return false;
    }
  }
}

export default PersonalizedRecommendationEngine;