import gameShop from './gameshop';
import gameshop from './gameshop';

export const login = (address, password) => {
    return new Promise((resolve) => {
        resolve("success")
    });
}

// export const signup = (password) => {
//     return new Promise((resolve) => {
//         resolve("success")
//     });
// }

export const buyGame = (address, selectedGameIndex, price) => {
    return new Promise((resolve) => {
        console.log(selectedGameIndex);
        console.log('------', price);
        const Con = gameShop
        Con.methods.buyGame(selectedGameIndex).send({value: price, from: address}).then((res)=>{
            console.log("success :" ,res)
        }).catch(err => {
            console.log("Fail :",err)
        })
        // console.log();
        resolve(selectedGameIndex)
    });
}

export const getGame = (address) => {
    return new Promise((resolve) => {
        console.log('getGame', address);
        console.log('getGame', gameshop.address);

        // let contract = new web3.eth.Contract([{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"games","outputs":[{"name":"name","type":"string"},{"name":"price","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getGame","outputs":[{"name":"","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"index","type":"uint256"}],"name":"buyGame","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}], address.toString());
        // console.log('contractInstance', contract)
        gameshop.methods.getGame().call({from: address, to: gameshop.address}).then(res => {
            resolve(res);
            console.log('Connect: getGame', res)
        })
    });
} 