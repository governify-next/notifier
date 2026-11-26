import { Router } from 'express';
import * as emailController from '../controllers/email.controller.js';
import { checkServiceAuthentication } from '../middlewares/authenticator.validator.js';
import { validateSendEmail } from '../middlewares/email.validator.js';

export const emailRoutes = Router();

emailRoutes.get('/', checkServiceAuthentication, emailController.getEmails);
emailRoutes.post('/', checkServiceAuthentication, validateSendEmail, emailController.sendEmail);
