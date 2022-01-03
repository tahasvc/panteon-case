const { connect, disconnect } = require("../config/db.config");
const { PrizePool } = require("../models/prizePool.model");
const { Pool } = require("../models/pool.model");
const logger = require("../logger/api.logger");

class PlayerRepository {
    constructor() {
        connect();
    }

    async getPrizeAll() {
        const prize = await PrizePool.find({ status: true });

        return prize;
    }

    async getPoolAll() {
        const pool = await Pool.find({});

        return pool;
    }

    async getPoolWithPlayerId(playerId) {
        const pool = await Pool.findOne({ player: playerId });

        return pool;
    }

    async getPool(filter) {
        const pool = await Pool.findOne(filter)

        return pool;
    }

    async addPool(pool) {
        let data = {};
        try {
            data = await Pool.create(pool);

            return data;
        } catch (error) {
            logger.error("Error::" + error);
        }
    }

    async sumOfAmount() {
        try {
            const data = await PrizePool.aggregate([
                {
                    $match: { status: true }
                },
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$amount",
                        }
                    }
                }
            ]).exec();

            if (data.length > 0)
                return data[0].total;

            return 0;
        } catch (error) {

        }
    }

    async addPrize(prize) {
        let data = {};
        try {
            data = await PrizePool.create(prize);
        } catch (error) {
            logger.error("Error::" + error);
        }
    }

    async updatePool(pool) {
        let data = {};
        try {
            data = await Pool.findByIdAndUpdate(pool.id, { money: pool.money });

            return data;
        } catch (error) {

        }
    }

    async removeAllPrizes() {
        try {
            await PrizePool.updateMany({}, { status: false });
        } catch (error) {

        }
    }
}

module.exports = new PlayerRepository();