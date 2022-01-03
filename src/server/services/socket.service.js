const playerPoolService = require("../services/playerPool.service");

let interval;
const getApiAndEmit = async (socket) => {
    const response = await playerPoolService.getTopList();
    // Emitting a new message. Will be consumed by the client
    socket.emit("getTopListEmit", response);
};

module.exports = (io) => {
    io.on("connection", (socket) => {
        console.log("New client connected");
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(() => getApiAndEmit(socket), 1000);
        socket.on("disconnect", () => {
            console.log("Client disconnected");
            clearInterval(interval);
        });
    });
}