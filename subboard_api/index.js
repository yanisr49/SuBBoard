const http = require("http");
const app = require("./src/server");
const server = http.createServer(app);

const { PORT } = process.env;

// server listening
server.listen(PORT || 4001, () => {
  console.log(`Server running on port ${PORT || 4001}`);
});