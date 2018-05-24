const express = require('express');
const apiRouter = express.Router();


class ApiGet {
    constructor(server) {
        this.server = server;
        this.routes = apiRouter;
        this.routes.get('/authorization', this.getAuthorization.bind(this));
        this.routes.get('/authorization_user', this.getAuthorizationUser.bind(this));
        this.routes.get('/logout', this.getLogout.bind(this));
        this.routes.get('/post/:id', this.getPost.bind(this));
        this.routes.get('/user/:id', this.getUser.bind(this));
    }

    getAuthorization(req, res) {
        this.server.user.checkAuthorization(req.cookies, (result) => {
            res.json(result);
        });
    }

    getAuthorizationUser(req, res) {
        this.server.user.checkAuthorizationUser(req.cookies, (result) => {
            res.json(result);
        });
    }

    getPost(req, res) {
        this.server.post.get(req.params.id, (result) => {
            res.json(result);
        });
    }

    getUser(req, res) {
        this.server.user.get(req.params.id, (result) => {
            res.json(result);
        });
    }

    getLogout(req, res) {
        res.clearCookie('email');
        res.clearCookie('password');
        res.json({});
    }
}

module.exports = ApiGet;