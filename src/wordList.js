import yaml from 'js-yaml'

// Function to get image URL for a word
const getImageUrl = (word) => {
  // Convert word to filename format (lowercase, spaces to hyphens)
  const filename = word.toLowerCase().replace(/\s+/g, '-')
  
  // Try different image extensions
  const extensions = ['jpg', 'png', 'webp']
  for (const ext of extensions) {
    try {
      return new URL(`./assets/images/${filename}.${ext}`, import.meta.url).href
    } catch (e) {
      continue
    }
  }
  
  // Return a default image if none found
  return new URL('./assets/images/default.jpg', import.meta.url).href
}

// Load and process the YAML file
const loadWordLists = async () => {
  try {
    const response = await fetch(new URL('./assets/wordLists.yaml', import.meta.url))
    const yamlText = await response.text()
    const lists = yaml.load(yamlText)
    
    // Convert simple word lists to objects with words and image URLs
    const wordLists = {}
    for (const [category, words] of Object.entries(lists)) {
      wordLists[category] = words.map(word => ({
        word,
        image: getImageUrl(word)
      }))
    }
    
    return wordLists
  } catch (error) {
    console.error('Error loading word lists:', error)
    return {}
  }
}

export const wordLists = await loadWordLists() 