var mysql = require("mysql");
var conn = require("../config/dbconfig");
require('dotenv').config();
var Common = require("./common");
var storeModel = require("./states.model")


class Medicine {

    create(data, callback) {

        var columnName = [{
            name: "name",
            value: data.medicine.name
        },
        {
            name: "category_id",
            value: data.medicine.category_id
        },
        {
            name: "company_id",
            value: data.medicine.company_id
        }
        ]


        Common.duplicate(columnName, "medicines", (status,responce) => {
            if (!status) {
                var sql = `INSERT INTO medicines SET created_at=NOW(), ? `;
                console.log(sql)
                conn.query(sql, data.medicine, async (err, result) => {
                    if (err) throw err;

                    if (result.insertId) {

                        for (var i of data.images) {
                            var sql = `INSERT INTO medicine_images SET created_at=NOW(),medicine_id=${mysql.escape(result.insertId)}, ? `;
                            await new Promise((resolve, reject) => {
                                conn.query(sql, i, (err, result) => {
                                    if (err) throw err;
                                    resolve(true)
                                })
                            })
                        }

                        callback(false, result);
                    } else {
                        callback(true, null);
                    }
                });

            } else {
                callback(true, "allredy exits! ");
            }
        })


    }



    async update(data, id, callback) {
        var sql = `UPDATE medicines SET updated_at=NOW(), ? WHERE id=?`;

        await new Promise((resolve, reject) => {
            conn.query(sql, [data.medicine, id], (err, result) => {
                if (err) throw err;

                if (result.affectedRows) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        })

        if (data.images.length > 0) {
            var sql = `DELETE FROM medicine_images WHERE medicine_id=?`;

            await new Promise((resolve, reject) => {
                conn.query(sql, id, (err, result) => {
                    if (err) throw err;
                    resolve(true)
                });
            })

            for (var i of data.images) {
                var sql = `INSERT INTO medicine_images SET created_at=NOW(),medicine_id=${mysql.escape(id)}, ? `;
                await new Promise((resolve, reject) => {
                    conn.query(sql, i, (err, result) => {
                        if (err) throw err;
                        resolve(true)
                    })
                })
            }
        }

        callback(false, null)


    }



    show(id, callback) {
        if (id) {
            var sql = `SELECT * FROM medicines WHERE id=?`;
            conn.query(sql, id, async (err, result) => {
                if (err) throw err;

                if (result.length > 0) {

                    var arr = [];

                    for (var i of result) {
                        var sql = `SELECT * FROM medicine_images WHERE medicine_id=${mysql.escape(i.id)}`;
                        i.image_details = [];
                        var temp = [];

                        var imgdata = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0) {
                                    resolve(result)
                                } else {
                                    resolve([])
                                }
                            })
                        })


                        for (var j of imgdata) {
                            j.image_link = j.image_name ? process.env.images_path + 'medicine/' + j.image_name : null;
                            temp.push(j)
                        }

                        i.image_details = temp;
                        // image push end


                        // category details-----------------------
                        var sql = `SELECT * FROM category WHERE id=${mysql.escape(i.category_id)}`;

                        var categorydata = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0) {
                                    resolve(result)
                                } else {
                                    resolve([])
                                }
                            })
                        })

                        i.category_details = categorydata;
                        // end category details-----------------------

                        // company details-----------------------
                        var sql = `SELECT * FROM companies WHERE id=${mysql.escape(i.company_id)}`;

                        var companiedata = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0) {
                                    resolve(result)
                                } else {
                                    resolve([])
                                }
                            })
                        })

                        i.company_details = companiedata;
                        // end company details-----------------------


                        arr.push(i);

                    }

                    callback(false, arr);
                } else {
                    callback(true, null);
                }
            });
        } else {
            var sql = `SELECT * FROM medicines ORDER BY id DESC`;
            //   console.log(sql)
            conn.query(sql, async (err, result) => {
                if (err) throw err;

                if (result.length > 0) {

                    var arr = [];

                    for (var i of result) {
                        var sql = `SELECT * FROM medicine_images WHERE medicine_id=${mysql.escape(i.id)}`;
                        i.image_details = [];
                        var temp = [];

                        var imgdata = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0) {
                                    resolve(result)
                                } else {
                                    resolve([])
                                }
                            })
                        })


                        for (var j of imgdata) {
                            j.image_link = j.image_name ? process.env.images_path + 'medicine/' + j.image_name : null;
                            temp.push(j)
                        }

                        i.image_details = temp;
                        // image push end


                        // category details-----------------------
                        var sql = `SELECT * FROM category WHERE id=${mysql.escape(i.category_id)}`;

                        var categorydata = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0) {
                                    resolve(result)
                                } else {
                                    resolve([])
                                }
                            })
                        })

                        i.category_details = categorydata;
                        // end category details-----------------------

                        // company details-----------------------
                        var sql = `SELECT * FROM companies WHERE id=${mysql.escape(i.company_id)}`;

                        var companiedata = await new Promise((resolve, reject) => {
                            conn.query(sql, (err, result) => {
                                if (err) throw err;

                                if (result.length > 0) {
                                    resolve(result)
                                } else {
                                    resolve([])
                                }
                            })
                        })

                        i.company_details = companiedata;
                        // end company details-----------------------


                        arr.push(i);

                    }


                    callback(false, arr);

                } else {
                    callback(true, null);
                }
            });
        }
    }


    delete(id, callback) {
        var sql = `DELETE FROM medicines WHERE id=?`;

        conn.query(sql, id, async (err, result) => {
            if (err) throw err;

            var sql = `DELETE FROM medicine_images WHERE medicine_id=?`;

            conn.query(sql, id, (err, result) => {
                if (err) throw err;

                callback(false, null)
            })

        });

    }


    search(data, callback) {
        var sql = `SELECT * FROM ( SELECT * FROM medicines WHERE status='active' `;

        if (data.medicine_id)
            sql += ` AND id=${mysql.escape(data.medicine_id)} `;

        if (data.category_id)
            sql += ` AND category_id=${mysql.escape(data.category_id)} `;

        if (data.company_id)
            sql += ` AND company_id=${mysql.escape(data.company_id)} `;

        if (data.box_price)
            sql += ` AND box_price=${mysql.escape(data.box_price)} `;

        if (data.page_price)
            sql += ` AND page_price=${mysql.escape(data.page_price)} `;

        if (data.name) {
            sql += ` )p WHERE name LIKE '%${data.name}%' OR short_desc LIKE '%${data.name}%' `;
        } else {
            sql += ` )p  `;
        }

        sql += ` order by id desc `;

        if (data.limit)
            sql += ` Limit ${data.limit} `


        if (data.offset) {
            if (data.offset > 0)
                data.offset -= 1;

            sql += ` offset ${data.offset} `
        }



        // console.log(sql)

        conn.query(sql, async (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                var arr = [];

                for (var i of result) {
                    var sql = `SELECT * FROM medicine_images WHERE medicine_id=${mysql.escape(i.id)}`;
                    i.image_details = [];
                    var temp = [];

                    var imgdata = await new Promise((resolve, reject) => {
                        conn.query(sql, (err, result) => {
                            if (err) throw err;

                            if (result.length > 0) {
                                resolve(result)
                            } else {
                                resolve([])
                            }
                        })
                    })


                    for (var j of imgdata) {
                        j.image_link = j.image_name ? process.env.images_path + 'medicine/' + j.image_name : null;
                        temp.push(j)
                    }

                    i.image_details = temp;
                    // image push end


                    // category details-----------------------
                    var sql = `SELECT * FROM category WHERE id=${mysql.escape(i.category_id)}`;

                    var categorydata = await new Promise((resolve, reject) => {
                        conn.query(sql, (err, result) => {
                            if (err) throw err;

                            if (result.length > 0) {
                                resolve(result)
                            } else {
                                resolve([])
                            }
                        })
                    })

                    i.category_details = categorydata;
                    // end category details-----------------------

                    // company details-----------------------
                    var sql = `SELECT * FROM companies WHERE id=${mysql.escape(i.company_id)}`;

                    var companiedata = await new Promise((resolve, reject) => {
                        conn.query(sql, (err, result) => {
                            if (err) throw err;

                            if (result.length > 0) {
                                resolve(result)
                            } else {
                                resolve([])
                            }
                        })
                    })

                    i.company_details = companiedata;
                    // end company details-----------------------


                    // store details ------------------------------

                    var sql = `SELECT SUM(box_quantity) as total_box_quantity,SUM(page_quantity) as total_page_quantity FROM stores WHERE medicine_id=${mysql.escape(i.id)} AND status='add' `;

                    var m_add = await new Promise((resolve, reject) => {
                        conn.query(sql, (err, result) => {
                            if (err) throw err;

                            if (result.length > 0)
                                resolve(result)
                            else
                                resolve([])
                        })
                    })


                    var sql = `SELECT SUM(box_quantity) as total_box_quantity,SUM(page_quantity) as total_page_quantity FROM stores WHERE medicine_id=${mysql.escape(i.id)} AND status='order' `;

                    var m_order = await new Promise((resolve, reject) => {
                        conn.query(sql, (err, result) => {
                            if (err) throw err;

                            if (result.length > 0)
                                resolve(result)
                            else
                                resolve([])
                        })
                    })


                    var sql = `SELECT SUM(box_quantity) as total_box_quantity,SUM(page_quantity) as total_page_quantity FROM stores WHERE medicine_id=${mysql.escape(i.id)} AND status='cancle' `;

                    var m_cancle = await new Promise((resolve, reject) => {
                        conn.query(sql, (err, result) => {
                            if (err) throw err;

                            if (result.length > 0)
                                resolve(result)
                            else
                                resolve([])
                        })
                    })

                    var store = {
                        total_box_quantity: 0,
                        total_page_quantity: 0
                    }

                    if (m_add.length > 0) {
                        store.total_box_quantity = store.total_box_quantity + Number(m_add[0].total_box_quantity);
                        store.total_page_quantity = store.total_page_quantity + Number(m_add[0].total_page_quantity);
                    }

                    if (m_cancle.length > 0) {
                        store.total_box_quantity = store.total_box_quantity + Number(m_cancle[0].total_box_quantity);
                        store.total_page_quantity = store.total_page_quantity + Number(m_cancle[0].total_page_quantity);
                    }

                    if (m_order.length > 0) {
                        store.total_box_quantity = store.total_box_quantity - Number(m_order[0].total_box_quantity);
                        store.total_page_quantity = store.total_page_quantity - Number(m_order[0].total_page_quantity);
                    }

                    i.store_details = [store]



                    // end store details ------------------------------



                    arr.push(i);

                }


                callback(false, arr);

            } else {
                callback(true, null)
            }
        })


    }

}

module.exports = new Medicine();