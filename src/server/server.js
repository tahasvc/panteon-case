const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const cors = require("cors");

require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 3000;



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());

require("./services/cache").applyCache();
const poolService = require("./services/playerPool.service")

//routes
require("./routes/player.routes")(app);
require("./routes/playerPool.routes")(app);

app.get('/', (req, res) => {
    res.send('<h1>Hello Panteon</h1>');
});

const server = app.listen(port, () => {
    console.log(`Server listening on the port ${port}`);
});

const io = socketIo(server, { cors: { origin: "*" } });
require("./services/socket.service")(io);

const schedule = require('node-schedule');

//run once a week
schedule.scheduleJob('1 1 * * 1', () => {
    poolService.calculateWeeklyPool();
});