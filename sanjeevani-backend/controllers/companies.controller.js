const companiesModel = require("../models/companies.model");

exports.create = (req, res) => {
  const { name, company_regno } = req.body;
  if (name && company_regno) {
    companiesModel.create(req.body, (err, result) => {
      if (err) {
        res.status(200).json({
          status: false,
          msg: result ? result:"created not successfull",
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
  } else {
    res.status(200).json({
      status: false,
      msg: "All Fields Are Required",
      data: [],
    });
  }
};

exports.getAllUser = (req, res) => {
  companiesModel.show(null, (err, result) => {
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

exports.getUser = (req, res) => {
  const { id } = req.params;
  if (id) {
    companiesModel.show(id, (err, result) => {
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
  const { id, name, company_regno, status } = req.body;

  const data = {
    name: name,
    company_regno: company_regno,
    status: status,
  };

  if (id) {
    companiesModel.update(data, id, (err, result) => {
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
    companiesModel.delete(id, (err, result) => {
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
