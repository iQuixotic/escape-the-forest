let appu_ = require('./app.js');

// this is the constructor for making new enemies. The hitTheTarget method takes in the array of party (party) and 
// the random number 0-1 of who (coinflip)
let enemyConstruct = function(name, attack, defense) {
    this.name=name;
    this.attack=attack;
    this.defense=defense;
    this.hitTheTarget = function(party, who){
        party[who].defense -= attack;
        console.log('');
        return party[who].defense;
    }
}

module.exports = enemyConstruct;