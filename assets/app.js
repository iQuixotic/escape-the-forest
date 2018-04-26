var inquirer = require("inquirer");

var prints_ = require('./prints.js')

var map_ = require('./map.js');

var movement_ = require('./movementFuncs.js');

// var enemyConstructor_ = require('./enemyConstructor')

const chalk = require('chalk');

// function theEverythingLivesHere(){
 
function characterCreator(name, type, attack, defense) {
    this.name=name;
    this.type=type;
    this.attack=attack;
    this.defense=defense;
    this.hitTheTarget = function(){
        exports.enemyArr[0].hp -= attack;
        exports.enemyArr[0].defense -= attack;
        console.log('');
       return exports.enemyArr[0].defense;
    }
}

// r is for recursive counter
exports.enemyArr = [];
exports.party = [];

let organicLifeForms= function() {
    console.log('here i is');
    // return enemyArr;
    return exports.party;
    playGame();
};

let tileNum =function() {
    return tile;
    playGame();
};

let r=0;
let attack, hp;


let selectParty = function () {

    console.log("\nNEW PLAYER!\n");
    inquirer.prompt([{
        type: "input",
        name: "name",
        message: "What's your name: "
    }, {
        type: "list",
        name: "clasS",
        message: "Select a class: \n \n   Mole-person has 15 att 150 hp \n      Has the ability to skip a tile in 1 direction twice. \n\n   Cat-Wizard" + 
        "has 30 att and 80 hp \n \n      Has the ability to create a portal (checkpoint) \n" + "\n   Brawler has 25 att and 250hp \n      Is OP as hell \n \n" +
          "   Corrupt Priest has 10 att and 220hp \n      Can use healing ability \n\n",
        choices: ["Mole-person", "Cat-wizard", "Brawler", "Corrupt Priest"]

    }]).then(function (partyMember) {
     
        if (partyMember.clasS === 'Mole-person') {

            attack = 15;
            hp = 170;
        } else if (partyMember.clasS === 'Cat-wizard') {

            attack = 39;
            hp = 100;
        } else if (partyMember.clasS === 'Brawler') {


            attack = 25;
            hp = 250;
        } else if (partyMember.clasS === 'Corrupt Priest') {

            attack = 10;
            hp = 230;
        }
       
        var partyMem = new characterCreator(partyMember.name, partyMember.clasS, attack,
            hp);

            exports.party.push(partyMem);
            console.log(exports.party[0]);
            console.log(partyMember.name + " added to the party");
            // console.log(partyMember);
            // console.log(partyMem);
    
            r++;
            if(r<2){
            selectParty();
            } else {
                console.log('You have selected the ' + exports.party[0].type + ' named ' + exports.party[0].name + 
                ' and the ' + exports.party[1].type + ' named ' + exports.party[1].name + ' to attempt a forest escape together. \n');
                inquirer.prompt(                     
                    {
                      type: "confirm",
                      name: "start",
                      message: "Do you want to continue with these selections ?"
                    }).then(function(user) {
                    if(user.start){
                console.log('Good Luck !!!');
                prints_.printStatus();
                r=0;
                // organicLifeForms();
                playGame();
                // console.log(party);
                    } else if(!user.start){
                        r=0;
                        exports.party = [];
                       
                        selectparty();
                    }
                });
            }
    });   
}



let critChance, coinflip;

function enemyConstruct(name, attack, defense) {
    this.name=name;
    this.attack=attack;
    this.defense=defense;
    this.hitTheTarget = function(){
        // let coinflip = (Math.floor(Math.random() * 2) );
        allTheRandomness.coinfliper();
        exports.party[coinflip].defense -= attack;
        console.log('');
        return exports.party[coinflip].defense;
    }
}

let wolfExists = false;
endGame = false;

function playGame() {
        prints_.printStatus();
        escapedOrNot();
   
    if (!endGame && wolfExists === false) {
        
        inquirer.prompt(
            {
                type: "list",
                name: "todo",
                message: "You are lost in the woods. What would you like to do?",
                choices: ["Go Right", "Go Left", "Go Up", "Go Down", "Check Inventory"]
            }).then(function (player) {
                switch (player.todo) {
                    case 'Go Right':
                        console.log('you went right');
                        movement_.goRight();
                        // console.log(facing)
                        console.log(tile);

                        break;
                    case 'Go Left':
                        console.log('you went left');
                        movement_.goLeft();
                        // console.log(facing)
                        console.log(tile);
                       
                        break;
                    case 'Go Up':
                        console.log('you went up');
                        movement_.goForward();
                        // console.log(facing)
                        console.log(tile);

                        
                        break;
                    case 'Go Down':
                        console.log('you went down');
                        movement_.goBack();
                        // console.log(facing)
                        console.log(tile);

                        break;
                    case 'Check Inventory':
                        console.log('');
                        checkI();
                        break;
                    default:
                        def();
                }
                console.log('this is tile#' + tile);
                checkForWolves();

                if( player.todo !=='Check Inventory' && wolfExists === false){
                r++;
                console.log('Score: ' + r + '        (Lower is better)');
                playGame();
                }
            });
    }
}

// a recursive function for battles that calls playGame() once the battle is over
function fight() {

    gameOver();
    if (!endGame && exports.enemyArr[0].defense > 0 && exports.enemyArr[0].name !== undefined){
         firstFightQuestion();
    } 
    if(exports.enemyArr[0].defense <= 0) {
        console.log('The enemy was defeated !!')
        exports.enemyArr.pop();
        wolfExists = false;
        playGame();
    }
}

// function for first fight question
function firstFightQuestion(){
    inquirer.prompt({
        type: "list",
        name: "whatDo",
        message: exports.enemyArr[0].name + ' is ready to attack. What will you do ?',
        choices: ['Fight', 'Run']
      }).then(function(answers) {
        
          if(answers.whatDo !== 'Fight'){
              exports.enemyArr.pop();
              wolfExists=false;
              playGame();
          } else{
              secondFightQuestion();
          }
        });
}

// function for second fight question
function secondFightQuestion() {
    inquirer.prompt({
        type: "list",
        name: "whatDoNext",
        message: 'FIGHT !!!\n',
        choices: ['Attack', 'Inventory']
    }).then(function (answers) {
        if (answers.whatDoNext === 'Attack') {
            prints_.printFight();

            exports.party[0].hitTheTarget();
            exports.party[1].hitTheTarget();
            exports.enemyArr[0].hitTheTarget();
            fight();
        } else if (answers.whatDoNext === 'Inventory') {
            inventoryCheck();
        }
    });
}
let userOf;
let hasItemUser=false;
// Asks a question to determine who the inv item would be used on
function pickItemUser(){
    inquirer.prompt({
        type: "list",
        name: "itemUseOnWho",
        message: 'Who will you use the item on ?',
        choices: [exports.enemyArr[0].name, exports.party[0].name, exports.party[1].name]
      }).then(function(answers) {
        
          if(answers.itemUseOnWho === exports.enemyArr[0].name){
            userof = exports.party[1].defense;
          } else if (answers.itemUseOnWho === exports.party[0].name){
            userof = exports.party[1].defense;
          }else if (answers.itemUseOnWho === exports.party[1].name){
               userof = exports.party[1].defense;
          }
          hasItemUser=true;
        });
       
}

 // all the logic for a random wolf battle
function checkForWolves(){
   
    let wolfSpawnChance = (Math.floor(Math.random() * 10) + 1);
    console.log('');
    if(tile>1 && tile<35 && wolfSpawnChance>9){
        console.log('A wild wolf appeared !!' );
        console.log('');
        wolfExists = true;
    } if (wolfExists){
        let wolf = new enemyConstruct('wolf', 20, 200);
        exports.enemyArr.push(wolf);
        fight();
    }
}

// function for checking inventory and using an item
function checkI() {
    inquirer.prompt({
        type: "rawlist",
        name: "inventory",
        message: "What would you like to use?",
        choices: ["Map", "Rusty Axe", "Revolver", "salt", "dirty socks", "Magic Wand"]
    }).then(function (player) {
        if (player.inventory === "Map") {
            map_.showTheMap();
            playGame();
        }
    });
}

//check for a win state
function escapedOrNot(){
    if (tile === 36){
        endGame = true;
        console.log('Whew, you made it out in '+ r + ' turns !!!');
    }
}

// Checks to see if all party members health equals zero
function gameOver(){
    if(exports.party[0].defense <= 0 && exports.party[1].defense <= 0){
        console.log('----------------------------------');
        console.log('');
        console.log('          Love is Over');
        console.log('');
        console.log('----------------------------------');
        endGame = true;
        return 0;
    }
}



exports.facing = 'north'













let allTheRandomness = {
    critChance: (Math.floor(Math.random() * 100) + 1),
    coinfliper: function(){
        coinflip = (Math.floor(Math.random() * 2) )
    }
};



//--------------------------------------------------------- Items and Uses Section -------------------------------------------------------------------
function inventoryCheck() {
    pickItemUser();
    if (hasItemUser){
    inquirer.prompt({
        type: "rawlist",
        name: "inventory",
        message: "What would you like to use?",
        choices: ["Map", "Rusty Axe", "revolver", "band-aid", "dirty socks", "Magic Wand", "AED", "fireworks", "mirror"]
    }).then(function (player) {
        
        switch (player.inventory) {
            case 'Map':
                console.log('heres the map');
                fight();
                break;
            case 'Rusty Axe':
                console.log('you have the rusty axe');
                fight();
                break;
            case 'revolver':
                console.log('can be used once for each bullet possessed');
                fight();
                break;
            case 'band-aid':
                console.log('can heal a small amount of hp per');
                invItemUser.bandAid();
                hasItemUser=false;
                fight();


                break;
            case 'Magic Wand':
                console.log('doubles mana for 1 battle. 12 tile movement cool-down');
                fight();

                break;
            case 'AED':
                console.log('the enemy is shocked that you have this. 1/4 chance of paral.');
                fight();
                break;
            case 'fireworks':
                console.log('you have started a forest fire. forrest fires attract bears. bear spawn chance +200%');
                fight();

                break;
            case 'dirty socks':
                console.log('Enemy ' + ' is discusted. attk down by random small amount');
                fight();
                break;
            case 'mirror':
                console.log('you look beautiful');
                fight();
                break;

        }

    });
}
}


let invItemUser = {
    bandAid: function (userOf) {
        this.defense +=300
    }
}

// }

// theEverythingLivesHere();

// module.exports = { theEverythingLivesHere };
module.exports = { tileNum, playGame, organicLifeForms, escapedOrNot  }
// module.exports.party = party;
// module.exports.enemyArr = enemyArr;


// map_.showTheMap();
// prints_.drawForest();
// prints_.drawWolf();

selectParty();
