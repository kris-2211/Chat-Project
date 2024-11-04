// JWT (JSON Web Token) --> JWT helps us to authorize the user in our backend

const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({id},'srisaivivchatapp', {
        expiresIn: "90d"
    });
}

module.exports = generateToken;