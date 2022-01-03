const mongoose = require("mongoose");

const prizePoolSchema = new mongoose.Schema({
    amount: Number,
    status: Boolean,
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player"
    }
});

const PrizePool = mongoose.model('prizePool', prizePoolSchema);

module.exports = { PrizePool };