var mysql = require("mysql");
var conn = require("../config/dbconfig");

class Delivery {
  placeOrder(data, callback) {
    var sql = `INSERT INTO delivery (user_id, order_no, created_at) VALUES (
            ${mysql.escape(data.user_id)},
            ${mysql.escape(data.order_no)},
            NOW(),          
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
      var sql = `SELECT * FROM delivery WHERE id=?`;
      conn.query(sql, id, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else {
      var sql = `SELECT * FROM delivery ORDER BY id DESC`;
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

  // update(data, id, callback) {
  //   var sql = `UPDATE delivery SET user_id=user_id, ? WHERE id=?`;

  //   conn.query(sql, [data, id], (err, result) => {
  //     if (err) throw err;

  //     if (result.affectedRows) {
  //       callback(false, null);
  //     } else {
  //       callback(true, null);
  //     }
  //   });
  // }

  cancelOrderyarn (id, callback) {
    var sql = `DELETE FROM delivery WHERE id=?`;
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

module.exports = new Delivery();
