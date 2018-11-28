import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import gameshop from './gameshop';


class App extends Component {
  state = {
    owner: '',
    gamelib: [],
    value: ''
  };
  async componentDidMount(){
    const owner = await gameshop.methods.owner().call();
    const gamelib = await gameshop.methods.getGame().call();

    this.setState({owner, gamelib});
  }
  render() {
    return (
      <div>
        <h2>gameshop</h2>
        <p>This Contract is owner by {this.state.owner}</p>
        <p>Get Game library {this.state.gamelib}</p>
        <hr />
        <form>
          <h4>
            Buy Game
          </h4>
          <div>
            <label>Price </label>
            <input
              value = {this.state.value}
              onChange={event => this.setState({value: event.target.value})} 
              />
          </div>
          <button>Buy</button>
        </form>
      </div>
    );
  }
}

export default App;
