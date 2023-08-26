import * as http from "http";
import * as os from "os";
import { test } from "utils";
const hostname = os.hostname();
const port: number = 3000;
const server = http.createServer((req, res) => {
  res.write("Hello TypeScript World on Node.js!\n");
  test();
  res.end();
});
server.listen(port);
console.log(`http://${hostname}:${port}`);
