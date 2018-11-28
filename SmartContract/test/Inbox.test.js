
const assert = require('assert');
const ganache = require('ganache-cli');

const Web3 = require('web3');

const provider = ganache.provider();
const web3 = new Web3(provider);

const {interface , bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () =>{

   accounts = await web3.eth.getAccounts()
        

    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({data: bytecode})
        .send({from: accounts[0], gas: '3000000'});

    inbox.setProvider(provider);
});


describe('Inbox', () =>{
    it('deploys a contract', () =>{
        assert.ok(inbox.options.address);
    });

    it('check first game in library', async () => {
        const construct = await inbox.methods.getGame().call();
        assert.equal(construct[0],'\u0002`');
    });

    it('check games in library except first game', async () => {
        const lib = await inbox.methods.getGame().call();
        assert.equal(lib[1],'');
        assert.equal(lib[2],'');
        assert.equal(lib[3],'');
        assert.equal(lib[4],'');
        assert.equal(lib[5],'');
        assert.equal(lib[6],'');
        assert.equal(lib[7],'');
        assert.equal(lib[8],'');
        assert.equal(lib[9],'');
    });

    it('test buyGame 4', async () => {
        const buyer = await inbox.methods.buyGame(4).send({
            from: accounts[0],
            value: web3.utils.toWei('4','ether'),
            gas: '300000'
        });
    });

    it('test buyGame 7', async () => {
        const buyer = await inbox.methods.buyGame(7).send({
            from: accounts[0],
            value: web3.utils.toWei('0.4','ether'),
            gas: '300000'
        });
    });

    it('not enough money', async () => {
        let e;
        try{
            const buyer = await inbox.methods.buyGame(0).send({
                from: accounts[0],
                value: web3.utils.toWei('4','ether'),
                gas: '300000'
            });
            console.log(buyer);
        }catch(err){
            console.log("test 6 :Not enough money OK!!");
            e = err;
        };
        assert(e);
    })
});