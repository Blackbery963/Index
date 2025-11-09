// Template system for common question patterns
export const responseTemplates = {
  technique: (subject) => `For ${subject}, here's a step-by-step approach:\n\n1. **Start with observation** - study your subject carefully\n2. **Block in basic shapes** - keep it simple initially\n3. **Refine proportions** - check measurements and relationships\n4. **Add details gradually** - build up complexity slowly\n5. **Final touches** - enhance contrasts and highlights\n\nPro tip: Practice this technique daily for best results! 🎨`,

  material: (material) => `When working with ${material}, consider these essential tips:\n\n• **Surface preparation** - choose the right paper/canvas\n• **Tool selection** - use appropriate brushes/tools\n• **Technique adaptation** - adjust your approach for the medium\n• **Drying times** - plan your workflow accordingly\n• **Cleanup** - proper maintenance extends tool life\n\nExperiment with different ${material} brands to find your favorite!`,

  artist: (artist) => `About ${artist}:\n\nWhile I'd need more specific context about which aspect interests you, ${artist} has likely contributed significantly to the art world through their unique style, techniques, or artistic philosophy.\n\nWould you like to know about:\n• Their specific artworks?\n• Artistic style and influences?\n• Key techniques they used?\n• Their impact on art history?\n\nFeel free to ask more specifically! 🎨`,

  style: (style) => `Regarding ${style} art:\n\nThis artistic style typically involves distinctive approaches to composition, color, and subject matter that set it apart from other movements.\n\nKey characteristics often include:\n• Unique visual language\n• Specific thematic interests\n• Innovative techniques\n• Historical context and influences\n\nWhat particular aspect of ${style} would you like to explore?`
};

export const templateMatcher = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Technique questions
  const techniqueMatch = lowerMessage.match(/how.*(draw|paint|sketch|create|make).*?\b(\w+(?:\s+\w+){0,2})/i);
  if (techniqueMatch && techniqueMatch[2]) {
    return {
      answer: responseTemplates.technique(techniqueMatch[2]),
      type: 'technique',
      subject: techniqueMatch[2]
    };
  }
  
  // Material questions
  const materials = ['watercolor', 'oil', 'acrylic', 'pencil', 'charcoal', 'digital', 'pastel', 'gouache'];
  const materialMatch = materials.find(material => lowerMessage.includes(material));
  if (materialMatch) {
    return {
      answer: responseTemplates.material(materialMatch),
      type: 'material',
      subject: materialMatch
    };
  }
  
  // Style questions
  const styles = ['realism', 'abstract', 'impressionism', 'cubism', 'surrealism', 'expressionism', 'renaissance'];
  const styleMatch = styles.find(style => lowerMessage.includes(style));
  if (styleMatch) {
    return {
      answer: responseTemplates.style(styleMatch),
      type: 'style',
      subject: styleMatch
    };
  }
  
  return null;
};