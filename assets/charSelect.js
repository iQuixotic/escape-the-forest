var inquirer = require("inquirer");

let selectParty = function (printStatus, arrHolder, characterCreator, playGame, wolfExists, r) {
    console.log(arrHolder);
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
            selectParty(printStatus, arrHolder, characterCreator, playGame, wolfExists, r);
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
                printStatus(arrHolder.party);
                r=0;
                // organicLifeForms();
                playGame(wolfExists);
                // console.log(party);
                    } else if(!user.start){
                        r=0;
                        arrHolder.party = [];
                       
                        selectparty(printStatus, arrHolder, characterCreator, playGame, wolfExists, r);
                    }
                });
            }
    });   
}

module.exports = {selectParty}