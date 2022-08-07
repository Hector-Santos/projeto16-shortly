import express from 'express';
import { getUrlById, openUrl, postUrl } from '../controllers/urlController.js';
import { validate } from '../middlewares/validationMiddleware.js';
import urlSchema from '../schemas/urlSchema.js';
import { authentication } from '../middlewares/authMiddleware.js';

const urlRouter = express.Router()
urlRouter.post("/urls/shorten", (req, res, next) => validate(req, res, next, urlSchema), authentication, postUrl)
urlRouter.get("/urls/:id", getUrlById)
urlRouter.get("/urls/open/:shortUrl", openUrl)


export default urlRouter