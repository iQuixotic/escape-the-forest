let appz_ = require('./app.js');

let characterCreator = function(name, type, attack, defense) {
    this.name=name;
    this.type=type;
    this.attack=attack;
    this.defense=defense;
    this.hitTheTarget = function(enemyArr){
        enemyArr[0].hp -= attack;
        enemyArr[0].defense -= attack;
        console.log('');
       return enemyArr[0].defense;
    }
}

module.exports = characterCreator;