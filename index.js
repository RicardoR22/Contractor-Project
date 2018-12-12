const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express()

//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost/charity-tracker');

const charity = require('./controllers/charities')(app);
const donation = require('./controllers/donations')(app);


module.exports = app;



const port = process.env.PORT || 4000;
app.listen(port);

// app.listen(4000, () => {
//   console.log('App listening on port 4000!')
// })
