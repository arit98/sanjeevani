var mysql = require("mysql");
var conn = require("../config/dbconfig");

class Groups {
  create(data, callback) {
    var sql = `INSERT INTO groups(groups_name, created_at) VALUES (
            ${mysql.escape(data.groups_name)},
            NOW()
            )`;
    console.log(sql)
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
      var sql = `SELECT * FROM groups WHERE id=?`;
      conn.query(sql, id, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else {
      var sql = `SELECT * FROM groups ORDER BY id DESC`;
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
    var sql = `UPDATE groups SET updated_at=NOW(), ? WHERE id=?`;

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
    var sql = `DELETE FROM groups WHERE id=?`;
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

module.exports = new Groups();
