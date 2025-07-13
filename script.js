// IIFE for the gamebaord, essentially acts as
// a module with methods that can be called
const gameBoard = (() => {
  const board = Array(9).fill("");
  function getBoard() {
    return board;
  }
  function setCell(cell, marker) {
    if (board[cell] === "") {
      board[cell] = marker;
    }
  }
  function clearBoard(board) {
    board = Array(9).fill("");
  }

  return { getBoard, setCell, clearBoard };
})();

// DOM display
function renderBoard() {
  // Board is an array
  const board = gameBoard.getBoard();
  // Iterate over the board and fill each DOM div
  // with the corresponding cell
  board.forEach((cell, index) => {
    const cellDiv = document.getElementById(`cell-${index + 1}`);
    cellDiv.textContent = cell;
  });
}

// Factory Function for Players
const Player = (name, marker) => {
  function makeMove(cell) {
    gameBoard.setCell(cell, marker);
  }
  return { name, marker, makeMove };
};

const Game = (() => {
  let players;
  let gameOver;
  let winner;
  let currentPlayerIndex;
  
  
    function init() {
    players = [Player("Player 1", "X"), Player("Player 2", "O")];
    gameOver = false;
    winner = null;
    currentPlayerIndex = 0;
  }

  function getCurrentPlayer() {
    return players[currentPlayerIndex];
  }
  function playRound(cell) {
    const player = getCurrentPlayer();
    player.makeMove(cell);
    const result = checkGameOver()
    renderBoard();
    switchPlayer()
  }

  function switchPlayer() {}
  currentPlayerIndex = 1 - currentPlayerIndex;

  // Checks if the game is over
  function checkGameOver(board) {
    const winConditions = [];
  }

  function displayWinner(winner) {}

  function restartGame() {
    gameBoard.clearBoard();
    renderBoard();
  }
  return {
    init,
    getCurrentPlayer,
    playRound,
    switchPlayer,
    checkGameOver,
    displayWinner,
    restartGame,
  };
})();

function checkWinner(board) {}

function isDraw(board) {}

Game.init();
