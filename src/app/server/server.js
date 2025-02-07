import express from 'express';
import cors from 'cors';
import romanNumeralRoutes from './routes/romanNumeralRoutes.js';

const api = express();
const port = 8080;

// Middleware
api.use(cors());
api.use(express.json());

// Routes
api.use('/romannumeral', romanNumeralRoutes);

export const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = api.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
      resolve(server); // resolve with server instance
    });

    server.on('error', (err) => reject(err));
  });
};

// Start server
if (process.env.NODE_ENV !== 'test') {
  startServer();
}