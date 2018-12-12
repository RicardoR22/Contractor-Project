const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express()

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
// mongoose.connect('mongodb://localhost/charity-tracker');

const charity = require('./controllers/charities')(app);

module.exports = app;
// const Charity = mongoose.model('Charity', {
//     charityName: String,
//     donationAmount: Number,
//     date: { type: Date, default: Date.now}
// })

// //charities
// let charities = [
//   { title: "American Red Cross", charityTitle: "" },
//   { title: "St Judes", charityTitle: "" }
// ]


const port = process.env.PORT || 4000;
app.listen(port);

// app.listen(4000, () => {
//   console.log('App listening on port 4000!')
// })
