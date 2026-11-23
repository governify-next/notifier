import mongoose from 'mongoose';
import app from './app.js';
import { getLogger } from './utils/logger.js';
import { bootEnv } from './config/bootConfig.js';
import { initializeResend } from './services/email.service.js';

const logger = getLogger().setTag('server.ts');
const PORT = bootEnv.PORT;
const MONGO_URI = bootEnv.MONGO_URI;

try {
    initializeResend();
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () => {
        logger.log(`Server running on http://localhost:${PORT}`);
        logger.log(`Docs available at http://localhost:${PORT}/api-docs`);
    });
} catch (err) {
    logger.error('Failed to start server', err);
    process.exit(1);
}
