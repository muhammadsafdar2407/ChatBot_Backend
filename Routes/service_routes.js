const get_all_services=require('../Controller/service_controller')
const authenticate=require('../Middleware/authenticator')

const express=require('express')

const service_router=express.Router();

service_router.get('/get_all_services',authenticate,get_all_services)

module.exports=service_router