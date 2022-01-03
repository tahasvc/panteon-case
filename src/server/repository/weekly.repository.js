const { connect } = require("../config/db.config");
const { Weekly } = require("../models/weekly.model");
const logger = require("../logger/api.logger");

class WeeklyRepository {
    constructor() {
        connect();
    }

    async getStartWeek() {
        const prize = await Weekly.findOne({});

        return prize;
    }

    async addStartWeek(week) {
        let data = {};
        try {
            data = await Weekly.create(week);

            return data;
        } catch (error) {
            logger.error("Error::" + error);
        }
    }

    async updateStartWeek(week) {
        let data = {};
        try {
            data = await Weekly.updateOne(week);
        } catch (error) {
            logger.error("Error::" + error);
        }
    }
}

module.exports = new WeeklyRepository();