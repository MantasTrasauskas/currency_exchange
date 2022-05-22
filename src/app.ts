import http2 from 'http2';
require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-var-requires
import fs from 'fs';
import router from './utils/router';
import logger from './utils/logger';

const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

const server = http2.createSecureServer(options);
server.on('error', (err) => logger.error('Server error: %o', err));
server.on('stream', router);

server.listen(process.env.APP_PORT, () => {
  logger.info(`🚀 ${process.env.npm_package_name} ready at http://localhost:${process.env.APP_PORT}`)
});
