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

    static checkPassword(password, password_hash) {
        return bcrypt.compareSync(password, password_hash);
    }

    add(data, callback) {
        /* todo check email duplicate */
        data.password = this.genPassword(data.password);
        this.db.collectionUsers('save', data, (err, result) => {
            callback(result);
        });
    }


    authorization(email, password, callback) {
        this.db.collectionUsers('get', {email: email}, (err, result) => {
            if (err) return console.log(err);
            if (User.checkPassword(password, result.password)) {
                return callback(true, result);
            }
            return callback(false, null);
        });
    }

    checkAuthorization(cookies, callback) {
        if (cookies.email != null && cookies.password != null) {
            this.db.collectionUsers('get', {email: cookies.email, password: cookies.password}, (err, result) => {
                if (err) return console.log(err);
                return callback(result);
            });
        } else {
            return callback(null);
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

module.exports = User;