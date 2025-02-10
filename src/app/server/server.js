import express from 'express';
import cors from 'cors';
import romanNumeralRoutes from './routes/romanNumeralRoutes.js';
// https://github.com/pinojs/pino
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});

const api = express();
const port = 8080;

// Middleware
api.use(cors());
api.use(express.json());

// Logging Middleware
api.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req?.method;
  const url = req?.url;
  const userAgent = req?.headers['user-agent'] || 'Unknown';

  // Log the status code after the response finishes
  res.on('finish', () => {
    const statusCode = res?.statusCode;
    logger.info(
      `[${timestamp}] ${method} ${url} - ${statusCode} (User-Agent: ${userAgent})`
    );
  });

  next();
});

// Routes
api.use('/romannumeral', romanNumeralRoutes);

export const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = api.listen(port, () => {
      logger.info(`Server running at http://localhost:${port}`);
      resolve(server);
    });

    server.on('error', (err) => {
      logger.error('Error starting server:', err);
      reject(err)
    });
  });
};

// Start server
if (process.env.NODE_ENV !== 'test') {
  startServer();
}
