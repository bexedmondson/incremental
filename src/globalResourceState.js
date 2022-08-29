import { createState } from '@hookstate/core';
import resourceData from './data/resources.json';
import globalBuildingState from './globalBuildingState';
import { getNiceNumber } from './mathUtils';
import buildingData from './data/buildings.json';

const initialState = [];

resourceData.forEach(resource => {
  initialState.push({
    id: resource.id,
    count: 0,
    max: 0
  });
});

const globalResourceState = createState(initialState);

export default globalResourceState;

const SECOND_MS = 1000;

setInterval(() => {
  globalResourceState.forEach(resource => {
    var countMaxObj = updateResourceOnInterval(globalBuildingState.value, resource.value);
    if (countMaxObj.count !== resource.get().count) {
      resource.count.set(countMaxObj.count);
    }

    if (countMaxObj.max !== resource.get().max) {
      resource.max.set(countMaxObj.max);
    }
  });
}, SECOND_MS);


function updateResourceOnInterval(buildingState, resourceState) {
	var totalCount = resourceState.count;
	var totalMax = 0;
	
	buildingData.forEach(building => {
		var count = buildingState[building.id].count;
		building.out.forEach(out => {
			if (out.id === resourceState.id) {
				totalCount += count * out.rate;
			}
		});

		building.store.forEach(store => {
			if (store.id === resourceState.id) {
				totalMax += count * store.amount;
			}
		});
	});

	totalCount = Math.min(totalCount, totalMax);

	totalCount = getNiceNumber(totalCount);
	totalMax = getNiceNumber(totalMax);

	return { "count": totalCount, "max": totalMax };
}
