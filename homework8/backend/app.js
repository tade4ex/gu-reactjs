const config = require("../server-config");
const Server = require("./Server");

let server = new Server(config);
server.start();