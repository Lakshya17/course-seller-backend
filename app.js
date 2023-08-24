import express from 'express';
import {config} from 'dotenv';
import course from './routes/courseRoutes.js'     //importing course route
import user from './routes/userRoutes.js'         //importing user route
import payment from './routes/paymentRoutes.js';  //importing payment route
import other from './routes/otherRoutes.js';      //importing other route
import ErrorMiddleware from  './middlewares/Error.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

config({
    path: './config/config.env'
})

const app = express();

//Using middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

//using routes
app.use('/api/v1', course);
app.use('/api/v1', user);
app.use('/api/v1', payment);
app.use('/api/v1', other);

export default app;

app.get('/', (req, res) => {
    res.send(`<h1>Site is up. Click <a href=${process.env.FRONTEND_URL}>here</a> to visit frontend</h1>`)
})

app.use(ErrorMiddleware)