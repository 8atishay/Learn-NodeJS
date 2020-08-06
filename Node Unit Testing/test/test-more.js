// run project by mocha test.js

var chai = require('chai');

//can use either expect or should
var expect = chai.expect;
// if we dont want to implement expect we use should API
chai.should();

function sum(num1,num2){
    return num1+num2;
}

describe('To check sum() method',function(){
    // do not define it globally
    // var num=5;
    var num;
    // beforeEach will run the function before each it 
    beforeEach(function(){
        num=5;
    })
    afterEach(function(){
        console.log('AfterEach');
    })

    it('should be 10 when adding 5 to 5',function(){
        num = sum(num,5);
        expect(num).to.be.equal(10);
    })
    it('should be 10 when adding 7 to 5',function(){
        num = sum(num,7);
        num.should.equal(12);
    })
})