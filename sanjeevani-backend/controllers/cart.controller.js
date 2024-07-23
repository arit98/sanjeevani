const cartModel = require("../models/cart.model");
const fs = require('fs')

exports.create = (req, res) => {

    const { user_id, medicine_id, box_quantity, page_quantity } = req.body;

    if ( user_id && medicine_id && box_quantity && page_quantity) {

        var data = {
            medicine_id: medicine_id,
            box_quantity: box_quantity,
            page_quantity: page_quantity,
        }


        cartModel.create(data, user_id, (err, result) => {
            if (err) {
                res.status(200).json({
                    status: false,
                    msg: result ? result : "cart add not successfull",
                    data: [],
                });
            } else {
                res.status(200).json({
                    status: true,
                    msg: "cart add successfull",
                    data: [],
                });
            }
        })


    } else {

        res.status(200).json({
            status: false,
            msg: "All Fields Are Required",
            data: [],
        });
    }


}

exports.update = (req, res) => {

    const { id } = req.params;

    if (id) {


        var data = {}

        // if (req.body.medicine_id)
        //     data.medicine_id = req.body.medicine_id;

        if (req.body.box_quantity)
            data.box_quantity = req.body.box_quantity;

        if (req.body.page_quantity)
            data.page_quantity = req.body.page_quantity;



        cartModel.update(data, id, (err, result) => {
            if (err) {
                res.status(200).json({
                    status: false,
                    msg: "update not successfull",
                    data: [],
                });
            } else {

                res.status(200).json({
                    status: true,
                    msg: "update successfull",
                    data: [],
                });
            }
        })


    } else {

        res.status(200).json({
            status: false,
            msg: "cart details id Are Required",
            data: [],
        });
    }


}

// get data by user id -----------------------------------------
exports.getOne = (req, res) => {
    const { user_id } = req.params;

    cartModel.show(user_id, (err, result) => {
        if (err) {
            res.status(200).json({
                status: false,
                msg: "Redord Not Found",
                data: [],
            });
        } else {
            res.status(200).json({
                status: true,
                msg: "Record Found",
                data: result,
            });
        }
    });
};



exports.deleteAll = (req, res) => {
    const { user_id } = req.params;

    if (user_id) {

        cartModel.deleteAll(user_id, (err, result) => {
            if (err) {
                res.status(200).json({
                    status: false,
                    msg: "not delete",
                    data: [],
                });
            } else {

                res.status(200).json({
                    status: true,
                    msg: "delete successfull",
                    data: [],
                });
            }
        });

    } else {
        res.status(200).json({
            status: false,
            msg: " id is required",
            data: [],
        });
    }
};


exports.deleteOne = (req, res) => {
    const { id } = req.params;

    if (id) {

        cartModel.deleteOne(id, (err, result) => {
            if (err) {
                res.status(200).json({
                    status: false,
                    msg: "not delete",
                    data: [],
                });
            } else {

                res.status(200).json({
                    status: true,
                    msg: "delete successfull",
                    data: [],
                });
            }
        });

    } else {
        res.status(200).json({
            status: false,
            msg: " cart details id is required",
            data: [],
        });
    }
};
