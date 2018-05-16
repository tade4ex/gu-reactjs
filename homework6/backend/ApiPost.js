const express = require('express');
const apiRouter = express.Router();


class ApiPost {
    constructor(server) {
        this.server = server;
        this.routes = apiRouter;
        this.routes.post('/authorization', this.postAuthorization.bind(this));

        this.routes.post('/posts-all', this.postPostsAll.bind(this));
        this.routes.post('/post-add', this.postPostAdd.bind(this));

        this.routes.post('/user-add', this.postUserAdd.bind(this));
        this.routes.post('/users-all', this.postUserAll.bind(this));

        this.routes.post('/comments-all', this.postCommentAll.bind(this));
        this.routes.post('/comment-add', this.postCommentAdd.bind(this));
    }

    postAuthorization(req, res) {
        this.server.user.authorization(req.body.email, req.body.password, res, (result) => {
            res.json(result);
        });
    }

    postPostsAll(req, res) {
        this.server.post.getAll(req.body.page, req.body.limit, (result) => {
            res.json(result);
        });
    }

    postPostAdd(req, res) {
        this.server.post.add(req.body, (result) => {
            res.json(result);
        });
    }

    postUserAll(req, res) {
        this.server.user.getAll(req.body.page, req.body.limit, (result) => {
            res.json(result);
        });
    }

    postUserAdd(req, res) {
        this.server.user.add(req.body, (result) => {
            res.json(result);
        });
    }

    postCommentAll(req, res) {
        this.server.comment.getAll(req.body.postId, (result) => {
            res.json(result);
        });
    }

    postCommentAdd(req, res) {
        this.server.comment.add(req.body, (result) => {
            res.json(result);
        });
    }
}

module.exports = ApiPost;