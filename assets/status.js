 const inquirer = require("inquirer");
 
 // all the logic for a random wolf battle
 function checkForWolves(arrHolder, enemyCreator, wolfExists, tile, xran, fight, random, r, playGame){
    xran = random.wolfAppear(xran);
    console.log(xran);
    console.log('');
    if(tile>1 && tile<35 && xran>9){
        console.log('A wild wolf appeared !!' );
        console.log('');
        wolfExists = true;
    } if (wolfExists){
        let wolf = new enemyCreator('wolf', 20, 200);
        console.log(wolf);
        arrHolder.enemyArr.push(wolf);
        fight(arrHolder, wolfExists);
    }
    if(wolfExists === false){
        r++;
        console.log('Score: ' + r + '        (Lower is better)');
        playGame(wolfExists);
        }
}

// function for checking inventory and using an item
function checkI(wolfExists, func, map) {
    inquirer.prompt({
        type: "rawlist",
        name: "inventory",
        message: "What would you like to use?",
        choices: ["Map", "Rusty Axe", "Revolver", "salt", "dirty socks", "Magic Wand"]
    }).then(function (player) {
        if (player.inventory === "Map") {
            map();
            func(wolfExists);
        }
    });
}

//check for a win state
function escapedOrNot(arg){
    if (arg === 36){
        endGame = true;
        console.log('Whew, you made it out in '+ r + ' turns !!!');
    }
}

// Checks to see if all party members health equals zero
function gameOver(arrHolder){
   console.log(arrHolder.party);
    if(arrHolder.party[0].defense <= 0 && arrHolder.party[1].defense <= 0){
        console.log('----------------------------------');
        console.log('');
        console.log('          Love is Over');
        console.log('');
        console.log('----------------------------------');
        endGame = true;
        return 0;
    }
}

module.exports = { gameOver, checkI, checkForWolves, escapedOrNot }