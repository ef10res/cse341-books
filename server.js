import app from './app.js';
import { connectToDb } from './src/db/connect.js';

const PORT = process.env.PORT;

if (!PORT) {
    throw new Error('PORT is not defined in the environment variables');
}

const startServer = async () => {
    try {
        await connectToDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error({ message: 'Database connection failed', error });
        process.exit(1);
    }
}
await startServer();