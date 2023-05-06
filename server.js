// Require built-in module nodejs
const http = require("http");

// Define http server
const server = http.createServer((req, res) => {
  // Handle users routes
  if (req.url == "/users") {
    res.end("User routes");
  } else if (req.url == "/classes") {
    // Handle classes routes
    res.end("Class routes");
  } else {
    res.end("Hello world");
  }
});

// Start http server
server.listen(8000, () => {
  console.log("Server listening on port 8000");
});
