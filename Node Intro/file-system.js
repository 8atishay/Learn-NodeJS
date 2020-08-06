var fs= require("fs");

console.log("start\n");

fs.readFile("./file-system/demo.txt",function(err,data){
    if(err){
        throw err;
    }
    console.log(data.toString());
});

var data = fs.readFileSync("./file-system/demo2.txt","utf8");
console.log(data);

fs.writeFile("./file-system/test.txt","Hello World",function(err,data){
    if (err){
        throw err;
    }
    console.log("Write operation completed\n");
})

fs.appendFile("./file-system/test.txt"," appended",function(err,data){
    if (err){
        throw err;
    }
    console.log("Append operation completed\n");
})

// to delete the file use the code below

 
// fs.unlink("./file-system/test.txt",function(err){
//     if(err){
//         throw err;
//     }
//     console.log("The file is succesfully deleted");
// })


