<template>
  <div class="app">
    <header>
      <h1>Memory Game</h1>
      <div class="controls-container">
        <div class="game-controls">
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
    </header>
    <main>
      <GameBoard 
        ref="gameBoard"
        :card-pairs="selectedSize.pairs"
        :grid-columns="selectedSize.columns"
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
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
}

header {
  flex-shrink: 0;
}

h1 {
  margin: 0 0 16px 0;
}

main {
  flex-grow: 1;
  min-height: 0; /* Important for flex container */
}

.controls-container {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.game-controls {
  margin-bottom: 0;
}

.game-controls select {
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
}
</style> 