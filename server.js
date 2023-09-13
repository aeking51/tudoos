//Importing Modules
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const session = require('express-session');
const connectDB = require('./server/database/connection');
const passport = require('passport');

//for ExpressJS
const app = express();

//For json parsing
app.use(express.json());

//deault session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000*60*60*24*7
    }
    })
)
app.use(passport.initialize());
app.use(passport.session());


//Port Settings
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080

//Logging Requests
app.use(morgan('tiny'));

//MongoDB Connection
connectDB();

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));

//setting view engine
app.set('view engine', 'ejs');

//loading assets
app.use('/css', express.static(path.resolve(__dirname,'assets/css')));
app.use('/img', express.static(path.resolve(__dirname,'assets/img')));
app.use('/js', express.static(path.resolve(__dirname,'assets/js')));

//load routers
app.use('/',require('./server/routes/router'))


//Request listening and logging to console
app.listen(PORT,()=>{console.log('listening port on http://localhost:'+PORT)});
