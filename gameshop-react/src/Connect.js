import gameShop from './gameshop';
import web3 from './web3'
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

export const buyGame = (address, selectedGameIndex, price) => {
    return new Promise((resolve) => {
        console.log(selectedGameIndex);
        console.log('------', price);
        
        // web3.eth.sendTransaction({
        //     from: address ,
        //     to: '0x25EEcD8F45B7813B340ad6ce6A0DDE6ce703311C',
        //     value: price
        // })
        const Con = gameShop
        console.log("CON is :",Con)
        Con.methods.buyGame(selectedGameIndex).send({value: price, from: address}).then((res)=>{
            console.log("success :" ,res)
        }).catch(err => {
            console.log("Fail :",err)
        })
        // console.log();
        resolve(selectedGameIndex)
    });
} 

export const GiveGame = (selectedGameIndex,address) => {
    return new Promise((resolve) => {

        // console.log();
        resolve(selectedGameIndex)
    });
}

export const getGame = (address,CoursetroContract) => {
    return new Promise((resolve) => {
        console.log("kuyyyyyyyyyyyyyyy",address)
        let Contract = new web3.eth.Contract([
            {
                "constant": true,
                "inputs": [
                    {
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "name": "games",
                "outputs": [
                    {
                        "name": "name",
                        "type": "string"
                    },
                    {
                        "name": "price",
                        "type": "uint256"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "getGame",
                "outputs": [
                    {
                        "name": "",
                        "type": "string[]"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": true,
                "inputs": [],
                "name": "owner",
                "outputs": [
                    {
                        "name": "",
                        "type": "address"
                    }
                ],
                "payable": false,
                "stateMutability": "view",
                "type": "function"
            },
            {
                "constant": false,
                "inputs": [
                    {
                        "name": "index",
                        "type": "uint256"
                    }
                ],
                "name": "buyGame",
                "outputs": [],
                "payable": true,
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "payable": false,
                "stateMutability": "nonpayable",
                "type": "constructor"
            }
        ],address)
        console.log("address :",Contract.options.address)
        Contract.methods.getGame().call().then(res => {
            resolve(res)
        })
    });
} 