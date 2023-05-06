// Require built-in module nodejs
const http = require("http");

// Define http server
const server = http.createServer((req, res) => {
  console.log(req);
  res.end("Hello world");
});

// Start http server
server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
