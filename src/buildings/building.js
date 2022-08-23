import React, { useState, useEffect } from 'react';
import './building.css';

export function BuildingView(props) {
  const [count, setCount] = useState(0);
  const [cost, setCost] = useState(props.config.cost[0].initial);

  useEffect(() => {
    setCost(props.config.cost[0].initial * Math.pow(props.config.cost[0].multiplier, count));
  }, [count, props.config]);

  return (
    <div className="building">
      {props.config.name}{" x"}{count}
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
        {"Buy: "}{+(cost + Number.EPSILON).toFixed(2)}
      </button>
    </div>
  );
}

function BuildingInOut(props) {
  var number = +(props.data.num * props.count + Number.EPSILON).toFixed(2);

  return (
    <div className="buildingInOut">
      <div>{props.data.id}</div><div>{number}</div>
    </div>
  );
}
