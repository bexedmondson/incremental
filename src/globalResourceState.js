import { createState } from '@hookstate/core';
import resourceData from './data/resources.json';

const initialState = [];

resourceData.forEach(resource => {
  initialState.push({
    id: resource.id,
    "count": 0,
    "max": 0
  });
});

const globalResourceState = createState(initialState);

export default globalResourceState;

export function canAfford(cost) {
  var afford = true;

  cost.forEach(resourceNeeded => {
    //console.log(resourceNeeded.id);
    //console.log(globalResourceState);
    var resourceState = globalResourceState.get().find(x => x.id === resourceNeeded.id);
    if (resourceState == null)
    {
      console.log("State not found for resource id " + resourceNeeded.id);
      return false;
    }
    if (resourceState.count < resourceNeeded.amount) {
      afford = false;
    }
  });

  return afford;
}