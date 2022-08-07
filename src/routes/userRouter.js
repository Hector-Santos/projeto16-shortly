import express from 'express';
import { getUser } from '../controllers/userController.js';
import { authentication } from '../middlewares/authMiddleware.js';

const userRouter = express.Router()
userRouter.get("/users/me", authentication, getUser)


export default userRouter