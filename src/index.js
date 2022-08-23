import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function BuildingView() {
  const [count, setCount] = useState(0);
  const [cost, setCost] = useState(10);

  useEffect(() => {
    setCost(count * 10);
  }, [count]);

  return (
    <div className="building">
      {"Farm x"}{count}
      <div className="buildingInOut">
        <div>{"Wood"}</div><div>{"1"}</div>
        </div>
      <div className="buildingInOut">
        <div>{"Food"}</div><div>{"1"}</div>
      </div>
      <div className="buildingInOut">
        <div>{"Person"}</div><div>{"-1"}</div>
      </div>
      <button className="buildingBuy" onClick={() => {
        return setCount(count + 1);
      }}>
        {"Buy: "}{cost}
      </button>
    </div>
  );
}

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
