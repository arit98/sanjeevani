var userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const status_msg = require("../helper/constant");
const { promise } = require("bcrypt/promises");

exports.registration = async (req, res) => {
  console.log(req.body);
  const { role, email, password1, password2, name, phone_number } = req.body;

  if (role && email && password1 && password2 && name && phone_number) {
    let data = {
      column: "email",
      value: email,
    };

    var existUser = await new Promise((resolve, rejects) => {
      userModel.getOne(data, (err, result) => {
        if (result == null) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    if (existUser) {
      if (password1 === password2) {
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password1, salt);
        let userData = {
          name: name,
          phone_number: phone_number,
          email: email,
          role: role,
          password: hashPassword,
        };

        userModel.create(userData, (err, result) => {
          if (err) {
            res.status(200).json({
              status: false,
              msg: " User Not Created ",
              data: [],
            });
          } else {
            res.status(200).json({
              status: true,
              msg: status_msg.status_msg.userCreateSuccess,
              data: [],
            });
          }
        });
      } else {
        res.status(200).json({
          status: false,
          msg: " Password Not Match ",
          data: [],
        });
      }
    } else {
      res.status(200).json({
        status: false,
        msg: " Email Allready Exist ",
        data: [],
      });
    }
  } else {
    res.status(200).json({
      status: false,
      msg: " Please Provide Value For Eatch Field",
      data: [],
    });
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    let data = {
      column: "email",
      value: email,
    };

    userModel.getOne(data, async (err, result) => {
      if (!err) {
        const isMatch = await bcrypt.compare(password, result.password);

        if (email === result.email && isMatch) {
          if (result.approve_status == "active") {
            const token = jwt.sign(
              {
                id: result.id,
                email: result.email,
              },
              process.env.jwt_secret_key,
              { expiresIn: "5d" }
            );

            const userData = {
                id: result.id,
                name: result.name,
                email: result.email,
                approve_status: result.approve_status,
                role: result.role,
                created_at: result.created_at,
                updated_at: result.updated_at
            };

            // var userData = await new promise((resolve, reject) => {
            //   userModel.show(result.id, (error, result) => {
            //     if (error) {
            //       resolve([]);
            //     } else {
            //       resolve(result);
            //     }
            //   });
            // });
            
            console.log(userData);
            res.status(200).json({
              status: true,
              msg: "Login Successfull",
              data: userData,
              token: "Bearer " + token,
            });
          } else {
            res.status(200).json({
              status: false,
              msg: " User Not Active, Contact To  Admin",
              data: [],
            });
          }
        } else {
          res.status(200).json({
            status: false,
            msg: "invalid email & password",
            data: [],
          });
        }
      } else {
        res.status(200).json({
          status: false,
          msg: "invalid email & password",
          data: [],
        });
      }
    });
  } else {
    res.status(200).json({
      status: false,
      msg: "email & password required",
      data: [],
    });
  }
};

exports.forgetPassword = (req, res) => {
  const { email, password1, password2 } = req.body;

  if (email && password1 && password2) {
    var data = {
      column: "email",
      value: email,
    };

    userModel.getOne(data, async (err, result) => {
      if (!err) {
        if (password1 === password2) {
          const salt = await bcrypt.genSalt(12);
          const hashPassword = await bcrypt.hash(password1, salt);
          let userData = {
            email: email,
            password: hashPassword,
          };

          userModel.updateUser(userData, result.id, (err, result) => {
            if (err) {
              res.status(200).json({
                status: false,
                msg: " password not change ",
                data: [],
              });
            } else {
              res.status(200).json({
                status: true,
                msg: " password change sucessfully ",
                data: [],
              });
            }
          });
        } else {
          res.status(200).json({
            status: false,
            msg: " password not match ",
            data: [],
          });
        }
      } else {
        res.status(200).json({
          status: false,
          msg: " user not found ",
          data: [],
        });
      }
    });
  } else {
    res.status(200).json({
      status: false,
      msg: " email,password1,password2 this fields are require",
      data: [],
    });
  }
};

exports.getUser = (req, res) => {
  const { id } = req.params;

  if (id) {
    userModel.show(id, (err, result) => {
      if (err) {
        res.status(200).json({
          status: false,
          msg: " data not found",
          data: [],
        });
      } else {
        res.status(200).json({
          status: true,
          msg: " data found",
          data: result,
        });
      }
    });
  } else {
    res.status(200).json({
      status: false,
      msg: " user id is require",
      data: [],
    });
  }
};

exports.getAllUser = (req, res) => {
  userModel.show(null, (err, result) => {
    if (err) {
      res.status(200).json({
        status: false,
        msg: " data not found",
        data: [],
      });
    } else {
      res.status(200).json({
        status: true,
        msg: " data found",
        data: result,
      });
    }
  });
};

exports.updateUserDetails = async (req, res) => {
  const { name, phone_number, aadhar_card_no, user_id } = req.body;
  //console.log(req.files.aadhar_card_image)
  var data = {
    name: name,
    phone_number: phone_number,
    aadhar_card_no: aadhar_card_no,
  };

  if (req.files.image_profile != undefined) {
    data.image_profile = req.files.image_profile[0].filename;

    var image_profile = await new Promise((resolve, reject) => {
      userModel.getUserdetails(user_id, (err, result) => {
        if (err) {
          resolve(null);
        } else {
          resolve(result.image_profile);
        }
      });
    });

    if (image_profile) {
      var path = "public/uploads/images/profile/" + image_profile;
      fs.unlinkSync(path);
    }
  }

  if (req.files.aadhar_card_image != undefined) {
    data.aadhar_card_image = req.files.aadhar_card_image[0].filename;

    var aadhar_card_image = await new Promise((resolve, reject) => {
      userModel.getUserdetails(user_id, (err, result) => {
        if (err) {
          resolve(null);
        } else {
          resolve(result.aadhar_card_image);
        }
      });
    });

    if (aadhar_card_image) {
      var path = "public/uploads/images/adhar/" + aadhar_card_image;
      fs.unlinkSync(path);
    }
  }

  if (user_id) {
    userModel.updateUserDetails(data, user_id, (err, result) => {
      if (err) {
        res.status(200).json({
          status: false,
          msg: " user details not update ",
          data: [],
        });
      } else {
        res.status(200).json({
          status: true,
          msg: " user details update successfully ",
          data: [],
        });
      }
    });
  } else {
    res.status(200).json({
      status: false,
      msg: " user id is require",
      data: [],
    });
  }
};

exports.statusChange = (req, res) => {
  const { user_id, approve_status } = req.body;

  if (user_id && approve_status) {
    var data = {
      approve_status: approve_status,
    };
    userModel.updateUser(data, user_id, (err, result) => {
      if (err) {
        res.status(200).json({
          status: false,
          msg: " status not change ",
          data: [],
        });
      } else {
        res.status(200).json({
          status: true,
          msg: " status change successfully ",
          data: [],
        });
      }
    });
  } else {
    res.status(200).json({
      status: false,
      msg: " user_id,approve_status are require",
      data: [],
    });
  }
};

exports.deleteUser = (req, res) => {
  userModel.deleteUser(null, (err, result) => {
    if (err) {
      res.status(200).json({
        status: false,
        msg: " data not found",
        data: [],
      });
    } else {
      res.status(200).json({
        status: true,
        msg: "user deleted sucessfully",
        data: result,
      });
    }
  });
};
