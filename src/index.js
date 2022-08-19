import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class BuildingView extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="building">
        {"Farm x"}{this.props.count}
        <div className="buildingInOut">
          <div>{"Wood"}</div><div>{"1"}</div>
          </div>
        <div className="buildingInOut">
          <div>{"Food"}</div><div>{"1"}</div>
        </div>
        <div className="buildingInOut">
          <div>{"Person"}</div><div>{"-1"}</div>
        </div>
        <button className="buildingBuy" onClick={() => this.props.onClick()}>
          {"Buy: "}{this.props.cost}
        </button>
      </div>
    );
  }
}

class BuildingListView extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
      count: 0,
      cost: 10
    };
  }

  increaseCount()
  {
    var newCount = this.state.count + 1;
    this.setState({count: newCount});
  }

  renderBuilding() {
    return <BuildingView cost={this.state.cost} count={this.state.count} onClick={() => this.increaseCount()}/>;
  }

  render() {
    const sectionTitle = 'Buildings';

    return (
      <div className="gameSection">
        <div className="sectionTitle">{sectionTitle}</div>
        <div className="itemList">
          {this.renderBuilding()}
          {this.renderBuilding()}
          {this.renderBuilding()}
        </div>
      </div>
    );
  }
}

class GameView extends React.Component {
  render() {
    const title = 'Incremental';

    return (
      <div className="game">
        <div className="title">{title}</div>
        <div className="gameArea">
          <BuildingListView />
          <BuildingListView />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GameView />);
