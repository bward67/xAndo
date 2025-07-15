import React from "react";
import Game from "./components/Game";

const App = () => {
  function onClick() {
    console.log("Clicked the button in thte Square component");
  }
  return (
    <div>
      <Game />
    </div>
  );
};

export default App;
