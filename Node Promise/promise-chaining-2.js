var cleanTheRoom = function(){
    return new Promise(function(resolve,reject){
        var isClean = true;
        if(isClean){
            resolve('The room is clean. ');
        }else{
            reject('The room is not clean. ');
        }
    })    
}

var removeTheGarbage = function(message){
    return new Promise(function(resolve,reject){
        var isRemoved = false;
        if(isRemoved){
            resolve(message+'The garbage is removed. ');
        }else{
            reject(message+'The garbage is not removed. ');
        }
    })
}

var winTheIcecream = function(message){
    return new Promise(function(resolve,reject){
        var youWon = true;
        if(youWon){
            resolve(message+'You won the ice-cream. ');
        }else{
            reject(message+'You lost the ice-cream. ');
        }
    })
}

cleanTheRoom().then(function(result1){
    return removeTheGarbage(result1);
}).then(function(result2){
    return winTheIcecream(result2);
}).then(function(result3){
    console.log(result3);
}).catch(function(error){
    console.log("OOPS!! You broke the promise. "+error);
})