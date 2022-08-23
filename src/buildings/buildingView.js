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
      <div className="buildingInOut">
        <div>{"Wood"}</div><div>{"1"}</div>
      </div>
      <div className="buildingInOut">
        <div>{"Food"}</div><div>{"1"}</div>
      </div>
      <div className="buildingInOut">
        <div>{"Person"}</div><div>{"-1"}</div>
      </div>
      <button className="buildingBuy" onClick={() => {
        return setCount(count + 1);
      }}>
        {"Buy: "}{+(cost + Number.EPSILON).toFixed(2)}
      </button>
    </div>
  );
}
