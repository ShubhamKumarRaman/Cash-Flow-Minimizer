import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import http from 'http'
import { initSocket } from './socket/socket.js';

dotenv.config();
const server = http.createServer(app);
initSocket(server);

connectDB();

const PORT = process.env.PORT || 5000;

server.on('error', (error) => {
    if (error?.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Stop the other process or set PORT to a different value.`);
        process.exit(1);
    }

    console.error('Server failed to start:', error);
    process.exit(1);
});

server.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on PORT: ${process.env.PORT}`);
// })