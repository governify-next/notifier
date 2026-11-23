import { Resend, type CreateEmailOptions } from 'resend';
import { bootEnv } from '../config/bootConfig.js';
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

export async function sendEmail({
    to,
    subject,
    text,
    html,
}: Pick<CreateEmailOptions, 'to' | 'subject' | 'text' | 'html'>) {
    if (!resend) throw new Error('Resend client has not been initialized');

    const payload = { from: RESEND_FROM_EMAIL, to, subject, text, html } as CreateEmailOptions;
    const result = await resend.emails
        .send(payload, { signal: AbortSignal.timeout(10_000) })
        .catch(() => null);

    if (!result || result.error) {
        throw new StdError({
            message: 'Resend did not confirm email acceptance',
            httpStatus: 502,
            appCode: 'EMAIL_SEND_FAILED',
        });
    }

    return result.data;
}
