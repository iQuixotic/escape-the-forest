
var app_ = require("./app.js");

tile = 1;

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
    console.log('You are current location is tile number  ' + tile);
    console.log('');
    // playGame();
}



module.exports = { showTheMap }