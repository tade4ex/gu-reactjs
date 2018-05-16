const ObjectID = require('mongodb').ObjectID;

class Post {
    constructor(db) {
        this.db = db;
    }

    add(data, callback) {
        this.db.collectionPosts('save', data, (err, result) => {
            callback(result);
        });
    }

    get(postId, callback) {
        this.db.collectionPosts('get', {'_id': new ObjectID(postId)}, (err, result) => {
            callback(result);
        });
    }

    getAll(page, limit, callback) {
        this.db.collectionPosts('count', {}, (count) => {
            if (count > 0) {
                this.db.collectionPosts('get-all', {
                    skip: (page - 1) * limit,
                    limit: limit
                }, (err, result) => {
                    callback({
                        page: 1,
                        lastPage: Math.ceil(count / limit),
                        data: result
                    });
                });
            } else {
                callback({
                    page: 1,
                    lastPage: 1,
                    data: []
                });
            }
        });
    }

}

module.exports = Post;