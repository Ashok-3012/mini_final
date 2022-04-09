const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const app = express();
//import axios from 'axios';

app.use(bodyParser.json());

const amqp = require('amqplib');

//mail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ashoksrinivasan608@gmail.com',
        pass: 'zdzognlyjkfcheqn'
    }
});

const mailOptions = {
    from: 'ashoksrinivasan608@gmail.com',
    to: 'ashoksrinivasan3012@gmail.com',
    subject: 'Ticket Confirmation',
    text: 'Dear passenger!, your ticket is booked'
};

(async () => {

    connection = await amqp.connect('amqp://localhost:5672');
    channel = await connection.createChannel()
    channel.assertQueue(queue, { durable: false });

    //channel.assertQueue(queue,{durable:false});
    channel.consume(queue,(msg) => {
        console.log(JSON.parse(msg.content));
        MailSend(msg);
        channel.ack(msg);} )
})()
var connection
var channel, queue = 'ticket'
function MailSend(msg) {
    const ms = JSON.parse(msg.content);
    console.log(ms);
    for (let x of ms.data) {
        let txt='';
        if(ms.sub==='Ticket Notification') {
            txt='Dear Passenger!Notification for tomorrow journey';
        }
        else{
            txt='Dear passenger!, your ticket is booked' + '\n' + "PNR No:" + ms.pnr + '\n' + "train_no:" + x.train_no + '\n' + "train_name:" + x.train_name + '\n' + "source:" + x.src + '\n' + "destination:" + x.dest + '\n' + "Passenger name:" + x.name + '\n' + "Gender:" + x.gender + '\n' + "Berth Preference:" + x.berth;
        }
        mailOptions.to = x.mail_id;
        mailOptions.subject=ms.sub;
        mailOptions.text =txt;
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
}


// app.get('/', async (req, res) => {
//     await amqp.connect('amqp://localhost:5672').then(async (val) => {
//         await val.createChannel().then(async (channel) => {
//             const queue = 'ticket';
//             channel.assertQueue(queue, { durable: false });
//             channel.consume(queue, (msg) => {
//                 console.log(JSON.parse(msg.content));
//                 channel.ack(msg);
//                 // const ms=JSON.parse(msg.content);
//                 // for(let x of ms.data){
//                 //     console.log(x);
//                 //     mailOptions.to=x.mail_id;
//                 //     mailOptions.text='Dear passenger!, your ticket is booked'+'\n'+"PNR No:"+ms.pnr+'\n'+"train_no:"+x.train_no+'\n'+"train_name:"+x.train_name+'\n'+"source:"+x.src+'\n'+"destination:"+x.dest+'\n'+"Passenger name:"+x.name+'\n'+"Gender:"+x.gender+'\n'+"Berth Preference:"+x.berth;
//                 //     transporter.sendMail(mailOptions, function(error, info){
//                 //         if (error) {
//                 //           console.log(error);
//                 //         } else {
//                 //           console.log('Email sent: ' + info.response);
//                 //         }
//                 //     });
//                 // }
//                 // MailSend(msg);
//                 console.log("End of function")
//             })
//         }).catch((error) => {
//             console.log('Error occured on Channel creation');
//         })
//     }).catch((val) => {
//         console.log(val);
//     })
//     return res.json("See Console");
// })

app.listen(8070);