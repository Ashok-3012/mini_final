const assert = require('assert')
const sinon = require('sinon')
const Logic = require('../test_login')
const logicObj = new Logic()
const FakeSuccessPromiseFromDB = (returnValueFromDB)=>{
    return new Promise((resolve, reject)=>{return resolve(returnValueFromDB)})
}
describe("Login Validations", ()=>{
    // it("checks a sum", ()=>{
    //     assert.equal(add(2,2), 4, 'addition is wrongly done')
    // })
    console.log('hello');

    it("Verify success when we send correct username and correct password", async ()=>{
        let correctUserName = 'gok_ul'
        let correctPwd = 'gk'
        sinon.stub(logicObj, 'getPasswordForUser').returns(FakeSuccessPromiseFromDB({rows:[{ password: 'gk' }]}))
        const response = await logicObj.loginValidation(correctUserName, correctPwd);
        //console.log(response)
        const expectedResponse = {status:'success',isadmin:false}
        assert.deepEqual(response, expectedResponse, "Login Validation Failed")
        sinon.restore()
    })

      // })

    it("Verify failure when we send correct username and wrong password", async ()=>{
        let correctUserName = 'gok_ul'
        let correctPwd = 'gk1'
        sinon.stub(logicObj, 'getPasswordForUser').returns(FakeSuccessPromiseFromDB({rows:[]}))
        const response = await logicObj.loginValidation(correctUserName, correctPwd);
        //console.log(response)
        const expectedResponse = {status:'failure',isadmin:false}
        assert.deepEqual(response, expectedResponse, "Login Validation Failed")
        sinon.restore()

    })


    it("Verify failure when we send wrong username and correct password", async ()=>{
        let correctUserName = 'gokul'
        let correctPwd = 'gk'
        sinon.stub(logicObj, 'getPasswordForUser').returns(FakeSuccessPromiseFromDB({rows:[]}))
        const response = await logicObj.loginValidation(correctUserName, correctPwd);
        //console.log(response)
        const expectedResponse = {status:'failure',isadmin:false}
        assert.deepEqual(response, expectedResponse, "Login Validation Failed")
        sinon.restore()

    })


    it("Verify failure when we send wrong username and wrong password", async ()=>{
        let correctUserName = 'gokul'
        let correctPwd = 'gk1'
        sinon.stub(logicObj, 'getPasswordForUser').returns(FakeSuccessPromiseFromDB({rows:[]}))
        const response = await logicObj.loginValidation(correctUserName, correctPwd);
        //console.log(response)
        const expectedResponse = {status:'failure',isadmin:false}
        assert.deepEqual(response, expectedResponse, "Login Validation Failed")
        sinon.restore()
    })

})