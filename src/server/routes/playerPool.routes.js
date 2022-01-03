const playerPoolService = require("../services/playerPool.service");

module.exports = (app) => {
    app.post('/api/addMoney', (req, res) => {
        playerPoolService.addPool(req.body).then(data => {
            res.status(200).send(data)
        });
    });

    app.get('/api/getTopList', (req, res) => {
        playerPoolService.getTopList(req.body).then(data => {
            res.status(200).send(data);
        });
    });
}