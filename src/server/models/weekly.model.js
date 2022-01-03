const mongoose = require("mongoose");

const weeklySchema = new mongoose.Schema({
    //stop weekly point
    status: Boolean,
    startDate: Date
});

const Weekly = mongoose.model('weekly', weeklySchema);

module.exports = { Weekly };