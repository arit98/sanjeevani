var mysql = require("mysql");
var conn = require("../config/dbconfig");
require('dotenv').config();
var medicineModdel=require('./medicine.model')

class Store {

  create(data, callback) {
    var sql = `INSERT INTO stores set created_at=NOW(),? `;
    // console.log(sql)
    conn.query(sql, data.stores, async (err, result) => {
      if (err) throw err;

      if (result.insertId) {
        callback(false, null);
      } else {
        callback(true, null);
      }
    });
  }

  show(id, callback) {
    if (id) {
      var sql = `SELECT * FROM stores WHERE id=? `;
      conn.query(sql, id, async(err, result) => {
        if (err) throw err;

        if (result.length > 0) {
          var arr=[];

          for(var i of result)
          {
            var medicinedata=await new Promise((resolve,reject)=>{
                medicineModdel.show(i.medicine_id,(err,result)=>{
                    if(result.length>0)
                    resolve(result)
                    else
                    resolve([])
                })
            })


            i.medicine_details=medicinedata;

            arr.push(i)

          }

          callback(false, arr);
        } else {
          callback(true, null);
        }
      });
    } else {
      var sql = `SELECT * FROM stores WHERE status='add' order BY id DESC`;
      //   console.log(sql)
      conn.query(sql, async(err, result) => {
        if (err) throw err;

        if (result.length > 0) {

          var arr=[];

          for(var i of result)
          {
            var medicinedata=await new Promise((resolve,reject)=>{
                medicineModdel.show(i.medicine_id,(err,result)=>{
                    if(result.length>0)
                    resolve(result)
                    else
                    resolve([])
                })
            })


            i.medicine_details=medicinedata;

            arr.push(i)

          }

          callback(false, arr);
        } else {
          callback(true, null);
        }
      });
    }
  }

   update(data,id, callback) {

    var sql = `UPDATE stores SET updated_at=NOW(), ? WHERE id=?`;

    conn.query(sql, [data, id], (err, result) => {
      if (err) throw err;

      if (result.affectedRows) {
        callback(false,null);
      } else {
        callback(true,null);
      }

    });
    
  }


   delete(id, callback) {
    var sql = `DELETE FROM stores WHERE id=?`;
   
      conn.query(sql, id, (err, result) => {
        if (err) throw err;
  
        if (result.affectedRows) {
          callback(false,null);
        } else {
          callback(true,null);
        }
      });

  }


 


}

module.exports = new Store();
