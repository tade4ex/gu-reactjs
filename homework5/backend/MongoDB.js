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
        this.collection(collectionName).save(data, callback);
    }

    collectionGetAll(collectionName, find, callback) {
        this.collection(collectionName).find(find).toArray(callback);
    }

    collectionGet(collectionName, find, callback) {
        this.collection(collectionName).findOne(find, callback);

    }

    collectionUsers(operation, data, callback) {
        const collectionName = "users";
        switch (operation) {
            case 'get-all':
                this.collectionGetAll(collectionName, data, callback);
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