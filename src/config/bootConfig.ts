import dotenv from 'dotenv';
import path from 'path';

// Load .env file
const envPath = process.env.GOV_BOOT_ENV_PATH || path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath, quiet: true });

export const bootEnv = {
    // Service configuration
    NODE_ENV: process.env.NODE_ENV || 'development',
    GOV_LOG_LEVEL: process.env.GOV_LOG_LEVEL || 'INFO',
    GOV_SERVICE_NAME: process.env.GOV_SERVICE_NAME || 'notifier',
    PORT: process.env.PORT || '5909',

    // Database URIs
    MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/governify-next',

    // JWT configuration
    JWT_SECRET: process.env.JWT_SECRET || 'governify_next_secret_key',
    JWT_ISSUER: process.env.JWT_ISSUER || 'authenticator',
    JWT_AUDIENCE: process.env.JWT_AUDIENCE || 'governify-next',

    // Resend
    RESEND_API_KEY: process.env.RESEND_API_KEY || '',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || '',
};
