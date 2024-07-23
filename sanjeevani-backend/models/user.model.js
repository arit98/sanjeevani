
var mysql = require('mysql');
var conn = require('../config/dbconfig');
require('dotenv').config();

class Users {

    async create(data, callback) {

        var sql = `INSERT INTO users(role, email, password, created_at) VALUES (
            ${mysql.escape(data.role)},
            ${mysql.escape(data.email)},
            ${mysql.escape(data.password)},
            NOW()
            )`;



        var insertId = await new Promise((resolve, reject) => {
            conn.query(sql, (err, result) => {
                if (err) throw err;

                if (result.insertId) {
                    resolve(result.insertId)
                } else {
                    resolve(null)
                }
            })
        })



        if (insertId) {
            var sql = `INSERT INTO user_details(user_id,name, phone_number, created_at) VALUES (
                ${mysql.escape(insertId)},
                ${mysql.escape(data.name)},
                ${mysql.escape(data.phone_number)},
                NOW()
                )`;

            conn.query(sql, (err, result) => {
                if (err) throw err;

                if (result.insertId) {
                    callback(false, null)
                } else {
                    callback(true, null)
                }
            })
        }

    }

    async show(id, callback) {

        if (id) {
            var sql = `SELECT * FROM users WHERE id=${mysql.escape(id)}`;


            var userData = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        resolve(result)
                    } else {
                        resolve([])
                    }
                })
            })

            var data = [];

            for (var item of userData) {
                var temp = {
                    id: item.id,
                    role: item.role,
                    email: item.email,
                    remember_me: item.remember_me,
                    approve_status: item.approve_status,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    imageUrl : "",
                    userName : "",
                    user_details: [],
                    user_address: []
                }


                // fetch user_details
                var sql1 = `SELECT * FROM user_details WHERE user_id=${mysql.escape(item.id)}`;
                var data1 = await new Promise((resolve, reject) => {
                    conn.query(sql1, (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {

                            var tempdata = [];

                            for (var item of result) {
                                var data = {
                                    id: item.id,
                                    user_id: item.user_id,
                                    name: item.name,
                                    image_profile: item.image_profile ? process.env.images_path +'profile/'+ item.image_profile : null,
                                    phone_number: item.phone_number,
                                    aadhar_card_no: item.aadhar_card_no,
                                    aadhar_card_image: item.aadhar_card_image ? process.env.images_path +'adhar/'+ item.aadhar_card_image : null,
                                    created_at: item.created_at,
                                    updated_at: item.updated_at
                                }
                                tempdata.push(data)
                            }

                            resolve(tempdata)
                        } else {
                            resolve([])
                        }
                    })
                })

                //changes by me ----
                temp.user_details = data1;
                temp.imageUrl = data1[0].image_profile;
                temp.userName = data1[0].name;


                // fetch user_address
                var sql2 = `SELECT * FROM user_address WHERE user_id=${mysql.escape(item.id)}`;
                var data2 = await new Promise((resolve, reject) => {
                    conn.query(sql2, (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {
                            resolve(result)
                        } else {
                            resolve([])
                        }
                    })
                })

                temp.user_address = data2;


                data.push(temp)

            }

            if (data.length > 0) {
                callback(false, data)
            } else {
                callback(true, null)
            }

        } else {
            var sql = `SELECT * FROM users ORDER BY id DESC`;


            var userData = await new Promise((resolve, reject) => {
                conn.query(sql, (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        resolve(result)
                    } else {
                        resolve(null)
                    }
                })
            })

            var data = [];

            for (var item of userData) {
                var temp = {
                    id: item.id,
                    role: item.role,
                    email: item.email,
                    remember_me: item.remember_me,
                    approve_status: item.approve_status,
                    created_at: item.created_at,
                    updated_at: item.updated_at,
                    user_details: [],
                    user_address: []
                }


                // fetch user_details
                var sql1 = `SELECT * FROM user_details WHERE user_id=${mysql.escape(item.id)}`;
                var data1 = await new Promise((resolve, reject) => {
                    conn.query(sql1, (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {
                            var tempdata = [];

                            for (var item of result) {
                                var data = {
                                    id: item.id,
                                    user_id: item.user_id,
                                    name: item.name,
                                    image_profile: item.image_profile ? process.env.images_path +'profile/'+ item.image_profile : null,
                                    phone_number: item.phone_number,
                                    aadhar_card_no: item.aadhar_card_no,
                                    aadhar_card_image: item.aadhar_card_image ? process.env.images_path +'adhar/'+ item.aadhar_card_image : null,
                                    created_at: item.created_at,
                                    updated_at: item.updated_at
                                }
                                tempdata.push(data)
                            }

                            resolve(tempdata)
                        } else {
                            resolve([])
                        }
                    })
                })

                temp.user_details = data1;


                // fetch user_address
                var sql2 = `SELECT * FROM user_address WHERE user_id=${mysql.escape(item.id)}`;
                var data2 = await new Promise((resolve, reject) => {
                    conn.query(sql2, (err, result) => {
                        if (err) throw err;
                        if (result.length > 0) {
                            resolve(result)
                        } else {
                            resolve([])
                        }
                    })
                })

                temp.user_address = data2;


                data.push(temp)

            }

            if (data.length > 0) {
                callback(false, data)
            } else {
                callback(true, null)
            }
        }
    }

    getOne(data, callback) {
        var sql = `SELECT * FROM users WHERE ${data.column}=${mysql.escape(data.value)}`;
        conn.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(false, result[0])
            } else {
                callback(true, null)
            }
        })
    }

    getUserdetails(user_id, callback) {
        var sql = `SELECT * FROM user_details WHERE user_id=${mysql.escape(user_id)}`;
        conn.query(sql, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                callback(false, result[0])
            } else {
                callback(true, null)
            }
        })
    }

    // updated user
    updateUser(data, id, callback) {
        var sql = `UPDATE users set updated_at=NOW(),? WHERE id=?`;
        conn.query(sql, [data, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows) {
                callback(false, null)
            } else {
                callback(true, null)
            }
        })
    }

    // update user details
    updateUserDetails(data, id, callback) {
        var sql = `UPDATE user_details set updated_at=NOW(),? WHERE user_id=?`;
        conn.query(sql, [data, id], (err, result) => {
            if (err) throw err;

            if (result.affectedRows) {
                callback(false, null)
            } else {
                callback(true, null)
            }
        })
    }

    deleteUser(id, callback) {
        var sql = `DELETE users from sanjeevani WHERE id=?`;
        conn.query(sql, id, (err, result) => {
            if (err) throw err;

            if (result.affectedRows) {
                callback(false, null)
            } else {
                callback(true, null)
            }
        })
    }

}

module.exports = new Users();
