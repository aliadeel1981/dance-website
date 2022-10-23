const exp = require("constants");
const express = require("express")
const path = require("path")
const app = express()
const port = 8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance');
const bodyparser = require('body-parser')



//Define mongoose schema

var contactSchema = new mongoose.Schema({
    Name: String,
    phone: String,
    email: String,
    address: String
  });

  var contact = mongoose.model('contact', contactSchema);

// Express specific stuff
app.use('/static', express.static('static')) // for serving static files
app.use(express.urlencoded())


//Pug specific stuff


app.set('view engine','pug')
app.set('views', path.join(__dirname,'views')) // set the views directory

//end points
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params)
})
// Contact end point
app.get('/contact', (req, res)=>{
    const params = {}
    res.status(200).render('contact.pug', params)
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body)
    mydata.save().then(() => {
        res.send("This data has been saved to the database")
    }).catch(() => {
        res.status(400).send("This Item was not saved to the database")
    });
    // res.status(200).render('contact.pug')
})

// start the server
app.listen(port, ()=>{
    console.log(`The server is running on ${port}`)
})