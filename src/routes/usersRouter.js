import express from 'express';
import { getRanking, getUser } from '../controllers/usersController.js';
import { authentication } from '../middlewares/authMiddleware.js';

const usersRouter = express.Router()
usersRouter.get("/users/me", authentication, getUser)
usersRouter.get("/ranking", getRanking)


export default usersRouter