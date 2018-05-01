let appx_ = require('./app.js');

// function goForward will not have to change directions
function goForward() {
    if (appx_.facing === 'north') {
        tile += 7;
    } else if (appx_.facing === 'south') {
        tile -= 7;
    } else if (appx_.facing === 'west'){
        tile -= 1;
    } else if (appx_.facing === 'east'){
        tile +=1
    }
}

// function goBack will have to go the opposite direction
function goBack() {
    if (appx_.facing === 'north') {
        tile -= 7;
        appx_.facing = 'south';
    } else if (appx_.facing === 'south') {
        tile += 7;
        appx_.facing = 'north';
    } else if (appx_.facing === 'west'){
        tile +=1;
        appx_.facing = 'east';
    } else if (appx_.facing === 'east'){
        tile -=1
        appx_.facing = 'west';
    }
}

// function goBack will have to go the opposite direction
function goLeft() {
    if (appx_.facing === 'north') {
        tile -= 1;
        appx_.facing = 'west';
    } else if (appx_.facing === 'south') {
        tile += 1;
        appx_.facing = 'east';
    } else if (appx_.facing === 'west'){
        tile -= 7;
        appx_.facing = 'south';
    } else if (appx_.facing === 'east'){
        tile +=7
        appx_.facing = 'north';
    }
}

// function goRight will have to change the compass direction
function goRight() {
    if (appx_.facing === 'north') {
        tile += 1;
        appx_.facing = 'east';
    } else if (appx_.facing === 'south') {
        tile -= 1;
        appx_.facing = 'west';
    } else if (appx_.facing === 'west'){
        tile += 7;
        appx_.facing = 'north';
    } else if (appx_.facing === 'east'){
        tile -=7
        appx_.facing = 'south';
    }
}

module.exports = { goRight, goLeft, goForward, goBack }