var mysql = require("mysql");
var conn = require("../config/dbconfig");

class Sates {
  create(data, callback) {
    var sql = `INSERT INTO states(name, created_at) VALUES (
            ${mysql.escape(data.name)},
            NOW()
            )`;
    // console.log(sql)
    conn.query(sql, (err, result) => {
      if (err) throw err;

      if (result.insertId) {
        callback(false, result);
      } else {
        callback(true, null);
      }
    });
  }

  show(id, callback) {
    if (id) {
      var sql = `SELECT * FROM states WHERE id=?`;
      conn.query(sql, id, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else {
      var sql = `SELECT * FROM states ORDER BY id DESC`;
      //   console.log(sql)
      conn.query(sql, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    }
  }

  update(data, id, callback) {
    var sql = `UPDATE states SET updated_at=NOW(), ? WHERE id=?`;

    conn.query(sql, [data, id], (err, result) => {
      if (err) throw err;

      if (result.affectedRows) {
        callback(false, null);
      } else {
        callback(true, null);
      }
    });
  }

  delete(id, callback) {
    var sql = `DELETE FROM states WHERE id=?`;
    conn.query(sql, id, (err, result) => {
      if (err) throw err;

      if (result.affectedRows) {
        callback(false, null);
      } else {
        callback(true, null);
      }
    });
  }
}

module.exports = new Sates();
