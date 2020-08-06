// change the variables isClean, isRemoved, youWon
// and see the effects

var cleanTheRoom = new Promise(function(resolve,reject){
    var isClean = false;
    if(isClean){
        resolve('The room is clean.');
    }else{
        reject('The room is not clean.');
    }
})

var removeTheGarbage = new Promise(function(resolve,reject){
    var isRemoved = true;
    if(isRemoved){
        resolve('The garbage is removed.');
    }else{
        reject('The garbage is not removed.');
    }
})

var winTheIcecream = new Promise(function(resolve,reject){
    var youWon = true;
    if(youWon){
        resolve('You won the ice-cream.');
    }else{
        reject('You lost the ice-cream.');
    }
})

cleanTheRoom.then(function(result){
    console.log(result);
    removeTheGarbage.then(function(result){
        console.log(result);
        winTheIcecream.then(function(result){
            console.log(result);
        }).catch(function(result){
            console.log(result);
        });
    }).catch(function(result){
        console.log(result);
    });
}).catch(function(result){
    console.log(result);
});