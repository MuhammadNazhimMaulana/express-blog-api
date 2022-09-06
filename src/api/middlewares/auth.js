// JWT 
const jwt = require("jsonwebtoken");
const accessTokenSecret = 'secretkeyappearshere';

// Response Builder
const ResponseBulider = require('../helpers/responseBuilder');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        // Verifying Token
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return ResponseBulider.error(res, 403, err.message); 
            }
  
            req.user = user;
            next();
        });
    } else {
        return ResponseBulider.error(res, 401, 'Tidak ada Token'); 
    }
  }
  
  // Exporting modules
module.exports = {
    authenticateJWT,
  }