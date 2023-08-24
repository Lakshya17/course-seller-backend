import mongoose from "mongoose";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minLength: [6, 'Password must be atleast 6 characters'],
        select: false  //Automatically removes the password when accessing user.
    },
    role: {
        type: String,
        enum: ['admin', 'user'], //enum select from only two values
        default: 'user'
    },
    subscription: {
        id: String,         //Both this things are going to get from razorpay
        status: String
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    playlist: [
        {
            course: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course'
            },
            poster: String
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
})

schema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
})

schema.methods.getJWTToken = function(){
    return jwt.sign({_id: this._id}, process.env.JWT_SECRET, {
        expiresIn: '15d'
    })
}

schema.pre('save', function(){

})

schema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};


schema.methods.getResetToken = async function(){
    const resetToken = crypto.randomBytes(20).toString('hex');

    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now()+15 * 60 * 1000;

    return resetToken;
}

export const User = mongoose.model('User', schema)