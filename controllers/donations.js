// donations.js
const Charity = require('../models/charity');
const Donation = require('../models/donation');

module.exports = (app) => {

  // CREATE Comment
  app.post('/charities/donations', (req, res) => {
    Donation.create(req.body).then(donation => {
      res.redirect(`/charities/${donation.charityId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });


}
