// import abi from './abi';
import gameShop from './gameshop';
const web3 = require('web3');
const contract = gameShop;

export const login = (address, password) => {
    return new Promise((resolve) => {
        resolve("success")
    });
}

export const signup = (password) => {
    return new Promise((resolve) => {
        resolve("success")
    });
}

export const buyGame = (address, selectedGame) => {
    return new Promise((resolve) => {
        console.log(contract.methods.buyGame(selectedGame));
        // console.log(contract.methods.buyGame(selectedGame).send({value: 0.1, from: address}));
        resolve(selectedGame)
    });
}  

export const getGame = (address,CoursetroContract) => {
    return new Promise((resolve) => {
        CoursetroContract.methods.getGame().call().then(result => {
            var libr = []
            libr.push({lib: result})
            resolve(libr)
        })
    });
}   