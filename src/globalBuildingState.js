import { createState } from '@hookstate/core';
import { createState } from '@hookstate/core';
import buildingData from '../data/buildings.json';

const initialState = [];

buildingData.forEach(building => {
  var id = building.id;
  initialState = initialState.push({
    [id]: 0
  });
});

const globalBuildingState = createState(initialState);

export default globalBuildingState;