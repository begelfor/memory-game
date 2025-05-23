<template>
  <div 
    class="card" 
    :class="{ 'flipped': card.isFlipped, 'matched': card.isMatched }"
    @click="handleClick"
  >
    <div class="card-inner">
      <div class="card-front">
        <img src="../assets/card-back.svg" alt="card pattern" class="card-pattern">
      </div>
      <div class="card-back">
        <div class="card-content">
          <span class="card-word">{{ card.value }}</span>
          <img 
            v-if="card.isMatched" 
            :src="card.image" 
            :alt="card.value"
            class="card-image"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      if (!this.card.isFlipped && !this.card.isMatched) {
        this.$emit('card-click', this.card)
        this.speakWord(this.card.value)
      }
    },
    speakWord(word) {
      // Create speech synthesis utterance
      const utterance = new SpeechSynthesisUtterance(word)
      utterance.lang = 'en-US' // Set language to English
      utterance.rate = 0.8 // Slightly slower rate for clarity
      
      // Speak the word
      window.speechSynthesis.speak(utterance)
    }
  }
}
</script>

<style>
.card {
  aspect-ratio: 1/1;
  perspective: 1000px;
  cursor: pointer;
  width: 100%;
  position: relative;
}

.card-inner {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

.card.flipped .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
  padding: 8px;
  text-align: center;
  border: 2px solid #1976D2;
  border-radius: 8px;
  word-break: break-word;
  background-color: white;
}

.card-front {
  z-index: 2;
  background: #2196F3;
  overflow: hidden;
}

.card-back {
  transform: rotateY(180deg);
  background-color: #fff;
  z-index: 1;
  padding: 4px; /* Reduced padding */
}

.card-pattern {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 4px; /* Reduced gap */
}

.card-word {
  font-size: 1.2em;
  font-weight: bold;
  line-height: 1.2;
  margin: 0;
}

.card-image {
  max-width: 90%;  /* Increased from 80% */
  max-height: 75%; /* Increased from 60% */
  object-fit: contain;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.card.matched .card-image {
  opacity: 1;
}

/* Adjust word size when image is shown */
.card.matched .card-word {
  font-size: 1em; /* Reduced from 1.2em */
}

.card.matched {
  opacity: 0.7;
}
</style> 