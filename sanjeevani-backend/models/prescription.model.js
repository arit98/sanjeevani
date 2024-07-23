var mysql = require("mysql");
var conn = require("../config/dbconfig");

class Prescription {
    prescriptionUpload(data, callback) {
    var sql = `INSERT INTO prescription(user_id, prescription_image) VALUES (
            ${mysql.escape(data.prescription)},
            ${mysql.escape(data.prescription_image)},
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

  viewPrescription(id, callback) {
    if (id) {
      var sql = `SELECT * FROM prescription WHERE id=?`;
      conn.query(sql, id, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else {
      var sql = `SELECT * FROM prescription ORDER BY id DESC`;
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

  delete(id, callback) {
    var sql = `DELETE FROM prescription WHERE id=?`;
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

module.exports = new Prescription();
