// donation.js

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Donation = mongoose.model('Donation', {
    donationAmount: Number,
    date: { type: Date, default: Date.now},
    charityId: { type: Schema.Types.ObjectId, ref: 'Charity' }
});

module.exports = Donation;
