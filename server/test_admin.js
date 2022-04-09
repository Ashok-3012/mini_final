const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ecom-ashok.bs',
  host: 'localhost',
  database: 'project',
  password: '',
  port: 5432,
})

class Logic2{
    //async getPasswordForUser(u){
      //  return await pool.query('SELECT password FROM sign_up where user_id=$1',[u]);
    //}
    async adminValidation(u,p){
        let isadmin=false;
        if(u==='admin' && p==='admin'){
            isadmin=true;
            console.log('valid');
            return {status:'success',isadmin}
        }
    }
}
module.exports=Logic2;