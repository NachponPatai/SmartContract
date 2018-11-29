import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import gameshop from './gameshop';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import logo from './logo.svg';
import { login, getGame, buyGame } from './Connect';
import { stat } from 'fs';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userID: null,
      owner: '',
      gamelib: [
        { id: 1, name: 'Assss', price: 1000 },
        { id: 2, name: 'Bssss', price: 200 },
        { id: 3, name: 'Cssss', price: 30 },
        { id: 4, name: 'Dssss', price: 4 },
        { id: 5, name: 'Essss', price: .5 },
        { id: 6, name: 'kuy', price: 1200.5 },
        { id: 7, name: 'bar', price: 656.5 },
        { id: 8, name: 'foo', price: 454.5 },
        { id: 9, name: 'Avalanche', price: 0.88 },
      ],
      value: '',
      term: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({
      term: e.target.value
    });
  }

  getgame(address, contractInstance) {
    getGame(address, contractInstance).then(res => {
      var state = this.state;
      state.gamelib = res.gamelib;
      console.log(state.gamelib);
      this.setState(state);
    });
  }

  login(address, password) {
    login(address, password).then(res => {
      var state = this.state;
      state.userID = address;
      this.setState(state);
    })
  }

  async componentDidMount() {
    const owner = await gameshop.methods.owner().call();
    const gamelib = await gameshop.methods.getGame().call();
    // console.log('+++', gamelib);
    this.setState(
      {
        owner
      });
  }

  render() {
    let games = this.state.gamelib;
    // console.log(games);
    return (
      <div className="App">
        <Login onLoginClicked={(address, password) => {
          this.login(address, password)
          console.log(this.state.gamelib)
          // console.log(this.state.userID)
          }
        } />

        <div>
          <h2>Welcome {this.state.userID} to Game-shop</h2>
          <p>This Contract is owner by {this.state.owner}</p>
          {/* <p>Get Game library {this.state.gamelib}</p> */}
          <hr />
          <form>
            <h4>
              Buy Game
          </h4>
            <div>
              <label>Price</label>
              <input
                value={this.state.value}
                onChange={event => this.setState({ value: event.target.value })}
              />
            </div>
            <button>Buy</button>
          </form>
        </div>
        <hr />
        <div>
          <h1>Games Library</h1>
          <SearchBar handleSearch={this.handleSearch} />
          <hr />
          <GamesLibrary
            contractInstance={this.props.contractInstance}
            gamesList={games}
            searchTerm={this.state.term}
            userAddress={this.state.userID}
          />
        </div>

      </div>
    )
  }
}

class Game extends Component {
  constructor() {
    super();
    this.state = {
      gamelib: [],
      selectedGame: {},
    }
  }

  buygame(address, selectedGame) {
    buyGame(address, selectedGame).then(res => {
      var state = this.state;
      console.log(this.props.gamesList)
      state.selectedGame = this.props.gamesList[this.props.id];
      console.log(res)
      console.log('buyGanme', state.gamelib)
    })
  }

  render() {
    let gameID = this.props.id;
    console.log(gameID)
    return (
      <div className='Game'>
        <Card>
          <CardImg top width="100%" height="384px" src={logo} />
          <CardBody>
            <CardTitle>{this.props.id} {this.props.name}</CardTitle>
            <CardSubtitle>{this.props.price}</CardSubtitle>
            <CardText>Some quick example text to build.</CardText>
            <BuyGame
              gameID={gameID}
              contractInstance={this.props.contractInstance}
              onBuyClicked={(address, selectedGameIndex) => {
                              this.buygame(address, selectedGameIndex)
                            }
              } />
          </CardBody>
        </Card>
      </div>
    )
  }
}

class GamesLibrary extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.contractInstance);
    let term = this.props.searchTerm;
    let temp;
    console.log(this.props.gamesList)
    function searchFor(term) {
      return function (temp) {
        try {
          return temp.name.toLowerCase().includes(term.toLowerCase()) || !term;
        }
        catch (err) {
          return 'Nothing found...'
        }
      }
    }

    let gamesData = this.props.gamesList.filter(searchFor(term)).map(game => {
      return (
        <Game
          gamesList={this.props.gamesList}
          contractInstance={this.props.contractInstance}
          id={game.id}
          name={game.name}
          price={game.price}
          userAddress={this.props.userAddress}
        />
      )
    });

    return (
      <div className="GamesLibrary">
        {gamesData}
      </div>
    )
  }
}

class SearchBar extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: ''
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input
          type="search"
          ref="searchBox"
          placeholder="Search for Games"
          className="search-keyword"
          onChange={this.props.handleSearch}
        />
      </div>
    )
  }
}




















































































































































































































































































class Login extends Component {
  constructor() {
    super();

    this.state = {
      userAddress: null,
      password: null
    }
  }

  render() {
    return (
      <div className="Login">
        <input className="UserAddress" type="text" placeholder="Your account address..." onChange={e => this.setState({
          userAddress: e.target.value,
        })
        } />
        <input className="Password" type="text" placeholder="Password..." onChange={e => this.setState({
          password: e.target.value,
        })
        } />
        {/* <h1>account: {this.state.userAddress}</h1> */}
        {/* <h1>password: {this.state.password}</h1> */}
        <button onClick={() => this.props.onLoginClicked(this.state.userAddress, this.state.password)}>
        Login
        </button>
      </div>
    )
  }
}

class BuyGame extends Component {
  constructor() {
    super();

    this.state = {
    }
  }

  render() {
    let selectedGameIndex = this.props.gameID;
    console.log('BuyGame', selectedGameIndex)
    let userAddress = this.props.userAddress;
    return (
      <div className="BuyGame">
        <button onClick={() => this.props.onBuyClicked(userAddress, selectedGameIndex)}>
        Buy
        </button>
      </div>
    )
  }
}

export default App;
