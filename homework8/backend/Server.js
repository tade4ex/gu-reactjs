const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const http = require("http");
const path = require('path');

const MongoDB = require("./MongoDB");
const ApiGet = require('./ApiGet');
const ApiPost = require('./ApiPost');

const User = require('./models/User');
const Post = require('./models/Post');
const Comment = require('./models/Comment');

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
            if (
                /* get *.js, *.css, *.css.map */
                /^.*\.js$/.test(param)
                || /^.*\.css$/.test(param)
                || /^.*\.css.map$/.test(param)
            ) {
                let fileName = param.split('/').slice(-1)[0];
                res.sendFile(path.resolve(__dirname, '../dist', fileName));
            } else {
                /* reactjs roter */
                res.sendFile(path.resolve(__dirname, '../dist', 'index.html'));
            }
        });
    }
}

module.exports = Server;