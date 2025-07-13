// IIFE for the gamebaord, essentially acts as 
// a module with methods that can be called
const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];

  const getBoard = () => {
    return board;
  };
  const setCell = (cell, marker) => {
    if (board[cell] === "") {
      board[cell] = marker;
    }
  };
})();

// Factory Function for Players
const Player = (name, marker) => {
  return name, marker;
};

const GameController = () => {
    const player1 = Player("Player 1", 'X')
    const player2 = Player("Player 2", 'O')
};
