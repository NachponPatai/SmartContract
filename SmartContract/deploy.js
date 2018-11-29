//provider that which will specify the network to connect to and the accounts to use. 
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');
const path = require('path');
const fs = require('fs');
const solc = require('solc');
const express = require('express');
const ganache = require('ganache-cli');


var app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    next();
});


//set provider to new instance with two arguments, account pneumonic and network URL
const provider = new HDWalletProvider(
    'bounce soul jewel that twelve august castle shine disease equal unable family',
    'https://rinkeby.infura.io/v3/942ce769803d44c795f138b757ee4388'
);

//takes provider, passes it to Web3 constructor and creates new instance of web3 enabled for unlocked rinkbey network
const web3 = new Web3(provider);


//to use async await syntax, created function to deploy. 
const deploy = async () =>{
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account ', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
        //contains objects byte code and any inital arguments to pass to the contract. 
        .deploy({ data: '0x' + bytecode })
        .send({gas: '1000000', from: accounts[0]});

    console.log(interface)
    console.log('Contract deployed to ', result.options.address);
};

app.post('/login', (req, res) => {
    web3.eth.getAccounts()
        .then(accounts => {
            if (accounts.includes(req.body.address)) {
                res.sendStatus(200)
            } else {
                res.sendStatus(403)
            }
        }).catch(err => res.sendStatus(403))
})

deploy();