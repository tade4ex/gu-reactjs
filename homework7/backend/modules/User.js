const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
    constructor(db) {
        this.db = db;
    }

    genPassword(password) {
        let salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(password, salt);
    }

    checkPassword(password, password_hash) {
        return bcrypt.compareSync(password, password_hash);
    }

    add(data, callback) {
        /* todo check email duplicate */
        data.password = this.genPassword(data.password);
        this.db.collectionUsers('save', data, (err, result) => {
            callback(result);
        });
    }

    get(userId, callback) {
        this.db.collectionUsers('get', {'_id': new ObjectID(userId)}, (err, result) => {
            callback(result);
        });
    }

    authorization(email, password, postRes, callback) {
        let authorization = false;
        this.db.collectionUsers('get', {email: email}, (err, result) => {
            if (err) return console.log(err);
            if (this.checkPassword(password, result.password)) {
                authorization = true;
                postRes.cookie('email', result.email, { maxAge: 900000, httpOnly: true });
                postRes.cookie('password', result.password, { maxAge: 900000, httpOnly: true });
                return callback(authorization);
            }
            return callback(authorization);
        });
    }

    checkAuthorizationUser(cookies, callback) {
        if (cookies.email != null && cookies.password != null) {
            this.db.collectionUsers('get', {email: cookies.email, password: cookies.password}, (err, result) => {
                if (err) {
                    return callback(null);
                }
                return callback(result);
            });
        } else {
            callback(null);
        }
    }

    checkAuthorization(cookies, callback) {
        let authorization = false;
        if (cookies.email != null && cookies.password != null) {
            this.db.collectionUsers('get', {email: cookies.email, password: cookies.password}, (err, result) => {
                if (err) {
                    return callback(authorization);
                }
                if (result != null) {
                    authorization = true;
                    return callback(authorization);
                }
                return callback(authorization);
            });
        } else {
            return callback(authorization);
        }
    }

    getAll(page, limit, callback) {
        this.db.collectionUsers('count', {}, (count) => {
            if (count > 0) {
                this.db.collectionUsers('get-all', {
                    skip: (page - 1) * limit,
                    limit: limit
                }, (err, result) => {
                    callback({
                        page: 1,
                        lastPage: Math.ceil(count / limit),
                        users: result
                    });
                });
            } else {
                callback({
                    page: 1,
                    lastPage: 1,
                    users: []
                });
            }
        });
    }
}

module.exports = User;