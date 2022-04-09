const express=require('express');
const app=express();
const body=require('body-parser'); //FOR PARSING JSON DATA
const Redis=require('redis');
const cors=require('cors'); 
const morgan=require('morgan'); //log-analysis
const nodemailer = require('nodemailer')
const cron=require('node-cron');
var amqp = require('amqplib');
const axios=require('axios');
require('datejs');
const Logic = require('./test_login')
const Logic1=require('./test_signup')
const Logic2=require('./test_admin')
const logicObj = new Logic();
const logicObj1=new Logic1();
const logicObj2=new Logic2();
//const router = require('express-promise-router')();
//import axios from 'axios';




app.use(cors());
app.use(morgan('combined'));

//cron job
cron.schedule('24 * * * *',async ()=>{
    console.log('cron called');
    const result=await pool.query('UPDATE train_details SET frequency=0');
    console.log(result); 
});

cron.schedule('0 10 * * *',async ()=>{

    const todate=new Date();
    todate.setDate(todate.getDate()+1);
    let src=todate.toISOString();
    let target='';
    target+=(src.substring(8,10)+'-'+src.substring(5,7)+'-'+src.substring(0,4));
    console.log(target);
    try{
        const results=await pool.query('SELECT * from ticket where "DOJ"=$1',[target]);
        console.log(results);
        for(let x of results.rows){
            const rb={pnr:x.pnr,data:x,sub:'Ticket Notification'};
            const msg=JSON.stringify(rb); 
            channel.sendToQueue(queue,Buffer.from(msg)); 
            console.log('message sent to queue');
        }
    }
    catch(e){
        console.log(e);
    }
});

//connect redis with database
const re=Redis.createClient({
    host:'localhost',
    password:'',
    port:6379
});
re.connect();


app.use(body.json());

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'ecom-ashok.bs',
  host: 'localhost',
  database: 'project',
  password: '',
  port: 5432,
})
//connect database with server
//pool is a class
//we create object and pass database configurations

//backend for sign-up
app.post('/sign_up',async (req,res)=>{
    console.log(req.body);

    // const resu=await pool.query('SELECT * from sign_up where user_id=$1',[req.body.user_id]);
    // console.log('hi'+resu.rows);
    // console.log(typeof resu.rows);
    // if(resu.rows.length!==0){
    //     res.json({status:'failure'});
    // }
    // else{
    //     const results=await pool.query('INSERT INTO sign_up VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[req.body.name,req.body.user_id,req.body.pass,req.body.cpass,req.body.dob,req.body.gender,req.body.contact,req.body.email_id]);
    //     console.log('hello'+results.rows);
    //     console.log(typeof results.rows);

    //     res.json({status:'success'});
    // }
    const response = await logicObj1.signUpValidation(req.body);
    res.json(response);

});

//backend for add trains
app.post('/add_trains',async (req,res)=>{
    console.log(req.body);
    try{
        const results=await pool.query('INSERT INTO train_details VALUES($1,$2,$3,$4,$5,$6,$7)',[req.body.train_no,req.body.train_name,req.body.src,req.body.dest,req.body.avail,req.body.freq,req.body.amount]);
        res.json({status:'success'});
        console.log(results);
    }
    catch(e){
        console.log(e);
        res.json({status:'failure'});
    }
});


//backend for delete trains
app.get('/delete_trains/:id',async (req,res)=>{
    console.log(req.params.id);
    try{
        const results=await pool.query('DELETE from train_details WHERE train_no=$1',[req.params.id]);
        if(results.rowCount===0){res.json({status:'failure'});}
        res.json({status:'success'});
        console.log(results);
    }
    catch(e){
        console.log(e);
        res.json({status:'failure'});
    }
});

//login
app.post('/login',async (req,res)=>{
    console.log(req.body);
    const u=req.body.user_id;
    const p=req.body.password;
    //let isadmin=false;
    //res.header('Access-Control-Allow-Origin','*');
    // if(u==='admin' && p==='admin'){
    //     isadmin=true;
    //     console.log('valid');
    //     res.json({status:'success',isadmin});
    // }
    // //isadmin=false;
    // const results=await pool.query('SELECT password FROM sign_up where user_id=$1',[u]);
    // console.log(results.rows);
    // //res.header('Access-Control-Allow-Origin','*');
    
    // if(results.rows.length>=1 && results.rows[0].password===p){
    //     console.log('valid');
    //     res.json({status:'success',isadmin});
    // }
    // else{
    //     console.log('invalid');
    //     res.json({status:'failure',isadmin});
    // }

    const response = await logicObj.loginValidation(u,p);
    res.json(response);

    const response1 = await logicObj2.adminValidation(u,p);
    res.json(response1);

});

(async ()=>{

    connection = await amqp.connect('amqp://localhost:5672');
    channel = await connection.createChannel()
    channel.assertQueue(queue,{durable:false});
})()
var connection
var channel, queue='ticket'

//ticket-booking
app.post('/ticket',async (req,res)=>{
    const output=req.body;
    console.log(req.body);
    try{
        let pnr=Math.floor(Math.random() * 10000000000) + 1;
        for(let obj of output){
            const results=await pool.query('INSERT INTO ticket VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)',[pnr,obj.train_no,obj.train_name,obj.src,obj.dest,obj.doj,obj.name,obj.gender,obj.berth,obj.mail_id,obj.amount]);
        }
        res.json({status:'success'});

        // await amqp.connect('amqp://localhost:5672').then(async (val)=>{
        // await val.createChannel().then(async (channel)=>{
        //     const queue='ticket';
        // channel.assertQueue(queue,{durable:false});
            const rb={pnr,data:req.body,sub:'Ticket Confirmation'};
            const msg=JSON.stringify(rb);  //key:notification
            channel.sendToQueue(queue,Buffer.from(msg));       //1
            console.log('message sent to queue');               //
 /*           axios.get('http://localhost:8069/').then((res)=>{
                console.log(res);
            }).catch((e)=>{
                console.log(e);
            }); */

    //     }).catch((error)=>{
    //         console.log('Error occured on Channel creation');
    //     })
    // }).catch((val)=>{
    //     console.log(val);
    // })

    //   //  transporter.sendMail(mailOptions, function(error, info){
    //         //if (error) {
    //           //console.log(error);
    //         //} else {
    //        //   console.log('Email sent: ' + info.response);
    //      //   }
    //    // });
    }
    catch(e){
        console.log(e);
        res.json({status:'failure'});
    }
});

//backend for searching an displaying trains+redis
app.post('/train_search_display',async (req,res)=>{
    console.log(req.body);
    const s=req.body.source;
    const d=req.body.destination;
    re.exists(s.toLowerCase()+d.toLowerCase()).then(async (value)=>{
        if(value===0){
            console.log('CACHE MISS');
            let results=await pool.query('SELECT train_no,train_name,source,destination,availability,amount FROM train_details where source=$1 and destination=$2',[s,d]);
            console.log(results.rows);
            if(results.rows.length===0){
                return res.json([]);
            }
           // for(let x of results.rows){
                await pool.query('update train_details set frequency=frequency+1 where source=$1 and destination=$2',[s,d]);
                const val=await pool.query("Select frequency from train_details where source=$1 and destination=$2",[s,d]);
            if(val.rows[0].frequency+1>=5){
                re.setEx(s.toLowerCase()+d.toLowerCase(),43200,JSON.stringify(results.rows));
                res.send(results.rows);
            }
            else{
                res.send(results.rows);
            }
        }
        else{
            console.log('CACHE HIT');
            re.get(s.toLowerCase()+d.toLowerCase()).then((value)=>{
                res.send(JSON.parse(value));
            }).catch((error)=>{
                console.log(error);
            });
        }
    });
});

app.listen(8081,(req,res)=>{
    console.log('server is listening');
});