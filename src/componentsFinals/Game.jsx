import React, { useState } from "react";
import Board from "./Board.jsx";
import calculateWinner from "../helpers.js";
//? .. goes up one level to the src folder, then / down into helpers.js

//!  Because we used export default in the helpers.js file and that means:  “This is the one main thing this file exports.”   You don’t need to name it in the import — you can even rename it if you want:
//? import checkWinner from "../helpers";

const initialBoard = Array(9).fill(null); // This is the initial state of the board, an array of 9 nulls

const Game = () => {
  const [history, setHistory] = useState([initialBoard]); // b/c it is an empty board to start with and it's an array of boards b/c we will have many boards in the history
  //! history stores every move - so each time a square is clicked, we create a NEW VERSION OF THE BOARD and add it to the history array
  const [stepNumber, setStepNumber] = useState(0);
  // setNumber is the current move being shown
  const [xIsNext, setXIsNext] = useState(true); // X will always be first to play
  const winner = calculateWinner(history[stepNumber]);
  //! BUT what if no one wins?
  const currentBoard = history[stepNumber]; // Get the current board from history based on stepNumber
  // console.log(currentBoard);
  const isBoardFull = currentBoard.every((square) => square !== null); // Check if the board is full

  const styles = {
    width: "200px",
    margin: "20px auto",
  };

  function handleClick(index) {
    //console.log("Square clicked");
    const timeInHistory = history.slice(0, stepNumber + 1); // get the history up to the current step as we don't want to modify the past history and we don't need the current step in the history
    //! This is important for when you time travel to a previous move and then make a new move. Without slicing, you’d be adding a move on top of an old one, causing branching errors. So it throws away the "future" and builds new history from the current position.
    const current = timeInHistory[stepNumber];
    const squares = [...current]; // create a shallow copy of the board
    //console.log(squares);
    //! now if the user clicks on an occupied square or if there is a winner, we don't want to do anything we will just return out of the function - stop and go no further
    if (winner || squares[index]) {
      return;
    }
    //Put and X or an O in the clicked square
    squares[index] = xIsNext ? "X" : "O";
    //boardCopy[index] means: "Look at the specific square the user clicked on."
    // index is passed into the handleClick function — it represents the position (0 through 8) of the square on the board
    // if xIsNext is true, we put an X, otherwise we put an O
    setHistory([...timeInHistory, squares]); // update the board state with the new board
    // console.log(boardCopy);
    setStepNumber(timeInHistory.length); // update the step number to the current step
    // console.log(stepNumber);
    setXIsNext(!xIsNext); // toggle the xIsNext state
  }

  //! jumpTo function sets the game view to a specific point in time and adjusts whos turn it is based on the step number
  function jumpTo(step) {
    setStepNumber(step); // step is the index of the history array
    setXIsNext(step % 2 === 0); // if step is even, X goes next, if odd, O goes next
    // console.log(step);
  }

  //! renderMoves function lists every point in time you can jump to in the game and maps over the history array to create a button for each move so you get a list of buttons to jump to each move
  //! The first button is "Start Game" and the rest are "Go to move #x"
  function renderMoves() {
    //! don't show any history buttons if it's just the first board
    if (history.length <= 1) return null;
    const styles = {
      listStyleType: "none",
      padding: 0,
      margin: ".5rem",
    };
    const buttonStyles = {
      backgroundColor: "lightblue",
      border: "2px solid darkblue",
      outline: "none",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      padding: "5px 10px",
    };
    return history.map((_step, move) => {
      const isStart = move === 0; // Check if this is the first move
      //! if we are at teh start & there's a winner or draw (isBoardFull), we want to show "New Game" instead of "Go to move #x"
      const destination = isStart
        ? winner || isBoardFull
          ? "New Game"
          : "Go to Game Start"
        : `Go to move #${move}`;
      return (
        <li key={move} style={styles}>
          <button
            style={buttonStyles}
            onClick={() => {
              if (isStart && (winner || isBoardFull)) {
                resetGame();
              } else {
                jumpTo(move);
              }
            }}
          >
            {destination}
          </button>
        </li>
      );
    });
  }

  function resetGame() {
    setHistory([initialBoard]);
    setStepNumber(0);
    setXIsNext(true);
  }

  return (
    <>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div style={styles}>
        <p>
          {winner
            ? `Winner:   ${winner}`
            : isBoardFull
            ? "It's a Draw!"
            : `Next Player:  ${xIsNext ? "X" : "O"}`}
        </p>
        {renderMoves()}
      </div>
    </>
  );
};

export default Game;
