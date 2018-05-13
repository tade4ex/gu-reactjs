const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require("http");
const path = require('path');

const MongoDB = require("./MongoDB");
const ApiGet = require('./ApiGet');
const ApiPost = require('./ApiPost');

const User = require('./modules/User');
const Post = require('./modules/Post');
const Comment = require('./modules/Comment');

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
            // this.app.use(express.static(this.pathToFrontend));

            this.user = new User(this.mongoDB);
            this.post = new Post(this.mongoDB);
            this.comment = new Comment(this.mongoDB);
            this.apiGet = new ApiGet(this);
            this.apiPost = new ApiPost(this);

            this.posts();
            this.gets();
            this.server.listen(this.port, this.ip);


            console.log('server listen: ', `${this.ip}:${this.port}`);
        });
    }

    posts() {
        this.app.use('/api', this.apiPost.routes);
    }

    gets() {
        this.app.use('/api', this.apiGet.routes);

        this.app.get('*', (req, res) => {
            let param = req.params[0];
            param = param.split('/').slice(-1)[0];
            switch (param) {
                case 'app.js':
                    res.sendFile(path.resolve(__dirname, '../dist', 'app.js'));
                    break;
                case 'vendors.js':
                    res.sendFile(path.resolve(__dirname, '../dist', 'vendors.js'));
                    break;
                default:
                    res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
            }
            // res.sendFile(path.resolve(__dirname, '../dist', 'fonts', 'glyphicons-halflings-regular.eot'));
            // res.sendFile(path.resolve(__dirname, '../dist', 'fonts', 'glyphicons-halflings-regular.svg'));
            // res.sendFile(path.resolve(__dirname, '../dist', 'fonts', 'glyphicons-halflings-regular.ttf'));
            // res.sendFile(path.resolve(__dirname, '../dist', 'fonts', 'glyphicons-halflings-regular.wooff'));
            // res.sendFile(path.resolve(__dirname, '../dist', 'fonts', 'glyphicons-halflings-regular.wooff2'));
        });
    }
}

module.exports = Server;