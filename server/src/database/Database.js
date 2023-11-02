const mysql = require('mysql2');
const dbauth = require('./db-auth');

class Database {

    #conn;

    constructor() {
        this.#conn = mysql.createConnection({
            host: dbauth.host,
            user: dbauth.user,
            password: dbauth.password,
            database: dbauth.database,
        });
    }

    connect() {
        this.#conn.connect((err) => {
            if (err) {
                console.log("Unable to connecto to DB!", err)
            } else {
                console.log("Connection to DB established!")
            }
        })
    }

    query(sql) {

        const result = this.#conn.query(sql, function (err, result) {
            console.log(result)
        })
    }

    endConnection() {
        this.#conn.end();
    }
}

module.exports = Database