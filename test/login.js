let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3000';

describe('Testing home endpoint',()=>{
    it('Sending request', () =>{
        chai.request(url)
        .get('/')
        .end( function(err,res){
            console.log(err);
            expect(res.text).to.be.equal('Hola home');
            
        });
    });
});

describe('Testing Login endpoint',()=>{
    it('Sending request', () =>{
        chai.request(url)
        .post('/login')
        .end( function(err,res){
            console.log(err);
            expect(err.body).to.have.property('user');
            console.log(res.body)
        });
    });
});