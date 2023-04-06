const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");

//Used for session-cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");


app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(__dirname + '/assests'));

app.use(expressLayouts);

//Extract styles and scripts from sub-pages into layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

//Set up the View Engine
app.set("view engine","ejs");
app.set("views","views");

app.use(session({
    name:'socialz',
    secret:'something',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(100*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost:27017/social_media_web',
        autoRemove:'disabled'
    }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Use Express Router
app.use('/',require("./routes/index.js"));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running successfully on port ${port}`);
})