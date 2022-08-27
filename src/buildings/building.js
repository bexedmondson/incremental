import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './building.css';

export function BuildingView(props) {
  const [t] = useTranslation();
  const [count, setCount] = useState(0);
  const [cost, setCost] = useState(props.config.cost[0].initial);

  useEffect(() => {
    setCost(props.config.cost[0].initial * Math.pow(props.config.cost[0].multiplier, count));
  }, [count, props.config]);

  return (
    <div className="building">
      {t(props.config.id)}{" x"}{count}
      {props.config.out.length ?
        props.config.out.map(outData => <BuildingInOut key={outData.id} data={outData} count={count} />)
        : ""
      }
      {props.config.in.length ? 
        props.config.in.map(inData => <BuildingInOut key={inData.id} data={inData} count={count} />)
        : ""
      }
      <button className="buildingBuy" onClick={() => {
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
