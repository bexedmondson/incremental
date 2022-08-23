import React from 'react';
import '../index.css';
import { BuildingView } from './buildingView';

export function BuildingManager() {
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
