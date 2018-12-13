const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();
const charity = require('./controllers/charities')(app);
const donation = require('./controllers/donations')(app);


// const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost/charity-tracker');
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
// app.listen(port);
app.use(express.static('public'));


module.exports = app;






// app.listen(4000, () => {
//   console.log('App listening on port 4000!')
// })
