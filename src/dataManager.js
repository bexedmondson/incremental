import buildingData from './data/buildings.json';
import { getNiceNumber } from './mathUtils';

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

	totalCount = getNiceNumber(totalCount);
	totalMax = getNiceNumber(totalMax);

	return { "count": totalCount, "max": totalMax };
}