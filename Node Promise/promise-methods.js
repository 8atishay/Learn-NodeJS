var cleanTheRoom = function(){
    return new Promise(function(resolve,reject){
        var isClean = false;
        if(isClean){
            resolve('The room is clean. ');
        }else{
            reject('The room is not clean. ');
        }
    })    
}

var removeTheGarbage = function(){
    return new Promise(function(resolve,reject){
        var isRemoved = false;
        if(isRemoved){
            resolve('The garbage is removed. ');
        }else{
            reject('The garbage is not removed. ');
        }
    })
}

var winTheIcecream = function(){
    return new Promise(function(resolve,reject){
        var youWon = true;
        if(youWon){
            resolve('You won the ice-cream. ');
        }else{
            reject('You lost the ice-cream. ');
        }
    })
}

// Promise.all([cleanTheRoom(),removeTheGarbage(),winTheIcecream()])
// .then(function(result){
//     console.log("All the promises are resolved");
// }).catch(function(result){
//     console.log("One of the promise failed");
// })

Promise.race([cleanTheRoom(),removeTheGarbage(),winTheIcecream()])
.then(function(result){
    console.log("One of the promise is resolved");
}).catch(function(result){
    console.log("One of the promise failed");
})