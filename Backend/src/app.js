import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { errorHandler } from "./middlewares/errorHandler.js"
import userRouter from './routes/user.routes.js'
import postRoutes from './routes/post.route.js'

const app = express()

app.use(cors())

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb "}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
});
 app.use("/posts", postRoutes);
 app.use("/api/v1/users", userRouter);
 app.use(errorHandler);


export {app}