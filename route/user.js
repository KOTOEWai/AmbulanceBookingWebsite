const express = require('express')
const router = express.Router();
const userController = require('../controller/userController')
const AuthMiddleware = require('../middleware/Auth')

router.get('/', userController.getAll)
router.post('/login', userController.logIn);
router.post('/SignUp', userController.signUp);
router.get('/Auth',AuthMiddleware,userController.me)
router.post('/logout',userController.logout);

module.exports = router;
