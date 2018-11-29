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
      userAddress: '',
      owner: '',
      gamelib: [
        { id: 1, name: 'Assss', price: 100000000000000000 },
        { id: 2, name: 'Bssss', price: 200000000000000000 },
        { id: 3, name: 'Cssss', price: 300000000000000000 },
        { id: 4, name: 'Dssss', price: 400000000000000000 },
        { id: 5, name: 'Essss', price: 500000000000000000 },
        { id: 6, name: 'kuy', price: 120005000000000000 },
        { id: 7, name: 'bar', price: 656500000000000000 },
        { id: 8, name: 'foo', price: 454500000000000000 },
        { id: 9, name: 'Avalanche', price: 88888888888888888 },
      ],
      value: '',
      term: '',
      isLoggedIn: false
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
      state.userAddress = address;
      // if(address === '') {
      //   state.isLoggedIn = true;
      //   this.setState(state);
      // }
      // else {
      //   state.isLoggedIn = false;
      //   this.setState(state);
      // }
      this.setState(state);
    })
  }

  async componentDidMount() {
    const owner = await gameshop.methods.owner().call();
    const gamelib = await gameshop.methods.getGame().call();
    console.log('+++', owner);
    this.setState(
      {
        owner,
      });
  }

  render() {
    let games = this.state.gamelib;
    console.log(this.state.owner);
    // console.log('loggedIn', this.state.isLoggedIn);
    return (
      <div className="App">
        <Login onLoginClicked={(address, password) => {
          this.login(address, password)
          // console.log(this.state.gamelib)
          // console.log(this.state.userAddress)
          }
        } />

        <div>
          <h2>Welcome {this.state.userAddress} to Game-shop</h2>
          <p>This Contract is owner by {this.state.owner}</p>
          {/* <p>Get Game library {this.state.gamelib}</p> */}
          <hr />
          {/* <form>
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
          </form> */}
        </div>
        <div>
          <h1>Games Library</h1>
          <SearchBar handleSearch={this.handleSearch} />
          <hr />
          <GamesLibrary
            contractInstance={this.props.contractInstance}
            gamesList={games}
            isLoggedIn={this.state.isLoggedIn}
            searchTerm={this.state.term}
            userAddress={this.state.userAddress}
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

  buygame(address, selectedGame, price) {
    buyGame(address, selectedGame, price).then(res => {
      var gameID = this.props.id;
      var state = this.state;
      state.selectedGame = this.props.gamesList[gameID - 1];
      console.log(res);
      console.log('+++++', address);
      console.log('buyGanme', this.state.selectedGame);
    })
  }

  render() {
    let gameID = this.props.id;
    let gamePrice = this.props.price;
    let userAddress = this.props.userAddress;
    // console.log(gameID);
    console.log(userAddress);
    return (
      <div className='Game'>
        <Card>
          <CardImg top width="100%" height="384px" src={logo} />
          <CardBody>
            <CardTitle>{this.props.id} {this.props.name}</CardTitle>
            <CardSubtitle>{this.props.price}</CardSubtitle>
            <CardText>Some quick example text to build.</CardText>
            <BuyGame
              contractInstance={this.props.contractInstance}
              gameID={gameID}
              gamePrice={gamePrice}
              isLoggedIn={this.props.isLoggedIn}
              userAddress={userAddress}
              onBuyClicked={(address, selectedGameIndex, price) => {
                              this.buygame(address, selectedGameIndex, price)
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
    console.log(this.props.gamesList);
    console.log(this.props.userAddress);
    
    let term = this.props.searchTerm;
    let temp;
    let userAddress = this.props.userAddress;

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
          userAddress={userAddress}
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
    let selectedGamePrice = this.props.gamePrice;
    console.log('BuyGame', selectedGameIndex - 1);
    console.log('gamePrice', selectedGamePrice);
    let userAddress = this.props.userAddress;
    return (
      <div className="BuyGame">
        <button onClick={() => this.props.onBuyClicked(userAddress, selectedGameIndex - 1, selectedGamePrice)}>
        Buy
        </button>
      </div>
    )
  }
}

export default App;
