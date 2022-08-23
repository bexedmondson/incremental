import React from 'react';
import '../index.css';
import { BuildingView } from './buildingView';
import buildingData from '../data/buildings.json';

export function BuildingManager() {
  const sectionTitle = 'Buildings';

  return (
    <div className="gameSection">
      <div className="sectionTitle">{sectionTitle}</div>
      <div className="itemList">
        {buildingData.map(data => <BuildingView key={data.name} config={data}/>)}
      </div>
    </div>
  );
}
