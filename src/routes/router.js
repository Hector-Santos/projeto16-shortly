import express from 'express';
import authRouter from './authRouter.js';
import urlRouter from './urlRouter.js';


const router = express.Router();
router.use(authRouter)
router.use(urlRouter)



export default router;