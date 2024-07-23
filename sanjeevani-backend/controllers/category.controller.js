const categoryModel = require("../models/category.model");

exports.create = (req, res) => {
  const { category_name, parent_id, top_category } = req.body;
  console.log(req.body);
  if (category_name) {
    categoryModel.create(req.body, (err, result) => {
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
  // else if(!category_name || !parent_id){
  //   res.status(200).json({
  //     status: false,
  //   msg: "All Fields Are Required",
  //   data: [],
  //   })
  // }
  else {
    res.status(200).json({
      status: false,
      msg: "All Fields Are Required",
      data: [],
    });
  }
};

exports.getAllUser = (req, res) => {
  categoryModel.show(null, (err, result) => {
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
    categoryModel.show(id, (err, result) => {
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
  const { id, category_name, parent_id, top_category } = req.body;
  console.log(req.body);

  const data = {
    category_name: category_name,
    parent_id: parent_id,
    top_category: top_category,
  };

  if (id) {
    categoryModel.update(data, id, (err, result) => {
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
    categoryModel.delete(id, (err, result) => {
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

exports.search = (req, res) => {
    categoryModel.search(req.body, (err, result) => {
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
