const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
    money: Number,
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "player"
    }
});

const Pool = mongoose.model("pool", poolSchema);

module.exports = { Pool };