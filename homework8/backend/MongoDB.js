const MongoClient = require('mongodb').MongoClient;

class MongoDB {
    constructor(config) {
        this.ip = config.mongodb.ip;
        this.port = config.mongodb.port;
        this.dbName = config.mongodb.dbName;
        this.url = `mongodb://${this.ip}:${this.port}/${this.dbName}`;
    }

    connect(server) {
        MongoClient.connect(this.url, (err, client) => {
            if (err) return console.log(err);
            this.db = client.db(this.dbName);
            server();
        });
    }

    collection(collectionName) {
        return this.db.collection(collectionName);
    }

    collectionSave(collectionName, data, callback) {
        this.collection(collectionName).insert(data, callback);
    }

    collectionGet(collectionName, find, callback) {
        this.collection(collectionName).findOne(find, callback);
    }

    collectionDelete(collectionName, data, callback) {
        this.collection(collectionName).deleteOne(data.query, callback);
    }

    collectionUpdate(collectionName, data, callback) {
        this.collection(collectionName).updateOne(data.query, data.newValues, callback);
    }

    getCount(collectionName, find, callback) {
        this.collection(collectionName).find(find).toArray(callback);
    }

    collectionUsers(operation, data, callback) {
        const collectionName = "users";
        switch (operation) {
            case 'count':
                this.getCount(collectionName, data, (err, result) => {
                    if (err) return callback(0);
                    return callback(result.length);
                });
                break;
            case 'get-all':
                this.collection(collectionName).find().skip(data.skip).limit(data.limit).toArray(callback);
                break;
            case 'get':
                this.collectionGet(collectionName, data, callback);
                break;
            case 'save':
                this.collectionSave(collectionName, data, callback);
                break;
            case 'update':
                this.collectionUpdate(collectionName, data, callback);
                break;
            case 'delete':
                this.collectionDelete(collectionName, data, callback);
                break;
        }
    }

    collectionPosts(operation, data, callback) {
        const collectionName = "posts";
        switch (operation) {
            case 'count':
                this.getCount(collectionName, data, (err, result) => {
                    if (err) return callback(0);
                    return callback(result.length);
                });
                break;
            case 'get-all':
                this.collection(collectionName).find().sort({createDateTime: -1}).skip(data.skip).limit(data.limit).toArray(callback);
                break;
            case 'get':
                this.collectionGet(collectionName, data, callback);
                break;
            case 'save':
                this.collectionSave(collectionName, data, callback);
                break;
            case 'update':
                this.collectionUpdate(collectionName, data, callback);
                break;
        }
    }

    collectionComments(operation, data, callback) {
        const collectionName = "comments";
        switch (operation) {
            case 'count':
                this.getCount(collectionName, data, (err, result) => {
                    if (err) return callback(0);
                    return callback(result.length);
                });
                break;
            case 'get-all':
                this.collection(collectionName).find({postId: data.postId}).sort({createDateTime: -1}).toArray(callback);
                break;
            case 'get':
                this.collectionGet(collectionName, data, callback);
                break;
            case 'save':
                this.collectionSave(collectionName, data, callback);
                break;
        }
    }
}

module.exports = MongoDB;