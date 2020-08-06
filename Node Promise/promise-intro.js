var cleanTheRoom = new Promise(function(resolve,reject){
    var isClean = false;
    if(isClean){
        resolve('The room is clean.');
    }else{
        reject('The room is not clean.');
    }
})
// if isClean is true then (then) is called 
// else (catch) is callled
cleanTheRoom.then(function(result){
    console.log("Resolved: "+result);
}).catch(function(result){
    console.log("Rejected: "+result);
})