const prescriptionModel = require("../models/prescription.model");

exports.prescriptionUpload = (req, res) => {
  const { user_id, prescription_image } = req.body;
  if (user_id && prescription_image) {
    prescriptionModel.create(req.body, (err, result) => {
      if (err) {
        res.status(200).json({
          status: false,
          msg: "created not successfull",
          data: [],
        });
      } else {
        res.status(200).json({
          status: true,
          msg: "created successfull",
          data: [],
        });
      }
    });
  }
};

exports.viewPrescription = (req, res) => {
  prescriptionModel.show(null, (err, result) => {
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

exports.delete = (req, res) => {
  const { id } = req.params;

  if (id) {
    prescriptionModel.delete(id, (err, result) => {
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
  }
};
