const bcrypt = require('bcrypt');
const encryptText = async (text) => {
  const encrypted = await bcrypt.hash(text, 10);
  return encrypted;
}

const compareEncrypted = async (text, encryptedText) => {
  const compare = await bcrypt.compare(text, encryptedText);
  return compare;
}

module.exports = {
  encryptText,
  compareEncrypted
}
