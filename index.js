const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const customMiddleware = require("./config/middleware");
//Used for session-cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const passportGoogle = require("./config/passport-google-oauth2-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");

//Setup the chat server to be used with socket.io
const chatServer = require("http").Server(app);
const chatSockets = require("./config/chat_sockets").chatSockets(chatServer);
const io = require("socket.io")(chatServer, {
    cors: {
      origin: "http://localhost:8000",
      methods: ["GET", "POST"]
    }
  });

chatServer.listen(5000);
console.log("Chat Server is listening on port 5000");

app.use(sassMiddleware({
    src:"./assests/scss",
    dest:"./assests/css",
    debug:true,
    outputStyle:'expanded',
    prefix:"/css"
}))

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static(__dirname + '/assests'));

app.use(expressLayouts);
app.use('/uploads',express.static(__dirname+'/uploads'));

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
app.use(flash());
app.use(customMiddleware.setFlash);

// Use Express Router
app.use('/',require("./routes/index.js"));

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running successfully on port ${port}`);
})