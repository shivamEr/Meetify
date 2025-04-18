const express=require('express')
const router=express.Router()
const authController=require("../controllers/Auth")
const FetchUser = require('../middleware/FetchUser')

router
    .post("/signup",authController.signup)
    .post('/login',authController.login)
    .post('/getuser',FetchUser,authController.getuser)


module.exports=router