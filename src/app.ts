import http2 from 'http2';
import dotenv from 'dotenv';
import fs from 'fs';
import router from './utils/router';
import logger from './utils/logger';
//pick up env vars from .env
//TODO add env var validation
dotenv.config();

//self genarated cert for https
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

//simple http2 https server
//TODO need more err handling
const server = http2.createSecureServer(options);
server.on('error', (err) => logger.error('Server error: %o', err));
server.on('stream', router);

//TODO need proper SIGKILL and SIGTERM handling
server.listen(process.env.APP_PORT, () => {
  logger.info(
    `🚀 ${process.env.npm_package_name} ready at https://localhost:${process.env.APP_PORT}`,
  );
});
