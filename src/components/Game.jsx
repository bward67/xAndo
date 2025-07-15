import React, { useState } from "react";
import Board from "./Board";
import calculateWinner from "../helpers.js";
import Confetti from "react-confetti";
import GameContext from "../GameContext.js";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);

  const handleClick = (index) => {
    //console.log("handle click in action");
    // we want an X or an O to populate the button/square the user clicks on
    //! in <Board /> we map thru the board array and return a <Square /> which is a button and in it we pass the index as the argument in this handleClick function - and the index will be a number between 0 and 8
    const boardCopy = [...board]; // we get a non-mutated shallow COPY of the board array

    //BUT if the user clicks on an occupied square or if the game is won - return - end the function early
    if (winner || boardCopy[index]) {
      return;
    } else boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy); //! this triggers a re-render, so the new letter appears on the screen
    setXIsNext(!xIsNext);
  };

  return (
    <GameContext.Provider value={{ board, handleClick, winner, xIsNext }}>
      <>
        {winner && (
          <Confetti
            colors={
              winner === "X"
                ? ["blueviolet", "#e0ccff", "#fff"]
                : ["orangered", "#ffccccff", "#fff"]
            }
          />
        )}
        <Board />
        <div className="message-board">
          <p
            className={winner ? "winner-message" : "message"}
            style={
              winner
                ? { color: winner === "X" ? "blueviolet" : "orangered" }
                : {}
            }
          >
            {winner
              ? `Well Done ${winner} - you are the Winner 🥳`
              : "Next Player: " + (xIsNext ? "X" : "O")}
          </p>

          {winner && (
            <button
              className="new-game-btn"
              onClick={() => setBoard(Array(9).fill(null))}
            >
              Play New Game
            </button>
          )}
        </div>
      </>
    </GameContext.Provider>
  );
};

export default Game;
