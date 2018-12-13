//charities.js
const Charity = require('../models/charity');
const Donation = require('../models/donation');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

module.exports = function(app) {
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(methodOverride('_method'));

//Index
  app.get('/', (req, res) => {
    Charity.find()
      .then(charities => {
        res.render('charities-index', {charities: charities});
      })
      .catch(err => {
        console.log(err);
      });
  });

  // New
  app.get('/charities/new', (req, res) => {
      res.render('charities-new', {});
  })

  //show
  app.get('/charities/:id', (req, res) => {
      Charity.findById(req.params.id).then((charity) => {
          // fetch its comments
        Donation.find({ charityId: req.params.id }).then(donations => {
          // respond with the template with both values
          res.render('charities-show', { charity: charity, donations: donations })
        })
      }).catch((err) => {
        console.log(err.message);
      })
  });

  // Create
  app.post('/charities', (req, res) => {
      Charity.create(req.body).then(charity => {
          console.log(charity);
          res.redirect(`/charities/${charity._id}`);
      }).catch((err) => {
          console.log(err.message);
      })
  })

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

  // DELETE
  app.delete('/charities/:id', function (req, res) {
      console.log("DELETE Charity")
      Charity.findByIdAndRemove(req.params.id).then((charity) => {
          res.redirect('/');
      }).catch((err) => {
          console.log(err.message)
      })
  })

}
