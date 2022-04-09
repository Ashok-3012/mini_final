const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ecom-ashok.bs',
  host: 'localhost',
  database: 'project',
  password: '',
  port: 5432,
})

class Logic{
    async getPasswordForUser(u){
        return await pool.query('SELECT password FROM sign_up where user_id=$1',[u]);
    }
    async loginValidation(u,p){
        let isadmin=false;

        if(u==='admin' && p==='admin'){
            isadmin=true;
            console.log('valid');
           // res.json({status:'success',isadmin});
            return {status:'success',isadmin}
        }
        //isadmin=false;
        const results= await this.getPasswordForUser(u);//await pool.query('SELECT password FROM sign_up where user_id=$1',[u]);
       // console.log(results.rows);
        console.log(results);

        //res.header('Access-Control-Allow-Origin','*');
        
        if(results.rows.length>=1 && results.rows[0].password===p){
            console.log('valid');
        //     res.json({status:'success',isadmin});
        return {status:'success',isadmin}
        }
        else{
            console.log('invalid');
            //res.json({status:'failure',isadmin});
            return {status:'failure',isadmin};
        }
    }
}
module.exports=Logic;