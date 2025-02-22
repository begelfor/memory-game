<template>
  <div 
    class="card" 
    :class="{ 'flipped': card.isFlipped, 'matched': card.isMatched }"
    @click="handleClick"
  >
    <div class="card-inner">
      <div class="card-front">?</div>
      <div class="card-back">{{ card.value }}</div>
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
      utterance.rate = 0.9 // Slightly slower rate for clarity
      
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
  font-size: 1em;
  padding: 8px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 8px;
  word-break: break-word;
  background-color: white;
}

.card-front {
  z-index: 2;
}

.card-back {
  transform: rotateY(180deg);
  background-color: #fff;
  z-index: 1;
}

.card.matched {
  opacity: 0.7;
}
</style> 