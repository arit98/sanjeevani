var mysql = require('mysql');
var conn = require('../config/dbconfig');

class Address {

    create(data, callback) {
        var sql = `INSERT INTO user_address(user_id,pincode, state_id,city_name,landmark,address,created_at) VALUES (
            ${mysql.escape(data.user_id)},
            ${mysql.escape(data.pincode)},
            ${mysql.escape(data.state_id)},
            ${mysql.escape(data.city_name)},
            ${mysql.escape(data.landmark)},
            ${mysql.escape(data.address)},
            NOW()
            )`;
        // console.log(sql)
        conn.query(sql, (err, result) => {

            if (err) throw err;

            if (result.insertId) {
                callback(false, result)
            }
            else {
                callback(true, null);
            }
        })
    }

    show(id, callback) {
        if (id) {
            var sql = `SELECT * FROM user_address WHERE user_id=?`;
            conn.query(sql, id, (err, result) => {
                if (err) throw err;

                if (result.length > 0) {
                    callback(false, result);
                }
                else {
                    callback(true, null)
                }
            })
        }
        else {
            var sql = `SELECT * FROM user_address ORDER BY id DESC`;
            //   console.log(sql)
            conn.query(sql, (err, result) => {
                if (err) throw err;



                if (result.length > 0) {
                    callback(false, result);
                }
                else {
                    callback(true, null)
                }
            })
        }
    }

    update(data, id, callback) {
        var sql = `UPDATE user_address SET updated_at=NOW(), ? WHERE user_id=?`;

        conn.query(sql, [data, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows) {
                callback(false, null)
            } else {
                callback(true, null)
            }
        })
    }

    delete(id, callback) {
        var sql = `DELETE FROM user_address WHERE user_id=?`;
        conn.query(sql, id, (err, result) => {
            if (err) throw err;

            if (result.affectedRows) {
                callback(false, null)
            }
            else {
                callback(true, null);
            }
        })
    }
}


module.exports = new Address();