// import { platformQuestions, artTechniques, artHistoryData, creativeHelp,commonChatResponses, newCommonChatResponses, artStories  } from "./Knowledge";

// console.log('🔍 Import Debug:');
// console.log('platformQuestions:', Object.keys(platformQuestions || {}).length);
// console.log('artTechniques:', Object.keys(artTechniques || {}).length);
// console.log('artHistoryData:', Object.keys(artHistoryData || {}).length);
// console.log('creativeHelp:', Object.keys(creativeHelp || {}).length);
// console.log('commonChatResponses:', Object.keys(commonChatResponses || {}).length);
// console.log('newCommonChatResponses:', Object.keys(newCommonChatResponses || {}).length);


// // Combine all knowledge bases
// const KNOWLEDGE_BASE = {
//   ...commonChatResponses,
//   ...newCommonChatResponses,
//   ...platformQuestions,
//   ...artTechniques,
//   ...artHistoryData,
//   ...creativeHelp,
//   ...artStories
// };

// // Enhanced local query detection with knowledge base
// const getKnowledgeBaseAnswer = (message) => {
//   const lowerMessage = message.toLowerCase().trim();
  
//   // Direct matches
//   if (KNOWLEDGE_BASE[lowerMessage]) {
//     return KNOWLEDGE_BASE[lowerMessage];
//   }
  
//   // Fuzzy matching for common variations
//   const knowledgeKeys = Object.keys(KNOWLEDGE_BASE);
  
//   // Check for close matches (allows for slight variations)
//   for (const key of knowledgeKeys) {
//     // If user's message contains the key question
//     if (lowerMessage.includes(key) && key.length > 5) {
//       // Make sure it's not just a partial match in a larger question
//       const words = lowerMessage.split(' ');
//       if (words.some(word => key.includes(word)) || lowerMessage.includes(key)) {
//         return KNOWLEDGE_BASE[key];
//       }
//     }
//   }
  
//   // Check for question patterns
//   const questionPatterns = {
//     'how to draw': 'how to draw better',
//     'how to paint': 'how to start painting',
//     'what is painters diary': 'what is painters diary',
//     'color theory': 'color theory basics',
//     'digital art': 'digital art for beginners',
//     'creative block': 'creative block',
//     'art block': 'art block',
//     'find inspiration': 'find inspiration',
//     'stay motivated': 'stay motivated',
//     'van gogh': 'van gogh',
//     'picasso': 'picasso',
//     'impressionism': 'impressionism',
//     'renaissance': 'renaissance art'
//   };
  
//   for (const [pattern, answerKey] of Object.entries(questionPatterns)) {
//     if (lowerMessage.includes(pattern) && KNOWLEDGE_BASE[answerKey]) {
//       return KNOWLEDGE_BASE[answerKey];
//     }
//   }
  
//   return null;
// };

// // Local data arrays (keep these)
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
  // "deepseek/deepseek-chat-v3-0324:free",
  // "qwen/qwen3-235b-a22b:free",
  // "google/gemini-2.0-flash-exp:free",
  // "meta-llama/llama-3.3-70b-instruct:free",
  // "microsoft/mai-ds-r1:free",
  // "google/gemma-3-27b-it:free",
  // "openai/gpt-oss-20b:free",
  // "deepseek/deepseek-chat-v3.1:free",
  // "mistralai/mistral-small-3.2-24b-instruct:free",
  // "minimax/minimax-m2:free",
  // "z-ai/glm-4.5-air:free",
  // "deepseek/deepseek-r1:free",
  // "nvidia/nemotron-nano-12b-v2-vl:free",
  // "deepseek/deepseek-r1-distill-llama-70b:free",
  // "meta-llama/llama-4-maverick:free",
  // "cognitivecomputations/dolphin-mistral-24b-venice-edition:free",
  // "deepseek/deepseek-r1-0528-qwen3-8b:free",
  // "nousresearch/hermes-3-llama-3.1-405b:free",
  // "meta-llama/llama-3.3-8b-instruct:free",
  // "nvidia/nemotron-nano-9b-v2:free",
  // "meta-llama/llama-4-scout:free",
  // "qwen/qwen2.5-vl-32b-instruct:free",
  // "moonshotai/kimi-k2:free",
  // "google/gemma-3-4b-it:free",
  // "arliai/qwq-32b-arliai-rpr-v1:free",
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

// // Main message processor
// export const messageService = {
//   processMessage: async (message, conversationHistory) => {
//     console.log("Processing message:", message);

//     // 1. First, check for EXPLICIT local handler requests (very strict)
//     const localHandler = getExplicitLocalHandler(message);
//     if (localHandler) {
//       console.log("✓ Using local handler for simple request");
//       return localHandler();
//     }
    
//     // 2. Check knowledge base for common questions
//     const knowledgeAnswer = getKnowledgeBaseAnswer(message);
//     if (knowledgeAnswer) {
//       console.log("✓ Using knowledge base for:", message);
//       return {
//         success: true,
//         type: knowledgeAnswer.type || 'info',
//         content: knowledgeAnswer.answer
//       };
//     }
    
//     // 3. For everything else, use AI
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



// import { 
//   platformQuestions, 
//   artTechniques, 
//   artHistoryData, 
//   creativeHelp, 
//   commonChatResponses, 
//   newCommonChatResponses, 
//   artStories 
// } from "./Knowledge";

// // Import enhanced systems
// import { getEnhancedKnowledgeAnswer } from "./enhanchedKnowledge/enhancedKnowledge";
// import { templateMatcher } from "./enhanchedKnowledge/responseTemplates";
// import { getCachedResponse, setCachedResponse } from "./enhanchedKnowledge/cache/responseCache";
// import { JOKES, FACTS, QUOTES,ART_TERMS, ART_TIPS } from "./enhanchedKnowledge/localHandlers";
// import { enhancedAIHandler } from "./enhanchedKnowledge/ai/aiHandler";


// console.log('🔍 Import Debug:');
// console.log('platformQuestions:', Object.keys(platformQuestions || {}).length);
// console.log('artTechniques:', Object.keys(artTechniques || {}).length);
// console.log('artHistoryData:', Object.keys(artHistoryData || {}).length);
// console.log('creativeHelp:', Object.keys(creativeHelp || {}).length);
// console.log('commonChatResponses:', Object.keys(commonChatResponses || {}).length);
// console.log('newCommonChatResponses:', Object.keys(newCommonChatResponses || {}).length);

// // Combine all knowledge bases (legacy - keep for backward compatibility)
// const KNOWLEDGE_BASE = {
//   ...commonChatResponses,
//   ...newCommonChatResponses,
//   ...platformQuestions,
//   ...artTechniques,
//   ...artHistoryData,
//   ...creativeHelp,
//   ...artStories
// };

// // Request throttling
// let lastRequestTime = 0;
// const MIN_REQUEST_INTERVAL = 2000;

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
//     content: `"${quote.content}" - ${quote.author}`
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
//     content: `**${term.word}**: ${term.definition}`,
//     word: term.word,
//     definition: term.definition
//   };
// };

// // Detect if message is requesting specific local content
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

//   return null;
// };

// // Legacy knowledge base (for backward compatibility)
// const getLegacyKnowledgeAnswer = (message) => {
//   const lowerMessage = message.toLowerCase().trim();
  
//   // Direct matches
//   if (KNOWLEDGE_BASE[lowerMessage]) {
//     return KNOWLEDGE_BASE[lowerMessage];
//   }
  
//   // Fuzzy matching for common variations
//   const knowledgeKeys = Object.keys(KNOWLEDGE_BASE);
  
//   for (const key of knowledgeKeys) {
//     if (lowerMessage.includes(key) && key.length > 5) {
//       const words = lowerMessage.split(' ');
//       if (words.some(word => key.includes(word)) || lowerMessage.includes(key)) {
//         return KNOWLEDGE_BASE[key];
//       }
//     }
//   }
  
//   return null;
// };

// // Main enhanced message processor
// export const messageService = {
//   async processMessage(message, conversationHistory) {
//     console.log("🔍 Processing message:", message);

//     // 1. Check for EXPLICIT local handler requests (very strict)
//     const localHandler = getExplicitLocalHandler(message);
//     if (localHandler) {
//       console.log("✓ Using local handler for simple request");
//       return localHandler();
//     }
    
//     // 2. Check enhanced knowledge base FIRST (new system)
//     const enhancedKnowledgeAnswer = getEnhancedKnowledgeAnswer(message);
//     if (enhancedKnowledgeAnswer) {
//       console.log("✓ Using enhanced knowledge base:", enhancedKnowledgeAnswer.confidence);
//       return {
//         success: true,
//         type: 'knowledge',
//         content: enhancedKnowledgeAnswer.answer,
//         category: enhancedKnowledgeAnswer.category,
//         confidence: enhancedKnowledgeAnswer.confidence,
//         source: 'enhanced-knowledge'
//       };
//     }
    
//     // 3. Check response templates
//     const templateAnswer = templateMatcher(message);
//     if (templateAnswer) {
//       console.log("✓ Using response template:", templateAnswer.type);
//       return {
//         success: true,
//         type: 'template',
//         content: templateAnswer.answer,
//         category: templateAnswer.type,
//         source: 'template'
//       };
//     }
    
//     // 4. Check legacy knowledge base
//     const legacyKnowledgeAnswer = getLegacyKnowledgeAnswer(message);
//     if (legacyKnowledgeAnswer) {
//       console.log("✓ Using legacy knowledge base");
//       return {
//         success: true,
//         type: 'knowledge',
//         content: typeof legacyKnowledgeAnswer === 'string' ? legacyKnowledgeAnswer : legacyKnowledgeAnswer.answer,
//         source: 'legacy-knowledge'
//       };
//     }
    
//     // 5. Check cache
//     const cachedResponse = getCachedResponse(message);
//     if (cachedResponse) {
//       console.log("✓ Using cached response");
//       return { ...cachedResponse, source: 'cache' };
//     }
    
//     // 6. Use AI as last resort
//     console.log("→ Using AI for complex query");
    
//     // Throttle requests to avoid rate limits
//     await throttleRequest();
//     const aiResponse = await enhancedAIHandler(message, conversationHistory);
    
//     // Cache successful AI responses
//     if (aiResponse.success && aiResponse.type === 'ai') {
//       setCachedResponse(message, aiResponse);
//     }
    
//     return aiResponse;
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
//       'knowledge': ['Art tip', 'Tell me a joke', 'Ask another question'],
//       'template': ['Art tip', 'Tell me a joke', 'More details'],
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

//   // Utility methods
//   clearCache: () => {
//     // This would clear the cache if you export the function
//     console.log("Cache clear requested");
//   },

//   getStats: () => ({
//     timestamp: new Date().toISOString(),
//     system: "Enhanced Message Service v2.0"
//   })
// };


import { 
  platformQuestions, 
  artTechniques, 
  artHistoryData, 
  creativeHelp, 
  commonChatResponses, 
  newCommonChatResponses, 
  artStories 
} from "./Knowledge";

// Import enhanced systems
import { getEnhancedKnowledgeAnswer } from "./enhanchedKnowledge/enhancedKnowledge";
import { templateMatcher } from "./enhanchedKnowledge/responseTemplates";
import { getCachedResponse, setCachedResponse } from "./enhanchedKnowledge/cache/responseCache";
import { JOKES, FACTS, QUOTES,ART_TERMS, ART_TIPS } from "./enhanchedKnowledge/localHandlers";
import { enhancedAIHandler } from "./enhanchedKnowledge/ai/aiHandler";

// Import filtering systems
// import { shouldUseAI, getRedirectionResponse, classifyMessage } from './filters/chatFilter';
// import { getPatternResponse } from './filters/patternMatcher';
import { shouldUseAI, getRedirectionResponse, classifyMessage } from "./enhanchedKnowledge/filters/chatFilter";
import { getPatternResponse } from "./enhanchedKnowledge/filters/patternMatcher";

console.log('🔍 Import Debug:');
console.log('platformQuestions:', Object.keys(platformQuestions || {}).length);
console.log('artTechniques:', Object.keys(artTechniques || {}).length);
console.log('artHistoryData:', Object.keys(artHistoryData || {}).length);
console.log('creativeHelp:', Object.keys(creativeHelp || {}).length);
console.log('commonChatResponses:', Object.keys(commonChatResponses || {}).length);
console.log('newCommonChatResponses:', Object.keys(newCommonChatResponses || {}).length);

// Combine all knowledge bases (legacy - keep for backward compatibility)
const KNOWLEDGE_BASE = {
  ...commonChatResponses,
  ...newCommonChatResponses,
  ...platformQuestions,
  ...artTechniques,
  ...artHistoryData,
  ...creativeHelp,
  ...artStories
};

// Request throttling
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000;

const throttleRequest = async () => {
  const now = Date.now();
  const timeSinceLastRequest = now - lastRequestTime;
  
  if (timeSinceLastRequest < MIN_REQUEST_INTERVAL) {
    const waitTime = MIN_REQUEST_INTERVAL - timeSinceLastRequest;
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
  
  lastRequestTime = Date.now();
};

// Track conversation context to detect persistent off-topic behavior
let conversationContext = {
  recentClassifications: [],
  artTopicCount: 0,
  offTopicCount: 0,
  lastArtTopicTime: Date.now()
};

const updateConversationContext = (classification) => {
  conversationContext.recentClassifications.push({
    classification,
    timestamp: Date.now()
  });
  
  // Keep only last 10 classifications
  if (conversationContext.recentClassifications.length > 10) {
    conversationContext.recentClassifications.shift();
  }
  
  // Update counters
  if (classification === 'art_topic' || classification === 'allowed') {
    conversationContext.artTopicCount++;
    conversationContext.lastArtTopicTime = Date.now();
  } else if (classification === 'off_topic' || classification === 'possibly_off_topic') {
    conversationContext.offTopicCount++;
  }
  
  // Reset counters if too much time has passed
  const timeSinceLastArt = Date.now() - conversationContext.lastArtTopicTime;
  if (timeSinceLastArt > 10 * 60 * 1000) { // 10 minutes
    conversationContext.artTopicCount = 0;
    conversationContext.offTopicCount = 0;
  }
};

const shouldForceArtRedirect = () => {
  const totalRecent = conversationContext.recentClassifications.length;
  if (totalRecent < 3) return false;
  
  const recentOffTopics = conversationContext.recentClassifications.filter(
    c => c.classification === 'off_topic' || c.classification === 'possibly_off_topic'
  ).length;
  
  // If more than 60% of recent messages are off-topic, force redirect
  return recentOffTopics / totalRecent > 0.6;
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
    content: `"${quote.content}" - ${quote.author}`
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
    content: `**${term.word}**: ${term.definition}`,
    word: term.word,
    definition: term.definition
  };
};

// Detect if message is requesting specific local content
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

  return null;
};

// Legacy knowledge base (for backward compatibility)
const getLegacyKnowledgeAnswer = (message) => {
  const lowerMessage = message.toLowerCase().trim();
  
  // Direct matches
  if (KNOWLEDGE_BASE[lowerMessage]) {
    return KNOWLEDGE_BASE[lowerMessage];
  }
  
  // Fuzzy matching for common variations
  const knowledgeKeys = Object.keys(KNOWLEDGE_BASE);
  
  for (const key of knowledgeKeys) {
    if (lowerMessage.includes(key) && key.length > 5) {
      const words = lowerMessage.split(' ');
      if (words.some(word => key.includes(word)) || lowerMessage.includes(key)) {
        return KNOWLEDGE_BASE[key];
      }
    }
  }
  
  return null;
};

// Enhanced message processor with filtering
export const messageService = {
  async processMessage(message, conversationHistory) {
    console.log("🔍 Processing message:", message);

    // Update conversation context
    const classification = classifyMessage(message);
    updateConversationContext(classification);
    
    console.log(`📊 Conversation stats: Art topics: ${conversationContext.artTopicCount}, Off-topics: ${conversationContext.offTopicCount}`);

    // 1. Check for EXPLICIT local handler requests (very strict)
    const localHandler = getExplicitLocalHandler(message);
    if (localHandler) {
      console.log("✓ Using local handler for simple request");
      return localHandler();
    }
    
    // 2. Check pattern responses for common off-topic queries
    const patternResponse = getPatternResponse(message);
    if (patternResponse) {
      console.log("✓ Using pattern response for off-topic query");
      return {
        success: true,
        type: 'redirection',
        content: patternResponse.response,
        category: patternResponse.category,
        source: 'pattern-matcher'
      };
    }
    
    // 3. Check if we should force art redirect (persistent off-topic behavior)
    if (shouldForceArtRedirect()) {
      console.log("⚠️ Force redirect due to persistent off-topic behavior");
      return getRedirectionResponse(message);
    }
    
    // 4. Check if message should be blocked from AI
    if (!shouldUseAI(message)) {
      console.log("🚫 Blocking AI usage for off-topic message");
      return getRedirectionResponse(message);
    }
    
    // 5. Check enhanced knowledge base (new system)
    const enhancedKnowledgeAnswer = getEnhancedKnowledgeAnswer(message);
    if (enhancedKnowledgeAnswer) {
      console.log("✓ Using enhanced knowledge base:", enhancedKnowledgeAnswer.confidence);
      return {
        success: true,
        type: 'knowledge',
        content: enhancedKnowledgeAnswer.answer,
        category: enhancedKnowledgeAnswer.category,
        confidence: enhancedKnowledgeAnswer.confidence,
        source: 'enhanced-knowledge'
      };
    }
    
    // 6. Check response templates
    const templateAnswer = templateMatcher(message);
    if (templateAnswer) {
      console.log("✓ Using response template:", templateAnswer.type);
      return {
        success: true,
        type: 'template',
        content: templateAnswer.answer,
        category: templateAnswer.type,
        source: 'template'
      };
    }
    
    // 7. Check legacy knowledge base
    const legacyKnowledgeAnswer = getLegacyKnowledgeAnswer(message);
    if (legacyKnowledgeAnswer) {
      console.log("✓ Using legacy knowledge base");
      return {
        success: true,
        type: 'knowledge',
        content: typeof legacyKnowledgeAnswer === 'string' ? legacyKnowledgeAnswer : legacyKnowledgeAnswer.answer,
        source: 'legacy-knowledge'
      };
    }
    
    // 8. Check cache
    const cachedResponse = getCachedResponse(message);
    if (cachedResponse) {
      console.log("✓ Using cached response");
      return { ...cachedResponse, source: 'cache' };
    }
    
    // 9. FINALLY, use AI as last resort (only for art-related or unknown topics)
    console.log("→ Using AI for complex art-related query");
    
    // Throttle requests to avoid rate limits
    await throttleRequest();
    const aiResponse = await enhancedAIHandler(message, conversationHistory);
    
    // Cache successful AI responses
    if (aiResponse.success && aiResponse.type === 'ai') {
      setCachedResponse(message, aiResponse);
    }
    
    return aiResponse;
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
      'knowledge': ['Art tip', 'Tell me a joke', 'Ask another question'],
      'template': ['Art tip', 'Tell me a joke', 'More details'],
      'redirection': ['Drawing help', 'Painting tips', 'Color theory'],
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

  // Utility methods
  clearCache: () => {
    console.log("Cache clear requested");
  },

  getStats: () => ({
    timestamp: new Date().toISOString(),
    system: "Enhanced Message Service v2.0 with Filtering",
    conversationStats: {
      artTopics: conversationContext.artTopicCount,
      offTopics: conversationContext.offTopicCount,
      recentClassifications: conversationContext.recentClassifications.length
    }
  }),

  // Reset conversation context (useful for new chat sessions)
  resetContext: () => {
    conversationContext = {
      recentClassifications: [],
      artTopicCount: 0,
      offTopicCount: 0,
      lastArtTopicTime: Date.now()
    };
    console.log("✓ Conversation context reset");
  }
};