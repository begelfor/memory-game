<template>
  <div class="app">
    <div class="sidebar">
      <h1>Memory Game</h1>
      <div class="game-controls">
        <select v-model="selectedTopic" @change="resetGame">
          <option v-for="(list, topic) in topics" :key="topic" :value="topic">
            {{ topic.charAt(0).toUpperCase() + topic.slice(1) }}
          </option>
        </select>
        <select v-model="selectedSize" @change="resetGame">
          <option v-for="size in gameSizes" :key="size.pairs" :value="size">
            {{ size.name }}
          </option>
        </select>
      </div>
      <ScoreBoard 
        :moves="moves"
        :matches="matches"
        @reset-game="resetGame"
      />
    </div>
    <main>
      <GameBoard 
        ref="gameBoard"
        :card-pairs="selectedSize.pairs"
        :grid-columns="selectedSize.columns"
        :selected-topic="selectedTopic"
        @move-made="incrementMoves"
        @match-found="incrementMatches"
        @game-won="handleGameWon"
      />
    </main>
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue'
import ScoreBoard from './components/ScoreBoard.vue'
import { wordLists } from './wordList.js'

export default {
  name: 'App',
  components: {
    GameBoard,
    ScoreBoard
  },
  data() {
    return {
      moves: 0,
      matches: 0,
      topics: wordLists,
      selectedTopic: 'food',
      gameSizes: [
        { name: 'Easy (4x3)', pairs: 6, columns: 4 },
        { name: 'Medium (4x4)', pairs: 8, columns: 4 },
        { name: 'Hard (5x4)', pairs: 10, columns: 5 },
        { name: 'Expert (6x5)', pairs: 15, columns: 6 }
      ],
      selectedSize: { name: 'Medium (4x4)', pairs: 8, columns: 4 }
    }
  },
  methods: {
    incrementMoves() {
      this.moves++
    },
    incrementMatches() {
      this.matches++
    },
    resetGame() {
      this.moves = 0
      this.matches = 0
      this.$refs.gameBoard.resetGame()
    },
    handleGameWon() {
      setTimeout(() => {
        alert(`Congratulations! You won in ${this.moves} moves!`)
        this.resetGame()
      }, 500)
    }
  }
}
</script>

<style>
.app {
  height: 100vh;
  display: flex;
  padding: 16px;
  gap: 24px;
  box-sizing: border-box;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

h1 {
  margin: 0;
  font-size: 1.5em;
}

main {
  flex-grow: 1;
  min-height: 0; /* Important for flex container */
}

.game-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.game-controls select {
  width: 100%;
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
}
</style> 