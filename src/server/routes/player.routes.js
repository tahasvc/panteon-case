const playerService = require("../services/player.service");

module.exports = (app) => {
    app.get('/api/players', async (req, res) => {
        playerService.getPlayer().then(data => res.json(data));
    });

    app.post("/api/player", async (req, res) => {
        playerService.createPlayer(req.body.player).then(data => res.json(data));
    });
}