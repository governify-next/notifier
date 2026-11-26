import { type Types } from 'mongoose';
import Email, { EmailStatus, type IEmail } from '../models/email.model.js';

export const getEmails = async () => {
    return await Email.find();
};

export const createEmailAttempt = async (
    data: Pick<IEmail, 'from' | 'to' | 'subject' | 'text' | 'html'>,
) => {
    const email = new Email(data);
    return await email.save();
};

export const completeEmailAttempt = async (
    id: Types.ObjectId,
    outcome: { status: EmailStatus.SENT; resendId: string } | { status: EmailStatus.FAILED },
) => {
    const result = await Email.updateOne(
        { _id: id, status: EmailStatus.IN_PROGRESS },
        { $set: outcome },
    );
    if (result.matchedCount !== 1) throw new Error('Email attempt is missing or already completed');
};
