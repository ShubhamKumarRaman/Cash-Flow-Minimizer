import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import http from 'http'
import { initSocket } from './socket/socket.js';

dotenv.config();
const server = http.createServer(app);
initSocket(server);

const activeSockets = new Set();
server.on('connection', (socket) => {
    activeSockets.add(socket);
    socket.on('close', () => activeSockets.delete(socket));
});

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

let isShuttingDown = false;
const shutdown = (signal, done) => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    console.log(`Received ${signal}. Shutting down...`);

    server.close((error) => {
        if (error) {
            console.error('Error while closing server:', error);
        }

        if (typeof done === 'function') return done();
        process.exit(error ? 1 : 0);
    });

    // Ensure the port is released quickly (keep-alive sockets can otherwise delay close).
    for (const socket of activeSockets) {
        try {
            socket.destroy();
        } catch {
            // ignore
        }
    }

    setTimeout(() => {
        console.error('Forced shutdown (timeout).');
        process.exit(1);
    }, 10_000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

// Nodemon sends SIGUSR2 on restart; close server then re-signal.
process.once('SIGUSR2', () => shutdown('SIGUSR2', () => process.kill(process.pid, 'SIGUSR2')));

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on PORT: ${process.env.PORT}`);
// })