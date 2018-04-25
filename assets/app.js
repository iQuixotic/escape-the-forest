var inquirer = require("inquirer");

const chalk = require('chalk');

 
function characterCreator(name, type, attack, defense) {
    this.name=name;
    this.type=type;
    this.attack=attack;
    this.defense=defense;
    this.hitTheTarget = function(){
        enemyArr[0].hp -= attack;
        enemyArr[0].defense -= attack;
        console.log('');
       return enemyArr[0].hp;
       return enemyArr[0].defense;
    }
}
// r is for recursive counter
let party = [];
let r=0;
let attack, hp;
let tile = 1;


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

            party.push(partyMem);
            console.log(partyMember.name + " added to the party");
            // console.log(partyMember);
            // console.log(partyMem);
    
            r++;
            if(r<2){
            selectParty();
            } else {
                console.log('You have selected the ' + party[0].type + ' named ' + party[0].name + 
                ' and the ' + party[1].type + ' named ' + party[1].name + ' to attempt a forest escape together. \n');
                inquirer.prompt(                     
                    {
                      type: "confirm",
                      name: "start",
                      message: "Do you want to continue with these selections ?"
                    }).then(function(user) {
                    if(user.start){
                console.log('Good Luck !!!');
                r=0;
                playGame();
                // console.log(party);
                    } else if(!user.start){
                        r=0;
                        party = [];
                        selectParty();
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
        party[coinflip].defense -= attack;
        console.log('');
        return party[coinflip].defense;
    }
}
let enemyArr = [];
let wolfExists = false;
let endGame = false;

function playGame() {
        printStatus();
   
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
                        goRight();
                        console.log(facing)
                        console.log(tile);

                        break;
                    case 'Go Left':
                        console.log('you went left');
                        goLeft();
                        console.log(facing)
                        console.log(tile);
                       
                        break;
                    case 'Go Up':
                        console.log('you went up');
                        goForward();
                        console.log(facing)
                        console.log(tile);

                        
                        break;
                    case 'Go Down':
                        console.log('you went down');
                        goBack();
                        console.log(facing)
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
    if (!endGame && enemyArr[0].defense > 0 && enemyArr[0].name !== undefined){
         firstFightQuestion();
    } 
    if(enemyArr[0].defense <= 0) {
        console.log('The enemy was defeated !!')
        enemyArr.pop();
        wolfExists = false;
        playGame();
    }
}

// function for first fight question
function firstFightQuestion(){
    inquirer.prompt({
        type: "list",
        name: "whatDo",
        message: enemyArr[0].name + ' is ready to attack. What will you do ?',
        choices: ['Fight', 'Run']
      }).then(function(answers) {
        
          if(answers.whatDo !== 'Fight'){
              enemyArr.pop();
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
            printFight();

            party[0].hitTheTarget();
            party[1].hitTheTarget();
            enemyArr[0].hitTheTarget();
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
        choices: [enemyArr[0].name, party[0].name, party[1].name]
      }).then(function(answers) {
        
          if(answers.itemUseOnWho === enemyArr[0].name){
            userof = party[1].defense;
          } else if (answers.itemUseOnWho === party[0].name){
            userof = party[1].defense;
          }else if (answers.itemUseOnWho === party[1].name){
               userof = party[1].defense;
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
        enemyArr.push(wolf);
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
            showTheMap();
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
    if(party[0].defense <= 0 && party[1].defense <= 0){
        console.log('----------------------------------');
        console.log('');
        console.log('          Love is Over');
        console.log('');
        console.log('----------------------------------');
        endGame = true;
        return 0;
    }
}

//-------------------------------------------- FUNCTIONS FOR PRINTING ------------------------------------------------------------------------
//function for displaying current Attributes
function printStatus() {
    console.log('');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('   -    ' +'HP: ' + party[0].defense + '    -    ' + 'Attk: ' + party[0].attack + '     -     ' + party[0].name);
    console.log('   -    ' +'HP: ' + party[1].defense + '    -    ' + 'Attk: ' + party[1].attack + '     -     ' + party[1].name);
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('');
    console.log('');
    console.log('');
    escapedOrNot();
}

// status to show enemy's and player's current status 
function printFight() {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
        console.log('   -    ' +'HP: ' + party[0].defense + '    -    ' + 'Attk: ' + party[0].attack + '     -     ' + party[0].name);
        console.log('   -    ' +'HP: ' + party[1].defense + '    -    ' + 'Attk: ' + party[1].attack + '     -     ' + party[1].name);
        console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
        console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
        console.log('   -    ' +'HP: ' + enemyArr[0].defense + '    -    ' + 'Attk: ' + enemyArr[0].attack + '     -     ' + enemyArr[0].name);
        console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
}

let facing = 'north';

// function goForward will not have to change directions
function goForward() {
    if (facing === 'north') {
        tile += 7;
    } else if (facing === 'south') {
        tile -= 7;
    } else if (facing === 'west'){
        tile -= 1;
    } else if (facing === 'east'){
        tile +=1
    }
}

// function goBack will have to go the opposite direction
function goBack() {
    if (facing === 'north') {
        tile -= 7;
        facing = 'south';
    } else if (facing === 'south') {
        tile += 7;
        facing = 'north';
    } else if (facing === 'west'){
        tile += 1;
        facing = 'east';
    } else if (facing === 'east'){
        tile -=1
        facing = 'west';
    }
}

// function goBack will have to go the opposite direction
function goLeft() {
    if (facing === 'north') {
        tile -= 1;
        facing = 'west';
    } else if (facing === 'south') {
        tile += 1;
        facing = 'east';
    } else if (facing === 'west'){
        tile -= 7;
        facing = 'south';
    } else if (facing === 'east'){
        tile +=7
        facing = 'north';
    }
}

// function goRight will have to change the compass direction
function goRight() {
    if (facing === 'north') {
        tile += 1;
        facing = 'east';
    } else if (facing === 'south') {
        tile -= 1;
        facing = 'west';
    } else if (facing === 'west'){
        tile += 7;
        facing = 'north';
    } else if (facing === 'east'){
        tile -=7
        facing = 'south';
    }
}

// should show the map and display the current tile location
function showTheMap() {
    console.log("==============================================================================");
    console.log("|          |          |          |          |          |          |          |");
    console.log("|    29    |    30    |    31    |     32   |     33   |     34   |     35   |");
    console.log("|          |          |          |          |          |          |          |");
    console.log("------------------------------------------------------------------------------");
    console.log("|          |          |          |          |          |          |          |");
    console.log("|    22    |    23    |    24    |     25   |     26   |     27   |     28   |");
    console.log("|          |          |          |          |          |          |          |");
    console.log("------------------------------------------------------------------------------");
    console.log("|          |          |          |          |          |          |          |");
    console.log("|    15    |    16    |    17    |     18   |     19   |     20   |     21   |");
    console.log("|          |          |          |          |          |          |          |");
    console.log("------------------------------------------------------------------------------");
    console.log("|          |          |          |          |          |          |          |");
    console.log("|     8    |     9    |    10    |     11   |     12   |     13   |     14   |");
    console.log("|          |          |          |          |          |          |          |");
    console.log("------------------------------------------------------------------------------");
    console.log("|          |          |          |          |          |          |          |");
    console.log("|     1    |     2    |     3    |     4    |     5    |     6    |    7     |");
    console.log("|          |          |          |          |          |          |          |");
    console.log("==============================================================================");
    console.log('');
    console.log('You are currently on tile number ' + tile);
    console.log('');
    }

function drawWolf(){
console.log("      /\\      _-'/ ");
console.log("    _/| \\-''- _ / ");
console.log("__-'{ |         \\ ");
console.log("   /             \\  ");
console.log('   /      "o.  |o  }');
console.log("   |           \\  ;");
console.log("                  ',");
console.log("     \\_        __ \\ ");
console.log("        ''-_   \\.// ");
console.log("          / '-____' ");
console.log("         /");
console.log("       _'");
console.log("     _-'");
}

function drawForest() {
    console.log('');
console.log('                                                    ,@@@@@@@,');
console.log('                                                     ,,,.   ,@@@@@@/@@,  .oo8888o.');
console.log('                                                  ,&%%&%&&%,@@@@@/@@@@@@,8888\\88/8o');
console.log("                                                 ,%&\\%&&%&&%,@@@\\@@@/@@@88\\88888/88'");
console.log("                                                 %&&%&%&/%&&%@@\\@@/ /@@@88888\\88888'");
console.log("                                                 %&&%/ %&%%&&@@\\ V /@@' `88\\8 `/88' ");
console.log("                                                 `&%\\ ` /%&'    |.|        \\ '|8'");
console.log('                                                     |o|        | |         | | ');
console.log('                                                     |.|        | |         | | ');
console.log('                                                     \\/ ._\//_/__/  ,\_//__\\/.  \_//__/_ ');
console.log('');
}



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


// drawForest();
// drawWolf();
selectParty();