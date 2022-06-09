const Joi=require('joi');
const logger=require('../Middleware/logger');
const authenticating=require('../Middleware/authenticating');
const debug=require('debug')('app:startup');

const config=require('config');
const morgan=require('morgan');
const helmet=require('helmet');
const express= require('express');
const app= express();
const courses=require('./routes/courses');
const home=require('./routes/home');
app.use('/',home);

app.set('view engine','pug');
app.set('views','./views'); //default


//Environment
// console.log(`NODE_ENV:${process.env.NODE_ENV}`);
// console.log(`app:${app.get('env')}`);


//Built in middleware function
app.use(express.json());//adding a piece of middleware //parsing of json object
app.use(express.urlencoded({ extended:true })); //parse incoming req with urlencoded  payloads
app.use(express.static('public'));//serves static assets such as html,css files
app.use('/api/courses',courses);

//created middleware function
app.use(logger);
app.use(authenticating);

//third party middleware
app.use(helmet());
//app.use(morgan('tiny')); 


//Configuration
console.log('Application Name: '+config.get('name'));
console.log('Mail Server: '+config.get('mail.host'));
console.log('Mail Password: '+config.get('mail.password'));


if (app.get('env')=='development') {
    app.use(morgan('tiny'));
    debug('Morgan enabled...');
}
//DB work
// dbDebugger('Connected to database');


const port=process.env.PORT ||3000;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}... `)
});