import express, { json } from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// Environment variables for API keys
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error("ERROR: OPENROUTER_API_KEY environment variable is required");
}

// ---------- Fixed Endpoints ----------

// Joke API - Updated to use Official Joke API
app.get('/joke', async (req, res) => {
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
});

// Fact API
app.get('/fact', async (req, res) => {
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
});

// Quote API - Using Quotable API
app.get('/quote', async (req, res) => {
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
});

// Motivation API - Using Quotable with inspirational tags
app.get('/motivation', async (req, res) => {
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
});

// Greeting API - Manual implementation
app.get('/greeting', (req, res) => {
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
});

// Weather API - Fixed to handle missing parameters
app.get('/weather', async (req, res) => {
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
});

// Art Tips
app.get('/art-tip', (req, res) => {
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
});

// Artwork API - Using Met Museum API
app.get('/artwork', async (req, res) => {
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
});

// Wikipedia summary
app.get('/wiki', async (req, res) => {
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
});

// Vocabulary endpoint (replacing problematic word API)
app.get('/vocabulary', async (req, res) => {
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
});

// Ask endpoint - Using DuckDuckGo API
app.get('/ask', async (req, res) => {
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
});

// ---------- Main chatbot endpoint ----------
// app.post('/chat', async (req, res) => {
//   const { message, conversationHistory = [] } = req.body;

//   if (!message) {
//     return res.json({
//       success: false,
//       type: 'error',
//       content: "Please provide a message in your request."
//     });
//   }

//   // Check for specific intents first
//   const lowerMessage = message.toLowerCase();
  
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
//         content: "You are Palette, a friendly art assistant. You tell jokes, fun facts, and share opinions about art, history, and culture in a human-like friendly way. Keep responses concise and engaging." 
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

  // Map intents to endpoints
  const intentMap = {
    'joke': '/joke',
    'fact': '/fact',
    'quote': '/quote',
    'motivation': '/motivation',
    'greeting': '/greeting',
    'weather': '/weather',
    'art tip': '/art-tip',
    'artwork': '/artwork',
    'wiki': '/wiki',
    'word': '/vocabulary',
    'ask': '/ask'
  };
  
  // Check for intent matches
  for (const [intent, endpoint] of Object.entries(intentMap)) {
    if (lowerMessage.includes(intent)) {
      try {
        // Extract query parameters for specific endpoints
        let url = endpoint;
        if (intent === 'wiki') {
          const query = message.replace(/wiki|who is|what is/gi, '').trim();
          if (query) url += `?query=${encodeURIComponent(query)}`;
        } else if (intent === 'ask') {
          const question = message.replace(/ask|tell me|explain/gi, '').trim();
          if (question) url += `?q=${encodeURIComponent(question)}`;
        } else if (intent === 'weather') {
          // Default to NYC coordinates for demo
          url += '?latitude=40.7128&longitude=-74.0060';
        }
        
        const response = await axios.get(`http://localhost:${PORT}${url}`);
        return res.json(response.data);
      } catch (error) {
        console.error(`Error calling ${endpoint}:`, error.message);
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Art Chatbot API running on port ${PORT}`));