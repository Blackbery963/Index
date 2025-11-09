// Pattern-based response system for common off-topic questions
export const PATTERN_RESPONSES = {
  // Weather queries
  weather: {
    patterns: [
      /weather/,
      /rain|sunny|cloudy|snow/,
      /temperature|hot|cold/
    ],
    response: "I'm focused on art help, but I hope you have good weather for painting outdoors! 🎨☀️ Speaking of which, have you tried plein air painting?",
    redirect: true
  },

  // Sports queries
  sports: {
    patterns: [
      /sports|game|match/,
      /soccer|football|basketball|baseball|tennis/,
      /player|team|score|win|lose/
    ],
    response: "Sports are great for action poses! 🏀⚽ I can help you draw dynamic figures or capture movement in your artwork. Want to try drawing athletes in action?",
    redirect: true
  },

  // Entertainment queries
  entertainment: {
    patterns: [
      /movie|film|cinema/,
      /netflix|youtube|streaming/,
      /actor|actress|director/,
      /show|series|episode/
    ],
    response: "Movies are wonderful inspiration for art! 🎬 I can help you create fan art, storyboard concepts, or draw your favorite characters. What would you like to create?",
    redirect: true
  },

  // Personal gossip
  personal: {
    patterns: [
      /my (friend|boyfriend|girlfriend|crush)/,
      /dating|relationship|marriage/,
      /he said|she said|they said/,
      /like me|like them/
    ],
    response: "Relationships can be great artistic inspiration! 💕 Many artists channel emotions into their work. I can help you express feelings through art or create meaningful pieces.",
    redirect: true
  },

  // Current events/news
  news: {
    patterns: [
      /news|headline/,
      /politics|government|election/,
      /what.?s happening|current events/
    ],
    response: "Current events often inspire powerful artwork! 📰 I can help you create art that responds to the world around us or develop your visual storytelling skills.",
    redirect: true
  },

  // Random "what do you think about X"
  opinion: {
    patterns: [
      /what do you think about/,
      /do you like|do you love/,
      /your opinion on/,
      /how do you feel about/
    ],
    response: "As an art assistant, I think everything can be artistic inspiration! 🎨 I'd love to help you create art about that topic or explore it visually. What would you like to draw?",
    redirect: true
  },

  // Meaningless/repetitive messages
  meaningless: {
    patterns: [
      /^[a-z]{1,2}$/i, // Single letters
      /^(yes|no|maybe|ok|okay|k|cool|nice|lol|lmao)$/i,
      /^([^a-z]*[a-z][^a-z]*){1,2}$/i, // Very short messages
      /(.)\1{10,}/ // Repeated characters
    ],
    response: "I'm here to help with your art journey! 🎨 Try asking me about drawing techniques, painting tips, or creative inspiration. What would you like to create?",
    redirect: true
  }
};

// Check for pattern matches
export const getPatternResponse = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  for (const [category, data] of Object.entries(PATTERN_RESPONSES)) {
    for (const pattern of data.patterns) {
      if (pattern.test(lowerMessage)) {
        console.log(`✓ Pattern match: ${category} for "${message}"`);
        return {
          response: data.response,
          category: category,
          redirect: data.redirect
        };
      }
    }
  }
  
  return null;
};