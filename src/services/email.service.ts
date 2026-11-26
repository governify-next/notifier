import { Resend, type CreateEmailOptions } from 'resend';
import { bootEnv } from '../config/bootConfig.js';
import { EmailStatus, type IEmail } from '../models/email.model.js';
import * as emailRepository from '../repositories/email.repository.js';
import { StdError } from '../utils/customErrors.js';

const { RESEND_API_KEY, RESEND_FROM_EMAIL } = bootEnv;
let resend: Resend | undefined;

export function initializeResend() {
    if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
        throw new Error('Missing Resend configuration. Set RESEND_API_KEY and RESEND_FROM_EMAIL.');
    }

    try {
        resend = new Resend(RESEND_API_KEY);
    } catch {
        throw new Error('Failed to initialize Resend client. Check RESEND_API_KEY.');
    }
}

export async function getEmails() {
    return await emailRepository.getEmails();
}

export async function sendEmail({
    to,
    subject,
    text,
    html,
}: Pick<IEmail, 'to' | 'subject' | 'text' | 'html'>) {
    if (!resend) throw new Error('Resend client has not been initialized');

    const opts = { from: RESEND_FROM_EMAIL, to, subject, text, html };
    const attempt = await emailRepository.createEmailAttempt(opts);
    const result = await resend.emails
        .send(opts as CreateEmailOptions, { signal: AbortSignal.timeout(10_000) })
        .catch(() => null);

    const data = result?.data;
    const outcome = data
        ? { status: EmailStatus.SENT as const, resendId: data.id }
        : { status: EmailStatus.FAILED as const };

    await emailRepository.completeEmailAttempt(attempt._id, outcome);

    if (!data) {
        throw new StdError({
            message: 'Resend did not confirm email acceptance',
            httpStatus: 502,
            appCode: 'EMAIL_SEND_FAILED',
        });
    }

    return data;
}
