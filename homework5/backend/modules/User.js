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

    authorization(email, password, callback) {
        this.db.collectionUsers('get', {email: email}, (err, result) => {
            if (err) return console.log(err);
            if (this.checkPassword(password, result.password)) {
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
}

module.exports = User;