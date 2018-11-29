import abi from './abi'
const web3 = require('web3');

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
        var CoursetroContract = new web3.eth.Contract(abi, address);
        console.log(CoursetroContract.abi)
        CoursetroContract.methods.buyGame(selectedGame).send({value: 0.1, from: address})
        resolve("resolve")
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