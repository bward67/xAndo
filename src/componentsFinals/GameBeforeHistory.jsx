import React, { useState } from "react";
import Board from "./Board.jsx";
import calculateWinner from "../helpers.js";
//? .. goes up one level to the src folder, then / down into helpers.js

//!  Because we used export default in the helpers.js file and that means:  “This is the one main thing this file exports.”   You don’t need to name it in the import — you can even rename it if you want:
//? import checkWinner from "../helpers";

const initialBoard = Array(9).fill(null); // This is the initial state of the board, an array of 9 nulls

const Game = () => {
  const [board, setBoard] = useState(initialBoard); // b/c it is an empty board to start with
  const [xIsNext, setXIsNext] = useState(true); // X will always be first to play
  const winner = calculateWinner(board);
  //! BUT what if no one wins?
  const isBoardFull = board.every((square) => square !== null); // Check if the board is full

  const styles = {
    width: "200px",
    margin: "20px auto",
  };

  function handleClick(index) {
    //console.log("Square clicked");
    const boardCopy = [...board]; // create a shallow copy of the board
    //console.log(boardCopy);
    //! now if the user clicks on an occupied square or if there is a winner, we don't want to do anything we will just return out of the function - stop and go no further
    if (winner || boardCopy[index]) {
      return;
    }
    //Put and X or an O in the clicked square
    boardCopy[index] = xIsNext ? "X" : "O";
    //boardCopy[index] means: "Look at the specific square the user clicked on."
    // index is passed into the handleClick function — it represents the position (0 through 8) of the square on the board
    // if xIsNext is true, we put an X, otherwise we put an O
    setBoard(boardCopy); // update the board state with the new board
    console.log(boardCopy);
    setXIsNext(!xIsNext); // toggle the xIsNext state
  }
  function jumpTo() {
    console.log("Jump to move");
  }
  //   function renderMoves() {
  //     return (
  //       <button onClick={() => setBoard(initialBoard)}>
  //         {winner ? "New Game" : "Start Game"}
  //       </button>
  //     );
  //   }

  return (
    <>
      <Board squares={board} onClick={handleClick} />
      <div style={styles}>
        <p>
          {winner
            ? `Winner:   ${winner}`
            : isBoardFull
            ? "It's a Draw!"
            : `Next Player:  ${xIsNext ? "X" : "O"}`}
        </p>
        <button onClick={() => setBoard(initialBoard)}>
          {winner || isBoardFull ? "New Game" : "Start Game"}
        </button>
      </div>
    </>
  );
};

export default Game;
