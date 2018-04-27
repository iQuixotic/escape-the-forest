let appu_ = require('./app.js');

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