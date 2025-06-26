// utils/infoCardsData.js
const gradient_1 = 'bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-amber-800/30'
const gradient_2 = "bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 dark:from-blue-900/30 dark:via-cyan-900/20 dark:to-blue-800/30"
const gradient_3 = "bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-green-800/30"

export const infoCardsData = {
  landscape: [
    {
      title: "History of Landscape Painting",
      gradient: gradient_1,
      type: "paragraphs",
      content: [
        "Landscape painting emerged as a distinct genre in the 16th century, though natural elements appeared in art since antiquity. Chinese artists pioneered landscape art as early as the 4th century.",
        "The 19th century saw landscape painting flourish with the Romantic movement and Impressionists like Monet, who painted outdoors to capture changing light."
      ]
    },
    {
      title: "Landscape Painting Today",
      gradient: gradient_2,
      type: "paragraphs",
      content: [
        "Modern landscape artists blend traditional techniques with contemporary styles, exploring environmental themes and abstract interpretations.",
        "Digital tools have expanded possibilities while plein air painting remains popular for capturing natural light."
      ]
    },
    {
      title: "Landscape Painting Tips",
      gradient: gradient_3,
      type: "list",
      content: [
        "Use the rule of thirds for balanced compositions",
        "Create depth with atmospheric perspective",
        "Observe how light changes throughout the day",
        "Simplify complex scenes into basic shapes",
        "Experiment with color palettes for mood"
      ]
    }
  ],
    //still life
    
  stillLife: [
  {
    title: "Still Life in Art History",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Still life became prominent during the Dutch Golden Age.",
      "It was used to showcase skill and symbolize deeper meanings (vanitas, abundance, etc.)."
    ]
  },
  {
    title: "Still Life in the Modern Context",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Modern still life incorporates digital tools and abstract elements.",
      "It's used to explore color, form, and everyday objects in new ways."
    ]
  },
  {
    title: "Still Life Painting Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Arrange objects with intent",
      "Consider light source and shadows",
      "Use varied textures and surfaces",
      "Play with negative space",
      "Practice color mixing with limited palettes"
    ]
  }
],

//oilpiinting
watercolor: [
  {
    title: "Watercolor Through History",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Watercolor has ancient roots, used in Chinese and Egyptian art.",
      "It flourished in the West during the Renaissance and gained popularity for its fluidity."
    ]
  },
  {
    title: "Watercolor Art Now",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Artists use watercolor for expressive landscapes, portraits, and illustrations.",
      "It remains popular for its portability and light effects."
    ]
  },
  {
    title: "Watercolor Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Use quality paper to control absorbency",
      "Layer from light to dark",
      "Control water flow and pigment mix",
      "Let areas dry before layering",
      "Embrace happy accidents"
    ]
  }
],
//watercolour
modern: [
  {
    title: "Rise of Modern Art",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Modern art developed in the late 19th to mid-20th century, embracing innovation.",
      "Movements like Cubism, Futurism, and Dada redefined art’s purpose and form."
    ]
  },
  {
    title: "Legacy of Modernism Today",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Modernism opened doors to abstraction, conceptual art, and new materials.",
      "Its influence remains strong in both fine art and design."
    ]
  },
  {
    title: "Modern Art Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Study modern movements and pioneers",
      "Challenge traditional norms",
      "Use minimalism and bold shapes",
      "Let concept drive the form",
      "Embrace experimentation"
    ]
  }
],

//realism
realism: [
  {
    title: "Birth of Realism",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Realism emerged in the 19th century as a reaction to romanticism.",
      "It focused on everyday life, accurate detail, and truth in representation."
    ]
  },
  {
    title: "Realism in Contemporary Art",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Today, realism ranges from hyperrealism to social realism.",
      "It often uses photography and digital tools for reference."
    ]
  },
  {
    title: "Tips for Realistic Painting",
    gradient: gradient_3,
    type: "list",
    content: [
      "Work from high-quality references",
      "Use a full range of values",
      "Focus on accurate proportions",
      "Build detail gradually",
      "Observe rather than assume"
    ]
  }
],
//traditional
traditional: [
  {
    title: "Foundations of Traditional Art",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Traditional art covers techniques like oil, charcoal, watercolor, and more passed down over centuries.",
      "It emphasizes skill, precision, and classical training."
    ]
  },
  {
    title: "The Role of Tradition in Art Today",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Many artists still pursue traditional methods for their depth and tactile quality.",
      "Some blend tradition with modern themes to create unique contrasts."
    ]
  },
  {
    title: "Tips for Traditional Techniques",
    gradient: gradient_3,
    type: "list",
    content: [
      "Master basic drawing before moving to color",
      "Understand your materials deeply",
      "Practice value and shading",
      "Maintain clean and prepared surfaces",
      "Be patient and consistent"
    ]
  }
],
//nature
nature: [
  {
    title: "Art Inspired by Nature",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Nature has always been a muse in art, from ancient cave paintings to romantic landscapes.",
      "Nature-themed works often reflect cultural values and spiritual beliefs."
    ]
  },
  {
    title: "Nature Painting Today",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Modern nature art emphasizes conservation and the beauty of biodiversity.",
      "Artists use plein air techniques and multimedia to capture the environment."
    ]
  },
  {
    title: "Tips for Nature Painting",
    gradient: gradient_3,
    type: "list",
    content: [
      "Observe your surroundings closely",
      "Simplify natural forms into shapes",
      "Capture the essence rather than exact detail",
      "Use color to convey season and mood",
      "Be mindful of changing light"
    ]
  }
],
//portrait
portrait: [
  {
    title: "History of Portrait Painting",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Portraiture has been central to art history, dating back to ancient Egypt and Rome.",
      "It became more personal and expressive during the Renaissance with artists like Da Vinci and Rembrandt."
    ]
  },
  {
    title: "Portraiture in Contemporary Art",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Modern portrait artists explore identity, gender, and culture through diverse mediums.",
      "Portraits now range from hyperrealism to surreal, abstract depictions."
    ]
  },
  {
    title: "Portrait Painting Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Understand facial anatomy and structure",
      "Capture emotion and personality",
      "Use references for accuracy",
      "Pay attention to lighting and shadow",
      "Start with sketches to block proportions"
    ]
  }
],
//digital
digital: [
  {
    title: "Evolution of Digital Art",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Digital art began gaining traction in the late 20th century with the rise of computers and graphic software.",
      "It quickly became a recognized medium with its own unique techniques and aesthetics."
    ]
  },
  {
    title: "Digital Art in the Modern Age",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "From concept art to NFTs, digital platforms allow endless experimentation.",
      "Artists can work across devices and collaborate globally in real time."
    ]
  },
  {
    title: "Tips for Digital Artists",
    gradient: gradient_3,
    type: "list",
    content: [
      "Master your chosen software",
      "Use layers effectively",
      "Keep backups and version history",
      "Use custom brushes for texture",
      "Balance traditional fundamentals with tech skills"
    ]
  }
],
//abstract
Abstract: [
  {
    title: "Origins of Abstract Art",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Abstract art emerged in the early 20th century, breaking away from traditional representation.",
      "Artists like Kandinsky and Mondrian sought to express emotions and ideas through shapes, colors, and forms."
    ]
  },
  {
    title: "Abstract Art Today",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Contemporary abstract artists use digital and mixed media to push creative boundaries.",
      "The style is used to express personal and societal themes with minimal or no visual reference."
    ]
  },
  {
    title: "Tips for Abstract Art",
    gradient: gradient_3,
    type: "list",
    content: [
      "Experiment with bold color contrasts",
      "Use intuition to guide composition",
      "Focus on movement and flow",
      "Explore texture and layering",
      "Let emotion guide the brush"
    ]
  }
],
// surrealism
surrealism: [
  {
    title: "The Rise of Surrealism",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Surrealism emerged after World War I, inspired by Freud’s theories of the unconscious mind.",
      "Artists like Salvador Dalí and René Magritte created dreamlike, irrational imagery to challenge logic and reality."
    ]
  },
  {
    title: "Surrealism’s Modern Legacy",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Surrealist themes appear in film, digital art, and photography, blending fantasy with personal symbolism.",
      "Contemporary artists explore identity, dreams, and subconscious fears through surrealist techniques."
    ]
  },
  {
    title: "Surrealist Art Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Draw inspiration from dreams and imagination",
      "Combine unrelated objects in bizarre ways",
      "Use realistic techniques to render fantasy scenes",
      "Incorporate personal or cultural symbols",
      "Embrace mystery and open-ended interpretations"
    ]
  }
],
// Oil Painting
oil: [
  {
    title: "The Legacy of Oil Painting",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Oil painting became dominant in the Renaissance, offering artists flexibility, depth, and vivid colors.",
      "Masters like Rembrandt and Da Vinci developed layering techniques that defined classical art."
    ]
  },
  {
    title: "Modern Use of Oil Paint",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Contemporary artists use oils to create hyperrealism, abstract work, and even mixed media experiments.",
      "Though slow drying, oil paints offer unmatched richness and texture."
    ]
  },
  {
    title: "Oil Painting Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Start with a toned canvas to unify the work",
      "Work fat-over-lean to avoid cracking",
      "Allow layers to dry between applications",
      "Blend colors slowly for smoother transitions",
      "Use turpentine or linseed oil to modify texture"
    ]
  }
],
// Pop art
pop: [
  {
    title: "Pop Art Origins",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Pop Art emerged in the 1950s–60s, drawing inspiration from popular culture, advertising, and mass media.",
      "Artists like Andy Warhol and Roy Lichtenstein used bold colors and commercial imagery to blur the line between high and low art."
    ]
  },
  {
    title: "Pop Art in the Digital Age",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Modern Pop Art continues to explore consumerism and celebrity culture using digital tools and street art aesthetics.",
      "It remains vibrant and accessible, appealing to broad audiences through iconic symbols."
    ]
  },
  {
    title: "Pop Art Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Incorporate familiar logos, products, or celebrities",
      "Use bright, saturated colors",
      "Employ repetition for impact",
      "Add text or comic-style elements",
      "Make your message bold and ironic"
    ]
  }
],
// impression
impressionism: [
  {
    title: "The Birth of Impressionism",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Impressionism started in 19th-century France, with artists like Monet and Renoir seeking to capture fleeting moments.",
      "They painted en plein air to observe natural light and color directly from life."
    ]
  },
  {
    title: "Impressionism's Influence Today",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Impressionism inspires contemporary artists to embrace spontaneity and perception.",
      "Many still use loose brushwork and bright palettes to reflect mood and motion."
    ]
  },
  {
    title: "Impressionist Art Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Use short, visible brushstrokes",
      "Avoid black; use complementary colors for shadows",
      "Paint quickly to capture changing light",
      "Focus on light and atmosphere, not detail",
      "Choose everyday scenes or landscapes"
    ]
  }
],
// expression
expressionism: [
  {
    title: "What is Expressionism?",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Expressionism began in early 20th-century Germany, emphasizing emotion over realism.",
      "Artists like Edvard Munch and Egon Schiele distorted forms and used bold colors to convey inner experiences and anxiety."
    ]
  },
  {
    title: "Modern Expressionist Practices",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Today’s expressionist works explore themes of identity, mental health, and political unrest.",
      "Artists often combine mixed media and abstract forms to express raw emotion and personal narratives."
    ]
  },
  {
    title: "Expressionist Art Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Prioritize feeling over accuracy",
      "Use strong, contrasting colors",
      "Exaggerate facial expressions and body language",
      "Experiment with brushstroke energy and texture",
      "Draw from personal emotion or social issues"
    ]
  }
],
// minimilism
minimalism: [
  {
    title: "Origins of Minimalist Art",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Minimalism emerged in the 1960s in the United States as a reaction against abstract expressionism and excessive complexity in art.",
      "Artists like Donald Judd and Agnes Martin focused on simplicity, using geometric forms and limited colors to emphasize clarity and objectivity."
    ]
  },
  {
    title: "Minimalism in Contemporary Art",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Modern minimalist artists explore space, repetition, and silence through sculpture, painting, and digital media.",
      "Minimalism influences design, architecture, and fashion, promoting calmness through less visual noise."
    ]
  },
  {
    title: "Minimalist Art Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Limit your color palette to 1–3 hues",
      "Focus on symmetry, balance, and clean lines",
      "Eliminate unnecessary details or distractions",
      "Use repetition to create rhythm and consistency",
      "Let negative space play a key role"
    ]
  }
],
// historic
historical: [
  {
    title: "Understanding Historical Art",
    gradient: gradient_1,
    type: "paragraphs",
    content: [
      "Historical art portrays significant events, figures, or myths from the past, often glorifying or critiquing them.",
      "It served as both education and propaganda in different eras, especially in Renaissance and Neoclassical periods."
    ]
  },
  {
    title: "Preserving and Interpreting History",
    gradient: gradient_2,
    type: "paragraphs",
    content: [
      "Today, artists reinterpret historical themes to reflect modern values and identities.",
      "Historical artworks are also key to understanding cultural heritage and social evolution."
    ]
  },
  {
    title: "Historical Art Tips",
    gradient: gradient_3,
    type: "list",
    content: [
      "Research your chosen era thoroughly",
      "Incorporate symbolic clothing and settings",
      "Use dramatic lighting for effect",
      "Balance narrative and composition",
      "Explore history from new or untold perspectives"
    ]
  }
],



}


