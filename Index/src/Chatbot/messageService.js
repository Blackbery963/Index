// // Local data for fast responses
// // const JOKES = [
//   "Why did the artist go to jail? Because he was framed!",
//   "What's an artist's favorite programming language? Draw-thon!",
//   "Why don't artists like to play hide and seek? Because good luck hiding when you've got a distinct style!",
//   "Why was the math book sad? It had too many problems!",
//   "What do you call a sleeping bull? A bulldozer!",
//   "Why did the painter go broke? Because he lost his Monet!",
//   "What do you call a dinosaur that loves art? A brush-asaurus!",
//   "Why was the artist a good tennis player? Because of his follow-through!"
// ];

// const FACTS = [
//   "Vincent van Gogh only sold one painting during his lifetime.",
//   "The world's oldest known painting is over 64,000 years old.",
//   "Color blue was once more expensive than gold in medieval times.",
//   "The Mona Lisa has no eyebrows - it was fashionable in Renaissance Florence to shave them off.",
//   "Picasso could draw before he could walk and his first word was 'pencil'.",
//   "Leonardo da Vinci wrote most of his personal notes in mirror writing.",
//   "The color purple was once so expensive that only royalty could afford it.",
//   "Michelangelo's famous David statue was carved from a single block of marble."
// ];

// const QUOTES = [
//   { content: "Every artist was first an amateur.", author: "Ralph Waldo Emerson" },
//   { content: "Art washes away from the soul the dust of everyday life.", author: "Pablo Picasso" },
//   { content: "Creativity takes courage.", author: "Henri Matisse" },
//   { content: "The purpose of art is washing the dust of daily life off our souls.", author: "Pablo Picasso" },
//   { content: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
//   { content: "I dream of painting and then I paint my dream.", author: "Vincent van Gogh" },
//   { content: "Art is the lie that enables us to realize the truth.", author: "Pablo Picasso" },
//   { content: "The job of the artist is always to deepen the mystery.", author: "Francis Bacon" }
// ];

// const ART_TIPS = [
//   "Start with basic shapes when drawing - everything can be broken down into circles, squares, and triangles.",
//   "The color wheel is your best friend! Complementary colors create vibrant contrast.",
//   "Don't be afraid to make mistakes. Even master artists create 'happy accidents'.",
//   "Practice value scales to improve your understanding of light and shadow.",
//   "Keep a sketchbook with you always - inspiration can strike anywhere!",
//   "Study color theory to understand how colors interact and affect mood.",
//   "Use references! Even professional artists use photo references for their work.",
//   "Experiment with different mediums - you might discover a new favorite way to create.",
//   "Take breaks during long drawing sessions to maintain fresh perspective.",
//   "Learn the rules of composition like the rule of thirds for more engaging artwork."
// ];

// const ART_TERMS = [
//   { word: "chiaroscuro", definition: "the treatment of light and shade in drawing and painting" },
//   { word: "impasto", definition: "a technique where paint is laid on thickly so it stands out from the surface" },
//   { word: "sfumato", definition: "the technique of allowing tones and colors to shade gradually into one another" },
//   { word: "gouache", definition: "a method of painting using opaque pigments ground in water" },
//   { word: "plein air", definition: "the act of painting outdoors to capture natural light and atmosphere" },
//   { word: "fresco", definition: "a technique of mural painting executed upon freshly laid lime plaster" },
//   { word: "grisaille", definition: "a painting technique using only shades of gray" },
//   { word: "contrapposto", definition: "an asymmetrical arrangement of the human figure in sculpture" }
// ];

// // List of free models to try (in order of preference)
// const FREE_MODELS = [
//   "deepseek/deepseek-chat-v3-0324:free",
//   "qwen/qwen3-235b-a22b:free",
//   "google/gemini-2.0-flash-exp:free",
//   "meta-llama/llama-3.3-70b-instruct:free",
//   "microsoft/mai-ds-r1:free",
//   "google/gemma-3-27b-it:free",
//   "openai/gpt-oss-20b:free",
//   "deepseek/deepseek-chat-v3.1:free",
//   "mistralai/mistral-small-3.2-24b-instruct:free",
//   "minimax/minimax-m2:free",
//   "z-ai/glm-4.5-air:free",
//   "deepseek/deepseek-r1:free",
//   "nvidia/nemotron-nano-12b-v2-vl:free",
//   "deepseek/deepseek-r1-distill-llama-70b:free",
//   "meta-llama/llama-4-maverick:free",
//   "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
//   "deepseek/deepseek-r1-0528-qwen3-8b:free",
//   "nousresearch/hermes-3-llama-3.1-405b:free",
//   "meta-llama/llama-3.3-8b-instruct:free",
//   "nvidia/nemotron-nano-9b-v2:free",
//   "meta-llama/llama-4-scout:free",
//   "qwen/qwen2.5-vl-32b-instruct:free",
//   "moonshotai/kimi-k2:free",
//   "google/gemma-3-4b-it:free",
//   "arliai/qwq-32b-arliai-rpr-v1:free",
// ];

// // Request throttling
// let lastRequestTime = 0;
// const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

// const throttleRequest = async () => {
//   const now = Date.now();
//   const timeSinceLastRequest = now - lastRequestTime;
  
//   if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
//     const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
//     await new Promise(resolve => setTimeout(resolve, waitTime));
//   }
  
//   lastRequestTime = Date.now();
// };

// // Fast handlers (synchronous - instant responses)
// const jokeHandler = () => ({
//   success: true,
//   type: 'joke',
//   content: JOKES[Math.floor(Math.random() * JOKES.length)],
//   category: "art"
// });

// const factHandler = () => ({
//   success: true,
//   type: 'fact',
//   content: FACTS[Math.floor(Math.random() * FACTS.length)],
//   source: "art history"
// });

// const quoteHandler = () => {
//   const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
//   return {
//     success: true,
//     type: 'quote',
//     content: quote.content,
//     author: quote.author
//   };
// };

// const artTipHandler = () => ({
//   success: true,
//   type: 'art-tip',
//   content: ART_TIPS[Math.floor(Math.random() * ART_TIPS.length)]
// });

// const vocabularyHandler = () => {
//   const term = ART_TERMS[Math.floor(Math.random() * ART_TERMS.length)];
//   return {
//     success: true,
//     type: 'vocabulary',
//     content: `Art term: ${term.word} - ${term.definition}`,
//     word: term.word,
//     definition: term.definition
//   };
// };

// // AI Handler with multiple model fallbacks
// const aiHandler = async (message, conversationHistory, modelIndex = 0, retryCount = 0) => {
//   const MAX_RETRIES = 1;
//   const MAX_MODEL_RETRIES = 2;

//   try {
//     const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
//     if (!OPENROUTER_API_KEY) {
//       throw new Error('OpenRouter API key not configured');
//     }

//     // If we've tried all models, fall back to local response
//     if (modelIndex >= FREE_MODELS.length) {
//       return {
//         success: true,
//         type: 'art-tip',
//         content: "I'm experiencing high demand right now. Here's an art tip instead: " + 
//                  ART_TIPS[Math.floor(Math.random() * ART_TIPS.length)] +
//                  " Try asking me again in a moment for AI responses! 🎨"
//       };
//     }

//     const currentModel = FREE_MODELS[modelIndex];
//     console.log(`Trying model: ${currentModel} (${modelIndex + 1}/${FREE_MODELS.length})`);

//     const messages = [
//       { 
//         role: "system", 
//         content: `You are Palette, a friendly and creative art assistant created by the Painters' Diary Team. You specialize in:
// - Art techniques, tips, and tutorials
// - Art history and famous artists
// - Creative inspiration and motivation
// - Color theory and composition
// - Drawing and painting advice

// Keep responses concise (2-3 paragraphs maximum), engaging, and helpful. Be enthusiastic about art and creativity. 
// When asked about yourself, mention you were created by the Painters' Diary Team.
// Focus on being practical and inspiring for artists of all levels.` 
//       },
//       ...conversationHistory.slice(-4).map(msg => ({ // Only last 4 messages to save tokens
//         role: msg.sender === 'user' ? 'user' : 'assistant',
//         content: msg.text
//       })),
//       { role: "user", content: message }
//     ];

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": window.location.origin,
//         "X-Title": "Art Assistant"
//       },
//       body: JSON.stringify({
//         model: currentModel,
//         messages: messages,
//         temperature: 0.7,
//         max_tokens: 350, // Reduced to save tokens
//         stream: false
//       })
//     });

//     if (response.status === 429) {
//       // Rate limited - try next model
//       console.log(`Model ${currentModel} rate limited, trying next model...`);
//       if (retryCount < MAX_RETRIES) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         return aiHandler(message, conversationHistory, modelIndex, retryCount + 1);
//       } else {
//         return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//       }
//     }

//     if (response.status === 402) {
//       // Payment required - model not free anymore, try next
//       console.log(`Model ${currentModel} requires payment, trying next model...`);
//       return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//     }

//     if (!response.ok) {
//       // Other error - try next model
//       console.log(`Model ${currentModel} error: ${response.status}, trying next model...`);
//       return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//     }

//     const data = await response.json();
    
//     if (!data.choices || !data.choices[0] || !data.choices[0].message) {
//       throw new Error('Invalid response format from AI API');
//     }
    
//     const botReply = data.choices[0].message.content;
    
//     console.log(`Success with model: ${currentModel}`);
//     return {
//       success: true,
//       type: 'ai',
//       content: botReply,
//       model: currentModel // Optional: track which model worked
//     };
//   } catch (error) {
//     console.error(`Error with model ${FREE_MODELS[modelIndex]}:`, error);
    
//     // Try next model on error
//     if (modelIndex < FREE_MODELS.length - 1) {
//       console.log("Trying next model due to error...");
//       return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//     }
    
//     // Final fallback - local content
//     return {
//       success: true,
//       type: 'art-tip',
//       content: "I'm having temporary connection issues. Here's an art tip instead: " + 
//                ART_TIPS[Math.floor(Math.random() * ART_TIPS.length)] +
//                " You can also ask me for jokes, facts, or quotes that work offline! 🎨"
//     };
//   }
// };

// // Enhanced local query detection
// const shouldUseLocalHandler = (message) => {
//   const lowerMessage = message.toLowerCase();
  
//   const localPatterns = [
//     /\b(joke|funny|laugh|humor)\b/,
//     /\b(fact|interesting|learn|know|did you know)\b/,
//     /\b(quote|inspiration|motivation|wise|say)\b/,
//     /\b(tip|advice|suggestion|help|how to|tutorial)\b/,
//     /\b(word|term|vocabulary|definition|meaning)\b/,
//     /\b(who built you|who created you|who made you|what are you|who are you)\b/,
//     /\b(hello|hi|hey|greetings|good morning|good afternoon)\b/
//   ];
  
//   return localPatterns.some(pattern => pattern.test(lowerMessage));
// };

// // Get appropriate local handler
// const getLocalHandler = (message) => {
//   const lowerMessage = message.toLowerCase();
  
//   if (lowerMessage.includes('joke') || lowerMessage.includes('funny')) return jokeHandler;
//   if (lowerMessage.includes('fact') || lowerMessage.includes('interesting')) return factHandler;
//   if (lowerMessage.includes('quote') || lowerMessage.includes('inspiration')) return quoteHandler;
//   if (lowerMessage.includes('tip') || lowerMessage.includes('advice') || lowerMessage.includes('how to')) return artTipHandler;
//   if (lowerMessage.includes('word') || lowerMessage.includes('term') || lowerMessage.includes('vocabulary')) return vocabularyHandler;
  
//   // Identity questions
//   if (lowerMessage.includes('who built you') || lowerMessage.includes('who created you') || 
//       lowerMessage.includes('who made you') || lowerMessage.includes('what are you') ||
//       lowerMessage.includes('who are you')) {
//     return () => ({
//       success: true,
//       type: 'info',
//       content: "I'm Palette, your friendly art assistant created by the Painters' Diary Team! 🎨 We're passionate about helping artists find inspiration, learn new techniques, and grow their creative skills. I can help with art tips, jokes, facts, quotes, and creative advice using AI when needed!"
//     });
//   }
  
//   // Greetings
//   if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
//     return () => ({
//       success: true,
//       type: 'greeting',
//       content: "Hello! I'm Palette, your art assistant! I can help with art tips, jokes, facts, quotes, and creative advice. What would you like to explore today? 🎨"
//     });
//   }
  
//   return null;
// };

// // Main message processor
// export const messageService = {
//   processMessage: async (message, conversationHistory) => {
//     // First, check if we should use a local handler
//     if (shouldUseLocalHandler(message)) {
//       const localHandler = getLocalHandler(message);
//       if (localHandler) {
//         console.log("Using local handler for:", message);
//         return localHandler();
//       }
//     }

//     // Only use AI for complex questions that aren't covered by local handlers
//     console.log("Using AI for complex question:", message);
    
//     // Throttle requests to avoid rate limits
//     await throttleRequest();
//     return aiHandler(message, conversationHistory);
//   },

//   getOptionsForType: (type) => {
//     const options = {
//       'joke': ['Another joke', 'Art tip', 'Interesting fact'],
//       'fact': ['Another fact', 'Art tip', 'Tell me a joke'],
//       'quote': ['Another quote', 'Art tip', 'Interesting fact'],
//       'art-tip': ['Another tip', 'Tell me a joke', 'Interesting fact'],
//       'vocabulary': ['Another word', 'Art tip', 'Interesting fact'],
//       'greeting': ['Art tip', 'Tell me a joke', 'Interesting fact'],
//       'info': ['Art tip', 'Tell me a joke', 'Interesting fact'],
//       'ai': ['Art tip', 'Tell me a joke', 'Interesting fact'],
//       'error': ['Art tip', 'Tell me a joke', 'Try again']
//     };
//     return options[type] || ['Art tip', 'Tell me a joke', 'Interesting fact', 'Inspirational quote'];
//   },

//   generateChatTitle: (userMessage) => {
//     const lowerMessage = userMessage.toLowerCase();
    
//     if (lowerMessage.includes('joke')) return 'Art Jokes';
//     if (lowerMessage.includes('tip')) return 'Art Tips';
//     if (lowerMessage.includes('fact')) return 'Art Facts';
//     if (lowerMessage.includes('quote')) return 'Inspirational Quotes';
//     if (lowerMessage.includes('weather')) return 'Weather for Artists';
//     if (lowerMessage.includes('artwork')) return 'Artwork Inspiration';
//     if (lowerMessage.includes('vocabulary')) return 'Art Terms';
    
//     const words = userMessage.split(' ');
//     if (words.length > 4) return `${words.slice(0, 3).join(' ')}...`;
//     return userMessage;
//   },

//   // Utility to get available models (for debugging)
//   getAvailableModels: () => [...FREE_MODELS]
// };


// Local data for fast responses
// const JOKES = [
//   "Why did the artist go to jail? Because he was framed!",
//   "What's an artist's favorite programming language? Draw-thon!",
//   "Why don't artists like to play hide and seek? Because good luck hiding when you've got a distinct style!",
//   "Why was the math book sad? It had too many problems!",
//   "What do you call a sleeping bull? A bulldozer!",
//   "Why did the painter go broke? Because he lost his Monet!",
//   "What do you call a dinosaur that loves art? A brush-asaurus!",
//   "Why was the artist a good tennis player? Because of his follow-through!"
// ];

// const FACTS = [
//   "Vincent van Gogh only sold one painting during his lifetime.",
//   "The world's oldest known painting is over 64,000 years old.",
//   "Color blue was once more expensive than gold in medieval times.",
//   "The Mona Lisa has no eyebrows - it was fashionable in Renaissance Florence to shave them off.",
//   "Picasso could draw before he could walk and his first word was 'pencil'.",
//   "Leonardo da Vinci wrote most of his personal notes in mirror writing.",
//   "The color purple was once so expensive that only royalty could afford it.",
//   "Michelangelo's famous David statue was carved from a single block of marble."
// ];

// const QUOTES = [
//   { content: "Every artist was first an amateur.", author: "Ralph Waldo Emerson" },
//   { content: "Art washes away from the soul the dust of everyday life.", author: "Pablo Picasso" },
//   { content: "Creativity takes courage.", author: "Henri Matisse" },
//   { content: "The purpose of art is washing the dust of daily life off our souls.", author: "Pablo Picasso" },
//   { content: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
//   { content: "I dream of painting and then I paint my dream.", author: "Vincent van Gogh" },
//   { content: "Art is the lie that enables us to realize the truth.", author: "Pablo Picasso" },
//   { content: "The job of the artist is always to deepen the mystery.", author: "Francis Bacon" }
// ];

// const ART_TIPS = [
//   "Start with basic shapes when drawing - everything can be broken down into circles, squares, and triangles.",
//   "The color wheel is your best friend! Complementary colors create vibrant contrast.",
//   "Don't be afraid to make mistakes. Even master artists create 'happy accidents'.",
//   "Practice value scales to improve your understanding of light and shadow.",
//   "Keep a sketchbook with you always - inspiration can strike anywhere!",
//   "Study color theory to understand how colors interact and affect mood.",
//   "Use references! Even professional artists use photo references for their work.",
//   "Experiment with different mediums - you might discover a new favorite way to create.",
//   "Take breaks during long drawing sessions to maintain fresh perspective.",
//   "Learn the rules of composition like the rule of thirds for more engaging artwork."
// ];

// const ART_TERMS = [
//   { word: "chiaroscuro", definition: "the treatment of light and shade in drawing and painting" },
//   { word: "impasto", definition: "a technique where paint is laid on thickly so it stands out from the surface" },
//   { word: "sfumato", definition: "the technique of allowing tones and colors to shade gradually into one another" },
//   { word: "gouache", definition: "a method of painting using opaque pigments ground in water" },
//   { word: "plein air", definition: "the act of painting outdoors to capture natural light and atmosphere" },
//   { word: "fresco", definition: "a technique of mural painting executed upon freshly laid lime plaster" },
//   { word: "grisaille", definition: "a painting technique using only shades of gray" },
//   { word: "contrapposto", definition: "an asymmetrical arrangement of the human figure in sculpture" }
// ];

// // List of free models to try (in order of preference)
// const FREE_MODELS = [
//   "deepseek/deepseek-chat-v3-0324:free",
//   "qwen/qwen3-235b-a22b:free",
//   "google/gemini-2.0-flash-exp:free",
//   "meta-llama/llama-3.3-70b-instruct:free",
//   "microsoft/mai-ds-r1:free",
//   "google/gemma-3-27b-it:free",
//   "openai/gpt-oss-20b:free",
//   "deepseek/deepseek-chat-v3.1:free",
//   "mistralai/mistral-small-3.2-24b-instruct:free",
//   "minimax/minimax-m2:free",
//   "z-ai/glm-4.5-air:free",
//   "deepseek/deepseek-r1:free",
//   "nvidia/nemotron-nano-12b-v2-vl:free",
//   "deepseek/deepseek-r1-distill-llama-70b:free",
//   "meta-llama/llama-4-maverick:free",
//   "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
//   "deepseek/deepseek-r1-0528-qwen3-8b:free",
//   "nousresearch/hermes-3-llama-3.1-405b:free",
//   "meta-llama/llama-3.3-8b-instruct:free",
//   "nvidia/nemotron-nano-9b-v2:free",
//   "meta-llama/llama-4-scout:free",
//   "qwen/qwen2.5-vl-32b-instruct:free",
//   "moonshotai/kimi-k2:free",
//   "google/gemma-3-4b-it:free",
//   "arliai/qwq-32b-arliai-rpr-v1:free",
// ];

// // Request throttling
// let lastRequestTime = 0;
// const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

// const throttleRequest = async () => {
//   const now = Date.now();
//   const timeSinceLastRequest = now - lastRequestTime;
  
//   if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
//     const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
//     await new Promise(resolve => setTimeout(resolve, waitTime));
//   }
  
//   lastRequestTime = Date.now();
// };

// // Fast handlers (synchronous - instant responses)
// const jokeHandler = () => ({
//   success: true,
//   type: 'joke',
//   content: JOKES[Math.floor(Math.random() * JOKES.length)],
//   category: "art"
// });

// const factHandler = () => ({
//   success: true,
//   type: 'fact',
//   content: FACTS[Math.floor(Math.random() * FACTS.length)],
//   source: "art history"
// });

// const quoteHandler = () => {
//   const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
//   return {
//     success: true,
//     type: 'quote',
//     content: quote.content,
//     author: quote.author
//   };
// };

// const artTipHandler = () => ({
//   success: true,
//   type: 'art-tip',
//   content: ART_TIPS[Math.floor(Math.random() * ART_TIPS.length)]
// });

// const vocabularyHandler = () => {
//   const term = ART_TERMS[Math.floor(Math.random() * ART_TERMS.length)];
//   return {
//     success: true,
//     type: 'vocabulary',
//     content: `Art term: ${term.word} - ${term.definition}`,
//     word: term.word,
//     definition: term.definition
//   };
// };

// // AI Handler with multiple model fallbacks
// const aiHandler = async (message, conversationHistory, modelIndex = 0, retryCount = 0) => {
//   const MAX_RETRIES = 1;

//   try {
//     const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
//     if (!OPENROUTER_API_KEY) {
//       throw new Error('OpenRouter API key not configured');
//     }

//     // If we've tried all models, fall back to local response
//     if (modelIndex >= FREE_MODELS.length) {
//       return {
//         success: true,
//         type: 'error',
//         content: "I'm experiencing high demand right now. Please try asking your question again in a moment, or try asking for a joke, fact, quote, or art tip which work instantly! 🎨"
//       };
//     }

//     const currentModel = FREE_MODELS[modelIndex];
//     console.log(`Trying model: ${currentModel} (${modelIndex + 1}/${FREE_MODELS.length})`);

//     const messages = [
//       { 
//         role: "system", 
//         content: `You are Palette, a friendly and knowledgeable art assistant created by the Painters' Diary Team. 

// Your expertise includes:
// - Art techniques (drawing, painting, sketching, digital art)
// - Art theory (color theory, composition, perspective)
// - Art history and famous artists
// - Creative advice and overcoming creative blocks
// - Art materials and tools
// - Step-by-step guidance for art projects
// - Critiquing and improving artwork

// When answering:
// 1. Be practical and actionable - give specific steps and techniques
// 2. Be encouraging and supportive
// 3. Keep responses focused and concise (2-3 paragraphs max)
// 4. Use simple language that beginners can understand
// 5. When appropriate, suggest trying different approaches
// 6. If asked about yourself, mention you were created by the Painters' Diary Team

// IMPORTANT: 
// - Always directly answer the user's question
// - Don't give random facts unless they ask for facts
// - Don't tell jokes unless they ask for jokes
// - Stay on topic with their specific question` 
//       },
//       ...conversationHistory.slice(-6).map(msg => ({ // Last 6 messages for context
//         role: msg.sender === 'user' ? 'user' : 'assistant',
//         content: msg.text
//       })),
//       { role: "user", content: message }
//     ];

//     const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
//         "Content-Type": "application/json",
//         "HTTP-Referer": window.location.origin,
//         "X-Title": "Palette Art Assistant"
//       },
//       body: JSON.stringify({
//         model: currentModel,
//         messages: messages,
//         temperature: 0.7,
//         max_tokens: 500,
//         stream: false
//       })
//     });

//     if (response.status === 429) {
//       console.log(`Model ${currentModel} rate limited, trying next model...`);
//       if (retryCount < MAX_RETRIES) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         return aiHandler(message, conversationHistory, modelIndex, retryCount + 1);
//       } else {
//         return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//       }
//     }

//     if (response.status === 402) {
//       console.log(`Model ${currentModel} requires payment, trying next model...`);
//       return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//     }

//     if (!response.ok) {
//       console.log(`Model ${currentModel} error: ${response.status}, trying next model...`);
//       return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//     }

//     const data = await response.json();
    
//     if (!data.choices || !data.choices[0] || !data.choices[0].message) {
//       throw new Error('Invalid response format from AI API');
//     }
    
//     const botReply = data.choices[0].message.content;
    
//     console.log(`Success with model: ${currentModel}`);
//     return {
//       success: true,
//       type: 'ai',
//       content: botReply,
//       model: currentModel
//     };
//   } catch (error) {
//     console.error(`Error with model ${FREE_MODELS[modelIndex]}:`, error);
    
//     if (modelIndex < FREE_MODELS.length - 1) {
//       console.log("Trying next model due to error...");
//       return aiHandler(message, conversationHistory, modelIndex + 1, 0);
//     }
    
//     return {
//       success: true,
//       type: 'error',
//       content: "I'm having temporary connection issues. Please try your question again in a moment. In the meantime, I can instantly help with: jokes, facts, quotes, art tips, or art terms! 🎨"
//     };
//   }
// };

// // Detect if message is requesting specific local content (VERY STRICT)
// const getExplicitLocalHandler = (message) => {
//   const lowerMessage = message.toLowerCase().trim();
  
//   // EXACT MATCH patterns for simple requests
//   const exactPatterns = {
//     joke: /^(tell me a joke|joke|give me a joke|another joke|make me laugh|funny|tell me something funny)$/i,
//     fact: /^(tell me a fact|fact|give me a fact|another fact|interesting fact|random fact|fun fact)$/i,
//     quote: /^(give me a quote|quote|inspirational quote|another quote|motivational quote|inspire me)$/i,
//     tip: /^(art tip|give me an art tip|another tip|tip|give me a tip|help|suggestion)$/i,
//     vocab: /^(word|vocabulary|art term|another word|give me a word|define|definition)$/i
//   };

//   // Check exact matches first
//   for (const [type, pattern] of Object.entries(exactPatterns)) {
//     if (pattern.test(lowerMessage)) {
//       switch(type) {
//         case 'joke': return jokeHandler;
//         case 'fact': return factHandler;
//         case 'quote': return quoteHandler;
//         case 'tip': return artTipHandler;
//         case 'vocab': return vocabularyHandler;
//       }
//     }
//   }

//   // ONLY if the message is VERY SHORT (1-4 words) and contains these keywords
//   const words = lowerMessage.split(/\s+/);
//   if (words.length <= 4) {
//     if (words.includes('joke') && !words.some(w => ['how', 'what', 'why', 'when', 'where', 'explain', 'about'].includes(w))) {
//       return jokeHandler;
//     }
//     if (words.includes('fact') && !words.some(w => ['how', 'what', 'why', 'when', 'where', 'explain', 'about'].includes(w))) {
//       return factHandler;
//     }
//     if (words.includes('quote') && !words.some(w => ['how', 'what', 'why', 'when', 'where', 'explain', 'about'].includes(w))) {
//       return quoteHandler;
//     }
//   }

//   // Identity questions
//   if (/^(who (built|created|made|developed) you|what are you|who are you|tell me about yourself)$/i.test(lowerMessage)) {
//     return () => ({
//       success: true,
//       type: 'info',
//       content: "I'm Palette, your friendly art assistant created by the Painters' Diary Team! 🎨 I'm an AI that specializes in helping artists with techniques, advice, inspiration, and creative guidance. I can answer your art questions, give tips, share jokes and facts, or just chat about creativity!"
//     });
//   }

//   // Simple greetings (ONLY if they're just greetings)
//   if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening|howdy)(!|\?|\.)?$/i.test(lowerMessage)) {
//     return () => ({
//       success: true,
//       type: 'greeting',
//       content: "Hello! I'm Palette, your art assistant! 🎨 I can help you with art techniques, creative advice, inspiration, and answer any art-related questions. What would you like to know or create today?"
//     });
//   }

//   return null; // Use AI for everything else
// };

// // Check if a message is actually a question or needs AI reasoning
// const requiresAI = (message) => {
//   const lowerMessage = message.toLowerCase();
  
//   // Question indicators
//   const questionWords = ['how', 'what', 'why', 'when', 'where', 'which', 'who', 'can', 'should', 'would', 'could', 'is', 'are', 'do', 'does'];
//   const hasQuestionWord = questionWords.some(word => lowerMessage.includes(word + ' '));
//   const hasQuestionMark = message.includes('?');
  
//   // Action/request indicators
//   const actionWords = ['explain', 'teach', 'show', 'help me', 'guide', 'advise', 'recommend', 'suggest', 'create', 'make', 'draw', 'paint', 'improve', 'learn'];
//   const hasActionWord = actionWords.some(word => lowerMessage.includes(word));
  
//   // Complex topics that need AI
//   const complexTopics = ['technique', 'method', 'style', 'approach', 'process', 'practice', 'exercise', 'tutorial', 'lesson', 'course'];
//   const hasComplexTopic = complexTopics.some(word => lowerMessage.includes(word));
  
//   // More than 5 words usually indicates a real question
//   const wordCount = message.trim().split(/\s+/).length;
//   const isLongMessage = wordCount > 5;
  
//   return hasQuestionWord || hasQuestionMark || hasActionWord || hasComplexTopic || isLongMessage;
// };

// // Main message processor
// export const messageService = {
//   processMessage: async (message, conversationHistory) => {
//     console.log("Processing message:", message);
    
//     // First, check for EXPLICIT local handler requests (very strict)
//     const localHandler = getExplicitLocalHandler(message);
//     if (localHandler) {
//       console.log("✓ Using local handler for simple request");
//       return localHandler();
//     }

//     // For everything else (questions, complex requests, conversations), use AI
//     console.log("→ Using AI for:", message);
    
//     // Throttle requests to avoid rate limits
//     await throttleRequest();
//     return aiHandler(message, conversationHistory);
//   },

//   getOptionsForType: (type) => {
//     const options = {
//       'joke': ['Another joke', 'Art tip', 'Interesting fact'],
//       'fact': ['Another fact', 'Art tip', 'Tell me a joke'],
//       'quote': ['Another quote', 'Art tip', 'Interesting fact'],
//       'art-tip': ['Another tip', 'Tell me a joke', 'Interesting fact'],
//       'vocabulary': ['Another word', 'Art tip', 'Interesting fact'],
//       'greeting': ['Art tip', 'Tell me a joke', 'Ask me anything'],
//       'info': ['Art tip', 'Tell me a joke', 'Ask me a question'],
//       'ai': ['Art tip', 'Tell me a joke', 'Interesting fact'],
//       'error': ['Try again', 'Art tip', 'Tell me a joke']
//     };
//     return options[type] || ['Art tip', 'Tell me a joke', 'Interesting fact', 'Ask me anything'];
//   },

//   generateChatTitle: (userMessage) => {
//     const lowerMessage = userMessage.toLowerCase();
    
//     if (lowerMessage.includes('joke')) return 'Art Jokes';
//     if (lowerMessage.includes('tip')) return 'Art Tips';
//     if (lowerMessage.includes('fact')) return 'Art Facts';
//     if (lowerMessage.includes('quote')) return 'Quotes';
//     if (lowerMessage.includes('how to')) return 'How To Guide';
//     if (lowerMessage.includes('technique')) return 'Art Techniques';
//     if (lowerMessage.includes('color')) return 'Color Advice';
//     if (lowerMessage.includes('draw')) return 'Drawing Help';
//     if (lowerMessage.includes('paint')) return 'Painting Help';
    
//     const words = userMessage.split(' ').filter(w => w.length > 2);
//     if (words.length > 4) return `${words.slice(0, 3).join(' ')}...`;
//     if (words.length > 0) return words.slice(0, 3).join(' ');
//     return 'New Chat';
//   },

//   // Utility to get available models (for debugging)
//   getAvailableModels: () => [...FREE_MODELS]
// };



import { platformQuestions, artTechniques, artHistoryData, creativeHelp,commonChatResponses, newCommonChatResponses, artStories  } from "./Knowledge";

console.log('🔍 Import Debug:');
console.log('platformQuestions:', Object.keys(platformQuestions || {}).length);
console.log('artTechniques:', Object.keys(artTechniques || {}).length);
console.log('artHistoryData:', Object.keys(artHistoryData || {}).length);
console.log('creativeHelp:', Object.keys(creativeHelp || {}).length);
console.log('commonChatResponses:', Object.keys(commonChatResponses || {}).length);
console.log('newCommonChatResponses:', Object.keys(newCommonChatResponses || {}).length);


// Combine all knowledge bases
const KNOWLEDGE_BASE = {
  ...commonChatResponses,
  ...newCommonChatResponses,
  ...platformQuestions,
  ...artTechniques,
  ...artHistoryData,
  ...creativeHelp,
  ...artStories
};

// Enhanced local query detection with knowledge base
const getKnowledgeBaseAnswer = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Direct matches
  if (KNOWLEDGE_BASE[lowerMessage]) {
    return KNOWLEDGE_BASE[lowerMessage];
  }
  
  // Fuzzy matching for common variations
  const knowledgeKeys = Object.keys(KNOWLEDGE_BASE);
  
  // Check for close matches (allows for slight variations)
  for (const key of knowledgeKeys) {
    // If user's message contains the key question
    if (lowerMessage.includes(key) && key.length > 5) {
      // Make sure it's not just a partial match in a larger question
      const words = lowerMessage.split(' ');
      if (words.some(word => key.includes(word)) || lowerMessage.includes(key)) {
        return KNOWLEDGE_BASE[key];
      }
    }
  }
  
  // Check for question patterns
  const questionPatterns = {
    'how to draw': 'how to draw better',
    'how to paint': 'how to start painting',
    'what is painters diary': 'what is painters diary',
    'color theory': 'color theory basics',
    'digital art': 'digital art for beginners',
    'creative block': 'creative block',
    'art block': 'art block',
    'find inspiration': 'find inspiration',
    'stay motivated': 'stay motivated',
    'van gogh': 'van gogh',
    'picasso': 'picasso',
    'impressionism': 'impressionism',
    'renaissance': 'renaissance art'
  };
  
  for (const [pattern, answerKey] of Object.entries(questionPatterns)) {
    if (lowerMessage.includes(pattern) && KNOWLEDGE_BASE[answerKey]) {
      return KNOWLEDGE_BASE[answerKey];
    }
  }
  
  return null;
};

// Local data arrays (keep these)
const JOKES = [
  "Why did the artist go to jail? Because he was framed!",
  "What's an artist's favorite programming language? Draw-thon!",
  "Why don't artists like to play hide and seek? Because good luck hiding when you've got a distinct style!",
  "Why was the math book sad? It had too many problems!",
  "What do you call a sleeping bull? A bulldozer!",
  "Why did the painter go broke? Because he lost his Monet!",
  "What do you call a dinosaur that loves art? A brush-asaurus!",
  "Why was the artist a good tennis player? Because of his follow-through!"
];

const FACTS = [
  "Vincent van Gogh only sold one painting during his lifetime.",
  "The world's oldest known painting is over 64,000 years old.",
  "Color blue was once more expensive than gold in medieval times.",
  "The Mona Lisa has no eyebrows - it was fashionable in Renaissance Florence to shave them off.",
  "Picasso could draw before he could walk and his first word was 'pencil'.",
  "Leonardo da Vinci wrote most of his personal notes in mirror writing.",
  "The color purple was once so expensive that only royalty could afford it.",
  "Michelangelo's famous David statue was carved from a single block of marble."
];

const QUOTES = [
  { content: "Every artist was first an amateur.", author: "Ralph Waldo Emerson" },
  { content: "Art washes away from the soul the dust of everyday life.", author: "Pablo Picasso" },
  { content: "Creativity takes courage.", author: "Henri Matisse" },
  { content: "The purpose of art is washing the dust of daily life off our souls.", author: "Pablo Picasso" },
  { content: "Art is not what you see, but what you make others see.", author: "Edgar Degas" },
  { content: "I dream of painting and then I paint my dream.", author: "Vincent van Gogh" },
  { content: "Art is the lie that enables us to realize the truth.", author: "Pablo Picasso" },
  { content: "The job of the artist is always to deepen the mystery.", author: "Francis Bacon" }
];

const ART_TIPS = [
  "Start with basic shapes when drawing - everything can be broken down into circles, squares, and triangles.",
  "The color wheel is your best friend! Complementary colors create vibrant contrast.",
  "Don't be afraid to make mistakes. Even master artists create 'happy accidents'.",
  "Practice value scales to improve your understanding of light and shadow.",
  "Keep a sketchbook with you always - inspiration can strike anywhere!",
  "Study color theory to understand how colors interact and affect mood.",
  "Use references! Even professional artists use photo references for their work.",
  "Experiment with different mediums - you might discover a new favorite way to create.",
  "Take breaks during long drawing sessions to maintain fresh perspective.",
  "Learn the rules of composition like the rule of thirds for more engaging artwork."
];

const ART_TERMS = [
  { word: "chiaroscuro", definition: "the treatment of light and shade in drawing and painting" },
  { word: "impasto", definition: "a technique where paint is laid on thickly so it stands out from the surface" },
  { word: "sfumato", definition: "the technique of allowing tones and colors to shade gradually into one another" },
  { word: "gouache", definition: "a method of painting using opaque pigments ground in water" },
  { word: "plein air", definition: "the act of painting outdoors to capture natural light and atmosphere" },
  { word: "fresco", definition: "a technique of mural painting executed upon freshly laid lime plaster" },
  { word: "grisaille", definition: "a painting technique using only shades of gray" },
  { word: "contrapposto", definition: "an asymmetrical arrangement of the human figure in sculpture" }
];

// List of free models to try (in order of preference)
const FREE_MODELS = [
  "deepseek/deepseek-chat-v3-0324:free",
  "qwen/qwen3-235b-a22b:free",
  "google/gemini-2.0-flash-exp:free",
  "meta-llama/llama-3.3-70b-instruct:free",
  "microsoft/mai-ds-r1:free",
  "google/gemma-3-27b-it:free",
  "openai/gpt-oss-20b:free",
  "deepseek/deepseek-chat-v3.1:free",
  "mistralai/mistral-small-3.2-24b-instruct:free",
  "minimax/minimax-m2:free",
  "z-ai/glm-4.5-air:free",
  "deepseek/deepseek-r1:free",
  "nvidia/nemotron-nano-12b-v2-vl:free",
  "deepseek/deepseek-r1-distill-llama-70b:free",
  "meta-llama/llama-4-maverick:free",
  "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  "deepseek/deepseek-r1-0528-qwen3-8b:free",
  "nousresearch/hermes-3-llama-3.1-405b:free",
  "meta-llama/llama-3.3-8b-instruct:free",
  "nvidia/nemotron-nano-9b-v2:free",
  "meta-llama/llama-4-scout:free",
  "qwen/qwen2.5-vl-32b-instruct:free",
  "moonshotai/kimi-k2:free",
  "google/gemma-3-4b-it:free",
  "arliai/qwq-32b-arliai-rpr-v1:free",
];

// Request throttling
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000; // 2 seconds between requests

const throttleRequest = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
};

// Fast handlers (synchronous - instant responses)
const jokeHandler = () => ({
  success: true,
  type: 'joke',
  content: JOKES[Math.floor(Math.random() * JOKES.length)],
  category: "art"
});

const factHandler = () => ({
  success: true,
  type: 'fact',
  content: FACTS[Math.floor(Math.random() * FACTS.length)],
  source: "art history"
});

const quoteHandler = () => {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  return {
    success: true,
    type: 'quote',
    content: quote.content,
    author: quote.author
  };
};

const artTipHandler = () => ({
  success: true,
  type: 'art-tip',
  content: ART_TIPS[Math.floor(Math.random() * ART_TIPS.length)]
});

const vocabularyHandler = () => {
  const term = ART_TERMS[Math.floor(Math.random() * ART_TERMS.length)];
  return {
    success: true,
    type: 'vocabulary',
    content: `Art term: ${term.word} - ${term.definition}`,
    word: term.word,
    definition: term.definition
  };
};

// AI Handler with multiple model fallbacks
const aiHandler = async (message, conversationHistory, modelIndex = 0, retryCount = 0) => {
  const MAX_RETRIES = 1;

  try {
    const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    // If we've tried all models, fall back to local response
    if (modelIndex >= FREE_MODELS.length) {
      return {
        success: true,
        type: 'error',
        content: "I'm experiencing high demand right now. Please try asking your question again in a moment, or try asking for a joke, fact, quote, or art tip which work instantly! 🎨"
      };
    }

    const currentModel = FREE_MODELS[modelIndex];
    console.log(`Trying model: ${currentModel} (${modelIndex + 1}/${FREE_MODELS.length})`);

    const messages = [
      { 
        role: "system", 
        content: `You are Palette, a friendly and knowledgeable art assistant created by the Painters' Diary Team. 

Your expertise includes:
- Art techniques (drawing, painting, sketching, digital art)
- Art theory (color theory, composition, perspective)
- Art history and famous artists
- Creative advice and overcoming creative blocks
- Art materials and tools
- Step-by-step guidance for art projects
- Critiquing and improving artwork

When answering:
1. Be practical and actionable - give specific steps and techniques
2. Be encouraging and supportive
3. Keep responses focused and concise (2-3 paragraphs max)
4. Use simple language that beginners can understand
5. When appropriate, suggest trying different approaches
6. If asked about yourself, mention you were created by the Painters' Diary Team

IMPORTANT: 
- Always directly answer the user's question
- Don't give random facts unless they ask for facts
- Don't tell jokes unless they ask for jokes
- Stay on topic with their specific question` 
      },
      ...conversationHistory.slice(-6).map(msg => ({ // Last 6 messages for context
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: message }
    ];

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
        "X-Title": "Palette Art Assistant"
      },
      body: JSON.stringify({
        model: currentModel,
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
        stream: false
      })
    });

    if (response.status === 429) {
      console.log(`Model ${currentModel} rate limited, trying next model...`);
      if (retryCount < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return aiHandler(message, conversationHistory, modelIndex, retryCount + 1);
      } else {
        return aiHandler(message, conversationHistory, modelIndex + 1, 0);
      }
    }

    if (response.status === 402) {
      console.log(`Model ${currentModel} requires payment, trying next model...`);
      return aiHandler(message, conversationHistory, modelIndex + 1, 0);
    }

    if (!response.ok) {
      console.log(`Model ${currentModel} error: ${response.status}, trying next model...`);
      return aiHandler(message, conversationHistory, modelIndex + 1, 0);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from AI API');
    }
    
    const botReply = data.choices[0].message.content;
    
    console.log(`Success with model: ${currentModel}`);
    return {
      success: true,
      type: 'ai',
      content: botReply,
      model: currentModel
    };
  } catch (error) {
    console.error(`Error with model ${FREE_MODELS[modelIndex]}:`, error);
    
    if (modelIndex < FREE_MODELS.length - 1) {
      console.log("Trying next model due to error...");
      return aiHandler(message, conversationHistory, modelIndex + 1, 0);
    }
    
    return {
      success: true,
      type: 'error',
      content: "I'm having temporary connection issues. Please try your question again in a moment. In the meantime, I can instantly help with: jokes, facts, quotes, art tips, or art terms! 🎨"
    };
  }
};

// Detect if message is requesting specific local content (VERY STRICT)
const getExplicitLocalHandler = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  // EXACT MATCH patterns for simple requests
  const exactPatterns = {
    joke: /^(tell me a joke|joke|give me a joke|another joke|make me laugh|funny|tell me something funny)$/i,
    fact: /^(tell me a fact|fact|give me a fact|another fact|interesting fact|random fact|fun fact)$/i,
    quote: /^(give me a quote|quote|inspirational quote|another quote|motivational quote|inspire me)$/i,
    tip: /^(art tip|give me an art tip|another tip|tip|give me a tip|help|suggestion)$/i,
    vocab: /^(word|vocabulary|art term|another word|give me a word|define|definition)$/i
  };

  // Check exact matches first
  for (const [type, pattern] of Object.entries(exactPatterns)) {
    if (pattern.test(lowerMessage)) {
      switch(type) {
        case 'joke': return jokeHandler;
        case 'fact': return factHandler;
        case 'quote': return quoteHandler;
        case 'tip': return artTipHandler;
        case 'vocab': return vocabularyHandler;
      }
    }
  }

  // ONLY if the message is VERY SHORT (1-4 words) and contains these keywords
  const words = lowerMessage.split(/\s+/);
  if (words.length <= 4) {
    if (words.includes('joke') && !words.some(w => ['how', 'what', 'why', 'when', 'where', 'explain', 'about'].includes(w))) {
      return jokeHandler;
    }
    if (words.includes('fact') && !words.some(w => ['how', 'what', 'why', 'when', 'where', 'explain', 'about'].includes(w))) {
      return factHandler;
    }
    if (words.includes('quote') && !words.some(w => ['how', 'what', 'why', 'when', 'where', 'explain', 'about'].includes(w))) {
      return quoteHandler;
    }
  }

  // Identity questions
  if (/^(who (built|created|made|developed) you|what are you|who are you|tell me about yourself)$/i.test(lowerMessage)) {
    return () => ({
      success: true,
      type: 'info',
      content: "I'm Palette, your friendly art assistant created by the Painters' Diary Team! 🎨 I'm an AI that specializes in helping artists with techniques, advice, inspiration, and creative guidance. I can answer your art questions, give tips, share jokes and facts, or just chat about creativity!"
    });
  }

  // Simple greetings (ONLY if they're just greetings)
  if (/^(hello|hi|hey|greetings|good morning|good afternoon|good evening|howdy)(!|\?|\.)?$/i.test(lowerMessage)) {
    return () => ({
      success: true,
      type: 'greeting',
      content: "Hello! I'm Palette, your art assistant! 🎨 I can help you with art techniques, creative advice, inspiration, and answer any art-related questions. What would you like to know or create today?"
    });
  }

  return null; // Use AI for everything else
};

// Main message processor
export const messageService = {
  processMessage: async (message, conversationHistory) => {
    console.log("Processing message:", message);

    // 1. First, check for EXPLICIT local handler requests (very strict)
    const localHandler = getExplicitLocalHandler(message);
    if (localHandler) {
      console.log("✓ Using local handler for simple request");
      return localHandler();
    }
    
    // 2. Check knowledge base for common questions
    const knowledgeAnswer = getKnowledgeBaseAnswer(message);
    if (knowledgeAnswer) {
      console.log("✓ Using knowledge base for:", message);
      return {
        success: true,
        type: knowledgeAnswer.type || 'info',
        content: knowledgeAnswer.answer
      };
    }
    
    // 3. For everything else, use AI
    console.log("→ Using AI for:", message);
    
    // Throttle requests to avoid rate limits
    await throttleRequest();
    return aiHandler(message, conversationHistory);
  },

  getOptionsForType: (type) => {
    const options = {
      'joke': ['Another joke', 'Art tip', 'Interesting fact'],
      'fact': ['Another fact', 'Art tip', 'Tell me a joke'],
      'quote': ['Another quote', 'Art tip', 'Interesting fact'],
      'art-tip': ['Another tip', 'Tell me a joke', 'Interesting fact'],
      'vocabulary': ['Another word', 'Art tip', 'Interesting fact'],
      'greeting': ['Art tip', 'Tell me a joke', 'Ask me anything'],
      'info': ['Art tip', 'Tell me a joke', 'Ask me a question'],
      'ai': ['Art tip', 'Tell me a joke', 'Interesting fact'],
      'error': ['Try again', 'Art tip', 'Tell me a joke']
    };
    return options[type] || ['Art tip', 'Tell me a joke', 'Interesting fact', 'Ask me anything'];
  },

  generateChatTitle: (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('joke')) return 'Art Jokes';
    if (lowerMessage.includes('tip')) return 'Art Tips';
    if (lowerMessage.includes('fact')) return 'Art Facts';
    if (lowerMessage.includes('quote')) return 'Quotes';
    if (lowerMessage.includes('how to')) return 'How To Guide';
    if (lowerMessage.includes('technique')) return 'Art Techniques';
    if (lowerMessage.includes('color')) return 'Color Advice';
    if (lowerMessage.includes('draw')) return 'Drawing Help';
    if (lowerMessage.includes('paint')) return 'Painting Help';
    
    const words = userMessage.split(' ').filter(w => w.length > 2);
    if (words.length > 4) return `${words.slice(0, 3).join(' ')}...`;
    if (words.length > 0) return words.slice(0, 3).join(' ');
    return 'New Chat';
  },

  // Utility to get available models (for debugging)
  getAvailableModels: () => [...FREE_MODELS]
};