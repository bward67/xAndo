import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick }) => {
  // remember squares is our board state from Game.jsx
  // which is an array of 9 elements, each representing a square [null, null, null, null, null, null, null, null, null]

  const style = {
    border: "4px solid darkblue",
    borderRadius: ".3rem",
    width: "250px",
    height: "250px",
    margin: "0 auto",
    display: "grid",
    gridTemplate: "repeat(3, 1fr) / repeat(3, 1fr)",
  };

  return (
    <div style={style}>
      {squares.map((square, index) => {
        return (
          <Square key={index} onClick={() => onClick(index)} value={square} />
        );
      })}
      {/* <Square onClick={onClick} value="0" />
      <Square onClick={onClick} value="1" />
      <Square onClick={onClick} value="2" />
      <Square onClick={onClick} value="3" />
      <Square onClick={onClick} value="4" />
      <Square onClick={onClick} value="5" />
      <Square onClick={onClick} value="6" />
      <Square onClick={onClick} value="7" />
      <Square onClick={onClick} value="8" /> */}
    </div>
  );
};

export default Board;
