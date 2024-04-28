require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
// Const for development

const app = express();
const port = process.env.PORT || 4000;
const dbUri = process.env.DB_URI;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:"key",
    resave: false,
    saveUninitialized: true
}))
app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

// Engine views
app.set('engine views','ejs');

routeUser = require('./routes/index.routes');
app.use('',routeUser);



app.listen(port,()=>console.log(`Server is running a PORT ${port}`))
app.get('/',(req,res)=>{
    res.send('Hello World');
})
mongoose.connect(dbUri);
const dbConnection = mongoose.connection;
dbConnection.on('error',(err)=>console.log('Issues in the DB connection: ',err));
dbConnection.once('open',()=>console.log('Connection to DB succesful'));

