// Chat classification and filtering system
export const CHAT_PATTERNS = {
  // Art-related topics (ALLOW)
  ART_TOPICS: [
    'draw', 'paint', 'sketch', 'art', 'color', 'brush', 'canvas', 'pencil',
    'watercolor', 'oil', 'acrylic', 'digital', 'design', 'creative',
    'composition', 'perspective', 'shading', 'technique', 'style',
    'artist', 'painting', 'drawing', 'sketching', 'illustration',
    'museum', 'gallery', 'exhibition', 'artwork', 'masterpiece',
    'renaissance', 'impressionism', 'abstract', 'realism', 'modern',
    'van gogh', 'picasso', 'monet', 'da vinci', 'michelangelo',
    'inspiration', 'creative block', 'motivation', 'practice',
    'tutorial', 'guide', 'help with', 'how to', 'what is', 'tips for'
  ],

  // Off-topic/gossip topics (REDIRECT)
  GOSSIP_TOPICS: [
    'celebrity', 'movie', 'music', 'sports', 'game', 'tv show', 'netflix',
    'youtube', 'tiktok', 'instagram', 'facebook', 'twitter', 'social media',
    'gossip', 'rumor', 'news', 'politics', 'weather', 'food', 'restaurant',
    'shopping', 'fashion', 'relationship', 'dating', 'friend', 'family',
    'school', 'work', 'job', 'money', 'finance', 'health', 'fitness',
    'travel', 'vacation', 'hobby', 'pet', 'cat', 'dog', 'car', 'house'
  ],

  // Personal questions about the AI (ALLOW)
  AI_IDENTITY: [
    'who are you', 'what are you', 'your name', 'who made you', 'who created you',
    'what can you do', 'your purpose', 'your function'
  ]
};

// Classify message type
export const classifyMessage = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  const words = lowerMessage.split(/\s+/);
  
  // Check for art-related topics
  const hasArtTopic = CHAT_PATTERNS.ART_TOPICS.some(topic => 
    lowerMessage.includes(topic) || 
    words.some(word => CHAT_PATTERNS.ART_TOPICS.includes(word))
  );

  // Check for AI identity questions
  const isAIIdentity = CHAT_PATTERNS.AI_IDENTITY.some(question => 
    lowerMessage.includes(question)
  );

  // Check for gossip/off-topic
  const hasGossipTopic = CHAT_PATTERNS.GOSSIP_TOPICS.some(topic => 
    lowerMessage.includes(topic) ||
    words.some(word => CHAT_PATTERNS.GOSSIP_TOPICS.includes(word))
  );

  // Check for simple greetings (allow these)
  const isGreeting = /^(hello|hi|hey|greetings|good morning|good afternoon|good evening|howdy|sup|what's up)(\W|$)/i.test(lowerMessage);

  // Check for very short meaningless messages
  const isShortMeaningless = words.length <= 2 && !isGreeting && 
    !['help', 'art', 'draw', 'paint'].includes(words[0]);

  if (isGreeting || isAIIdentity) {
    return 'allowed';
  }

  if (hasArtTopic) {
    return 'art_topic';
  }

  if (hasGossipTopic || isShortMeaningless) {
    return 'off_topic';
  }

  // If message doesn't contain clear art topics, but also not clear gossip
  // Use length and question patterns as secondary check
  if (words.length < 4 && !lowerMessage.includes('?')) {
    return 'possibly_off_topic';
  }

  return 'unknown';
};

// Generate friendly redirection responses
export const getRedirectionResponse = (originalMessage) => {
  const redirectResponses = [
    {
      response: "I'd love to help with art-related questions! 🎨 I can assist with drawing techniques, painting tips, color theory, art history, or creative inspiration. What would you like to create today?",
      suggestions: ['How to draw faces?', 'Color theory basics', 'Overcome creative block']
    },
    {
      response: "As an art assistant, I specialize in helping with creative projects! ✨ Try asking me about art techniques, materials, famous artists, or getting inspired. What art topic can I help you with?",
      suggestions: ['Watercolor techniques', 'Famous painters', 'Drawing exercises']
    },
    {
      response: "I'm here to help with your artistic journey! 🖌️ I can provide guidance on drawing, painting, digital art, art history, and creative challenges. What art question do you have?",
      suggestions: ['Perspective drawing', 'Oil painting tips', 'Art style development']
    },
    {
      response: "Let's talk art! 🎭 I excel at art techniques, creative advice, and artistic inspiration. Ask me about anything from beginner drawing to advanced painting methods!",
      suggestions: ['Shading techniques', 'Composition rules', 'Artist inspiration']
    }
  ];

  const randomResponse = redirectResponses[Math.floor(Math.random() * redirectResponses.length)];
  
  return {
    success: true,
    type: 'redirection',
    content: randomResponse.response,
    suggestions: randomResponse.suggestions,
    originalMessage: originalMessage,
    source: 'chat-filter'
  };
};

// Enhanced message filter
export const shouldUseAI = (message) => {
  const classification = classifyMessage(message);
  
  console.log(`🔍 Message classification: "${message}" -> ${classification}`);
  
  // Only allow AI for these classifications
  const allowedTypes = ['art_topic', 'unknown', 'allowed'];
  
  return allowedTypes.includes(classification);
};