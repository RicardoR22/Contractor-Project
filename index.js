const express = require('express')
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')

const app = express()


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'))
mongoose.connect('mongodb://localhost/charity-tracker');


const Charity = mongoose.model('Charity', {
    charityName: String,
    donationAmount: Number,
    date: { type: Date, default: Date.now}
})

// //charities
// let charities = [
//   { title: "American Red Cross", charityTitle: "" },
//   { title: "St Judes", charityTitle: "" }
// ]


//index
app.get('/', (req, res) => {
    Charity.find().then(charities => {
        res.render('charities-index', {charities: charities});
    }).catch(err => {
        console.log(err);
    })
})

// New
app.get('/charities/new', (req, res) => {
    res.render('charities-new', {});
})

// Create
app.post('/charities', (req, res) => {
    Charity.create(req.body).then((charity) => {
        console.log(charity);
        res.redirect(`/charities/${charity._id}`);
    }).catch((err) => {
        console.log(err.message);
    })
})

//show
app.get('/charities/:id', (req, res) => {
    Charity.findById(req.params.id).then((charity) => {
      res.render('charities-show', { charity: charity })
    }).catch((err) => {
      console.log(err.message);
    })
});

// EDIT
app.get('/charities/:id/edit', (req, res) => {
  Charity.findById(req.params.id, function(err, charity) {
    res.render('charities-edit', {charity: charity});
  })
})

// UPDATE
app.put('/charities/:id', (req, res) => {
  Charity.findByIdAndUpdate(req.params.id, req.body)
    .then(charity => {
      res.redirect(`/charities/${charity._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

app.listen(4000, () => {
  console.log('App listening on port 4000!')
})
