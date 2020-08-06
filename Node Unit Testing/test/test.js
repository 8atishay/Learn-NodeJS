// run project by mocha test.js
// chai is an assertion library
var chai = require('chai');

//can use either expect or should
var expect = chai.expect;
// if we dont want to implement expect we use should API
chai.should();

var chaiFiles = require('chai-files');
chai.use(chaiFiles);
var file = chaiFiles.file;
function isEven(num){
    return num%2==0;
}

// unit/test group
describe('To check is isEven method using expect()',function(){
    // unit case 1
    it('should return true when number is even',function(){
        expect(isEven(4)).to.be.true;
    })
    // unit case 2
    it('should return true when number is odd',function(){
        expect(isEven(5)).to.be.false;
    })
    // unit case 3
    it('should return true when number is odd',function(){
        expect(isEven(4)).to.be.false;
    })
})

describe('To check is isEven method using should()',function(){
    // unit case 1
    it('should return true when number is even',function(){ 
        isEven(4).should.be.true;
    })
    // unit case 2
    it('should return true when number is odd',function(){
        isEven(5).should.be.false;
    })
    // unit case 3
    it('should return true when number is odd',function(){
        isEven(4).should.be.false;
    })
})

describe('File check',function(){
    it('shoud return true if file found',function(){
        expect(file('./test/test-more.js')).to.exist;
        // console.log(__dirname);
    })
})
