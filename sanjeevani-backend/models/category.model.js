var mysql = require("mysql");
var conn = require("../config/dbconfig");

class Category {
  create(data, callback) {
    var sql = `INSERT INTO category(category_name, parent_id, top_category, created_at) VALUES (
              ${mysql.escape(data.category_name)},
              ${mysql.escape(data.parent_id)},
              ${mysql.escape(data.top_category)},
              NOW()
              )`;
    console.log(sql);
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
      var sql = `SELECT * FROM category WHERE id=?`;
      conn.query(sql, id, (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else {
      var sql = `SELECT * FROM category ORDER BY id `;
      //   console.log(sql)
      conn.query(sql, async (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          var arr = [];
          for (var i of result) {
            var parentName = await new Promise((resolve, reject) => {
              var sql = `SELECT category_name FROM category WHERE id=${mysql.escape(
                i.parent_id
              )}`;
              conn.query(sql, (err, result) => {
                if (err) throw err;
                if (result.length > 0) {
                  resolve(result[0].category_name);
                } else {
                  resolve(null);
                }
              });
            });

            i.parent_name = parentName;
            arr.push(i);
          }

          callback(false, arr);
        } else {
          callback(true, null);
        }
      });
    }
  }

  update(data, id, callback) {
    var sql = `UPDATE category SET updated_at=NOW(), ? WHERE id=?`;

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
    var sql = `DELETE FROM category WHERE id=?`;
    conn.query(sql, id, (err, result) => {
      if (err) throw err;

      if (result.affectedRows) {
        callback(false, null);
      } else {
        callback(true, null);
      }
    });
  }

  search(data, callback) {
    if (data.category_id) {
      // get list by categort id
      var sql = `SELECT * from category WHERE parent_id=${mysql.escape(
        data.category_id
      )}`;
      conn.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else if (data.category) {
      // get only all category
      var sql = `SELECT * from category WHERE parent_id=0`;
      console.log(sql)
      conn.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
          callback(false, result);
        } else {
          callback(true, null);
        }
      });
    } else {
      // get all category and child
      var sql = `SELECT * from category WHERE parent_id=0`;
      console.log(sql)
      conn.query(sql, async (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          var arr = [];

          for (var p of result) {
            if (p.parent_id == 0) {
              var sql = `SELECT * from category WHERE parent_id=${mysql.escape(
                p.id
              )}`;

              var listOfChild = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                  if (err) throw err;
                  if (result.length > 0) {
                    resolve(result);
                  } else {
                    resolve([]);
                  }
                });
              });

              p.subCategoryList = listOfChild;

              arr.push(p);
            }
          }
          callback(false, arr);
        } else {
          callback(true, null);
        }
      });
    }
    
  }

   
}

module.exports = new Category();
