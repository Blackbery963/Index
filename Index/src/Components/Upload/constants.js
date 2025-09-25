// constants.js
export const artCategories = {
  showcase: {
    types: [
      // Traditional & Fine Arts
      "Oil Painting",
      "Acrylic Painting",
      "Watercolor Painting",
      "Ink Drawing",
      "Charcoal Drawing",
      "Pastel Art",
      "Pencil Sketch",
      "Mixed Media",

      // Digital Art
      "Digital Art",
      "Digital Painting",
      "3D Modeling",

      // Photography
      "Portrait Photography",
      "Landscape Photography",
      "Portrait Photography",
      "Street Photography",
      "Wildlife Photography",
      "Fashion Photography",
      "Micro Photography",
      "Architectural Photography",
      "Astrophotography",

      // Sculpture
      "Sculpture",
      "Clay Modeling",
      "Stone Carving",

      // Other
      "Other"
    ],
    tags: [
      // 🎨 Styles
      "Abstract", "Realism", "Impressionism", "Surrealism", "Minimalism", "Modern", "Vintage","Photography",

      // 🌍 Themes
      "Portrait", "Landscape", "Nature", "Fantasy", "Cultural", "Spiritual", "StillLife", "Urban", "Traditional",

      // 🖌 Mediums
      "Digital", "Photography", "Mixed Media", "Paper"
    ]
  },

  commercial: {
    types: [
      // Crafts
      "Pottery",
      "Ceramics",
      "Glass Art",
      "Jewelry Making",
      "Textile Art",
      "Fabric Painting",
      "Embroidery",
      "Knitting/Crochet",
      "Woodworking",
      "Metal Crafts",
      "Paper Crafts",
      "Origami",
      "Scrapbooking",
      "Candle Making",
      "Soap Making",
      "Basket Weaving",
      "Leather Craft",
      "Beadwork"
    ],
    tags: [
      // 🖌 Mediums
      "Textile", "Wood", "Ceramic",

      // 🏠 Purpose
      "Home Decor", "Wearable", "Gift Item", "Poster & Prints", "Handmade"
    ]
  }

};

export const acceptedFileTypes = {
  images: [
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "image/webp",
    "image/x-png"
  ],
  videos: [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/quicktime", // .mov files
    "video/x-msvideo"  // .avi files
  ]
};
export const maxFileSize = 10*1024*1024; // 10MB in bytes