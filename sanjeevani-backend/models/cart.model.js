var mysql = require("mysql");
var conn = require("../config/dbconfig");
require('dotenv').config();
var Common = require("./common");
var storeModel = require("./states.model");
var medicineModel = require('./medicine.model');


class Cart {

    create(data, user_id, callback) {

        var columnName = [{
            name: "user_id",
            value: user_id
        }
        ]


        Common.duplicate(columnName, "carts", (status, result) => {
            if (status) {

                data.cart_id = result[0].id;

                var sql = `INSERT INTO cart_details SET  ? `;

                conn.query(sql, data, (err, result) => {
                    if (err) throw err;

                    if (result.insertId) {
                        callback(false, null);
                    } else {
                        callback(true, null);
                    }
                });

            } else {
                var sql = `INSERT INTO carts SET  user_id=${mysql.escape(user_id)} `;

                conn.query(sql, async (err, result) => {
                    if (err) throw err;

                    if (result.insertId) {

                        var sql = `INSERT INTO cart_details SET  ? `;

                        data.cart_id = result.insertId;

                        conn.query(sql, data, (err, result) => {
                            if (err) throw err;

                            if (result.insertId) {
                                callback(false, null);
                            } else {
                                callback(true, null);
                            }
                        });

                    } else {
                        callback(true, null);
                    }
                });
            }
        })


    }


    update(data, id, callback) {
        var sql = `UPDATE cart_details SET  ?  WHERE id=?`;

        conn.query(sql, [data, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows) {
                callback(false, null)
            } else {
                callback(true, null)
            }
        });

    }


    show(id, callback) {
        if (id) {
            var sql = `SELECT * FROM carts  where user_id=${mysql.escape(id)}`;
            //   console.log(sql)
            conn.query(sql, async (err, result) => {
                if (err) throw err;

                if (result.length > 0) {

                    var arr = [];

                    for (var item of result) {
                        var sql = `SELECT * FROM cart_details WHERE cart_id=${mysql.escape(item.id)} ORDER BY id DESC `;

                        item.cart_details = [];

                        var cart_details_data = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0)
                                    resolve(result)
                                else
                                    resolve([])
                            })
                        })


                        for (var i of cart_details_data) {

                            var medicineData = await new Promise((resolve, reject) => {
                                medicineModel.show(i.medicine_id, (err, result) => {

                                    if(result != null)
                                    resolve(result)
                                    else
                                    resolve([])
                                })
                            })

                            i.medicine_details = medicineData;

                            item.cart_details.push(i)

                        }

                        arr.push(item)


                    }

                    callback(false, arr);

                } else {
                    callback(true, null);
                }
            });
        } else {
            var sql = `SELECT * FROM carts ORDER BY id DESC`;
            //   console.log(sql)
            conn.query(sql, async (err, result) => {
                if (err) throw err;

                if (result.length > 0) {

                    var arr = [];

                    for (var item of result) {
                        var sql = `SELECT * FROM cart_details WHERE cart_id=${mysql.escape(item.id)} ORDER BY id DESC`;

                        item.cart_details = [];

                        var cart_details_data = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0)
                                    resolve(result)
                                else
                                    resolve([])
                            })
                        })


                        for (var i of cart_details_data) {

                            var medicineData = await new Promise((resolve, reject) => {
                                medicineModel.show(i.medicine_id, (err, result) => {

                                    if(result != null)
                                    resolve(result)
                                    else
                                    resolve([])
                                })
                            })

                            i.medicine_details = medicineData;

                            item.cart_details.push(i)

                        }

                        arr.push(item)


                    }

                    callback(false, arr);

                } else {
                    callback(true, null);
                }
            });
        }
    }


    deleteAll(user_id, callback) {

        var sql = `SELECT * from carts where user_id=${mysql.escape(user_id)}`;

        conn.query(sql, (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                var sql = `DELETE FROM carts WHERE id=?`;

                var cart_id=result[0].id

                conn.query(sql, cart_id, async (err, result) => {
                    if (err) throw err;

                    var sql = `DELETE FROM cart_details WHERE cart_id=?`;

                    conn.query(sql, cart_id, (err, result) => {
                        if (err) throw err;

                        callback(false, null)
                    })

                });

            } else {
                callback(true, null)
            }

        })

    }

    deleteOne(id, callback) {
        var sql = `DELETE FROM cart_details WHERE id=?`;

        conn.query(sql, id, (err, result) => {
            if (err) throw err;

            callback(false, null)
        })
    }



}

module.exports = new Cart();