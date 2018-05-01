var inquirer = require("inquirer");

var prints_ = require('./prints.js')

var map_ = require('./map.js');

var movement_ = require('./movementFuncs.js');

var enemyCreator = require('./enemyConstructor.js');

// var enemyConstructor_ = require('./enemyConstructor')

var characterCreator = require('./characterConstructor.js');

var inventoryControl = require('./inventoryControl.js');

const chalk = require('chalk');

const random = require('./random.js');

const status = require('./status.js');


// global object to hold party members and enemies 
let arrHolder = {
    enemyArr: [],
    party: []
}

let tileNum =function() {
    return tile;
    playGame(wolfExists);
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

            arrHolder.party.push(partyMem);
            console.log(arrHolder.party[0]);
            console.log(partyMember.name + " added to the party");
            // console.log(partyMember);
            // console.log(partyMem);
    
            r++;
            if(r<2){
            selectParty();
            } else {
                console.log('You have selected the ' + arrHolder.party[0].type + ' named ' + arrHolder.party[0].name + 
                ' and the ' + arrHolder.party[1].type + ' named ' + arrHolder.party[1].name + ' to attempt a forest escape together. \n');
                inquirer.prompt(                     
                    {
                      type: "confirm",
                      name: "start",
                      message: "Do you want to continue with these selections ?"
                    }).then(function(user) {
                    if(user.start){
                console.log('Good Luck !!!');
                console.log(arrHolder.party);
                prints_.printStatus(arrHolder.party);
                r=0;
                // organicLifeForms();
                playGame(wolfExists);
                // console.log(party);
                    } else if(!user.start){
                        r=0;
                        arrHolder.party = [];
                       
                        selectparty();
                    }
                });
            }
    });   
}



// let critChance, coinflip;



let wolfExists = false;
endGame = false;

function playGame(wolfExists) {
        prints_.printStatus(arrHolder.party);
        status.escapedOrNot(tile);
   
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
                        status.checkI(wolfExists, playGame, map_.showTheMap);
                        break;
                    default:
                        def();
                }
                console.log('this is tile#' + tile);
                if( player.todo !=='Check Inventory'){
                status.checkForWolves(arrHolder, enemyCreator, wolfExists, tile, xran, fight, random.allTheRandomness, r, playGame);
                }
               
            });
    }
}

// a recursive function for battles that calls playGame() once the battle is over
function fight(arrHolder, wolfExists) {
    
    status.gameOver(arrHolder);
    if (!endGame && arrHolder.enemyArr[0].defense > 0 && arrHolder.enemyArr[0].name !== undefined){
         firstFightQuestion(arrHolder);
    } 
    if(arrHolder.enemyArr[0].defense <= 0) {
        console.log('The enemy was defeated !!')
        arrHolder.enemyArr.pop();
        wolfExists = false;
        playGame(wolfExists);
    }
}

// function for first fight question
function firstFightQuestion(arrHolder){
    inquirer.prompt({
        type: "list",
        name: "whatDo",
        message: arrHolder.enemyArr[0].name + ' is ready to attack. What will you do ?',
        choices: ['Fight', 'Run']
      }).then(function(answers) {
        
          if(answers.whatDo !== 'Fight'){
              arrHolder.enemyArr.pop();
              wolfExists=false;
              playGame(wolfExists);
          } else{
              secondFightQuestion();
          }
        });
}

// let userOf;
let hasItemUser=false;


// function for second fight question
function secondFightQuestion() {
   
    inquirer.prompt({
        type: "list",
        name: "whatDoNext",
        message: 'FIGHT !!!\n',
        choices: ['Attack', 'Inventory']
    }).then(function (answers) {
        if (answers.whatDoNext === 'Attack') {
            prints_.printFight(arrHolder.party, arrHolder.enemyArr);

            arrHolder.party[0].hitTheTarget(arrHolder.enemyArr);
            arrHolder.party[1].hitTheTarget(arrHolder.enemyArr);
            random.allTheRandomness.coinfliper();
            console.log(coinflip);
            arrHolder.enemyArr[0].hitTheTarget(arrHolder.party, coinflip);
            fight(arrHolder, wolfExists);
        } else if (answers.whatDoNext === 'Inventory') {
            let itemUseAttempted = false;
            let hasItemUser = false;
            
            inventoryControl.inventoryCheck(arrHolder.enemyArr, arrHolder.party, fight, arrHolder, wolfExists);
            // inventoryControl.invItemUser.pick();
            // let runFight = function() {
            //     fight();
            // }
            // runFight();
            // inventoryControl.pickItemUser(arrHolder.enemyArr, arrHolder.party);
            } 
    }); 
}
let xran = 0;





exports.facing = 'north'















// theEverythingLivesHere();

// module.exports = { theEverythingLivesHere };
module.exports = { tileNum, playGame }
// module.arrHolder.party = party;
// module.arrHolder.enemyArr = enemyArr;


// map_.showTheMap();
// prints_.drawForest();
// prints_.drawWolf();

selectParty();
