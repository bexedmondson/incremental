import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';
import { BuildingManager } from './buildings/buildingManager';
import { ResourceManager } from './resources/resourceManager';
import { updateResource } from './dataManager';
import globalResourceState from './globalResourceState';
import globalBuildingState from './globalBuildingState';
import { useState as useGlobalState } from '@hookstate/core';
import { useTranslation } from 'react-i18next';

function GameView() {
  const [t] = useTranslation();

  const SECOND_MS = 1000;

  const buildingState = useGlobalState(globalBuildingState);
  const resourceState = useGlobalState(globalResourceState);

  useEffect(() => {
    const interval = setInterval(() => {
      resourceState.forEach(resource => {
        var countMaxObj = updateResource(buildingState.value, resource.value);
        if (countMaxObj.count !== resource.get().count) {
          resource.count.set(countMaxObj.count);
        }

        if (countMaxObj.max !== resource.get().max) {
          resource.max.set(countMaxObj.max);
        }
      });

      //resourceState.set(updateResources(buildingState.value, resourceState.value));
    }, SECOND_MS);

    return () => clearInterval(interval);
  });

  return (
    <div className="game">
      <div className="title">{t('incremental')}</div>
      <div className="gameArea">
        <BuildingManager />
        <ResourceManager />
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
