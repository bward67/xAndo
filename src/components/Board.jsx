import React, { useContext } from "react";
import GameContext from "../GameContext.js";
import Square from "./Square";

const Board = () => {
  const { board } = useContext(GameContext);
  return (
    <div className="board">
      {board.map((square, index) => {
        return <Square key={index} value={square} index={index} />;
      })}
    </div>
  );
};

export default Board;
