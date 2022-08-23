import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BuildingManager } from './buildings/buildingManager';

function GameView() {
  const title = 'Incremental';

  return (
    <div className="game">
      <div className="title">{title}</div>
      <div className="gameArea">
        <BuildingManager />
        <BuildingManager />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
      </div>
    </div>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GameView />);
