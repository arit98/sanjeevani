const jwt = require('jsonwebtoken');
require('dotenv').config();

var checkUserAuth = async (req, res, next) => {
    let token;
    let id;
    const { authorization } = req.headers;


    if (authorization && authorization.startsWith('Bearer')) {
        try {
            // Get Token from user
            id = authorization
            // Get Token from header
            token = authorization.split(' ')[1];

            // Verify Token
            jwt.verify(token, process.env.jwt_secret_key);

            //res.status(200).send({ status: true, message: 'Authorized User' });

            next();
        } catch (error) {
            // console.log(error)
            res.status(401).send({ status: false, message: 'Unauthorized User' });
        }
    }
    if (!token) {
        res.status(401).send({ status: false, message: 'Unauthorized User, No Token' });
    }
};

module.exports = checkUserAuth;
