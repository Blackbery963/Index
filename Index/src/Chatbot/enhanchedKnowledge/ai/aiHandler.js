// Enhanced AI handler with better model management
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

// Track model performance
const modelPerformance = new Map();

const getBestModel = () => {
  // Prioritize reliable models
  const reliableModels = [
    "google/gemini-2.0-flash-exp:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "deepseek/deepseek-chat-v3-0324:free"
  ];
  
  // Check performance history
  for (const model of reliableModels) {
    const perf = modelPerformance.get(model);
    if (!perf || perf.successRate > 0.7) {
      return model;
    }
  }
  
  return reliableModels[0];
};

const updateModelPerformance = (model, success) => {
  const current = modelPerformance.get(model) || { requests: 0, successes: 0 };
  current.requests++;
  if (success) current.successes++;
  current.successRate = current.successes / current.requests;
  modelPerformance.set(model, current);
};

export const enhancedAIHandler = async (message, conversationHistory, modelIndex = 0, retryCount = 0) => {
  const MAX_RETRIES = 1;

  try {
    const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!OPENROUTER_API_KEY) {
      throw new Error('OpenRouter API key not configured');
    }

    // Use smart model selection
    const currentModel = modelIndex === 0 ? getBestModel() : FREE_MODELS[modelIndex];
    
    if (modelIndex >= FREE_MODELS.length) {
      return {
        success: true,
        type: 'error',
        content: "I'm experiencing high demand right now. Please try asking your question again in a moment, or try asking for a joke, fact, quote, or art tip which work instantly! 🎨"
      };
    }

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
      ...conversationHistory.slice(-6).map(msg => ({
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
        return enhancedAIHandler(message, conversationHistory, modelIndex, retryCount + 1);
      } else {
        return enhancedAIHandler(message, conversationHistory, modelIndex + 1, 0);
      }
    }

    if (response.status === 402) {
      console.log(`Model ${currentModel} requires payment, trying next model...`);
      return enhancedAIHandler(message, conversationHistory, modelIndex + 1, 0);
    }

    if (!response.ok) {
      console.log(`Model ${currentModel} error: ${response.status}, trying next model...`);
      return enhancedAIHandler(message, conversationHistory, modelIndex + 1, 0);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response format from AI API');
    }
    
    const botReply = data.choices[0].message.content;
    
    console.log(`Success with model: ${currentModel}`);
    
    // Update performance tracking
    updateModelPerformance(currentModel, true);
    
    return {
      success: true,
      type: 'ai',
      content: botReply,
      model: currentModel
    };
  } catch (error) {
    console.error(`Error with model ${FREE_MODELS[modelIndex]}:`, error);
    
    // Update performance tracking
    if (modelIndex < FREE_MODELS.length) {
      updateModelPerformance(FREE_MODELS[modelIndex], false);
    }
    
    if (modelIndex < FREE_MODELS.length - 1) {
      console.log("Trying next model due to error...");
      return enhancedAIHandler(message, conversationHistory, modelIndex + 1, 0);
    }
    
    return {
      success: true,
      type: 'error',
      content: "I'm having temporary connection issues. Please try your question again in a moment. In the meantime, I can instantly help with: jokes, facts, quotes, art tips, or art terms! 🎨"
    };
  }
};