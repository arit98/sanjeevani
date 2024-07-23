const util = require("util");
var multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if(file)
        {
            if(file.fieldname=='image_profile')
            {
                cb(null, 'public/uploads/images/profile')
            }
            else if(file.fieldname=='aadhar_card_image')
            {
                cb(null, 'public/uploads/images/adhar')
            }
            else if(file.fieldname=='medicine_images')
            {
                cb(null, 'public/uploads/images/medicine')
            }
            else{
                cb(null, 'public/uploads/others')
            }
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, "sanjeevani" + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage }) 



module.exports = upload;