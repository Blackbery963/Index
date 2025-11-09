// Enhanced knowledge base with semantic matching
export const ENHANCED_KNOWLEDGE_BASE = {
  techniques: {
    "how to draw": {
      answer: "Start with basic shapes! 🎨\n\n1. **Break down objects** into simple shapes (circles, squares, triangles)\n2. **Use light lines** for initial sketching\n3. **Build up details** gradually\n4. **Practice daily** - even 15 minutes helps\n5. **Use references** - don't be afraid to study from real life or photos\n\nTip: Keep a sketchbook and draw what you see around you every day!",
      keywords: ["draw", "sketch", "outline", "shapes", "beginner", "start drawing", "learn to draw"]
    },
    "how to paint": {
      answer: "Painting fundamentals: 🖌️\n\n1. **Start with composition** - plan your painting\n2. **Work from background to foreground**\n3. **Use thin layers** (especially with oils/acrylics)\n4. **Mix colors** on a palette before applying\n5. **Let layers dry** between sessions\n\nBeginner tip: Try acrylics first - they're forgiving and dry quickly!",
      keywords: ["paint", "painting", "beginner painting", "start painting", "painting techniques"]
    },
    "color theory": {
      answer: "Color Theory Basics: 🌈\n\n**Primary Colors**: Red, Blue, Yellow\n**Secondary Colors**: Green, Orange, Purple (mix of primaries)\n**Complementary Colors**: Opposite on color wheel (Red/Green, Blue/Orange)\n**Analogous Colors**: Next to each other on wheel\n\nQuick tip: Use complementary colors to make elements pop!",
      keywords: ["color", "theory", "palette", "harmony", "complementary", "wheel", "mixing colors"]
    },
    "perspective drawing": {
      answer: "Perspective Drawing Guide: 🏙️\n\n**1-Point Perspective**: All lines converge to one vanishing point\n**2-Point Perspective**: Two vanishing points for corners\n**3-Point Perspective**: Adds vertical convergence (for tall buildings)\n\nStart with 1-point: Draw a road or hallway receding into distance!",
      keywords: ["perspective", "vanishing point", "3d", "depth", "space", "foreshortening"]
    },
    "shading techniques": {
      answer: "Shading Methods: ✏️\n\n**Hatching**: Parallel lines\n**Cross-hatching**: Criss-crossing lines\n**Stippling**: Dots for texture\n**Blending**: Smooth gradients\n**Scumbling**: Circular scribbles\n\nPractice: Try shading a sphere using gradual value changes!",
      keywords: ["shading", "shadow", "light", "value", "contrast", "hatching", "blending"]
    }
  },
  
  materials: {
    "watercolor techniques": {
      answer: "Watercolor Tips: 💧\n\n• **Work light to dark** - preserve white areas\n• **Use quality paper** - 140lb+ cold press\n• **Wet-on-wet** for soft blends\n• **Wet-on-dry** for sharp edges\n• **Layering** creates depth\n\nStarter tip: Practice color gradients on scrap paper first!",
      keywords: ["watercolor", "water colour", "transparent", "wash", "wet"]
    },
    "oil painting": {
      answer: "Oil Painting Basics: 🎨\n\n• **Fat over lean** - thicker paint over thinner\n• **Slow drying** - work over days/weeks\n• **Use mediums** for different effects\n• **Clean brushes** with solvent\n• **Varnish** when completely dry (6+ months)\n\nSafety: Work in ventilated area with solvents!",
      keywords: ["oil", "oil painting", "linseed", "turpentine", "slow drying"]
    },
    "digital art": {
      answer: "Digital Art Starter Guide: 💻\n\n**Software Options**:\n• Free: Krita, GIMP, Medibang\n• Paid: Photoshop, Procreate, Clip Studio\n\n**Essential Tools**:\n• Layers for non-destructive editing\n• Brush customization\n• Transform tools\n• Color picker\n\nBeginner tip: Start with free software and a basic tablet!",
      keywords: ["digital", "photoshop", "procreate", "tablet", "software", "app"]
    }
  },
  
  history: {
    "van gogh": {
      answer: "Vincent van Gogh (1853-1890) 🇳🇱\n\n• **Style**: Post-Impressionism\n• **Famous Works**: Starry Night, Sunflowers\n• **Technique**: Bold colors, expressive brushwork\n• **Life**: Sold only 1 painting while alive\n• **Legacy**: Inspired Expressionism movement\n\nFun fact: He created over 2,000 artworks in just 10 years!",
      keywords: ["van gogh", "starry night", "post-impressionism", "sunflowers"]
    },
    "picasso": {
      answer: "Pablo Picasso (1881-1973) 🇪🇸\n\n• **Styles**: Cubism, Surrealism, Blue Period\n• **Famous Works**: Guernica, Les Demoiselles d'Avignon\n• **Innovation**: Co-founded Cubism with Braque\n• **Output**: 50,000+ artworks\n• **Longevity**: Active for nearly 80 years\n\nDid you know? He could draw before he could walk!",
      keywords: ["picasso", "cubism", "guernica", "blue period", "modern art"]
    },
    "impressionism": {
      answer: "Impressionism Movement: 🌅\n\n**Time**: 1860s-1880s\n**Location**: France, primarily Paris\n**Characteristics**:\n• Visible brush strokes\n• Outdoor painting (en plein air)\n• Light and movement emphasis\n• Ordinary subject matter\n\n**Key Artists**: Monet, Renoir, Degas, Pissarro",
      keywords: ["impressionism", "monet", "renoir", "degas", "french", "light"]
    }
  },
  
  inspiration: {
    "creative block": {
      answer: "Overcoming Creative Block: 🧠\n\n1. **Change your environment** - work somewhere new\n2. **Set small goals** - 15-minute sketches\n3. **Try new materials** - switch from digital to traditional\n4. **Copy masters** - learn from great artists\n5. **Take a walk** - observe the world around you\n6. **Limit choices** - use only 3 colors\n\nRemember: Every artist experiences blocks - it's part of the process!",
      keywords: ["block", "stuck", "uninspired", "motivation", "ideas", "creativity"]
    },
    "find inspiration": {
      answer: "Sources of Inspiration: 💫\n\n• **Nature walks** - observe colors and forms\n• **Museum visits** - study master works\n• **Pinterest/Instagram** - contemporary artists\n• **Everyday objects** - find beauty in ordinary things\n• **Music and books** - translate emotions visually\n• **People watching** - capture gestures and expressions\n\nTry: Keeping an 'inspiration journal' with clippings and sketches!",
      keywords: ["inspiration", "ideas", "what to draw", "subjects", "muse"]
    }
  }
};

// Calculate similarity between message and keywords
const calculateSimilarity = (message, keywords) => {
  const messageWords = new Set(message.toLowerCase().split(/\W+/).filter(word => word.length > 3));
  const keywordSet = new Set(keywords.map(k => k.toLowerCase()));
  
  let matches = 0;
  for (const word of messageWords) {
    if (keywordSet.has(word)) matches++;
  }
  
  return matches / Math.max(keywordSet.size, 1);
};

// Enhanced knowledge base query
export const getEnhancedKnowledgeAnswer = (message) => {
  const lowerMessage = message.toLowerCase();
  let bestMatch = { score: 0, answer: null };
  
  // Check all categories and entries
  for (const [category, entries] of Object.entries(ENHANCED_KNOWLEDGE_BASE)) {
    for (const [key, data] of Object.entries(entries)) {
      // Direct match
      if (lowerMessage.includes(key)) {
        return {
          answer: data.answer,
          category: category,
          confidence: 'high'
        };
      }
      
      // Semantic match
      const similarity = calculateSimilarity(lowerMessage, data.keywords);
      if (similarity > bestMatch.score && similarity > 0.3) {
        bestMatch = { 
          score: similarity, 
          answer: data.answer,
          category: category,
          confidence: similarity > 0.6 ? 'high' : 'medium'
        };
      }
    }
  }
  
  return bestMatch.score > 0.3 ? bestMatch : null;
};