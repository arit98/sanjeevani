const deliveryModel = require("../models/delivery.model");

exports.placeOrder = (req, res) => {
  const { user_id, order_no } = req.body;
  if (user_id && order_no) {
    deliveryModel.placeOrder(req.body, (err, result) => {
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
  } else {
    res.status(200).json({
      status: false,
      msg: "All Fields Are Required",
      data: [],
    });
  }
};

exports.show = (req, res) => {
  const { id } = req.params;
  if (id) {
    deliveryModel.show(id, (err, result) => {
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

exports.cancelOrder = (req, res) => {
  const { id } = req.params;

  if (id) {
    deliveryModel.cancelOrder(id, (err, result) => {
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

// exports.getAllUser = (req, res) => {
//     deliveryModel.show(null, (err, result) => {
//     if (err) {
//       res.status(200).json({
//         status: false,
//         msg: "Redord Not Found",
//         data: [],
//       });
//     } else {
//       res.status(200).json({
//         status: true,
//         msg: "Record Found",
//         data: result,
//       });
//     }
//   });
// };

// exports.update = (req, res) => {
//   const { id, name, status } = req.body;

//   const data = {
//     name: name,
//     status: status,
//   };

//   if (id) {
//     companiesModel.update(data, id, (err, result) => {
//       if (err) {
//         res.status(200).json({
//           status: false,
//           msg: "update not successfull",
//           data: [],
//         });
//       } else {
//         res.status(200).json({
//           status: true,
//           msg: "update successfull",
//           data: [],
//         });
//       }
//     });
//   } else {
//     res.status(200).json({
//       status: false,
//       msg: "user id is required",
//       data: [],
//     });
//   }
// };
