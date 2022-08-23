import React, { useState, useEffect } from 'react';
import './building.css';

export function BuildingView() {
  const [count, setCount] = useState(0);
  const [cost, setCost] = useState(10);

  useEffect(() => {
    setCost(count * 10);
  }, [count]);

  return (
    <div className="building">
      {"Farm x"}{count}
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
        {"Buy: "}{cost}
      </button>
    </div>
  );
}
