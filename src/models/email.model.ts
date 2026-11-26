import mongoose, { Schema, type Document, type Types } from 'mongoose';

export enum EmailStatus {
    IN_PROGRESS = 'IN_PROGRESS',
    FAILED = 'FAILED',
    SENT = 'SENT',
}

export interface IEmail extends Document<Types.ObjectId> {
    from: string;
    to: string[];
    subject: string;
    text?: string;
    html?: string;
    status: EmailStatus;
    resendId?: string;
}

const emailSchema = new Schema<IEmail>(
    {
        from: { type: String, required: true },
        to: { type: [String], required: true },
        subject: { type: String, required: true },
        text: String,
        html: String,
        status: {
            type: String,
            enum: Object.values(EmailStatus),
            required: true,
            default: EmailStatus.IN_PROGRESS,
        },
        resendId: String,
    },
    { timestamps: true },
);

const Email = mongoose.model<IEmail>('Email', emailSchema);

export default Email;
