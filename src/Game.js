import React from 'react';
import logo from './logo.svg';
import Board from './Board';
import './App.css';

class Game extends React.Component {
  constructor(){
    super();

    this.state = {
      cells: Array(9).fill(null),
      stepCounter: 1,
      whoNext: 'X',
      winner: null
    }
  }

  handleClick = (index) => {
    let {cells, whoNext, stepCounter, winner} = this.state;
    cells = [...cells];
    if(cells[index] || winner) {
      return
    }
    cells[index] = whoNext;
    winner = getWinner(cells);
    whoNext = whoNext === 'X' ? '0' : 'X';
    stepCounter = stepCounter + 1;
    this.setState({
      cells,
      whoNext,
      stepCounter,
      winner
    })
  }

  resetGame = () => {
    this.setState({
      cells: Array(9).fill(null),
      stepCounter: 1,
      whoNext: 'X',
      winner: null
    })
  }

  renderReset = (winner, stepCounter) => {
    if (winner || stepCounter === 10) {
      return <button onClick={this.resetGame}>New Game</button> 
    }
  }

  render() {
    const {cells, whoNext, winner, stepCounter} = this.state;
    let gameStatus;
    if (winner) {
      gameStatus = `Player ${winner} wins!`
    } else if (stepCounter === 10) {
      gameStatus = 'It is a DRAW!';
    } else {
      gameStatus = `Player ${whoNext} moves`
    }
    return (
      <div className="App">
        <h1>Tic Tac Toe, step: {stepCounter}</h1>
        <h3>{gameStatus}</h3>
        {
          this.renderReset(winner, stepCounter)
        }
        
      <Board cells={cells} onCellClicked={this.handleClick} />  
      </div>
    );
  }
}

function getWinner(cells) {
  const winLines = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  const [winCombo] = winLines.filter((combo) => {
    let [a,b,c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[b] === cells[c]
  })
  if (winCombo){
  return cells[winCombo[0]];
} else {
  return null;
}
}

export default Game;
