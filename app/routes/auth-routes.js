const express = require('express');
const router = express.Router();

const AuthController = require('@controllers/auth-controller');
const authController = new AuthController()

router.get('/login' , authController.loginPage);
router.post('/login' , authController.login);
//router.get('/logout' , authController.logout);
router.get('/register' , authController.registerPage);
router.post('/register' , authController.register);

module.exports = router;