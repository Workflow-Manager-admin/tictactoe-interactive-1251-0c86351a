import React, { useState } from 'react';
import './TicTacToe.css';

// PUBLIC_INTERFACE
const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  
  /**
   * Calculates the winner of the game by checking all possible winning combinations
   * @param {Array} squares - The current state of the game board
   * @returns {string|null} - Returns 'X' or 'O' if there's a winner, null otherwise
   */
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  /**
   * Checks if the game is a draw (all squares filled with no winner)
   * @param {Array} squares - The current state of the game board
   * @returns {boolean} - True if game is a draw, false otherwise
   */
  const isDraw = (squares) => {
    return squares.every(square => square !== null);
  };

  /**
   * Handles a player's move when a square is clicked
   * @param {number} index - The index of the clicked square
   */
  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  /**
   * Resets the game to its initial state
   */
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const draw = !winner && isDraw(squares);
  let status;
  
  if (winner) {
    status = <span>Winner: <span className={`player-${winner.toLowerCase()}`}>{winner}</span></span>;
  } else if (draw) {
    status = "Game is a draw!";
  } else {
    status = <span>Next player: <span className={`player-${xIsNext ? 'x' : 'o'}`}>{xIsNext ? 'X' : 'O'}</span></span>;
  }

  return (
    <div className="game-container">
      <div className="game-info">
        <div className="status">{status}</div>
      </div>
      <div className="game-board">
        {squares.map((square, index) => (
          <button
            key={index}
            className={`square ${square ? 'clicked' : ''}`}
            onClick={() => handleClick(index)}
          >
            <span className={`player-${square?.toLowerCase()}`}>{square}</span>
          </button>
        ))}
      </div>
      <button className="btn btn-large" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
};

export default TicTacToe;
