const playerPoolRepository = require("../repository/playerPool.repository");
const playerRepository = require("../repository/player.repository");
const { calculusValue, serviceResult, parseServiceResult } = require("../common/constants");
const logger = require("../logger/api.logger");
const { get, clearKey } = require("../services/cache");
class PlayerPoolRepository {

    async getPoolAll() {
        return await playerPoolRepository.getPoolAll();
    }

    async getPrizeAll() {
        return await playerPoolRepository.getPrizeAll();
    }

    async addPool(pool) {
        logger.info("addPool");

        if (pool.player == null)
            return { ...serviceResult, msg: "player not found", result: false };
        const currentPool = await playerPoolRepository.getPool({ player: pool.player });
        let data;
        if (currentPool) {
            currentPool.money += pool.money;
            data = await playerPoolRepository.updatePool(currentPool);
        }

        else
            data = await playerPoolRepository.addPool(pool);

        const prize = { amount: calculusValue(data.money), player: data.player, status: true }

        await this.addPrize(prize);
        clearKey("getTopList");
        return { ...serviceResult, msg: "OK" }
    }

    async addPrize(prize) {
        return await playerPoolRepository.addPrize(prize);
    }

    async calculateWeeklyPool() {
        let topList = await this.getTopList();

        let totalAmount = await playerPoolRepository.sumOfAmount();

        if (topList.data.length > 0) {
            topList = topList.data;
            let totalPlayer = topList.length;

            topList.forEach(async (item, index) => {
                const player = await playerPoolRepository.getPoolWithPlayerId(item.player);

                if (item.rank == 1) {
                    let prizeAmount = totalAmount * 0.2;
                    player.money += prizeAmount
                    totalAmount -= prizeAmount;
                }
                else if (item.rank == 2) {
                    let prizeAmount = totalAmount * 0.15;
                    player.money += prizeAmount
                    totalAmount -= prizeAmount;
                }
                else if (item.rank == 3) {
                    let prizeAmount = totalAmount * 0.1;
                    player.money += prizeAmount
                    totalAmount -= prizeAmount;
                }
                else if (item.rank == 4) {
                    totalAmount = totalAmount / (totalPlayer - index);
                    player.money += totalAmount;

                }
                else {
                    player.money += totalAmount;
                }

                playerPoolRepository.updatePool(player);
            });

            playerPoolRepository.removeAllPrizes();

            clearKey("getTopList");
        }
    }

    async getTopList() {
        const getTopList = await get("getTopList");
        const oldGetTopList = await get("getTopList_old");

        if (!getTopList) {
            let pools = await playerPoolRepository.getPoolAll();

            if (pools.length == 0)
                return;

            pools.sort((x, y) => y.money - x.money);

            for (let index = 0; index < pools.length; index++) {

                if (index == 100)
                    break;

                const pool = pools[index];
                const player = await playerRepository.getPlayerWithId(pool.player);
                let totalMoney = pool.money;
                let playerWithRank = pools.filter(_ => _.money == totalMoney);
                pool._doc = { ...pool._doc, player: player }

                for (let pool of playerWithRank) {
                    pool._doc = { ...pool._doc, rank: index + 1 };
                    pool.money = parseInt(pool.money);
                }
                // pool._doc = { ...pool._doc, dailyDiff: 1 };
                index += playerWithRank.length - 1;
            }
            if (!oldGetTopList)
                pools.cache({ key: "getTopList_old", expire: false });
            else
                pools = await this.dailyDiff(pools);

            return parseServiceResult(pools.cache({ key: "getTopList", expire: false }));
        }

        return parseServiceResult(getTopList);
    }

    async dailyDiff(pools) {
        const oldPools = await get("getTopList_old");

        pools.forEach(item => {
            let pool = oldPools.find(_ => _._id == item.id);
            if (pool != null) {
                item._doc = { ...item._doc, dailyDiff: pool.rank - item._doc.rank }
            }
            else {
                item._doc = { ...item._doc, dailyDiff: 0 }
            }
        });

        clearKey("getTopList_old");
        pools.cache({ key: "getTopList_old", expire: false });

        return pools;
    }
}

module.exports = new PlayerPoolRepository();