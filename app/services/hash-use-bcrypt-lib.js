const bcrypt = require("bcrypt");
const saltRounds = 10;
module.exports.hashPassword = (password) => {
  //  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, saltRounds);
};

module.exports.comparePasswordWithHash = (password , hash) => {
  return bcrypt.compareSync(password, hash);
}