const mongoose = require('mongoose');
const Attempt = require('Attempt')

const DaySchema = new mongoose.Schema({
    date: Date,
    attempts: [Attempt]
});

const Day = mongoose.model('Day', DaySchema);

module.exports = Day