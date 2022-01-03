const playerRepository =  require("../repository/player.repository");

class PlayerService {
    constructor() { }

    async getPlayer() {
        return await playerRepository.getPlayer();
    }

    async createPlayer(player) {
        return await playerRepository.createPlayer(player);
    }

    async updatePlayer(player) {
        return await playerRepository.updatePlayer(player);
    }

    async deletePlayer(playerId) {
        return await playerRepository.deletePlayer(playerId);
    }
}

module.exports = new PlayerService();