import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './building.css';

export function BuildingView({config}) {
  const [t] = useTranslation();
  const [count, setCount] = useState(0);
  const [cost, setCost] = useState(config.cost[0].initial);
  const [canAfford, setCanAfford] = useState(false);

  useEffect(() => {
    setCost(config.cost[0].initial * Math.pow(config.cost[0].multiplier, count));
  }, [count, config]);

  useEffect(() => {
    setCanAfford(true); //TODO fix
  }, [cost]);

  return (
    <div className="building">
      {t(config.id)}{" x"}{count}
      {config.out.length ?
        config.out.map(outData => <BuildingInOut key={outData.id} data={outData} count={count} />)
        : ""
      }
      {config.in.length ? 
        config.in.map(inData => <BuildingInOut key={inData.id} data={inData} count={count} />)
        : ""
      }
      <button 
        className="buildingBuy" 
        disabled={!canAfford}
        onClick={() => {
          return setCount(count + 1);
          }}>
        {t('buy')}{": "}{+(cost + Number.EPSILON).toFixed(2)}
      </button>
    </div>
  );
}

function BuildingInOut(props) {
  const [t] = useTranslation();

  var number = +(props.data.num * props.count + Number.EPSILON).toFixed(2);

  return (
    <div className="buildingInOut">
      <div>{t(props.data.id)}</div><div>{number}</div>
    </div>
  );
}
