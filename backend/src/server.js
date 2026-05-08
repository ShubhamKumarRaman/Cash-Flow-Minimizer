import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

// Handle Errors
server.on('error', (error) => {
    console.error('Server Error:', error.message);
});

// Graceful Shutdown
process.on('SIGINT', () => {
    console.log('Shutting down server...');
    server.close(() => {
        process.exit(0);
    });
});