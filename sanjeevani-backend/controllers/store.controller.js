const storeModel = require("../models/store.model");

exports.create = (req, res) => {
  const {
    medicine_id,
    box_quantity,
    page_quantity,
    total_price,
  } = req.body;
  if (
    ( medicine_id &&
      box_quantity &&
      page_quantity &&
      total_price)
  ) {
    var data = {
        stores: {
        medicine_id: medicine_id,
        box_quantity: box_quantity,
        page_quantity: page_quantity,
        total_price: total_price,
        status:'add'
      },
      
    };

    

    storeModel.create(data, (err, result) => {
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

exports.getAll = (req, res) => {
  storeModel.show(null, (err, result) => {
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
    storeModel.show(id, (err, result) => {
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
  const {id} = req.params;


  const stores={}

  if(req.body.medicine_id)
  {
    
    stores.medicine_id=req.body.medicine_id;
  }


  if(req.body.box_quantity)
  {
    
    stores.box_quantity=req.body.box_quantity;
  }

  if(req.body.page_quantity)
  {
     
    stores.page_quantity=req.body.page_quantity;
  }

  if(req.body.total_price)
  {
    stores.total_price=req.body.total_price;
  }



  if (id) {
    storeModel.update(stores,id, (err, result) => {
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
      msg: " id  is required",
      data: [],
    });
  }
};

exports.delete = (req, res) => {
  const { id } = req.params;

  if (id) {
    storeModel.delete(id, (err, result) => {
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
