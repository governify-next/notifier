import { type Request, type Response } from 'express';
import * as emailService from '../services/email.service.js';
import { sendSuccess } from '../utils/standardResponse.js';

export const getEmails = async (req: Request, res: Response) => {
    const data = await emailService.getEmails();
    return sendSuccess(res, { data });
};

export const sendEmail = async (req: Request, res: Response) => {
    const data = await emailService.sendEmail(req.body);
    return sendSuccess(res, { data, message: 'Email accepted by Resend', httpStatus: 202 });
};
