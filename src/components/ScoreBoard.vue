<template>
  <div class="score-board">
    <div class="stats">
      <p>Moves: {{ moves }}</p>
      <p>Matches: {{ matches }}</p>
    </div>
    <div class="button-container">
      <button @click="$emit('reset-game')" class="reset-button">
        New Game
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    moves: {
      type: Number,
      required: true
    },
    matches: {
      type: Number,
      required: true
    }
  }
}
</script>

<style>
.score-board {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.stats {
  display: flex;
  gap: 16px;
}

.stats p {
  margin: 0;
}

.button-container {
  margin-left: auto;
}

.reset-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: #45a049;
}
</style> 