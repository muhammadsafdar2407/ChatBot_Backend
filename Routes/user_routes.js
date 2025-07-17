const express=require('express')
const {signup}=require('../Controller/user_controller')
const {login,verify_pin,image_uploaded}=require('../Controller/user_controller')
const authenticate=require('../Middleware/authenticator')
const upload_image=require('../Middleware/image')

const userouter=express.Router()

userouter.post('/signup',signup)
userouter.post('/login',login)
userouter.post('/verifypin',authenticate,verify_pin)
userouter.post('/upload',upload_image,image_uploaded)

module.exports=userouter