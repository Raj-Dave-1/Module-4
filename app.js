// Dada Ki Jay Ho


const http = require('http');

const routes = require("./routes");

const server = http.createServer(routes);


server.on("connection", (stream) => {
    console.log("Someone is connected");
});

server.listen(3000);


