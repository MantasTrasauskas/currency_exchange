import http, { IncomingMessage, ServerResponse } from 'http';
require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-var-requires

const requestListener = function (req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200);
  res.end('Hello, World!');
};

const server = http.createServer(requestListener);
server.listen(process.env.APP_PORT, () => {
  console.log(
    `🚀 ${process.env.npm_package_name} ready at http://localhost:${process.env.APP_PORT}`,
  );
});
