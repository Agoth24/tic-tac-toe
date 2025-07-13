// IIFE for the gamebaord, essentially acts as
// a module with methods that can be called
const gameBoard = (() => {
  const board = Array(9).fill("");
  function getBoard() {
    // Returns the board array
    return board;
  }
  function setCell(cell, marker) {
    if (board[cell] === "") {
      board[cell] = marker;
    }
  }
  function clearBoard() {
    // Loop through all elements in the board
    for (let i = 0; i < board.length; i++) {
      // Clear each element
      board[i] = "";
    }
  }

  // PUBLIC API
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

  // Returns Player Object
  return { name, marker, makeMove };
};

// GAME CONTROLLER MODULE
const Game = (() => {
  // STATE
  let players;
  let gameOver;
  let winner;
  let currentPlayerIndex;

  // BEHAVIOUR

  // Start a new game
  function init() {
    players = [Player("Player 1", "X"), Player("Player 2", "O")];
    currentPlayerIndex = 0;
    resetState();

    // Listen to each cell and run a function which takes the cell and index
    document.querySelectorAll(".cell").forEach((cell, index) => {
      cell.addEventListener("click", () => {
        const board = gameBoard.getBoard();
        if (!board[index] && !gameOver) {
          playRound(index);
        }
      });
    });

    document.querySelector(".restart").addEventListener("click", restartGame);
  }
  // Grab the object of the current player
  function getCurrentPlayer() {
    return players[currentPlayerIndex];
  }

  // Runs for each move (Put in a loop later)
  function playRound(cell) {
    const player = getCurrentPlayer();
    player.makeMove(cell);
    renderBoard();

    const board = gameBoard.getBoard();
    // Get the current result of the game
    if (checkGameOver(board)) {
      gameOver = true;
      winner = getCurrentPlayer();
      GameMessage.displayWinner(winner);
      return;
    }
    if (isDraw()) {
      gameOver = true;
      GameMessage.displayDraw();
      return;
    }

    // If the game isn't over...
    switchPlayer();
  }

  // Switches from index 0 to 1 and vice versa
  function switchPlayer() {
    currentPlayerIndex = 1 - currentPlayerIndex;
  }

  // Checks if the game is over
  function checkGameOver(board) {
    const winConditions = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Cols
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];
    // For three cells in a row...
    for (const [a, b, c] of winConditions) {
      // If they are all the same...
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        // Game is over
        return true;
      }
    }
    // Game is not over
    return false;
  }

  // Return true if every cell in the board is occupied
  function isDraw() {
    return gameBoard.getBoard().every((cell) => cell !== "");
  }

  // Reset state variables and clear the board
  function resetState() {
    gameOver = false;
    winner = null;
    gameBoard.clearBoard();
    renderBoard();
  }

  // To be run after at least one game is completed
  function restartGame() {
    resetState();
    GameMessage.clearWinMessage();
  }

  // PUBLIC API FOR GAME MODULE
  return {
    init,
    getCurrentPlayer,
    playRound,
    restartGame,
  };
})();

// IIFE for a global module that prints messages
const GameMessage = (() => {
  // Grab the message box div
  const messageBox = document.querySelector(".message-box");

  // Function for adding text to the div
  function displayText(message) {
    messageBox.textContent = message;
  }

  // Formatting win message
  function winMessage(winner) {
    return `${winner.name} wins!`;
  }

  // Diplaying the winner
  function displayWinner(player) {
    displayText(winMessage(player));
  }

  // Displaying a Draw
  function displayDraw() {
    displayText(`It's a draw!`);
  }

  // Clears win message
  function clearWinMessage() {
    displayText("");
  }
  return { displayWinner, displayDraw, clearWinMessage };
})();

Game.init();
