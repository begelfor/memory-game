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
      // Process each word, checking if it's a dictionary
      wordLists[category] = words.map(word => {
        // Check if word is a dictionary (object)
        if (typeof word === 'object' && word !== null) {
          // Extract the key from the dictionary
          const wordKey = Object.keys(word)[0]
          return {
            word: wordKey,
            image: `${baseUrl}images/${wordKey}.jpg`
          }
        } else {
          // It's a simple string, use as is
          return {
            word,
            image: `${baseUrl}images/${word}.jpg`
          }
        }
      })
      // Add words to allWords array (extract keys for dictionaries)
      const wordsForAll = words.map(word => 
        typeof word === 'object' && word !== null ? Object.keys(word)[0] : word
      )
      allWords.push(...wordsForAll)
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