
let allTheRandomness = {
    critChance: (Math.floor(Math.random() * 100) + 1),
    coinfliper: function(){
        coinflip = (Math.floor(Math.random() * 2) )
        return coinflip;
    },
    wolfAppear: function (arg){
        arg = (Math.floor(Math.random() * 10) + 1);
        console.log(arg)
        return arg;
       
    }
};


module.exports = { allTheRandomness }