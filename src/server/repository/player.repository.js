const { connect } = require("../config/db.config");
const { Player } = require("../models/player.model");
const logger = require("../logger/api.logger");

class PlayerRepository {
    constructor() {
        connect();
    }

    async getPlayer() {
        const player = await Player.find()

        return player;
    }

    async getPlayerWithId(id) {
        const player = await Player.findOne({ _id: id })

        return player;
    }

    async createPlayer(player) {
        let data = {};
        try {
            data = await Player.create(player);
        } catch (error) {
            logger.error("Error::" + error);
        }
    }

    async updatePlayer(player) {
        let data = {};
        try {
            data = await Player.updateOne(player);
        } catch (error) {
            logger.error("Error::" + error);
        }
    }

    async deletePlayer(playerId) {
        let data = {};
        try {
            data = await Player.deleteOne({ _id: playerId });
        } catch (error) {
            logger.error("Error::", error);
        }
    }
}

module.exports = new PlayerRepository();