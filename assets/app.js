var inquirer = require("inquirer");

 
function characterCreator(name, type, attack, defense) {
    this.name=name;
    this.type=type;
    this.attack=attack;
    this.defense=defense;
    this.hitTheTarget = function(){
        enemyArr[0].hp -= attack;
        console.log('');
        return enemyArr[0].hp;
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

let coinToss = (Math.floor(Math.random() * 2) );
let critChance = (Math.floor(Math.random() * 100) + 1);

function enemyConstruct(name, attack, defense) {
    this.name=name;
    this.attack=attack;
    this.defense=defense;
    this.hitTheTarget = function(){
        party[coinToss].hp -= attack;
        console.log('');
        return party[coinToss].hp;
    }
}
let enemyArr = [];
let wolfExists = false;



let enemyAttack, enemyHp;


function playGame() {
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('   -    ' +'HP: ' + party[0].defense + '    -    ' + 'Attk: ' + party[0].attack + '     -     ' + party[0].name);
    console.log('   -    ' +'HP: ' + party[1].defense + '    -    ' + 'Attk: ' + party[1].attack + '     -     ' + party[1].name);
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
    escapedOrNot();

    let wolfSpawnChance = (Math.floor(Math.random() * 100) + 1);
    console.log(wolfSpawnChance);
    if(tile>1 && tile<35 && wolfSpawnChance>9){
        console.log('A wolf appeared.');
        wolfExists = true;
    } if (wolfExists){
        let wolf = new enemyConstruct('wolf', 20, 200);
        enemyArr.push(wolf);
        fight();
    }
    
    if (r < 5000 && wolfExists === false) {
        
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
                        tile += 1;
                        
                        break;
                    case 'Go Left':
                        console.log('you went left');
                        tile -= 1;
                       
                        break;
                    case 'Go Up':
                        console.log('you went up');
                        tile += 7;
                        
                        break;
                    case 'Go Down':
                        console.log('you went down');
                        tile -= 7;
                        break;
                    case 'Check Inventory':
                        console.log('');
                        checkI();
                        break;
                    // case 'Map':
                    //     console.log('you showed the map');
                    //     showTheMap();
                    //     break;
                    default:
                        def();
                }
                if( player.todo !=='Check Inventory'){
                r++;
                console.log('Score: ' + r + '        (Lower is better)');
                playGame();
                }
            });
    }
}

function fight() {
    if (enemyArr[0].defense > 0){
    inquirer.prompt([{
        type: "list",
        name: "whatDo",
        message: enemyArr[0].name + ' is ready to attack. What will you do ?',
        choices: ['Fight', 'Run']
      }, {
        type: "list",
        name: "whatDoNext",
        message: '',
        choices: ['Attack', 'Inventory']
      }, {
       
      }]).then(function(answers) {
          if(answers.whatDo === 'Run'){
              console.log(enemyArr);
              enemyArr.pop();
              fight();
          }
          if(answers.whatDoNext === 'Attack') {
        
            console.log(enemyArr[0].defense);
            party[0].hitTheTarget();
            party[1].hitTheTarget();
            console.log(enemyArr[0].defense);
            enemyArr[0].hitTheTarget();
            fight();
          }
       
      });
    } 
    if(enemyArr[0].defense <= 0 || undefined){} {
        console.log('The enemy was defeated !!')
        wolfExists = false;
    }
}


function escapedOrNot(){
    if (tile === 36){
        r=5000;
        console.log('Whew, you made it out in '+ r + ' turns !!!');
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

// // should show the map and display the current tile location
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

selectParty();