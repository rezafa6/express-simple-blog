const authService = require("@services/auth-service");
const {hashPassword} = require("@services/hash-use-bcrypt-lib");
const userModel = require('@models/users')
class AuthController {
  // #start conteroller
  async loginPage(req, res) {
    res.mainRenderer("login", { error: req.session.error }, "authLayout");
  }

  async login(req, res) {
    const requestBody = req.body;
    if (!requestBody.password || !requestBody.email) {
      req.session.error = "Fill all inputs";
      return res.redirect("login");
    }

    const { redirectPath, message } = await authService.isUserValidate(
      requestBody.password,
      requestBody.email
    );
    req.session.error = message;
    req.session.user = requestBody;
    res.redirect(redirectPath);
  }

  logout(req, res) {
    authService.onLogout(req, res);
  }

  registerPage(req, res) {
    res.mainRenderer(
      "register",
      {
        message: req.session.message,
      },
      "authLayout"
    );
  }

  async register(req,res) {
    
    const {password1 , password2 , full_name , email} = req.body;
    let isAnyEmptyField = false;
    for (let key in req.body) {
      if(!req.body[key]) {
        isAnyEmptyField = true;
      }
    }

    if(isAnyEmptyField) {
      req.session.error = 'Fill all inputs';
      res.redirect('register');
      return;
    }

    if(password1 !== password2) {
      req.session.error = 'Passwords did not match';
      res.redirect('register');
      return;
    }
    const newUserData = {
      password : hashPassword(password1),
      full_name : full_name,
      email : email,
    }
      const {affectedRows} = await userModel.addNewUserInDB(newUserData);
      affectedRows > 0 ? res.redirect('login') : registerPage(req,res);

  }

  // #end conteroller
}

module.exports = AuthController;
