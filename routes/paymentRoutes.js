import express from 'express';
import { isAuthenticated } from '../middlewares/auth.js';
import { 
    buySubscription, 
    cancelSubscription, 
    getRazorPayKey, 
    paymentVerification 
} from '../controllers/paymentController.js';

const router = express.Router();

router.route('/subscribe').get(isAuthenticated, buySubscription);  // Buy Subscription

router.route('/razorpaykey').get(getRazorPayKey);  // Get razorpay key

router.route('/paymentverification').post(isAuthenticated, paymentVerification)  // Verify Payment and Save reerence in DB

router.route('/subscribe/cancel').delete(isAuthenticated, cancelSubscription)  // Cancel subscription

export default router;
