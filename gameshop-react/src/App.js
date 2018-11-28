import React, { Component } from 'react';
import './App.css';
import web3 from './web3';
import gameshop from './gameshop';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import logo from './logo.svg';


class App extends Component {
  constructor() {
    super();
    this.state = {
      owner: '',
      gamelib: [
        { id: 1, name: 'Assss', price: 1000 },
        { id: 2, name: 'Bssss', price: 200 },
        { id: 3, name: 'Cssss', price: 30 },
        { id: 4, name: 'Dssss', price: 4 },
        { id: 5, name: 'Essss', price: .5 },
        { id: 6, name: 'Antivist', price: 1200.5},
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

  async componentDidMount() {
    // const owner = await gameshop.methods.owner().call();
    // const gamelib = await gameshop.methods.getGame().call();
    // console.log('+++', gamelib);
    // this.setState(
    //   {
    //     owner,
    //     gamelib
    //   });
  }

  render() {
    let games = this.state.gamelib;
    console.log(games);
    return (
      <div>
        <h2>gameshop</h2>
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

        <div>
          <h1>Digital Store</h1>
          <SearchBar handleSearch={this.handleSearch} />
          <GamesLibrary
            gamesList={games}
            searchTerm={this.state.term}
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
      selectedGame: {},
    }
  }

  render() {
    return (
      <div className='Game'>
        <Card>
            <CardImg top width="360" src={logo} />
            <CardBody>
              <CardTitle>{this.props.id} {this.props.name}</CardTitle>
              <CardSubtitle>{this.props.price}</CardSubtitle>
              <CardText>Some quick example text to build.</CardText>
              <Button>Button</Button>
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
    let term = this.props.searchTerm;
    let temp;

    function searchFor(term) {
      return function (temp) {
        try {
          return temp.name.toLowerCase().includes(term.toLowerCase()) || !term;
        }
        catch (err) {

        }
      }
    }

    let gamesData = this.props.gamesList.filter(searchFor(term)).map(game => {
      return (
        <Game
          id={game.id}
          name={game.name}
          price={game.price}
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

export default App;
