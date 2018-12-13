// donations.js
const Charity = require('../models/charity');
const Donation = require('../models/donation');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(methodOverride('_method'));

  // CREATE Comment
  app.post('/charities/donations', (req, res) => {
    Donation.create(req.body).then(donation => {
      res.redirect(`/charities/${donation.charityId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });

  // DELETE
app.delete('/charities/donations/:id', function (req, res) {
  console.log("DELETE Donation")
  Donation.findByIdAndRemove(req.params.id).then((donation) => {
    res.redirect(`/charities/${donation.charityId}`);
  }).catch((err) => {
    console.log(err.message);
  })
})


}
