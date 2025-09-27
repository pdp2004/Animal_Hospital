import {Router} from 'express';
import {Ptient}  from "../controller/patient.controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

export default Router()
.get('/', authMiddleware, Ptient);