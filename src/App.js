import React, { Component } from 'react';

import Stations from './components/Stations/Stations';
import Filter from './components/Filter/Filter';
import { getStations } from './service/Points';

import './App.css';

class App extends Component {

  state = {
    names: []
  };

  dirrection = 1;

  componentDidMount = () => {
    getStations()
      .then((stationNames) => {
        return this.setState({ names: stationNames, initialized: true });
      });
  }

  sort = () => {
    const newNames = this.state.names;
    this.setState({
      names: newNames.sort((a, b) => {
        if (a === b) { return 0; }
        return a > b ? this.dirrection : this.dirrection * -1;
      })
    })

    this.dirrection = this.dirrection * -1
  }

  render() {
    if (!this.state.initialized) { return null; }
    return (
      <div className="App">
        <Filter sort={this.sort} />
        <Stations names={this.state.names} />
      </div>
    );
  }
}

export default App;
