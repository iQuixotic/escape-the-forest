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
const charSel = require("./charSelect");

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

module.exports = { tileNum, playGame }


charSel.selectParty(prints_.printStatus, arrHolder, characterCreator, playGame, wolfExists, r);
