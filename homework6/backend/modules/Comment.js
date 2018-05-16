const ObjectID = require('mongodb').ObjectID;

class Post {
    constructor(db) {
        this.db = db;
    }

    add(data, callback) {
        this.db.collectionComments('save', data, (err, result) => {
            this.db.collectionComments('count', {postId: data.postId}, (count) => {
                this.db.collectionPosts('update', {
                    query: {_id: new ObjectID(data.postId)},
                    newValues: {
                        $set: {
                            commentsCount: count
                        }
                    }
                }, (err) => {
                    console.log(err);
                    callback(result);
                });
            });
        });
    }

    getAll(postId, callback) {
        this.db.collectionComments('count', {}, (count) => {
            if (count > 0) {
                this.db.collectionComments('get-all', {
                    postId: postId
                }, (err, result) => {
                    callback({
                        count: count,
                        data: result
                    });
                });
            } else {
                callback({
                    data: []
                });
            }
        });
    }
}

module.exports = Post;