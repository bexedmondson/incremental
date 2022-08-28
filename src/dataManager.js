import React from 'react';
import buildingData from './data/buildings.json';


export function updateResources(buildingState, resourceState) {

	console.log(resourceState);
	resourceState.wood = resourceState.wood + 1;

	return resourceState;
}

export function updateResource(buildingState, resourceState) {
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

	return { "count": totalCount, "max": totalMax };
}