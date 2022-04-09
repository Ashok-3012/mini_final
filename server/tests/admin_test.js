const assert = require('assert')
const sinon = require('sinon')
const Logic2 = require('../test_admin')
const logicObj2 = new Logic2()
//const FakeSuccessPromiseFromDB = (returnValueFromDB)=>{
//    return new Promise((resolve, reject)=>{return resolve(returnValueFromDB)})
//}
describe("Admin Validations", ()=>{

    it("Verify success when we send correct username and correct password", async ()=>{
       const correctUserName='admin';
       const correctPassword='admin';
      //  sinon.stub(logicObj, 'getPasswordForUser').returns(FakeSuccessPromiseFromDB({rows:[{ password: 'gk' }]}))
        const response = await logicObj2.adminValidation(correctUserName,correctPassword);
        const expectedResponse = {status:'success',isadmin:true}
        assert.deepEqual(response, expectedResponse, "Admin Validation Failed")
      //  sinon.restore()
    })
      
})