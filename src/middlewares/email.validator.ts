import { body, oneOf, validationResult } from 'express-validator';
import { type Request, type Response, type NextFunction } from 'express';
import { ValidationError } from '../utils/customErrors.js';

export const validateSendEmail = [
    body('to').isArray({ min: 1, max: 50 }).withMessage('Provide an array of 1 to 50 recipients'),
    body('to.*')
        .isString()
        .bail()
        .isEmail()
        .withMessage('Each recipient must be a valid email address'),
    body('subject').isString().bail().notEmpty().withMessage('Subject is required'),
    body('text').optional().isString(),
    body('html').optional().isString(),
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
