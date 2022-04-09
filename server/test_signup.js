const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ecom-ashok.bs',
  host: 'localhost',
  database: 'project',
  password: '',
  port: 5432,
})

class Logic1{
   // async getPasswordForUser(u){
     //   return await pool.query('SELECT password FROM sign_up where user_id=$1',[u]);
    //}
    async signUpValidation(req){
        //const resu=await pool.query('SELECT * from sign_up where user_id=$1',[req.body.user_id]);
        const resu=await pool.query('SELECT * from sign_up where user_id=$1',[req.user_id]);
        //console.log('hi'+resu.rows);
        //console.log(typeof resu.rows);
        if(resu.rows.length!==0){
            return {status:'failure'};
        }
        else{
            //const results=await pool.query('INSERT INTO sign_up VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[req.body.name,req.body.user_id,req.body.pass,req.body.cpass,req.body.dob,req.body.gender,req.body.contact,req.body.email_id]);
            const results=await pool.query('INSERT INTO sign_up VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[req.name,req.user_id,req.pass,req.cpass,req.dob,req.gender,req.contact,req.email_id]);
            //console.log('hello'+results.rows);
            //console.log(typeof results.rows);
            return {status:'success'};
        }
    }
}
module.exports=Logic1;