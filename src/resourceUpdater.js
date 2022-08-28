import React, { useEffect } from 'react';
import buildingData from './data/buildings.json';
import { getNiceNumber } from './mathUtils';
import globalResourceState from './globalResourceState';
import globalBuildingState from './globalBuildingState';
import { useHookstate } from '@hookstate/core';

export function ResourceUpdater() {
  const SECOND_MS = 1000;

  const buildingState = useHookstate(globalBuildingState);
  const resourceState = useHookstate(globalResourceState);

  useEffect(() => {
    const interval = setInterval(() => {
      resourceState.forEach(resource => {
        var countMaxObj = updateResourceOnInterval(buildingState.value, resource.value);
        if (countMaxObj.count !== resource.get().count) {
          resource.count.set(countMaxObj.count);
        }

        if (countMaxObj.max !== resource.get().max) {
          resource.max.set(countMaxObj.max);
        }
      });
    }, SECOND_MS);

    return () => clearInterval(interval);
  }, []);

	return (
		<div></div>
	);
}

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
