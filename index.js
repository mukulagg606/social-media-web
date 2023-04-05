const express = require("express");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.static("./assets"));

app.use(expressLayouts);

//Extract styles and scripts from sub-pages into layout
app.set("layout extractStyles",true);
app.set("layout extractScripts",true);

// Use Express Router
app.use('/',require("./routes/index.js"));

//Set up the View Engine
app.set("view engine","ejs");
app.set("views","views");

app.listen(port,function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }
    console.log(`Server is running successfully on port ${port}`);
})