import { createState } from '@hookstate/core';
import buildingData from './data/buildings.json';

const initialState = {};

buildingData.forEach(building => {
  initialState[building.id] = {
		"count": 0
	};
});

const globalBuildingState = createState(initialState);

export default globalBuildingState;