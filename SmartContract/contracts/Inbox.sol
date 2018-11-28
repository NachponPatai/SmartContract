pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;
 
 
contract Inbox{
   
    address public owner;
    mapping (address=>bool[]) gamelib;
   
    struct Game{
        string name;
        uint price;
    }
   
    Game[10] public games;
   
    constructor() public {
        owner = msg.sender;
        games[0].name = "Artifact";
        games[0].price = 10 ether;
        games[1].name = "Dota2";
        games[1].price = 1 ether;
        games[2].name = "LoL";
        games[2].price = 0.5 ether;
        games[3].name = "HoN";
        games[3].price = 0.2 ether;
        games[4].name = "Remix";
        games[4].price = 4 ether;
        games[5].name = "Creed";
        games[5].price = 0.8 ether;
        games[6].name = "RoV";
        games[6].price = 0.9 ether;
        games[7].name = "CSGO";
        games[7].price = 0.4 ether;
        games[8].name = "Overwatch";
        games[8].price = 1.5 ether;
        games[9].name = "EverPlanet";
        games[9].price = 0.5 ether;
    }
   
       
   
    function buyGame(uint index) public payable{
        Game storage game = games[index];
        require(msg.value >= game.price);
        owner.send(msg.value);
        if (gamelib[msg.sender].length == 0) {
            bool[10] lib;
            for(uint i = 0;i < lib.length; i++){
                lib[i] = false;
            }
            lib[index] = true;
            gamelib[msg.sender] = lib;
        } else {
            gamelib[msg.sender][index] = true;
        }
    }
   
    function getGame() public view returns (string[]) {
        string[] memory lib = new string[](10);
        for (uint i = 0; i < gamelib[msg.sender].length; i++) {
            if (gamelib[msg.sender][i]) {
                lib[i] = games[i].name;
            }
        }
       
        return (lib);
    }
   
}