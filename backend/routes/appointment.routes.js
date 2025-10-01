import {Router} from 'express';
import { book , appointments , todayAppointment , getUpcomingAppointments , updateAppointment , deleteAppointment , confirm , cancel , completed } from "../controller/appointment.controller.js";

export default Router()
.post('/book',book)
.get('/appointments',appointments)
.get('/today',todayAppointment)
.get('/upcoming',getUpcomingAppointments)
.put('/:id',updateAppointment)
.put('/:id/confirm',confirm)
.put('/:id/cancel',cancel)
.put('/:id/complete',completed)
.delete('/:id',deleteAppointment);
