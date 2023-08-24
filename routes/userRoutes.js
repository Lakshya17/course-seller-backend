import express from 'express';
import { 
    addToPlaylist,
    changePassword, 
    deleteMyProfile, 
    deleteUser, 
    forgetPassword, 
    getAllUsers, 
    getMyProfile, 
    login, 
    logout, 
    register, 
    removeFromPlaylist, 
    resetPassword, 
    updateProfile, 
    updateProfilePicture, 
    updateUserRole
} from '../controllers/userController.js';
import { authorizedAdmin, isAuthenticated } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

const router = express.Router();

router.route('/register').post(singleUpload, register)  // To register a new user

router.route('/login').post(login)  //to login the user

router.route('/logout').get(logout);  // to logout the user

router.route('/me').get(isAuthenticated, getMyProfile).delete(isAuthenticated, deleteMyProfile)  //to get the profile

router.route('/changepassword').put(isAuthenticated, changePassword)  //to change the password

router.route('/updateprofile').put(isAuthenticated, updateProfile); // to update the name and email

router.route('/updateprofilepicture').put(isAuthenticated, singleUpload, updateProfilePicture);  //to update the profile picture

router.route('/forgetpassword').post(forgetPassword)  //forgot password

router.route('/resetpassword/:token').put(resetPassword);  //reset password

router.route('/addtoplaylist').post(isAuthenticated, addToPlaylist);  //add to playlist

router.route('/removefromplaylist').delete(isAuthenticated, removeFromPlaylist);  // remove form playlist


///Admin Routes

router.route('/admin/users').get(isAuthenticated, authorizedAdmin, getAllUsers);  // Get all users

router.route('/admin/user/:id')
    .put(isAuthenticated, authorizedAdmin, updateUserRole)
    .delete(isAuthenticated, authorizedAdmin, deleteUser);  //Update user role


export default router;