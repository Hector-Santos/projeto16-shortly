import express from 'express';
import { deleteUrl, getUrlById, openUrl, postUrl } from '../controllers/urlsController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import urlSchema from '../schemas/urlSchema.js';
import { authentication } from '../middlewares/authMiddleware.js';

const urlsRouter = express.Router()
urlsRouter.post("/urls/shorten", (req, res, next) => validate(req, res, next, urlSchema), authentication, postUrl)
urlsRouter.get("/urls/:id", getUrlById)
urlsRouter.get("/urls/open/:shortUrl", openUrl)
urlsRouter.delete("/urls/:id", authentication, deleteUrl)


export default urlsRouter