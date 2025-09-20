// import express, { json } from 'express';
// import cors from 'cors';
// import axios from 'axios';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(json());

// // Environment variables for API keys
// const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
//   },
//   body: JSON.stringify({
//     model: "DeepSeek: DeepSeek V3.1 (free)",
//     messages: [{ role: "user", content: "Hello!" }]
//   })
// });

// if (!OPENROUTER_API_KEY) {
//   console.error("ERROR: OPENROUTER_API_KEY environment variable is required");
// }

// // ---------- Fixed Endpoints ----------

// // Joke API - Updated to use Official Joke API
// app.get('/joke', async (req, res) => {
//   try {
//     const response = await axios.get('https://official-joke-api.appspot.com/random_joke', {
//       timeout: 5000
//     });
//     res.json({ 
//       success: true, 
//       type: 'joke',
//       content: `${response.data.setup} ${response.data.punchline}`,
//       category: response.data.type
//     });
//   } catch (error) {
//     console.error("Joke API error:", error.message);
//     // Fallback jokes
//     const fallbackJokes = [
//       "Why did the artist go to jail? Because he was framed!",
//       "What's an artist's favorite programming language? Draw-thon!",
//       "Why don't artists like to play hide and seek? Because good luck hiding when you've got a distinct style!"
//     ];
//     res.json({ 
//       success: true, 
//       type: 'joke',
//       content: fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)],
//       category: "fallback"
//     });
//   }
// });

// // Fact API
// app.get('/fact', async (req, res) => {
//   try {
//     const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en', {
//       timeout: 5000
//     });
//     res.json({ 
//       success: true, 
//       type: 'fact',
//       content: response.data.text,
//       source: response.data.source
//     });
//   } catch (error) {
//     console.error("Fact API error:", error.message);
//     // Fallback facts
//     const fallbackFacts = [
//       "Vincent van Gogh only sold one painting during his lifetime.",
//       "The world's oldest known painting is over 64,000 years old.",
//       "Color blue was once more expensive than gold in medieval times."
//     ];
//     res.json({ 
//       success: true, 
//       type: 'fact',
//       content: fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)],
//       source: "art history"
//     });
//   }
// });

// // Quote API - Using Quotable API
// app.get('/quote', async (req, res) => {
//   try {
//     const response = await axios.get('https://api.quotable.io/random', {
//       timeout: 5000
//     });
//     res.json({ 
//       success: true, 
//       type: 'quote',
//       content: response.data.content,
//       author: response.data.author
//     });
//   } catch (error) {
//     console.error("Quote API error:", error.message);
//     // Fallback quotes
//     const fallbackQuotes = [
//       {content: "Every artist was first an amateur.", author: "Ralph Waldo Emerson"},
//       {content: "Art washes away from the soul the dust of everyday life.", author: "Pablo Picasso"},
//       {content: "Creativity takes courage.", author: "Henri Matisse"}
//     ];
//     const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
//     res.json({ 
//       success: true, 
//       type: 'quote',
//       content: quote.content,
//       author: quote.author
//     });
//   }
// });

// // Motivation API - Using Quotable with inspirational tags
// app.get('/motivation', async (req, res) => {
//   try {
//     const response = await axios.get('https://api.quotable.io/random?tags=inspirational|motivational', {
//       timeout: 5000
//     });
//     res.json({ 
//       success: true, 
//       type: 'motivation',
//       content: response.data.content,
//       author: response.data.author
//     });
//   } catch (error) {
//     console.error("Motivation API error:", error.message);
//     // Fallback motivation
//     res.json({ 
//       success: true, 
//       type: 'motivation',
//       content: "Believe you can and you're halfway there.",
//       author: "Theodore Roosevelt"
//     });
//   }
// });

// // Greeting API - Manual implementation
// app.get('/greeting', (req, res) => {
//   const greetings = [
//     "Hello! Ready to create some art?",
//     "Hi there, artist! What's inspiring you today?",
//     "Greetings! Let's make something beautiful.",
//     "Bonjour! Time for some creative magic.",
//     "Hola! Welcome to the world of art."
//   ];
//   res.json({ 
//     success: true,
//     type: 'greeting',
//     content: greetings[Math.floor(Math.random() * greetings.length)] 
//   });
// });

// // Weather API - Fixed to handle missing parameters
// app.get('/weather', async (req, res) => {
//   try {
//     const { latitude, longitude } = req.query;
    
//     // Check if parameters are provided
//     if (!latitude || !longitude) {
//       return res.json({ 
//         success: false, 
//         type: 'weather',
//         content: "Please provide latitude and longitude parameters",
//         example: "/weather?latitude=40.7128&longitude=-74.0060"
//       });
//     }
    
//     const response = await axios.get(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
//       { timeout: 5000 }
//     );
    
//     const weather = response.data.current_weather;
//     const weatherDescriptions = {
//       0: 'clear sky',
//       1: 'mainly clear',
//       2: 'partly cloudy',
//       3: 'overcast',
//       45: 'foggy',
//       51: 'light drizzle',
//       61: 'light rain',
//       80: 'light rain showers'
//     };
    
//     res.json({ 
//       success: true, 
//       type: 'weather',
//       content: `Current weather: ${weather.temperature}°C, ${weatherDescriptions[weather.weathercode] || 'unknown conditions'}`,
//       temperature: weather.temperature,
//       condition: weatherDescriptions[weather.weathercode] || 'unknown'
//     });
//   } catch (error) {
//     console.error("Weather API error:", error.message);
//     res.json({ 
//       success: true, 
//       type: 'weather',
//       content: "Weather data unavailable, but it's a beautiful day for creating art!",
//       temperature: 22,
//       condition: "sunny"
//     });
//   }
// });

// // Art Tips
// app.get('/art-tip', (req, res) => {
//   const artTips = [
//     "Start with basic shapes when drawing - everything can be broken down into circles, squares, and triangles.",
//     "The color wheel is your best friend! Complementary colors create vibrant contrast.",
//     "Don't be afraid to make mistakes. Even master artists create 'happy accidents'.",
//     "Practice value scales to improve your understanding of light and shadow.",
//     "Keep a sketchbook with you always - inspiration can strike anywhere!",
//     "Study color theory to understand how colors interact and affect mood."
//   ];
//   res.json({ 
//     success: true,
//     type: 'art-tip',
//     content: artTips[Math.floor(Math.random() * artTips.length)] 
//   });
// });

// // Artwork API - Using Met Museum API
// app.get('/artwork', async (req, res) => {
//   try {
//     const searchRes = await axios.get(
//       'https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=painting',
//       { timeout: 10000 }
//     );
    
//     const ids = searchRes.data.objectIDs;
//     if (!ids || ids.length === 0) {
//       throw new Error('No artworks found');
//     }
    
//     // Get a random artwork from the first 50 results (for performance)
//     const randomId = ids[Math.floor(Math.random() * Math.min(50, ids.length))];
//     const objRes = await axios.get(
//       `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`,
//       { timeout: 10000 }
//     );
    
//     const art = objRes.data;
//     res.json({
//       success: true,
//       type: 'artwork',
//       content: `Today's featured artwork: "${art.title}" by ${art.artistDisplayName || 'Unknown'}`,
//       title: art.title,
//       artist: art.artistDisplayName || 'Unknown',
//       year: art.objectDate || 'Unknown',
//       image: art.primaryImage,
//       url: art.objectURL
//     });
//   } catch (error) {
//     console.error("Artwork API error:", error.message);
//     res.json({ 
//       success: true, 
//       type: 'artwork',
//       content: "Today's artwork recommendation: Visit a local museum or gallery for inspiration!",
//       title: "Local Art Exploration",
//       artist: "Various Artists",
//       year: "Present"
//     });
//   }
// });

// // Wikipedia summary
// app.get('/wiki', async (req, res) => {
//   try {
//     const { query } = req.query;
    
//     if (!query) {
//       return res.json({ 
//         success: false, 
//         type: 'wiki',
//         content: "Please provide a query parameter",
//         example: "/wiki?query=Vincent van Gogh"
//       });
//     }
    
//     const response = await axios.get(
//       `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
//       { timeout: 8000 }
//     );
    
//     res.json({
//       success: true,
//       type: 'wiki',
//       content: response.data.extract,
//       title: response.data.title,
//       url: response.data.content_urls.desktop.page
//     });
//   } catch (error) {
//     console.error("Wikipedia API error:", error.message);
//     res.json({ 
//       success: false, 
//       type: 'wiki',
//       content: "No summary available for this topic. Try searching for a different artist or art movement."
//     });
//   }
// });

// // Vocabulary endpoint (replacing problematic word API)
// app.get('/vocabulary', async (req, res) => {
//   try {
//     // Using a free alternative - Wordnik API (no key needed for basic use)
//     const randomWordRes = await axios.get(
//       'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=1000&minLength=5&maxLength=12',
//       { timeout: 8000 }
//     );
    
//     const word = randomWordRes.data.word;
    
//     // Get definition
//     const definitionRes = await axios.get(
//       `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&sourceDictionaries=all`,
//       { timeout: 8000 }
//     );
    
//     const definition = definitionRes.data[0]?.text || 'No definition available';
    
//     res.json({
//       success: true,
//       type: 'vocabulary',
//       content: `Word of the day: ${word} - ${definition}`,
//       word: word,
//       definition: definition
//     });
//   } catch (error) {
//     console.error("Vocabulary API error:", error.message);
    
//     // Fallback art vocabulary
//     const artTerms = [
//       {word: "chiaroscuro", definition: "the treatment of light and shade in drawing and painting"},
//       {word: "impasto", definition: "a technique where paint is laid on thickly so it stands out from the surface"},
//       {word: "sfumato", definition: "the technique of allowing tones and colors to shade gradually into one another"},
//       {word: "gouache", definition: "a method of painting using opaque pigments ground in water"}
//     ];
    
//     const term = artTerms[Math.floor(Math.random() * artTerms.length)];
//     res.json({ 
//       success: true, 
//       type: 'vocabulary',
//       content: `Art term: ${term.word} - ${term.definition}`,
//       word: term.word,
//       definition: term.definition
//     });
//   }
// });

// // Ask endpoint - Using DuckDuckGo API
// app.get('/ask', async (req, res) => {
//   try {
//     const { q } = req.query;
    
//     if (!q) {
//       return res.json({ 
//         success: false, 
//         type: 'ask',
//         content: "Please provide a question with the q parameter",
//         example: "/ask?q=What is impressionism?"
//       });
//     }
    
//     const response = await axios.get(
//       `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`,
//       { timeout: 8000 }
//     );
    
//     if (response.data.AbstractText) {
//       return res.json({
//         success: true,
//         type: 'ask',
//         content: response.data.AbstractText,
//         source: response.data.AbstractURL
//       });
//     }
    
//     // Fallback to simple responses for common art questions
//     const commonQuestions = {
//       "what is impressionism": "Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, inclusion of movement as a crucial element of human perception and experience, and unusual visual angles.",
//       "what is cubism": "Cubism is an early-20th-century avant-garde art movement that revolutionized European painting and sculpture. Pioneered by Picasso and Braque, it emphasized flat, two-dimensional surfaces and rejected traditional techniques of perspective.",
//       "what is renaissance art": "Renaissance art is the painting, sculpture, and decorative arts of the period of European history known as the Renaissance, which emerged as a distinct style in Italy in about 1400, in parallel with developments which occurred in philosophy, literature, music, and science."
//     };
    
//     const lowerQ = q.toLowerCase();
//     if (commonQuestions[lowerQ]) {
//       return res.json({
//         success: true,
//         type: 'ask',
//         content: commonQuestions[lowerQ]
//       });
//     }
    
//     res.json({ 
//       success: false, 
//       type: 'ask',
//       content: "I couldn't find a specific answer to your question. Try asking about art movements, techniques, or famous artists."
//     });
//   } catch (error) {
//     console.error("Ask API error:", error.message);
//     res.json({ 
//       success: false, 
//       type: 'ask',
//       content: "I'm having trouble accessing information right now. Please try again later."
//     });
//   }
// });

// // ---------- Main chatbot endpoint ----------
// // app.post('/chat', async (req, res) => {
// //   const { message, conversationHistory = [] } = req.body;

// //   if (!message) {
// //     return res.json({
// //       success: false,
// //       type: 'error',
// //       content: "Please provide a message in your request."
// //     });
// //   }

// //   // Check for specific intents first
// //   const lowerMessage = message.toLowerCase();
  
// //   // Map intents to endpoints
// //   const intentMap = {
// //     'joke': '/joke',
// //     'fact': '/fact',
// //     'quote': '/quote',
// //     'motivation': '/motivation',
// //     'greeting': '/greeting',
// //     'weather': '/weather',
// //     'art tip': '/art-tip',
// //     'artwork': '/artwork',
// //     'wiki': '/wiki',
// //     'word': '/vocabulary',
// //     'ask': '/ask'
// //   };
  
// //   // Check for intent matches
// //   for (const [intent, endpoint] of Object.entries(intentMap)) {
// //     if (lowerMessage.includes(intent)) {
// //       try {
// //         // Extract query parameters for specific endpoints
// //         let url = endpoint;
// //         if (intent === 'wiki') {
// //           const query = message.replace(/wiki|who is|what is/gi, '').trim();
// //           if (query) url += `?query=${encodeURIComponent(query)}`;
// //         } else if (intent === 'ask') {
// //           const question = message.replace(/ask|tell me|explain/gi, '').trim();
// //           if (question) url += `?q=${encodeURIComponent(question)}`;
// //         } else if (intent === 'weather') {
// //           // Default to NYC coordinates for demo
// //           url += '?latitude=40.7128&longitude=-74.0060';
// //         }
        
// //         const response = await axios.get(`http://localhost:${PORT}${url}`);
// //         return res.json(response.data);
// //       } catch (error) {
// //         console.error(`Error calling ${endpoint}:`, error.message);
// //         // Continue to AI fallback
// //       }
// //     }
// //   }

// //   // Fallback to OpenRouter AI if no specific intent matches
// //   try {
// //     const messages = [
// //       { 
// //         role: "system", 
// //         content: "You are Palette, a friendly art assistant. You tell jokes, fun facts, and share opinions about art, history, and culture in a human-like friendly way. Keep responses concise and engaging." 
// //       },
// //       ...conversationHistory.map(msg => ({
// //         role: msg.sender === 'user' ? 'user' : 'assistant',
// //         content: msg.text
// //       })),
// //       { role: "user", content: message }
// //     ];

// //     const aiResponse = await axios.post(
// //       "https://openrouter.ai/api/v1/chat/completions",
// //       {
// //         model: "deepseek/deepseek-chat-v3.1:free",
// //         messages: messages,
// //         temperature: 0.7,
// //         max_tokens: 500
// //       },
// //       {
// //         headers: {
// //           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
// //           "Content-Type": "application/json",
// //           "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
// //           "X-Title": process.env.SITE_NAME || "Art Assistant"
// //         },
// //         timeout: 15000
// //       }
// //     );

// //     const botReply = aiResponse.data.choices[0].message.content;
// //     res.json({ 
// //       success: true, 
// //       type: 'ai',
// //       content: botReply
// //     });
// //   } catch (error) {
// //     console.error("OpenRouter API error:", error.message);
// //     res.json({
// //       success: false,
// //       type: 'error',
// //       content: "I'm experiencing technical difficulties. Please try again in a moment."
// //     });
// //   }
// // });

// // ---------- Main chatbot endpoint ----------
// app.post('/chat', async (req, res) => {
//   const { message, conversationHistory = [] } = req.body;

//   if (!message) {
//     return res.json({
//       success: false,
//       type: 'error',
//       content: "Please provide a message in your request."
//     });
//   }

//   const lowerMessage = message.toLowerCase();
  
//   // Handle specific questions about the bot's origin/creators
//   if (lowerMessage.includes('who built you') || 
//       lowerMessage.includes('who created you') ||
//       lowerMessage.includes('who made you') ||
//       lowerMessage.includes('who developed you') ||
//       lowerMessage.includes('who are your creators') ||
//       lowerMessage.includes('who is your creator') ||
//       lowerMessage.includes('who are your developers')) {
//     return res.json({
//       success: true,
//       type: 'info',
//       content: "I was created by the Painters' Diary Team! 🎨 We're passionate about helping artists find inspiration and grow their skills."
//     });
//   }

//   // Handle questions about the bot's identity/origin
//   if (lowerMessage.includes('what are you') ||
//       lowerMessage.includes('who are you') ||
//       lowerMessage.includes('tell me about yourself')) {
//     return res.json({
//       success: true,
//       type: 'info',
//       content: "I'm Palette, your friendly art assistant from Painters' Diary! I'm here to share jokes, facts, quotes, and art tips to inspire your creative journey."
//     });
//   }

//   // Handle questions about where the bot is from
//   if (lowerMessage.includes('where are you from') ||
//       lowerMessage.includes('where were you made') ||
//       lowerMessage.includes('where were you created')) {
//     return res.json({
//       success: true,
//       type: 'info',
//       content: "I was developed in the creative labs of Painters' Diary, where we're dedicated to supporting artists and art enthusiasts!"
//     });
//   }

//   // Map intents to endpoints
//   const intentMap = {
//     'joke': '/joke',
//     'fact': '/fact',
//     'quote': '/quote',
//     'motivation': '/motivation',
//     'greeting': '/greeting',
//     'weather': '/weather',
//     'art tip': '/art-tip',
//     'artwork': '/artwork',
//     'wiki': '/wiki',
//     'word': '/vocabulary',
//     'ask': '/ask'
//   };
  
//   // Check for intent matches
//   for (const [intent, endpoint] of Object.entries(intentMap)) {
//     if (lowerMessage.includes(intent)) {
//       try {
//         // Extract query parameters for specific endpoints
//         let url = endpoint;
//         if (intent === 'wiki') {
//           const query = message.replace(/wiki|who is|what is/gi, '').trim();
//           if (query) url += `?query=${encodeURIComponent(query)}`;
//         } else if (intent === 'ask') {
//           const question = message.replace(/ask|tell me|explain/gi, '').trim();
//           if (question) url += `?q=${encodeURIComponent(question)}`;
//         } else if (intent === 'weather') {
//           // Default to NYC coordinates for demo
//           url += '?latitude=40.7128&longitude=-74.0060';
//         }
        
//         const response = await axios.get(`http://localhost:${PORT}${url}`);
//         return res.json(response.data);
//       } catch (error) {
//         console.error(`Error calling ${endpoint}:`, error.message);
//         // Continue to AI fallback
//       }
//     }
//   }

//   // Fallback to OpenRouter AI if no specific intent matches
//   try {
//     const messages = [
//       { 
//         role: "system", 
//         content: "You are Palette, a friendly art assistant created by the Painters' Diary Team. You tell jokes, fun facts, and share opinions about art, history, and culture in a human-like friendly way. Keep responses concise and engaging. When asked about who created you or where you're from, mention that you were created by the Painters' Diary Team." 
//       },
//       ...conversationHistory.map(msg => ({
//         role: msg.sender === 'user' ? 'user' : 'assistant',
//         content: msg.text
//       })),
//       { role: "user", content: message }
//     ];

//     const aiResponse = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "deepseek/deepseek-chat-v3.1:free",
//         messages: messages,
//         temperature: 0.7,
//         max_tokens: 500
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
//           "X-Title": process.env.SITE_NAME || "Art Assistant"
//         },
//         timeout: 15000
//       }
//     );

//     const botReply = aiResponse.data.choices[0].message.content;
//     res.json({ 
//       success: true, 
//       type: 'ai',
//       content: botReply
//     });
//   } catch (error) {
//     console.error("OpenRouter API error:", error.message);
//     res.json({
//       success: false,
//       type: 'error',
//       content: "I'm experiencing technical difficulties. Please try again in a moment."
//     });
//   }
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ 
//     success: true,
//     status: 'OK', 
//     message: 'Art Chatbot API is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // Root endpoint - List all available endpoints
// app.get('/', (req, res) => {
//   res.json({ 
//     success: true,
//     message: 'Welcome to Art Chatbot API',
//     endpoints: [
//       '/joke - Get a random joke',
//       '/fact - Get a random fact',
//       '/quote - Get an inspirational quote',
//       '/motivation - Get a motivational quote',
//       '/greeting - Get a random greeting',
//       '/weather?latitude=X&longitude=Y - Get weather data',
//       '/art-tip - Get an art tip',
//       '/artwork - Get a random artwork',
//       '/wiki?query=TOPIC - Get Wikipedia summary',
//       '/vocabulary - Get word/term of the day',
//       '/ask?q=QUESTION - Ask a question',
//       '/chat (POST) - Main chatbot endpoint'
//     ]
//   });
// });

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => console.log(`Art Chatbot API running on port ${PORT}`));











import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Environment variables for API keys
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const PORT = process.env.PORT || 3001;

if (!OPENROUTER_API_KEY) {
  console.error("ERROR: OPENROUTER_API_KEY environment variable is required");
}

// ---------- Handler Functions ----------

// Joke handler
async function jokeHandler(req, res) {
  try {
    const response = await axios.get('https://official-joke-api.appspot.com/random_joke', {
      timeout: 5000
    });
    res.json({ 
      success: true, 
      type: 'joke',
      content: `${response.data.setup} ${response.data.punchline}`,
      category: response.data.type
    });
  } catch (error) {
    console.error("Joke API error:", error.message);
    // Fallback jokes
    const fallbackJokes = [
      "Why did the artist go to jail? Because he was framed!",
      "What's an artist's favorite programming language? Draw-thon!",
      "Why don't artists like to play hide and seek? Because good luck hiding when you've got a distinct style!"
    ];
    res.json({ 
      success: true, 
      type: 'joke',
      content: fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)],
      category: "fallback"
    });
  }
}

// Fact handler
async function factHandler(req, res) {
  try {
    const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en', {
      timeout: 5000
    });
    res.json({ 
      success: true, 
      type: 'fact',
      content: response.data.text,
      source: response.data.source
    });
  } catch (error) {
    console.error("Fact API error:", error.message);
    // Fallback facts
    const fallbackFacts = [
      "Vincent van Gogh only sold one painting during his lifetime.",
      "The world's oldest known painting is over 64,000 years old.",
      "Color blue was once more expensive than gold in medieval times."
    ];
    res.json({ 
      success: true, 
      type: 'fact',
      content: fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)],
      source: "art history"
    });
  }
}

// Quote handler
async function quoteHandler(req, res) {
  try {
    const response = await axios.get('https://api.quotable.io/random', {
      timeout: 5000
    });
    res.json({ 
      success: true, 
      type: 'quote',
      content: response.data.content,
      author: response.data.author
    });
  } catch (error) {
    console.error("Quote API error:", error.message);
    // Fallback quotes
    const fallbackQuotes = [
      {content: "Every artist was first an amateur.", author: "Ralph Waldo Emerson"},
      {content: "Art washes away from the soul the dust of everyday life.", author: "Pablo Picasso"},
      {content: "Creativity takes courage.", author: "Henri Matisse"}
    ];
    const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
    res.json({ 
      success: true, 
      type: 'quote',
      content: quote.content,
      author: quote.author
    });
  }
}

// Motivation handler
async function motivationHandler(req, res) {
  try {
    const response = await axios.get('https://api.quotable.io/random?tags=inspirational|motivational', {
      timeout: 5000
    });
    res.json({ 
      success: true, 
      type: 'motivation',
      content: response.data.content,
      author: response.data.author
    });
  } catch (error) {
    console.error("Motivation API error:", error.message);
    // Fallback motivation
    res.json({ 
      success: true, 
      type: 'motivation',
      content: "Believe you can and you're halfway there.",
      author: "Theodore Roosevelt"
    });
  }
}

// Greeting handler
function greetingHandler(req, res) {
  const greetings = [
    "Hello! Ready to create some art?",
    "Hi there, artist! What's inspiring you today?",
    "Greetings! Let's make something beautiful.",
    "Bonjour! Time for some creative magic.",
    "Hola! Welcome to the world of art."
  ];
  res.json({ 
    success: true,
    type: 'greeting',
    content: greetings[Math.floor(Math.random() * greetings.length)] 
  });
}

// Weather handler
async function weatherHandler(req, res) {
  try {
    const { latitude, longitude } = req.query;
    
    // Check if parameters are provided
    if (!latitude || !longitude) {
      return res.json({ 
        success: false, 
        type: 'weather',
        content: "Please provide latitude and longitude parameters",
        example: "/weather?latitude=40.7128&longitude=-74.0060"
      });
    }
    
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
      { timeout: 5000 }
    );
    
    const weather = response.data.current_weather;
    const weatherDescriptions = {
      0: 'clear sky',
      1: 'mainly clear',
      2: 'partly cloudy',
      3: 'overcast',
      45: 'foggy',
      51: 'light drizzle',
      61: 'light rain',
      80: 'light rain showers'
    };
    
    res.json({ 
      success: true, 
      type: 'weather',
      content: `Current weather: ${weather.temperature}°C, ${weatherDescriptions[weather.weathercode] || 'unknown conditions'}`,
      temperature: weather.temperature,
      condition: weatherDescriptions[weather.weathercode] || 'unknown'
    });
  } catch (error) {
    console.error("Weather API error:", error.message);
    res.json({ 
      success: true, 
      type: 'weather',
      content: "Weather data unavailable, but it's a beautiful day for creating art!",
      temperature: 22,
      condition: "sunny"
    });
  }
}

// Art Tips handler
function artTipHandler(req, res) {
  const artTips = [
    "Start with basic shapes when drawing - everything can be broken down into circles, squares, and triangles.",
    "The color wheel is your best friend! Complementary colors create vibrant contrast.",
    "Don't be afraid to make mistakes. Even master artists create 'happy accidents'.",
    "Practice value scales to improve your understanding of light and shadow.",
    "Keep a sketchbook with you always - inspiration can strike anywhere!",
    "Study color theory to understand how colors interact and affect mood."
  ];
  res.json({ 
    success: true,
    type: 'art-tip',
    content: artTips[Math.floor(Math.random() * artTips.length)] 
  });
}

// Artwork handler
async function artworkHandler(req, res) {
  try {
    const searchRes = await axios.get(
      'https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=painting',
      { timeout: 10000 }
    );
    
    const ids = searchRes.data.objectIDs;
    if (!ids || ids.length === 0) {
      throw new Error('No artworks found');
    }
    
    // Get a random artwork from the first 50 results (for performance)
    const randomId = ids[Math.floor(Math.random() * Math.min(50, ids.length))];
    const objRes = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`,
      { timeout: 10000 }
    );
    
    const art = objRes.data;
    res.json({
      success: true,
      type: 'artwork',
      content: `Today's featured artwork: "${art.title}" by ${art.artistDisplayName || 'Unknown'}`,
      title: art.title,
      artist: art.artistDisplayName || 'Unknown',
      year: art.objectDate || 'Unknown',
      image: art.primaryImage,
      url: art.objectURL
    });
  } catch (error) {
    console.error("Artwork API error:", error.message);
    res.json({ 
      success: true, 
      type: 'artwork',
      content: "Today's artwork recommendation: Visit a local museum or gallery for inspiration!",
      title: "Local Art Exploration",
      artist: "Various Artists",
      year: "Present"
    });
  }
}

// Wikipedia handler
async function wikiHandler(req, res) {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.json({ 
        success: false, 
        type: 'wiki',
        content: "Please provide a query parameter",
        example: "/wiki?query=Vincent van Gogh"
      });
    }
    
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`,
      { timeout: 8000 }
    );
    
    res.json({
      success: true,
      type: 'wiki',
      content: response.data.extract,
      title: response.data.title,
      url: response.data.content_urls.desktop.page
    });
  } catch (error) {
    console.error("Wikipedia API error:", error.message);
    res.json({ 
      success: false, 
      type: 'wiki',
      content: "No summary available for this topic. Try searching for a different artist or art movement."
    });
  }
}

// Vocabulary handler
async function vocabularyHandler(req, res) {
  try {
    // Using a free alternative - Wordnik API (no key needed for basic use)
    const randomWordRes = await axios.get(
      'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=1000&minLength=5&maxLength=12',
      { timeout: 8000 }
    );
    
    const word = randomWordRes.data.word;
    
    // Get definition
    const definitionRes = await axios.get(
      `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&sourceDictionaries=all`,
      { timeout: 8000 }
    );
    
    const definition = definitionRes.data[0]?.text || 'No definition available';
    
    res.json({
      success: true,
      type: 'vocabulary',
      content: `Word of the day: ${word} - ${definition}`,
      word: word,
      definition: definition
    });
  } catch (error) {
    console.error("Vocabulary API error:", error.message);
    
    // Fallback art vocabulary
    const artTerms = [
      {word: "chiaroscuro", definition: "the treatment of light and shade in drawing and painting"},
      {word: "impasto", definition: "a technique where paint is laid on thickly so it stands out from the surface"},
      {word: "sfumato", definition: "the technique of allowing tones and colors to shade gradually into one another"},
      {word: "gouache", definition: "a method of painting using opaque pigments ground in water"}
    ];
    
    const term = artTerms[Math.floor(Math.random() * artTerms.length)];
    res.json({ 
      success: true, 
      type: 'vocabulary',
      content: `Art term: ${term.word} - ${term.definition}`,
      word: term.word,
      definition: term.definition
    });
  }
}

// Ask handler
async function askHandler(req, res) {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.json({ 
        success: false, 
        type: 'ask',
        content: "Please provide a question with the q parameter",
        example: "/ask?q=What is impressionism?"
      });
    }
    
    const response = await axios.get(
      `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`,
      { timeout: 8000 }
    );
    
    if (response.data.AbstractText) {
      return res.json({
        success: true,
        type: 'ask',
        content: response.data.AbstractText,
        source: response.data.AbstractURL
      });
    }
    
    // Fallback to simple responses for common art questions
    const commonQuestions = {
      "what is impressionism": "Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, inclusion of movement as a crucial element of human perception and experience, and unusual visual angles.",
      "what is cubism": "Cubism is an early-20th-century avant-garde art movement that revolutionized European painting and sculpture. Pioneered by Picasso and Braque, it emphasized flat, two-dimensional surfaces and rejected traditional techniques of perspective.",
      "what is renaissance art": "Renaissance art is the painting, sculpture, and decorative arts of the period of European history known as the Renaissance, which emerged as a distinct style in Italy in about 1400, in parallel with developments which occurred in philosophy, literature, music, and science."
    };
    
    const lowerQ = q.toLowerCase();
    if (commonQuestions[lowerQ]) {
      return res.json({
        success: true,
        type: 'ask',
        content: commonQuestions[lowerQ]
      });
    }
    
    res.json({ 
      success: false, 
      type: 'ask',
      content: "I couldn't find a specific answer to your question. Try asking about art movements, techniques, or famous artists."
    });
  } catch (error) {
    console.error("Ask API error:", error.message);
    res.json({ 
      success: false, 
      type: 'ask',
      content: "I'm having trouble accessing information right now. Please try again later."
    });
  }
}

// ---------- Route Definitions ----------

app.get('/joke', jokeHandler);
app.get('/fact', factHandler);
app.get('/quote', quoteHandler);
app.get('/motivation', motivationHandler);
app.get('/greeting', greetingHandler);
app.get('/weather', weatherHandler);
app.get('/art-tip', artTipHandler);
app.get('/artwork', artworkHandler);
app.get('/wiki', wikiHandler);
app.get('/vocabulary', vocabularyHandler);
app.get('/ask', askHandler);

// ---------- Main chatbot endpoint ----------
app.post('/chat', async (req, res) => {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
    return res.json({
      success: false,
      type: 'error',
      content: "Please provide a message in your request."
    });
  }

  const lowerMessage = message.toLowerCase();
  
  // Handle specific questions about the bot's origin/creators
  if (lowerMessage.includes('who built you') || 
      lowerMessage.includes('who created you') ||
      lowerMessage.includes('who made you') ||
      lowerMessage.includes('who developed you') ||
      lowerMessage.includes('who are your creators') ||
      lowerMessage.includes('who is your creator') ||
      lowerMessage.includes('who are your developers')) {
    return res.json({
      success: true,
      type: 'info',
      content: "I was created by the Painters' Diary Team! 🎨 We're passionate about helping artists find inspiration and grow their skills."
    });
  }

  // Handle questions about the bot's identity/origin
  if (lowerMessage.includes('what are you') ||
      lowerMessage.includes('who are you') ||
      lowerMessage.includes('tell me about yourself')) {
    return res.json({
      success: true,
      type: 'info',
      content: "I'm Palette, your friendly art assistant from Painters' Diary! I'm here to share jokes, facts, quotes, and art tips to inspire your creative journey."
    });
  }

  // Handle questions about where the bot is from
  if (lowerMessage.includes('where are you from') ||
      lowerMessage.includes('where were you made') ||
      lowerMessage.includes('where were you created')) {
    return res.json({
      success: true,
      type: 'info',
      content: "I was developed in the creative labs of Painters' Diary, where we're dedicated to supporting artists and art enthusiasts!"
    });
  }

  // Map intents to handlers
  const intentMap = {
    'joke': jokeHandler,
    'fact': factHandler,
    'quote': quoteHandler,
    'motivation': motivationHandler,
    'greeting': greetingHandler,
    'weather': weatherHandler,
    'art tip': artTipHandler,
    'artwork': artworkHandler,
    'wiki': wikiHandler,
    'word': vocabularyHandler,
    'ask': askHandler
  };
  
  // Check for intent matches
  for (const [intent, handler] of Object.entries(intentMap)) {
    if (lowerMessage.includes(intent)) {
      try {
        // Extract query parameters for specific endpoints
        let queryParams = {};
        if (intent === 'wiki') {
          const query = message.replace(/wiki|who is|what is/gi, '').trim();
          if (query) queryParams.query = query;
        } else if (intent === 'ask') {
          const question = message.replace(/ask|tell me|explain/gi, '').trim();
          if (question) queryParams.q = question;
        } else if (intent === 'weather') {
          // Default to NYC coordinates for demo
          queryParams.latitude = '40.7128';
          queryParams.longitude = '-74.0060';
        }
        
        // Create a mock request object
        const mockReq = { query: queryParams };
        
        // Create a custom response handler
        const mockRes = {
          json: (data) => {
            return res.json(data);
          }
        };
        
        // Call the appropriate handler
        await handler(mockReq, mockRes);
        return; // Exit after handling the intent
        
      } catch (error) {
        console.error(`Error calling ${intent} handler:`, error.message);
        // Continue to AI fallback
      }
    }
  }

  // Fallback to OpenRouter AI if no specific intent matches
  try {
    const messages = [
      { 
        role: "system", 
        content: "You are Palette, a friendly art assistant created by the Painters' Diary Team. You tell jokes, fun facts, and share opinions about art, history, and culture in a human-like friendly way. Keep responses concise and engaging. When asked about who created you or where you're from, mention that you were created by the Painters' Diary Team." 
      },
      ...conversationHistory.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: "user", content: message }
    ];

    const aiResponse = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: messages,
        temperature: 0.7,
        max_tokens: 500
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
          "X-Title": process.env.SITE_NAME || "Art Assistant"
        },
        timeout: 15000
      }
    );

    const botReply = aiResponse.data.choices[0].message.content;
    res.json({ 
      success: true, 
      type: 'ai',
      content: botReply
    });
  } catch (error) {
    console.error("OpenRouter API error:", error.message);
    res.json({
      success: false,
      type: 'error',
      content: "I'm experiencing technical difficulties. Please try again in a moment."
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    success: true,
    status: 'OK', 
    message: 'Art Chatbot API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint - List all available endpoints
app.get('/', (req, res) => {
  res.json({ 
    success: true,
    message: 'Welcome to Art Chatbot API',
    endpoints: [
      '/joke - Get a random joke',
      '/fact - Get a random fact',
      '/quote - Get an inspirational quote',
      '/motivation - Get a motivational quote',
      '/greeting - Get a random greeting',
      '/weather?latitude=X&longitude=Y - Get weather data',
      '/art-tip - Get an art tip',
      '/artwork - Get a random artwork',
      '/wiki?query=TOPIC - Get Wikipedia summary',
      '/vocabulary - Get word/term of the day',
      '/ask?q=QUESTION - Ask a question',
      '/chat (POST) - Main chatbot endpoint'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Art Chatbot API running on port ${PORT}`);
  console.log(`Available at: http://localhost:${PORT}`);
});


// import express from 'express';
// import cors from 'cors';
// import axios from 'axios';
// import dotenv from 'dotenv';

// // Load environment variables
// dotenv.config();

// const app = express();

// // Enhanced CORS configuration
// app.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true
// }));

// // Handle preflight requests
// app.options('*', cors());

// app.use(express.json());

// // Environment variables for API keys
// const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
// const PORT = process.env.PORT || 3001;
// const NODE_ENV = process.env.NODE_ENV || 'development';

// // Validate required environment variables
// if (!OPENROUTER_API_KEY) {
//   console.error("ERROR: OPENROUTER_API_KEY environment variable is required");
//   if (NODE_ENV === 'production') {
//     console.error("Exiting process due to missing required environment variables");
//     process.exit(1);
//   }
// }

// // Global axios configuration
// axios.defaults.timeout = 10000;
// axios.defaults.timeoutErrorMessage = 'Service temporarily unavailable';

// // ---------- Utility Functions ----------

// function createFallbackResponse(type, fallbackContent, additionalData = {}) {
//   return {
//     success: true,
//     type,
//     isFallback: true,
//     ...additionalData,
//     content: fallbackContent
//   };
// }

// function createErrorResponse(type, errorMessage, statusCode = 500) {
//   return {
//     success: false,
//     type,
//     error: errorMessage,
//     statusCode
//   };
// }

// // ---------- Handler Functions ----------

// // Joke handler
// async function jokeHandler(req, res) {
//   try {
//     const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
//     res.json({ 
//       success: true, 
//       type: 'joke',
//       content: `${response.data.setup} ${response.data.punchline}`,
//       category: response.data.type
//     });
//   } catch (error) {
//     console.error("Joke API error:", error.message);
//     const fallbackJokes = [
//       "Why did the artist go to jail? Because he was framed!",
//       "What's an artist's favorite programming language? Draw-thon!",
//       "Why don't artists like to play hide and seek? Because good luck hiding when you've got a distinct style!"
//     ];
//     res.json(createFallbackResponse('joke', fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)], {
//       category: "fallback"
//     }));
//   }
// }

// // Fact handler
// async function factHandler(req, res) {
//   try {
//     const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
//     res.json({ 
//       success: true, 
//       type: 'fact',
//       content: response.data.text,
//       source: response.data.source
//     });
//   } catch (error) {
//     console.error("Fact API error:", error.message);
//     const fallbackFacts = [
//       "Vincent van Gogh only sold one painting during his lifetime.",
//       "The world's oldest known painting is over 64,000 years old.",
//       "Color blue was once more expensive than gold in medieval times."
//     ];
//     res.json(createFallbackResponse('fact', fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)], {
//       source: "art history"
//     }));
//   }
// }

// // Quote handler
// async function quoteHandler(req, res) {
//   try {
//     const response = await axios.get('https://api.quotable.io/random');
//     res.json({ 
//       success: true, 
//       type: 'quote',
//       content: response.data.content,
//       author: response.data.author
//     });
//   } catch (error) {
//     console.error("Quote API error:", error.message);
//     const fallbackQuotes = [
//       {content: "Every artist was first an amateur.", author: "Ralph Waldo Emerson"},
//       {content: "Art washes away from the soul the dust of everyday life.", author: "Pablo Picasso"},
//       {content: "Creativity takes courage.", author: "Henri Matisse"}
//     ];
//     const quote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
//     res.json(createFallbackResponse('quote', quote.content, {
//       author: quote.author
//     }));
//   }
// }

// // Motivation handler
// async function motivationHandler(req, res) {
//   try {
//     const response = await axios.get('https://api.quotable.io/random?tags=inspirational|motivational');
//     res.json({ 
//       success: true, 
//       type: 'motivation',
//       content: response.data.content,
//       author: response.data.author
//     });
//   } catch (error) {
//     console.error("Motivation API error:", error.message);
//     res.json(createFallbackResponse('motivation', "Believe you can and you're halfway there.", {
//       author: "Theodore Roosevelt"
//     }));
//   }
// }

// // Greeting handler
// function greetingHandler(req, res) {
//   const greetings = [
//     "Hello! Ready to create some art?",
//     "Hi there, artist! What's inspiring you today?",
//     "Greetings! Let's make something beautiful.",
//     "Bonjour! Time for some creative magic.",
//     "Hola! Welcome to the world of art."
//   ];
//   res.json({ 
//     success: true,
//     type: 'greeting',
//     content: greetings[Math.floor(Math.random() * greetings.length)] 
//   });
// }

// // Weather handler
// async function weatherHandler(req, res) {
//   try {
//     const { latitude, longitude } = req.query;
    
//     if (!latitude || !longitude) {
//       return res.status(400).json(createErrorResponse('weather', "Please provide latitude and longitude parameters", 400));
//     }
    
//     const response = await axios.get(
//       `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
//     );
    
//     const weather = response.data.current_weather;
//     const weatherDescriptions = {
//       0: 'clear sky',
//       1: 'mainly clear',
//       2: 'partly cloudy',
//       3: 'overcast',
//       45: 'foggy',
//       51: 'light drizzle',
//       61: 'light rain',
//       80: 'light rain showers'
//     };
    
//     res.json({ 
//       success: true, 
//       type: 'weather',
//       content: `Current weather: ${weather.temperature}°C, ${weatherDescriptions[weather.weathercode] || 'unknown conditions'}`,
//       temperature: weather.temperature,
//       condition: weatherDescriptions[weather.weathercode] || 'unknown'
//     });
//   } catch (error) {
//     console.error("Weather API error:", error.message);
//     res.json(createFallbackResponse('weather', "Weather data unavailable, but it's a beautiful day for creating art!", {
//       temperature: 22,
//       condition: "sunny"
//     }));
//   }
// }

// // Art Tips handler
// function artTipHandler(req, res) {
//   const artTips = [
//     "Start with basic shapes when drawing - everything can be broken down into circles, squares, and triangles.",
//     "The color wheel is your best friend! Complementary colors create vibrant contrast.",
//     "Don't be afraid to make mistakes. Even master artists create 'happy accidents'.",
//     "Practice value scales to improve your understanding of light and shadow.",
//     "Keep a sketchbook with you always - inspiration can strike anywhere!",
//     "Study color theory to understand how colors interact and affect mood."
//   ];
//   res.json({ 
//     success: true,
//     type: 'art-tip',
//     content: artTips[Math.floor(Math.random() * artTips.length)] 
//   });
// }

// // Artwork handler
// async function artworkHandler(req, res) {
//   try {
//     const searchRes = await axios.get(
//       'https://collectionapi.metmuseum.org/public/collection/v1/search?isHighlight=true&q=painting',
//       { timeout: 15000 }
//     );
    
//     const ids = searchRes.data.objectIDs;
//     if (!ids || ids.length === 0) {
//       throw new Error('No artworks found');
//     }
    
//     const randomId = ids[Math.floor(Math.random() * Math.min(50, ids.length))];
//     const objRes = await axios.get(
//       `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomId}`,
//       { timeout: 15000 }
//     );
    
//     const art = objRes.data;
//     res.json({
//       success: true,
//       type: 'artwork',
//       content: `Today's featured artwork: "${art.title}" by ${art.artistDisplayName || 'Unknown'}`,
//       title: art.title,
//       artist: art.artistDisplayName || 'Unknown',
//       year: art.objectDate || 'Unknown',
//       image: art.primaryImage,
//       url: art.objectURL
//     });
//   } catch (error) {
//     console.error("Artwork API error:", error.message);
//     res.json(createFallbackResponse('artwork', "Today's artwork recommendation: Visit a local museum or gallery for inspiration!", {
//       title: "Local Art Exploration",
//       artist: "Various Artists",
//       year: "Present"
//     }));
//   }
// }

// // Wikipedia handler
// async function wikiHandler(req, res) {
//   try {
//     const { query } = req.query;
    
//     if (!query) {
//       return res.status(400).json(createErrorResponse('wiki', "Please provide a query parameter", 400));
//     }
    
//     const response = await axios.get(
//       `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
//     );
    
//     res.json({
//       success: true,
//       type: 'wiki',
//       content: response.data.extract,
//       title: response.data.title,
//       url: response.data.content_urls.desktop.page
//     });
//   } catch (error) {
//     console.error("Wikipedia API error:", error.message);
//     res.status(404).json(createErrorResponse('wiki', "No summary available for this topic. Try searching for a different artist or art movement.", 404));
//   }
// }

// // Vocabulary handler
// async function vocabularyHandler(req, res) {
//   try {
//     const randomWordRes = await axios.get(
//       'https://api.wordnik.com/v4/words.json/randomWord?hasDictionaryDef=true&minCorpusCount=1000&minLength=5&maxLength=12'
//     );
    
//     const word = randomWordRes.data.word;
//     const definitionRes = await axios.get(
//       `https://api.wordnik.com/v4/word.json/${word}/definitions?limit=1&sourceDictionaries=all`
//     );
    
//     const definition = definitionRes.data[0]?.text || 'No definition available';
    
//     res.json({
//       success: true,
//       type: 'vocabulary',
//       content: `Word of the day: ${word} - ${definition}`,
//       word: word,
//       definition: definition
//     });
//   } catch (error) {
//     console.error("Vocabulary API error:", error.message);
//     const artTerms = [
//       {word: "chiaroscuro", definition: "the treatment of light and shade in drawing and painting"},
//       {word: "impasto", definition: "a technique where paint is laid on thickly so it stands out from the surface"},
//       {word: "sfumato", definition: "the technique of allowing tones and colors to shade gradually into one another"},
//       {word: "gouache", definition: "a method of painting using opaque pigments ground in water"}
//     ];
    
//     const term = artTerms[Math.floor(Math.random() * artTerms.length)];
//     res.json(createFallbackResponse('vocabulary', `Art term: ${term.word} - ${term.definition}`, {
//       word: term.word,
//       definition: term.definition
//     }));
//   }
// }

// // Ask handler
// async function askHandler(req, res) {
//   try {
//     const { q } = req.query;
    
//     if (!q) {
//       return res.status(400).json(createErrorResponse('ask', "Please provide a question with the q parameter", 400));
//     }
    
//     const response = await axios.get(
//       `https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`
//     );
    
//     if (response.data.AbstractText) {
//       return res.json({
//         success: true,
//         type: 'ask',
//         content: response.data.AbstractText,
//         source: response.data.AbstractURL
//       });
//     }
    
//     const commonQuestions = {
//       "what is impressionism": "Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities, ordinary subject matter, inclusion of movement as a crucial element of human perception and experience, and unusual visual angles.",
//       "what is cubism": "Cubism is an early-20th-century avant-garde art movement that revolutionized European painting and sculpture. Pioneered by Picasso and Braque, it emphasized flat, two-dimensional surfaces and rejected traditional techniques of perspective.",
//       "what is renaissance art": "Renaissance art is the painting, sculpture, and decorative arts of the period of European history known as the Renaissance, which emerged as a distinct style in Italy in about 1400, in parallel with developments which occurred in philosophy, literature, music, and science."
//     };
    
//     const lowerQ = q.toLowerCase();
//     if (commonQuestions[lowerQ]) {
//       return res.json({
//         success: true,
//         type: 'ask',
//         content: commonQuestions[lowerQ]
//       });
//     }
    
//     res.status(404).json(createErrorResponse('ask', "I couldn't find a specific answer to your question. Try asking about art movements, techniques, or famous artists.", 404));
//   } catch (error) {
//     console.error("Ask API error:", error.message);
//     res.status(503).json(createErrorResponse('ask', "I'm having trouble accessing information right now. Please try again later.", 503));
//   }
// }

// // ---------- Route Definitions ----------

// app.get('/joke', jokeHandler);
// app.get('/fact', factHandler);
// app.get('/quote', quoteHandler);
// app.get('/motivation', motivationHandler);
// app.get('/greeting', greetingHandler);
// app.get('/weather', weatherHandler);
// app.get('/art-tip', artTipHandler);
// app.get('/artwork', artworkHandler);
// app.get('/wiki', wikiHandler);
// app.get('/vocabulary', vocabularyHandler);
// app.get('/ask', askHandler);

// // Handle GET requests to /chat (Method Not Allowed)
// app.get('/chat', (req, res) => {
//   res.status(405).json(createErrorResponse('chat', "Method Not Allowed. Please use POST method for this endpoint.", 405));
// });

// // ---------- Main chatbot endpoint ----------
// app.post('/chat', async (req, res) => {
//   // Check if OpenRouter API key is available
//   if (!OPENROUTER_API_KEY) {
//     return res.status(503).json(createErrorResponse('chat', "AI service temporarily unavailable. Please try again later.", 503));
//   }

//   const { message, conversationHistory = [] } = req.body;

//   if (!message) {
//     return res.status(400).json(createErrorResponse('chat', "Please provide a message in your request.", 400));
//   }

//   const lowerMessage = message.toLowerCase();
  
//   // Handle specific questions about the bot's origin/creators
//   const creatorQuestions = [
//     'who built you', 'who created you', 'who made you', 'who developed you',
//     'who are your creators', 'who is your creator', 'who are your developers'
//   ];

//   if (creatorQuestions.some(q => lowerMessage.includes(q))) {
//     return res.json({
//       success: true,
//       type: 'info',
//       content: "I was created by the Painters' Diary Team! 🎨 We're passionate about helping artists find inspiration and grow their skills."
//     });
//   }

//   // Handle questions about the bot's identity/origin
//   const identityQuestions = [
//     'what are you', 'who are you', 'tell me about yourself',
//     'where are you from', 'where were you made', 'where were you created'
//   ];

//   if (identityQuestions.some(q => lowerMessage.includes(q))) {
//     return res.json({
//       success: true,
//       type: 'info',
//       content: "I'm Palette, your friendly art assistant from Painters' Diary! I was developed in our creative labs to help artists with inspiration, tips, and creative support."
//     });
//   }

//   // Map intents to handlers
//   const intentMap = {
//     'joke': jokeHandler,
//     'fact': factHandler,
//     'quote': quoteHandler,
//     'motivation': motivationHandler,
//     'greeting': greetingHandler,
//     'weather': weatherHandler,
//     'art tip': artTipHandler,
//     'artwork': artworkHandler,
//     'wiki': wikiHandler,
//     'word': vocabularyHandler,
//     'vocabulary': vocabularyHandler,
//     'ask': askHandler
//   };
  
//   // Check for intent matches
//   for (const [intent, handler] of Object.entries(intentMap)) {
//     if (lowerMessage.includes(intent)) {
//       try {
//         let queryParams = {};
//         if (intent === 'wiki') {
//           const query = message.replace(/wiki|who is|what is/gi, '').trim();
//           if (query) queryParams.query = query;
//         } else if (intent === 'ask') {
//           const question = message.replace(/ask|tell me|explain/gi, '').trim();
//           if (question) queryParams.q = question;
//         } else if (intent === 'weather') {
//           queryParams.latitude = '40.7128';
//           queryParams.longitude = '-74.0060';
//         }
        
//         const mockReq = { query: queryParams };
//         const mockRes = {
//           json: (data) => res.json(data),
//           status: (code) => ({ json: (data) => res.status(code).json(data) })
//         };
        
//         await handler(mockReq, mockRes);
//         return;
        
//       } catch (error) {
//         console.error(`Error calling ${intent} handler:`, error.message);
//         // Continue to AI fallback
//       }
//     }
//   }

//   // Fallback to OpenRouter AI if no specific intent matches
//   try {
//     const messages = [
//       { 
//         role: "system", 
//         content: "You are Palette, a friendly art assistant created by the Painters' Diary Team. You tell jokes, fun facts, and share opinions about art, history, and culture in a human-like friendly way. Keep responses concise and engaging. When asked about who created you or where you're from, mention that you were created by the Painters' Diary Team." 
//       },
//       ...conversationHistory.map(msg => ({
//         role: msg.sender === 'user' ? 'user' : 'assistant',
//         content: msg.text
//       })),
//       { role: "user", content: message }
//     ];

//     const aiResponse = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "deepseek/deepseek-chat-v3.1:free",
//         messages: messages,
//         temperature: 0.7,
//         max_tokens: 500
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${OPENROUTER_API_KEY}`,
//           "Content-Type": "application/json",
//           "HTTP-Referer": process.env.SITE_URL || "http://localhost:3000",
//           "X-Title": process.env.SITE_NAME || "Art Assistant"
//         },
//         timeout: 15000
//       }
//     );

//     const botReply = aiResponse.data.choices[0].message.content;
//     res.json({ 
//       success: true, 
//       type: 'ai',
//       content: botReply
//     });
//   } catch (error) {
//     console.error("OpenRouter API error:", error.message);
    
//     if (error.response?.status === 401) {
//       return res.status(401).json(createErrorResponse('chat', "Authentication failed. Please check your API configuration.", 401));
//     }
    
//     res.status(503).json(createErrorResponse('chat', "I'm experiencing technical difficulties. Please try again in a moment.", 503));
//   }
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({ 
//     success: true,
//     status: 'OK', 
//     message: 'Art Chatbot API is running',
//     timestamp: new Date().toISOString(),
//     environment: NODE_ENV,
//     openRouterConfigured: !!OPENROUTER_API_KEY
//   });
// });

// // Root endpoint
// app.get('/', (req, res) => {
//   res.json({ 
//     success: true,
//     message: 'Welcome to Art Chatbot API',
//     environment: NODE_ENV,
//     endpoints: [
//       '/joke - Get a random joke',
//       '/fact - Get a random fact',
//       '/quote - Get an inspirational quote',
//       '/motivation - Get a motivational quote',
//       '/greeting - Get a random greeting',
//       '/weather?latitude=X&longitude=Y - Get weather data',
//       '/art-tip - Get an art tip',
//       '/artwork - Get a random artwork',
//       '/wiki?query=TOPIC - Get Wikipedia summary',
//       '/vocabulary - Get word/term of the day',
//       '/ask?q=QUESTION - Ask a question',
//       '/chat (POST) - Main chatbot endpoint',
//       '/health - API health check'
//     ]
//   });
// });

// // 404 Handler
// app.use('*', (req, res) => {
//   res.status(404).json(createErrorResponse('general', "Endpoint not found. Check the root endpoint for available routes.", 404));
// });

// // Global error handler
// app.use((error, req, res, next) => {
//   console.error('Unhandled error:', error);
//   res.status(500).json(createErrorResponse('general', "Internal server error", 500));
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Art Chatbot API running on port ${PORT}`);
//   console.log(`Environment: ${NODE_ENV}`);
//   console.log(`Available at: http://localhost:${PORT}`);
//   console.log(`OpenRouter API configured: ${!!OPENROUTER_API_KEY}`);
// });