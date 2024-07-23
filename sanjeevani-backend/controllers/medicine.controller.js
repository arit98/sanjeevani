const medicineModel = require("../models/medicine.model");
const fs = require('fs')

exports.create = (req, res) => {
    console.log(req.body);
    console.log(req.files)

    const { name, category_id, company_id, short_desc, long_desc, status, page_price, box_price, igst, cgst, sgst, offer } = req.body;

    if (name && category_id && company_id && short_desc && long_desc && status && box_price && page_price) {

        var data = {
            medicine: {
                name: name,
                category_id: category_id,
                short_desc: short_desc,
                long_desc: long_desc,
                status: status,
                company_id: company_id,
                box_price: box_price,
                page_price: page_price,
            },
            images: []
        }

        var tempImg = [];

        if (igst)
            data.medicine.igst = igst;

        if (cgst)
            data.medicine.cgst = cgst;

        if (sgst)
            data.medicine.sgst = sgst;

        if (offer)
            data.medicine.offer = offer;




        // multiple image add
        if (req.files.medicine_images != undefined) {

            for (var i of req.files.medicine_images) {
                tempImg.push({ image_name: i.filename })
            }

        }

        data.images = tempImg;

        medicineModel.create(data, (err, result) => {
            if (err) {
                res.status(200).json({
                    status: false,
                    msg: result ? result : "created not successfull",
                    data: [],
                });
            } else {
                res.status(200).json({
                    status: true,
                    msg: "created successfull",
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

        medicineModel.show(id, (err, result) => {
            var imgData = [];
            if (result != null) {

                imgData = result[0].image_details;

                var data = {
                    medicine: {},
                    images: []
                }

                if (req.body.name)
                    data.medicine.name = req.body.name;

                if (req.body.category_id)
                    data.medicine.category_id = req.body.category_id;

                if (req.body.short_desc)
                    data.medicine.short_desc = req.body.short_desc;

                if (req.body.long_desc)
                    data.medicine.long_desc = req.body.long_desc;

                if (req.body.status)
                    data.medicine.status = req.body.status;

                if (req.body.company_id)
                    data.medicine.company_id = req.body.company_id;

                if (req.body.igst)
                    data.medicine.igst = req.body.igst;

                if (req.body.cgst)
                    data.medicine.cgst = req.body.cgst;

                if (req.body.sgst)
                    data.medicine.sgst = req.body.sgst;

                if (req.body.offer)
                    data.medicine.offer = req.body.offer;

                if (req.body.box_price)
                    data.medicine.box_price = req.body.box_price;

                if (req.body.page_price)
                    data.medicine.page_price = req.body.page_price;


                var tempImg = [];


                // multiple image add
                if (req.files.medicine_images != undefined) {

                    for (var i of req.files.medicine_images) {
                        tempImg.push({ image_name: i.filename })
                    }

                }

                data.images = tempImg;

                medicineModel.update(data, id, (err, result) => {
                    if (err) {
                        res.status(200).json({
                            status: false,
                            msg: result ? result : "update not successfull",
                            data: [],
                        });
                    } else {

                        if (imgData.length > 0 && req.files.medicine_images != undefined) {
                            for (var i of imgData) {
                                var path = 'public/uploads/images/medicine/' + i.image_name;
                                fs.unlinkSync(path)
                            }
                        }

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
                    msg: " updae not successfull ",
                    data: [],
                });
            }

        })


    } else {

        res.status(200).json({
            status: false,
            msg: "id Are Required",
            data: [],
        });
    }


}


exports.getAll = (req, res) => {
    medicineModel.show(null, (err, result) => {
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


exports.getOne = (req, res) => {
    const { id } = req.params;
    if (id) {
        medicineModel.show(id, (err, result) => {
            if (err) {
                res.status(200).json({
                    status: false,
                    msg: "redord not found",
                    data: [],
                });
            } else {
                res.status(200).json({
                    status: true,
                    msg: "record found",
                    data: result,
                });
            }
        });
    } else {
        res.status(200).json({
            status: true,
            msg: "id is required",
            data: [],
        });
    }
};


exports.delete = (req, res) => {
    const { id } = req.params;

    if (id) {


        medicineModel.show(id, (err, result) => {
            var imgData = []
            if (result != null) {

                imgData = result[0].image_details;

                medicineModel.delete(id, (err, result) => {
                    if (err) {
                        res.status(200).json({
                            status: false,
                            msg: "not delete",
                            data: [],
                        });
                    } else {

                        if (imgData.length > 0) {
                            for (var i of imgData) {
                                var path = 'public/uploads/images/medicine/' + i.image_name;
                                fs.unlinkSync(path)
                            }
                        }

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
                    msg: " delete not successfull ",
                    data: [],
                });
            }
        })





    } else {
        res.status(200).json({
            status: false,
            msg: " id is required",
            data: [],
        });
    }
};


exports.search = (req, res) => {

medicineModel.search(req.query,(err,result)=>{
    if (err) {
        res.status(200).json({
            status: false,
            msg: "record not found",
            data: [],
        });
    } else {

        res.status(200).json({
            status: true,
            msg: "record found",
            data: result,
        });
    }
})
  

}
