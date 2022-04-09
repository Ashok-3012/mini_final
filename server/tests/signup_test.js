const assert = require('assert')
const sinon = require('sinon')
const Logic1 = require('../test_signup')
const logicObj1 = new Logic1()
//const FakeSuccessPromiseFromDB = (returnValueFromDB)=>{
//    return new Promise((resolve, reject)=>{return resolve(returnValueFromDB)})
//}
describe("Signup Validations", async ()=>{

    it("Verify success when we send new valid information", async ()=>{
       const obj={
           name:'solomom',
           user_id:'solo_',
           password:'hit',
           c_password:'hit',
           dob:'2000-11-11',
           gender:'male',
           contact:'9121211234',
           email_id:'so@gmail.com'
       }
      // sinon.stub(logicObj, 'getPasswordForUser').returns(FakeSuccessPromiseFromDB({rows:[{ password: 'gk' }]}))
       const response = await logicObj1.signUpValidation(obj);
        const expectedResponse = {status:'success'}
       assert.deepEqual(response, expectedResponse, "Signup Validation Failed")
       sinon.restore()
    })
    

    it("Verify failure when we send already registered information", async ()=>{
        //  let correctUserName = 'gok_ul'
         // let correctPwd = 'gk
         const obj={
             name:'gokul',
             user_id:'gok_ul',
             password:'gk',
             c_password:'gk',
             dob:'2000-01-01',
             gender:'male',
             contact:'7654334567',
             email_id:'gk@gmail.com'
         }
        //  sinon.stub(logicObj, 'getPasswordForUser').returns(FakeSuccessPromiseFromDB({rows:[{ password: 'gk' }]}))
          const response = await logicObj1.signUpValidation(obj);
          //console.log(response)
          const expectedResponse = {status:'failure'}
          assert.deepEqual(response, expectedResponse, "Signup Validation Failed")
        //  sinon.restore()
      })   
})