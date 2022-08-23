import React from 'react';
import ReactDOM from 'react-dom/client';
import { BuildingView } from './buildings/buildingView';
import './index.css';


function BuildingListView() {
  const sectionTitle = 'Buildings';

  return (
    <div className="gameSection">
      <div className="sectionTitle">{sectionTitle}</div>
      <div className="itemList">
        <BuildingView />
        <BuildingView />
        <BuildingView />
      </div>
    </div>
  );
}

function GameView() {
  const title = 'Incremental';

  return (
    <div className="game">
      <div className="title">{title}</div>
      <div className="gameArea">
        <BuildingListView />
        <BuildingListView />
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
