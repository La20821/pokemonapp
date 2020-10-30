const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}))

app.use('/pokemon', require('./controllers/pokemonControllers'));
app.use("/player", require("./controllers/playersController.js"));
app.use(express.static('public'));

 








  
  

  
  
var port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log("listening");
});