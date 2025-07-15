import React, { useContext } from "react";
import GameContext from "../GameContext.js";

const Square = ({ value, index }) => {
  const { handleClick } = useContext(GameContext);

  const getSymbolClass = () => {
    if (value === "X") {
      return "symbol-x";
    }
    if (value === "O") {
      return "symbol-o";
    }
    return "";
  };
  return (
    <button
      onClick={() => handleClick(index)}
      className={`square-btn ${getSymbolClass()}`}
    >
      {value}
    </button>
  );
};

export default Square;
