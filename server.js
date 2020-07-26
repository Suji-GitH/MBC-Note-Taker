//npm package express
const express = require("express");

//creat express server
const app = express();

//set up port 
const PORT = process.env.PORT || 8080;

//express to handle data parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//router
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//listener
app.listen(PORT, () => {
    console.log(`App listening on Port: ${PORT}`) 
});