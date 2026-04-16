import { createPlayer, resetPlayerForNewTurn } from "./player";
import { createInitialBoard } from "./board";
import { v4 as uuidv4 } from 'uuid';

function createInitialGameState(playerCount) {
  const players = [];

  for (let i = 0; i < playerCount; i++) {
    players.push(createPlayer(uuidv4(), `Jugador ${i + 1}`, `agent_${i + 1}`));
  }

  const board = createInitialBoard();

  return {
    players,
    board,
    turn: 1,
    round: 1,
    currentPlayerIndex: 0
  };
}

function nextTurn(gameState) {
    return {
        ...gameState,
        turn: gameState.turn + 1,
        currentPlayerIndex: (gameState.currentPlayerIndex + 1) % gameState.players.length
    };
}

function nextRound(gameState) {
    const updatedPlayers = gameState.players.map(player => resetPlayerForNewTurn(player));
    return {
        ...gameState,
        players: updatedPlayers,
        turn: 1,
        round: gameState.round + 1,
        currentPlayerIndex: 0
    };
}


export {
    createInitialGameState,
    nextTurn,
    nextRound
}