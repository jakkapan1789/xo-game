import React, { useState } from "react";
import "./App.css";

const App = () => {
  const initialBoard = Array(9).fill("");
  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameActive, setGameActive] = useState(true);
  const [winningCells, setWinningCells] = useState([]);

  const handleCellClick = (index) => {
    if (board[index] === "" && gameActive) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);

      if (checkWin(newBoard)) {
        setGameActive(false);
        setWinningCells(getWinningCells(newBoard));
      } else if (newBoard.every((cell) => cell !== "")) {
        alert("It's a tie!");
        setGameActive(false);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWin = (currentBoard) => {
    return winPatterns.some(
      (pattern) =>
        currentBoard[pattern[0]] !== "" &&
        currentBoard[pattern[0]] === currentBoard[pattern[1]] &&
        currentBoard[pattern[1]] === currentBoard[pattern[2]]
    );
  };

  const getWinningCells = (currentBoard) => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        currentBoard[a] !== "" &&
        currentBoard[a] === currentBoard[b] &&
        currentBoard[b] === currentBoard[c]
      ) {
        return pattern;
      }
    }

    return [];
  };

  const handleRestartGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer("X");
    setGameActive(true);
    setWinningCells([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>XO Game</h1>
        <div className="board">
          {board.map((cell, index) => (
            <div
              key={index}
              className={`cell ${
                winningCells.includes(index) ? "winning-cell" : ""
              }`}
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {!gameActive ? (
          <button onClick={handleRestartGame}>Restart Game</button>
        ) : null}
      </header>
    </div>
  );
};

export default App;
