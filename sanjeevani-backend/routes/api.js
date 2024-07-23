var express = require('express');
var router = express.Router();

// middleware
var checkUserAuth = require('../middlewares/auth');
var upload = require('../middlewares/upload');

//routes
var userConroller = require('../controllers/user.controller');
var normaluserConroller = require('../controllers/normaluser.controller');
var addressConroller = require('../controllers/address.controller');
var companiesController=require('../controllers/companies.controller');
var groupsController=require('../controllers/groups.controller');
var deliveryController=require('../controllers/delivery.controller');
var prescritionController=require('../controllers/prescription.controller');
var roleController=require('../controllers/role.controller');
var statesController=require('../controllers/states.controller');
var categoryController=require('../controllers/category.controller');
var storeController=require('../controllers/store.controller');
var medicineController=require('../controllers/medicine.controller');
var cartController=require('../controllers/cart.controller')


// user details fields
var userDetailsfile = [
  { name: 'image_profile', maxCount: 1 },
  { name: 'aadhar_card_image', maxCount: 1 }
]


// medicine images fields
var medicineImagesDetailsfile = [
  { name: 'medicine_images', maxCount: 10 },
]



/*  users  */
router.post('/user/register', upload.none(), userConroller.registration);
router.post('/user/login', upload.none(), userConroller.login);
router.post('/user/forget/password', upload.none(), userConroller.forgetPassword);
router.get('/user/:id', checkUserAuth, userConroller.getUser);
router.get('/user', checkUserAuth, userConroller.getAllUser);
router.put('/user', checkUserAuth, upload.fields(userDetailsfile), userConroller.updateUserDetails);
router.post('/user/status', checkUserAuth, upload.none(), userConroller.statusChange);
router.post('/user/delete/:id', checkUserAuth, userConroller.deleteUser);

/*  normal users  */
router.post('/normaluser/register', upload.none(), normaluserConroller.registration);
router.post('/normaluser/login', upload.none(), normaluserConroller.login);
router.post('/normaluser/forget/password', upload.none(), normaluserConroller.forgetPassword);
router.get('/normaluser/:id', checkUserAuth, normaluserConroller.getUser);
router.get('/normaluser', checkUserAuth, normaluserConroller.getAllUser);
router.put('/normaluser', checkUserAuth, upload.fields(userDetailsfile), normaluserConroller.updateUserDetails);
router.post('/normaluser/status', checkUserAuth, upload.none(), normaluserConroller.statusChange);
router.post('/normaluser/delete/:id', checkUserAuth, normaluserConroller.deleteUser);

/*  users  address */
router.get('/address', checkUserAuth, addressConroller.getAllUser);
router.get('/address/:id', checkUserAuth, addressConroller.getUser);
router.post('/address', checkUserAuth, upload.none(), addressConroller.create);
router.put('/address', checkUserAuth, upload.none(), addressConroller.update);
router.delete('/address/:id', checkUserAuth, addressConroller.delete);

/*  users  companies */
router.get('/companies', checkUserAuth, companiesController.getAllUser);
router.get('/companies/:id', checkUserAuth, companiesController.getUser);
router.post('/companies', checkUserAuth, upload.none(), companiesController.create);
router.put('/companies', checkUserAuth, upload.none(), companiesController.update);
router.delete('/companies/:id', checkUserAuth, companiesController.delete);

/*  states */
router.get('/states', checkUserAuth, statesController.getAllUser);
router.get('/states/:id', checkUserAuth, statesController.getUser);
router.post('/states', checkUserAuth, upload.none(), statesController.create);
router.put('/states', checkUserAuth, upload.none(), statesController.update);
router.delete('/states/:id', checkUserAuth, statesController.delete);

/*  users  groups */
router.get('/groups', checkUserAuth, groupsController.getAllUser);
router.get('/groups/:id', checkUserAuth, groupsController.getUser);
router.post('/groups', checkUserAuth, upload.none(), groupsController.create);
router.put('/groups', checkUserAuth, upload.none(), groupsController.update);
router.delete('/groups/:id', checkUserAuth, groupsController.delete);

/*  users  role */
router.get('/role', checkUserAuth, roleController.getAllUser);
router.get('/role/:id', checkUserAuth, roleController.getUser);
router.post('/role', checkUserAuth, upload.none(), roleController.create);
router.put('/role', checkUserAuth, upload.none(), roleController.update);
router.delete('/role/:id', checkUserAuth, roleController.delete);

/*  users  category */
router.get('/category', checkUserAuth, categoryController.getAllUser);
router.get('/category/:id', checkUserAuth, categoryController.getUser);
router.post('/category', checkUserAuth, upload.none(), categoryController.create);
router.put('/category', checkUserAuth, upload.none(), categoryController.update);
router.delete('/category/:id', checkUserAuth, categoryController.delete);
router.post('/category/search', checkUserAuth,upload.none(), categoryController.search);

// /*  delivary */
router.post('/delivery', upload.none(), deliveryController.placeOrder);
router.get('/delivery/:id',checkUserAuth, deliveryController.show);
router.delete('/delivery/:id', deliveryController.cancelOrder);

/* prescritioclearn */
router.post('/uploadprescription', upload.none(), prescritionController.prescriptionUpload);
router.get('/viewprescription/:id',checkUserAuth, prescritionController.viewPrescription);
router.delete('/deleteprescription/:id', prescritionController.delete);

/* stores */
router.post('/store',checkUserAuth, upload.none(), storeController.create);
router.get('/store',checkUserAuth, storeController.getAll);
router.get('/store/:id',checkUserAuth, storeController.getOne);
router.put('/store/:id',checkUserAuth,upload.none(), storeController.update);
router.delete('/store/:id',checkUserAuth, storeController.delete);


// medicine
router.post('/medicine', checkUserAuth, upload.fields(medicineImagesDetailsfile), medicineController.create);
router.put('/medicine/:id',checkUserAuth,upload.fields(medicineImagesDetailsfile), medicineController.update);
router.get('/medicine',checkUserAuth, medicineController.getAll);
router.get('/medicine/:id',checkUserAuth, medicineController.getOne);
router.delete('/medicine/:id',checkUserAuth, medicineController.delete);
router.get('/medicine-search', medicineController.search);

/* carts */
router.post('/cart',checkUserAuth, upload.none(), cartController.create);
router.get('/cart/:user_id',checkUserAuth, cartController.getOne);
router.put('/cart/:id',checkUserAuth,upload.none(), cartController.update);
router.delete('/cart/:id',checkUserAuth, cartController.deleteOne);
router.delete('/cart-clear/:user_id',checkUserAuth, cartController.deleteAll);



module.exports = router;
