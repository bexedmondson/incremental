import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './building.css';
import { useState as useGlobalState } from '@hookstate/core';
import { getNiceNumber } from '../mathUtils';
import globalResourceState from '../globalResourceState';

export function BuildingView({config, state}) {
  const [t] = useTranslation();

  var initialCost = [];

  config.cost.forEach(resource => {
    initialCost.push({
      id: resource.id,
      "amount": resource.initial
    });
  });

  const [cost, setCost] = useState(initialCost);

  const recalculateCost = (cost, config, count) => {
    for (var i = 0; i < cost.length; i++) {
      var newCost = config.cost[i].initial * Math.pow(config.cost[i].multiplier, count);
      newCost = getNiceNumber(newCost);
      if (newCost !== cost[i].amount) {
        cost[i].amount = newCost;
      }
    }

    return cost;
  }
  
  const allResourceState = useGlobalState(globalResourceState);

  const canAfford = (globalResourceState, cost) => {
    var afford = true;

    cost.forEach(resourceNeeded => {
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
  
  const [canBuy, setCanBuy] = useState(canAfford(allResourceState, cost));

  var buildingState = state[config.id].get();

  useEffect(() => {
    console.log(cost);
    globalResourceState.get();
    setCanBuy(canAfford(allResourceState, cost));
  }, [allResourceState, cost]);

  return (
    <div className="building">
      {t(config.id)}{" x"}{buildingState.count}
      {config.out.length ?
        config.out.map(outData => <BuildingInOut key={outData.id} data={outData} count={buildingState.count} />)
        : ""
      }
      {config.in.length ? 
        config.in.map(inData => <BuildingInOut key={inData.id} data={inData} count={buildingState.count} />)
        : ""
      }
      <button 
        className="buildingBuy" 
        disabled={!canBuy}
        onClick={() => {
          state[config.id].count.set(buildingState.count + 1);
          setCost(recalculateCost(cost, config, buildingState.count));
      }}>
        {t('buy')}{": "}{cost[0].amount}
      </button>
    </div>
  );
}

function BuildingInOut(props) {
  const [t] = useTranslation();

  var number = getNiceNumber(props.data.rate * props.count);

  return (
    <div className="buildingInOut">
      <div>{t(props.data.id)}</div><div>{number}</div>
    </div>
  );
}


