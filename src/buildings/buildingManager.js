import React from 'react';
import '../index.css';
import { useTranslation } from 'react-i18next';
import { BuildingView } from './building';
import buildingData from '../data/buildings.json';
import globalBuildingState from '../globalBuildingState';
import { useState as useGlobalState } from '@hookstate/core';

export function BuildingManager() {
  const [t] = useTranslation();

  const buildingState = useGlobalState(globalBuildingState);
  
  return (
    <div className="gameSection">
      <div className="sectionTitle">{t('buildings')}</div>
      <div className="itemList">
        {buildingData.map(data => <BuildingView key={data.id} config={data} state={buildingState}/>)}
      </div>
    </div>
  );
}
