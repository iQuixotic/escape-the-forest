var inquirer = require('inquirer');

// var appn_ = require('./app.js');
// let userOf;
let itemSelected = false;
let hasItemUser;
let userOf;

// Asks a question to determine who the inv item would be used on
function pickItemUser(enemyArr, party, method, funcUse){
    // if(itemSelected) {
    inquirer.prompt({
        type: "list",
        name: "itemUseOnWho",
        message: 'Who will you use the item on ?',
        choices: [enemyArr[0].name, party[0].name, party[1].name]
      }).then(function(answers) {
          if(answers.itemUseOnWho === enemyArr[0].name){
              console.log('si')
            userOf = enemyArr[0];
            funcUse(userOf, method);
         
            console.log(userOf);
          } else if (answers.itemUseOnWho === party[0].name){
            userOf = party[0];
            funcUse(userOf, method);
         
          }else if (answers.itemUseOnWho === party[1].name){
            userOf = party[1];
            funcUse(userOf, method);
          }
            hasItemUser=true;
          
            // method();
           
        });
        
    // }
}
// function knowItemUser(func) {

// }

// inventoryCheck will run a prompt and then runs a switch statement to use selected item
function inventoryCheck(enemyArr, party, method) {
    // if (hasItemUser) {
        
        inquirer.prompt({
            type: "rawlist",
            name: "inventory",
            message: "What would you like to use?",
            choices: ["Map", "Rusty Axe", "revolver", "band-aid", "dirty socks", "Magic Wand", "AED", "fireworks", "mirror"]
        }).then(function (player) {
            switch (player.inventory) {


                case 'Map':
                    console.log('heres the map');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method);
                    break;


                case 'Rusty Axe':
                    console.log('you have the rusty axe');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method)
                    break;


                case 'revolver':
                    console.log('can be used once for each bullet possessed');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method);
                    break;


                case 'band-aid':
                    console.log('can heal a small amount of hp per');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method, bandAid);
                  
                    // bandAid(pickItemUser, userOf, method);
                   
                    // hasItemUser = false;
                    break;


                case 'Magic Wand':
                    console.log('doubles mana for 1 battle. 12 tile movement cool-down');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method);
                    break;


                case 'AED':
                    console.log('the enemy is shocked that you have this. 1/4 chance of paral.');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method);
                    break;


                case 'fireworks':
                    console.log('you have started a forest fire. forrest fires attract bears. bear spawn chance +200%');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method);
                    break;


                case 'dirty socks':
                    console.log('Enemy ' + ' is discusted. attk down by random small amount');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method);
                    break;


                case 'mirror':
                    console.log('you look beautiful');
                    itemSelected = true;
                    pickItemUser(enemyArr, party, method);
                    break;
            }

        });
        // pickItemUser(enemyArr, party, method);

}

    function bandAid(arg, method) {
        console.log('band aid has been used');
        arg.defense +=300;
        method();
    }
    // bandAid(userOf, method);



// --------------------------------------------------- Item Uses section ------------------------------------------------------------------------

module.exports = { inventoryCheck, pickItemUser, bandAid }