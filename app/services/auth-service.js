const userModel = require("@models/users");
const { comparePasswordWithHash } = require("@services/hash-use-bcrypt-lib");

const LOGIN_PAGE = "login";
const HOME_PAGE = "/admin";
const NO_USER_FOUND = "User did not found";
const PASSWORD_MISS_MATCH = "Password did not match";

module.exports.isUserValidate = async (plainPassword, email) => {

  // find user in databse by email
  const userWantsLogin = await userModel.findSingleUserByEmail(email);

  // email is not in database
  if (!userWantsLogin) {
    return { redirectPath: LOGIN_PAGE, message: NO_USER_FOUND };
  }

  // password not match
  if (!comparePasswordWithHash(plainPassword, userWantsLogin.password)) {
    return { redirectPath: LOGIN_PAGE, message: PASSWORD_MISS_MATCH };
  }
  
  // login was successfull
  return { redirectPath: HOME_PAGE, message: "" };

};

module.exports.onLogout = (req,res) => {
  delete req.session.user;
  res.redirect('/auth/login');
}
