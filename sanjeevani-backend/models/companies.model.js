var mysql = require("mysql");
var conn = require("../config/dbconfig");

class Companies {
  checking_regno(company_regno, callback) {
    var sql = `SELECT * FROM companies WHERE company_regno = ${company_regno}`;
    conn.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        callback(true);
      } else {
        callback(false);
      }
    });
  }

  async create(data, callback) {
    // var check = this.checking_regno(data.company_regno);
    // console.log(check)
    var check = await new Promise((resolve, reject) => {
      this.checking_regno(data.company_regno, (_data) => {
        console.log(_data);
        resolve(_data);
      });
    });
    if (check) callback(true, "registration number already exsists");
    else {
      var sql = `INSERT INTO companies(name, company_regno, created_at) VALUES (
              ${mysql.escape(data.name)},
              ${mysql.escape(data.company_regno)},
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
  }

  show(id, callback) {
    if (id) {
      var sql = `SELECT * FROM companies WHERE id=?`;
      conn.query(sql, id, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else {
      var sql = `SELECT * FROM companies ORDER BY id DESC`;
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
    var sql = `UPDATE companies SET updated_at=NOW(), ? WHERE id=?`;

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
    var sql = `DELETE FROM companies WHERE id = ?`;
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

module.exports = new Companies();
