const addressModel = require("../models/address.model");

exports.create = (req, res) => {
  const { user_id, pincode, state_id, city_name, landmark, address } = req.body;
  if (user_id && pincode && state_id && city_name && landmark && address) {
    addressModel.create(req.body, (err, result) => {
      if (err) {
        res.status(200).json({
          status: false,
          msg: "create not successfull",
          data: [],
        });
      } else {
        res.status(200).json({
          status: true,
          msg: "create successfull",
          data: [],
        });
      }
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "user_id,pincode,state_id,city_name,landmark,address all fields are required",
      data: [],
    });
  }
};

exports.getAllUser = (req, res) => {
  addressModel.show(null, (err, result) => {
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
};

exports.getUser = (req, res) => {
  const { id } = req.params;
  if (id) {
    addressModel.show(id, (err, result) => {
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
      msg: "user id is required",
      data: [],
    });
  }
};

exports.update = (req, res) => {
  const { user_id, pincode, state_id, city_name, landmark, address } = req.body;

  const data = {
    pincode: pincode,
    state_id: state_id,
    city_name: city_name,
    landmark: landmark,
    address: address,
  };

  if (user_id) {
    addressModel.update(data, user_id, (err, result) => {
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
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "user id is required",
      data: [],
    });
  }
};

exports.delete = (req, res) => {
  const { id } = req.params;

  if (id) {
    addressModel.delete(id, (err, result) => {
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
      msg: "user id is required",
      data: [],
    });
  }
};
