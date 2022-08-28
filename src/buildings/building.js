import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './building.css';
import { useState as useGlobalState } from '@hookstate/core';
import { getNiceNumber } from '../mathUtils';

export function BuildingView({config, state}) {
  const [t] = useTranslation();
  const [cost, setCost] = useState(config.cost[0].initial);
  const [canAfford, setCanAfford] = useState(false);

  var globalBuildingState = useGlobalState(state);
  var buildingState = globalBuildingState[config.id].get();
  
  useEffect(() => {
    setCost(config.cost[0].initial * Math.pow(config.cost[0].multiplier, buildingState.count));
  }, [buildingState.count, config]);

  useEffect(() => {
    setCanAfford(true); //TODO fix
  }, [cost]);

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
        disabled={!canAfford}
        onClick={() => { return globalBuildingState[config.id].count.set(buildingState.count + 1);
      }}>
        {t('buy')}{": "}{getNiceNumber(cost)}
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
