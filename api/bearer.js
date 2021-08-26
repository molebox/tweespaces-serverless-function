require('dotenv').config();
const CryptoJS = require("crypto-js");

const encryptWithAES = (stringToEncrypt) => {
  return CryptoJS.AES.encrypt(stringToEncrypt, process.env.SECRET).toString();
};

module.exports = (req, res) => {
  res.json({
    bearer: encryptWithAES(process.env.BEARER)
  })
}