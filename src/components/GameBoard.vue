<template>
  <div class="game-board">
    <div class="cards-grid" :style="gridStyle">
      <Card
        v-for="(card, index) in cards"
        :key="index"
        :card="card"
        @card-click="handleCardClick"
      />
    </div>
  </div>
</template>

<script>
import Card from './Card.vue'
import { wordLists } from '../wordList.js'

export default {
  name: 'GameBoard',
  components: {
    Card
  },
  props: {
    cardPairs: {
      type: Number,
      default: 8,
      validator: (value) => value > 0 && value <= 20 // Limit range as needed
    },
    gridColumns: {
      type: Number,
      default: 4
    },
    selectedTopic: {
      type: String,
      default: 'food'
    }
  },
  data() {
    return {
      cards: [],
      flippedCards: [],
      isLocked: false
    }
  },
  computed: {
    gridStyle() {
      const gap = 16; // Increased gap between cards from 8px to 16px
      const headerHeight = 180; // approximate height of header
      const padding = 32; // total vertical padding
      const rows = Math.ceil((this.cardPairs * 2) / this.gridColumns);
      
      // Calculate available height and width
      const availableHeight = `calc(100vh - ${headerHeight + padding}px)`;
      const availableWidth = 'calc(100% - 32px)'; // Account for horizontal padding
      
      // Calculate card size to fit both width and height
      const cardWidth = `min(
        calc((${availableWidth} - (${this.gridColumns - 1} * ${gap}px)) / ${this.gridColumns}),
        calc((${availableHeight} - (${rows - 1} * ${gap}px)) / ${rows})
      )`;

      return {
        'grid-template-columns': `repeat(${this.gridColumns}, ${cardWidth})`,
        gap: `${gap}px`,
        'justify-content': 'center'
      }
    }
  },
  methods: {
    initializeCards() {
      const topicWords = wordLists[this.selectedTopic]
      const shuffledWords = [...topicWords].sort(() => Math.random() - 0.5)
      const selectedWords = shuffledWords.slice(0, this.cardPairs)
      
      this.cards = [...selectedWords, ...selectedWords]
        .map(item => ({
          value: item.word,
          image: item.image,
          isFlipped: false,
          isMatched: false
        }))
        .sort(() => Math.random() - 0.5)
    },
    handleCardClick(clickedCard) {
      // Prevent clicking if the board is locked or card is already flipped/matched
      if (this.isLocked || clickedCard.isFlipped || clickedCard.isMatched) {
        return
      }

      // Find the card in our array and flip it
      const card = this.cards.find(c => c === clickedCard)
      card.isFlipped = true
      this.flippedCards.push(card)

      // If we have 2 cards flipped, check for a match
      if (this.flippedCards.length === 2) {
        this.isLocked = true
        this.$emit('move-made') // Increment moves counter in parent
        
        // Check if the cards match
        if (this.flippedCards[0].value === this.flippedCards[1].value) {
          // Mark cards as matched
          this.flippedCards.forEach(card => {
            card.isMatched = true
          })
          this.flippedCards = []
          this.isLocked = false
          this.$emit('match-found') // Increment matches counter in parent

          // Check if game is won
          if (this.cards.every(card => card.isMatched)) {
            this.$emit('game-won')
          }
        } else {
          // If no match, flip cards back after a delay
          setTimeout(() => {
            this.flippedCards.forEach(card => {
              card.isFlipped = false
            })
            this.flippedCards = []
            this.isLocked = false
          }, 1000)
        }
      }
    },
    resetGame() {
      this.cards.forEach(card => {
        card.isFlipped = false
        card.isMatched = false
      })
      this.flippedCards = []
      this.isLocked = false
      this.initializeCards()
    }
  },
  created() {
    this.initializeCards()
  }
}
</script>

<style>
.game-board {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cards-grid {
  display: grid;
  width: 100%;
}
</style> 