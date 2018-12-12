// models/charity.js

const mongoose = require('mongoose');

const Charity = mongoose.model('Charity', {
    charityName: String,
    donationAmount: Number,
    date: { type: Date, default: Date.now}
});

module.exports = Charity;
