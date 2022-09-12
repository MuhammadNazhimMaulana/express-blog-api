const CryptoJS = require('crypto-js');

class Encryption{

    static encrypt = (text) => {
      return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
    };
    
    static decrypt = (data) => {
      return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
    };
}

module.exports = Encryption