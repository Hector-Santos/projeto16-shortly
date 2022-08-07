import express from 'express';
import authRouter from './authRouter.js';
import urlsRouter from './urlsRouter.js';
import usersRouter from './usersRouter.js';


const router = express.Router();
router.use(authRouter)
router.use(urlsRouter)
router.use(usersRouter)



export default router;