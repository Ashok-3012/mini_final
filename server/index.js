const express=require('express');
const app=express();
const body=require('body-parser');
//const Redis=require('redis');
const cors=require('cors');
const morgan=require('morgan');
app.use(cors);
app.use(body.json());
app.use(morgan('combined'));


app.get('/abort',(req,res)=>{
    res.send('hi');
});




app.listen(8080,(req,res)=>{
    console.log('server is listening');
});