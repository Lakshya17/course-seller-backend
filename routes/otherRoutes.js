import express from 'express';
import { authorizedAdmin, isAuthenticated } from '../middlewares/auth.js';
import { contact, courseRequest, getDashboardStats } from '../controllers/otherControllers.js';
const router = express.Router();


router.route('/contact').post(contact);  // Contact Form

router.route('/courserequest').post(courseRequest)  // Course Request

router.route('/admin/stats').get(isAuthenticated, authorizedAdmin, getDashboardStats);

export default router;