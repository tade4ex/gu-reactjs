const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require("http");
const MongoDB = require("./MongoDB");

const User = require('./modules/User');

class Server {
    constructor(config) {
        this.ip = config.http.ip;
        this.port = config.http.port;
        this.pathToFrontend = config.http.pathToFrontend;
        this.mongoDB = new MongoDB(config);
    }

    start() {
        this.mongoDB.connect(() => {
            this.app = express();
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(cookieParser());
            this.server = http.createServer(this.app);
            this.app.use(express.static(this.pathToFrontend));

            this.user = new User(this.mongoDB);


            this.posts();
            this.gets();
            this.server.listen(this.port, this.ip);


            console.log('server listen: ', `${this.ip}:${this.port}`);
        });
    }

    posts() {
        this.app.post('/api/:action', (req, res) => {
            switch (req.params.action) {
                case 'authorization':
                    this.user.authorization(req.body.email, req.body.password, (authorization, data) => {
                        if (authorization === true) {
                            res.cookie('email', data.email, { maxAge: 900000, httpOnly: true });
                            res.cookie('password', data.password, { maxAge: 900000, httpOnly: true });
                        }
                        res.json({authorization: authorization});
                    });
                    break;
            }
        });
    }

    gets() {
        this.app.get('/api/:action', (req, res) => {
            switch (req.params.action) {
                case 'authorization':
                    this.user.checkAuthorization(req.cookies, (result) => {
                        res.json(result);
                    });
                    break;
                case 'logout':
                    res.clearCookie('email');
                    res.clearCookie('password');
                    res.json({});
                    break;
            }
        });
    }
}

module.exports = Server;