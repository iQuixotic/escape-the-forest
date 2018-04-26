
var appy_ = require("./app.js");



function drawWolf() {
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

//-------------------------------------------- FUNCTIONS FOR PRINTING ATTRIBUTES -----------------------------------------------------------------
//function for displaying current Attributes
function printStatus(partyInfo) {
    
    // console.log(arg);
  
    console.log('');
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('   -    ' +'HP: ' + partyInfo[0].defense + '    -    ' + 'Attk: ' + partyInfo[0].attack + '     -     ' + partyInfo[0].name);
    console.log('   -    ' +'HP: ' + partyInfo[1].defense + '    -    ' + 'Attk: ' + partyInfo[1].attack + '     -     ' + partyInfo[1].name);
    console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
    console.log('');
    console.log('');
    console.log('');
    // escapedOrNot();
}

// status to show enemy's and player's current status 
function printFight(partyInfo, enemyInfo) {

    // console.log(partyInfo);
        console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
        console.log('   -    ' +'HP: ' + partyInfo[0].defense + '    -    ' + 'Attk: ' + partyInfo[0].attack + '     -     ' + partyInfo[0].name);
        console.log('   -    ' +'HP: ' + partyInfo[1].defense + '    -    ' + 'Attk: ' + partyInfo[1].attack + '     -     ' + partyInfo[1].name);
        console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
        console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
        console.log('   -    ' +'HP: ' + enemyInfo[0].defense + '    -    ' + 'Attk: ' + enemyInfo[0].attack + '     -     ' + enemyInfo[0].name);
        console.log('- - - - - - - - - - - - - - - - - - - - - - - -');
}

module.exports = { drawForest, drawWolf, printStatus, printFight  }