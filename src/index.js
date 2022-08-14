import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {

  #callback;

  constructor(props) {
    super(props);

    this.#callback = props.callback;

    this.state = {
      value: null
    };
  }

  logClick() {
    console.log('click');
  }

  render() {
    return (
      <button className="square" onClick={this.#callback}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {

  #count = 0;
  #increaseCount = () => {
    this.increaseCount();
  }


  increaseCount()
  {
    count ++;
  }

  renderSquare(i) {
    return <Square count={this.count} callback={this.#increaseCount}/>;
  }

  render() {
    const status = 'Incremental';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(this.#count)}
          {this.renderSquare(0)}
          {this.renderSquare(0)}
        </div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(0)}
          {this.renderSquare(0)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
