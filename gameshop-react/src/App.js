import React, { Component } from 'react';
import './App.css';
import gameshop from './gameshop';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import logo from './logo.svg';
import { login, getGame, buyGame } from './Connect';
import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      userAddress: '',
      owner: '',
      gamelib: [
        { id: 1, name: 'Artifact', price: 20000000000000000, image: '' },
        { id: 2, name: 'Dota2', price: 10000000000000000, image: '' },
        { id: 3, name: 'LoL', price: 10000000000000000, image: '' },
        { id: 4, name: 'HoN', price: 10000000000000000, image: '' },
        { id: 5, name: 'Remix', price: 30000000000000000, image: '' },
        { id: 6, name: 'Creed', price: 30000000000000000, image: '' },
        { id: 7, name: 'RoV', price: 20000000000000000, image: '' },
        { id: 8, name: 'CSGO', price: 10000000000000000, image: '' },
        { id: 9, name: 'Overwatch', price: 20000000000000000, image: '' },
        { id: 10, name: 'Everplanet', price: 10000000000000000, image: '' },
      ],
      value: '',
      term: '',
      isLoggedIn: false,
      userPlayable: []
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    this.setState({
      term: e.target.value
    });
  }

  getgame(address) {
    getGame(address).then(res => {
      console.log("res:", res);
      var state = this.state;
      state.userPlayable = res;
      this.setState(state);
      console.log(this.state.userPlayable);
    });
  }

  login(address, password) {
    login(address, password).then(res => {
      var state = this.state;
      state.userAddress = address;
      this.setState(state);
    })
  }

  async componentWillMount() {
    const owner = await gameshop.methods.owner().call();
    const userGamesLib = await gameshop.methods.getGame().call();
    // console.log('userGameLib', userGamesLib);
    this.setState(
      {
        owner,
        userPlayable: userGamesLib,
      });
  }

  render() {
    let games = this.state.gamelib;
    let userAddress = this.state.userAddress;
    console.log("in main app", userAddress);
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="3"></Col>
            <Col xs="auto">
              <Login onLoginClicked={(address, password) => {
                this.login(address, password)
              }} />
              <hr />

              <div>
                <h2>Welcome {this.state.userAddress} to Game-shop</h2>
                <p>This Contract is owned by {this.state.owner}</p>
              </div>
              <hr />

              <div>
                <h1>User's Games Library</h1>
                <GetGame
                  userAddress={userAddress}
                  onGetGameClicked={(address) => {
                    console.log("see address", address);
                    this.getgame(address)
                  }} />
              </div>
            </Col>
            <Col xs="3"></Col>
          </Row>
          <Row>
            <Col xs="6">
              <UserGamesLibrary
                userAddress={this.state.userAddress}
                userPlayableList={this.state.userPlayable}
                gamesList={games}
              />
              <hr />
            </Col>
            <Col xs="6">
              <div>
                <h1>Games Library</h1>
                <SearchBar handleSearch={this.handleSearch} />
                <GamesLibrary
                  gamesList={games}
                  isLoggedIn={this.state.isLoggedIn}
                  searchTerm={this.state.term}
                  userAddress={this.state.userAddress}
                />
              </div></Col>
          </Row>
        </Container>
      </div>
    )
  }
}

class UserGamesLibrary extends Component {
  render() {
    let userPlayable = this.props.userPlayableList;
    let gamesList = this.props.gamesList;
    let userAddress = this.props.userAddress;

    let userPlayableList = userPlayable.map((game, index) => {
      if (game) {
        return gamesList[index];
      }
    }).filter(Boolean);

    console.log('userPlayableGames', userPlayableList);

    let userGamesData = userPlayableList.map((game) => {
      if (userPlayableList !== undefined) {
        return (
          <UserGame
            gamesList={userPlayableList}
            id={game.id}
            name={game.name}
            price={game.price}
            userAddress={userAddress}
          />
        )
      }
      else {
        return <Undefined />
      }
    });

    return (
      <div className="GamesLibrary" >
        {userGamesData}
      </div>
    )
  }
}

class Undefined extends Component {
  render() {
    return (<div></div>)
  }
}

class UserGame extends Component {
  constructor() {
    super();
    this.state = {
      gamelib: [],
      selectedGame: {},
    }
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
          <CardImg top width="320px" height="384px" src={logo} />
          <CardBody>
            <CardTitle>Owned: {this.props.name}</CardTitle>
            <CardSubtitle>Play now</CardSubtitle>
            <CardText>Description</CardText>
          </CardBody>
        </Card>
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
            <CardTitle>{this.props.id}: {this.props.name}</CardTitle>
            <CardSubtitle>Price: {this.props.price}</CardSubtitle>
            <CardText>Description</CardText>
            <BuyGame
              contractInstance={this.props.contractInstance}
              gameID={gameID}
              gamePrice={gamePrice}
              isLoggedIn={this.props.isLoggedIn}
              userAddress={userAddress}
              onBuyClicked={(address, selectedGameIndex, price) => {
                this.buygame(address, selectedGameIndex, price)
              }} />
          </CardBody>
        </Card>
      </div>
    )
  }
}

class GamesLibrary extends Component {
  render() {
    // console.log(this.props.contractInstance);
    console.log('gameLib', this.props.gamesList);
    // console.log(this.props.userAddress);

    let term = this.props.searchTerm;
    let temp;
    let userAddress = this.props.userAddress;

    function searchFor(term) {
      return function (temp) {
        try {
          return temp.name.toLowerCase().includes(term.toLowerCase()) || !term;
        }
        catch (err) {
          console.log(err);
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
          image={this.props.image}
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

class GetGame extends Component {
  constructor() {
    super();

    this.state = {
    }
  }
  render() {
    let userAddress = this.props.userAddress;
    console.log("In component", userAddress)
    return (
      <div>
        <button onClick={() => this.props.onGetGameClicked(userAddress)}>Get Game</button>
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
