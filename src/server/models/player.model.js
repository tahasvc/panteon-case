const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: String,
    country: String,
    rank: Number,
    prize: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "playerPrize"
    }]
},
    { timestamps: { createDate: 'created_at', updateDate: 'updated_at' } });

const Player = mongoose.model('player', playerSchema);

module.exports = { Player };