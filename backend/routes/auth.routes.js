import {Router} from 'express';
import {Register,Login,verifyOtp}  from "../controller/auth.controller.js";
// import  authMiddleware  from '../middleware/authMiddleware.js';

export default Router()
.post('/register', Register)
.post('/login', Login)
.post("/verify-otp", verifyOtp);