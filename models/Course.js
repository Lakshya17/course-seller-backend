import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter the course title'],
        minLength: [4, 'Title must be 4 characters long'],
        maxLength: [80, 'Title cant exceed 80 charcters']
    },
    description: {
        type: String,
        required: [true, 'Please enter course description'],
        minLength: [20, 'Description must be 20 characters']
    },
    lectures: [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            videos: {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        }
    ],
    poster: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    views: {
        type: Number, 
        default: 0
    },
    numOfVideos: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: [true, 'Enter course creator name']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const Course = mongoose.model('Course', schema);