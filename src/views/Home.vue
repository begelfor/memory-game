<template>
  <div class="home">
    <h1>Learning Games</h1>
    <nav class="game-menu">
      <router-link to="/memory" class="game-button">Memory Game</router-link>
      <router-link to="/newgame" class="game-button">New Game</router-link>
    </nav>
  </div>
</template>

<style>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.game-menu {
  display: flex;
  gap: 1rem;
}

.game-button {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  background-color: #2196F3;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.game-button:hover {
  background-color: #1976D2;
}
</style> 