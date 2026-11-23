import { body, oneOf, validationResult } from 'express-validator';
import { type Request, type Response, type NextFunction } from 'express';
import { ValidationError } from '../utils/customErrors.js';

export const validateSendEmail = [
    body('to').isEmail().withMessage('Recipient must be a valid email address'),
    body('subject').notEmpty().withMessage('Subject is required'),
    oneOf([body('text').notEmpty(), body('html').notEmpty()], {
        message: 'Either text or html content must be provided',
    }),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new ValidationError('Validation failed', errors.array()));
        }
        next();
    },
];
