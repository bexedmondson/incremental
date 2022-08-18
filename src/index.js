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
      <div className="buildingInfo">
      <button className="building" onClick={() => this.props.onClick()}>
        {this.props.count}
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
      count: 0
    };
  }

  increaseCount()
  {
    var newCount = this.state.count + 1;
    this.setState({count: newCount});
  }

  renderBuilding() {
    return <BuildingView count={this.state.count} onClick={() => this.increaseCount()}/>;
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
