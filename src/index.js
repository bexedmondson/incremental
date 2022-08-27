import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';
import { BuildingManager } from './buildings/buildingManager';
import { useTranslation } from 'react-i18next';

function GameView() {
  const [t] = useTranslation();

  return (
    <div className="game">
      <div className="title">{t('incremental')}</div>
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
root.render(
  <React.Suspense fallback="loading...">
    <GameView />
  </React.Suspense>
);
