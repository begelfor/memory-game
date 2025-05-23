import yaml from 'js-yaml'

// Load and process the YAML file
const loadWordLists = async () => {
  try {
    // Prepend base URL to file paths
    const baseUrl = import.meta.env.BASE_URL
    const response = await fetch(`${baseUrl}wordLists.yaml`)
    const yamlText = await response.text()
    const lists = yaml.load(yamlText)
    
    // Convert simple word lists to objects with words and image URLs
    const wordLists = {}
    
    // Create array of all words for random selection
    const allWords = []
    for (const [category, words] of Object.entries(lists)) {
      // Process regular categories with base URL for images
      wordLists[category] = words.map(word => ({
        word,
        image: `${baseUrl}images/${word}.jpg`
      }))
      // Add words to allWords array
      allWords.push(...words)
    }
    
    // Add random category with base URL for images
    wordLists.random = allWords.map(word => ({
      word,
      image: `${baseUrl}images/${word}.jpg`
    }))
    
    return wordLists
  } catch (error) {
    console.error('Error loading word lists:', error)
    return {}
  }
}

export const wordLists = await loadWordLists() 